package com.easter.watch.presentation.view.intro

import StompWebSocketClient
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.text.InputFilter
import android.util.Log
import android.view.View
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.easter.watch.R
import com.easter.watch.databinding.ActivityAuthBinding
import com.easter.watch.presentation.service.ApiService
import com.easter.watch.presentation.dataModel.AuthInfo
import com.easter.watch.presentation.dataModel.Enum.Connect
import com.easter.watch.presentation.dataModel.MemberInfo
import com.easter.watch.presentation.db.MemberDatabase
import com.easter.watch.presentation.db.dao.MemberDao
import com.easter.watch.presentation.db.entity.Member
import com.easter.watch.presentation.view.run.StartActivity
import com.google.firebase.messaging.FirebaseMessaging
import com.google.gson.Gson
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.time.LocalDateTime

class AuthActivity : AppCompatActivity() {

    private lateinit var binding: ActivityAuthBinding
    private lateinit var stompClient: StompWebSocketClient
    private lateinit var memberDao: MemberDao
    val TAG = "authActivity"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAuthBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val authCode = findViewById<EditText>(R.id.authCodeText)
        authCode.filters = arrayOf(InputFilter.LengthFilter(6))


        // Database 초기화
        val db = MemberDatabase.getDatabase(this)
        memberDao = db.memberDao()

        // WebSocket + STOMP 연결
        CoroutineScope(Dispatchers.IO).launch {
            stompClient = StompWebSocketClient("wss://k11c207.p.ssafy.io/maon/route/ws/location")
            stompClient.connect()
        }

        binding.connectBtn.setOnClickListener {
            //val authCode = binding.authCodeText.text.toString()
            val authCodeText = authCode.text.toString()
            subscribeToAuthTopic(authCodeText)
            // JSON 형식의 메시지 생성
            val messageMap = mapOf("timestamp" to LocalDateTime.now().toString())
            val messageJson = Gson().toJson(messageMap) // JSON 문자열로 변환
            stompClient.sendMessageJson("/sub/connection/$authCodeText",messageJson)
        }
    }

    fun subscribeToAuthTopic(authCode: String) {
        stompClient.subscribeToTopic("/sub/connection/$authCode") { payload ->
            // JSON 데이터를 AuthInfo 객체로 변환
            val authInfo = Gson().fromJson(payload, AuthInfo::class.java)
            Log.d(TAG, authInfo.toString())

            when(authInfo.type) {
                Connect.CONNECTION_SUCCEED -> {
                    // 연결 성공 시 memberId 저장
                    Log.d(TAG, "연결 성공: memberID = ${authInfo.memberId}")
                    CoroutineScope(Dispatchers.IO).launch {
                        memberDao.insertMember(Member(authInfo.memberId))
                        Log.d(TAG, "멤버 저장 완료")
                    }
                }
                Connect.CONNECTION_FAILED -> {
                    // 연결 실패 시 로그 메시지 출력
                    Log.d(TAG, "연결 실패")
                }
            }
        }
    }

}