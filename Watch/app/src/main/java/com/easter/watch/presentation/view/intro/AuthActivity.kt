package com.easter.watch.presentation.view.intro

import StompWebSocketClient
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.easter.watch.databinding.ActivityAuthBinding
import com.easter.watch.presentation.service.ApiService
import com.easter.watch.presentation.dataModel.AuthInfo
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

class AuthActivity : AppCompatActivity() {

    private lateinit var binding: ActivityAuthBinding
    private lateinit var stompClient: StompWebSocketClient
    private lateinit var memberDao: MemberDao
    val TAG = "authActivity"

//    private val sharedPreferences by lazy {
//        getSharedPreferences("watch_prefs", Context.MODE_PRIVATE)
//    }
//
//    private val retrofit = Retrofit.Builder()
//        .baseUrl("https://k11c207.p.ssafy.io/maon/")  // 서버 URL은 받으셔야 합니다
//        .addConverterFactory(GsonConverterFactory.create())
//        .build()
//
//    private val apiService = retrofit.create(ApiService::class.java)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAuthBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Database 초기화
        val db = MemberDatabase.getDatabase(this)
        memberDao = db.memberDao()

        // WebSocket + STOMP 연결
        CoroutineScope(Dispatchers.IO).launch {
            stompClient = StompWebSocketClient("wss://k11c207.p.ssafy.io/maon/route/ws/location")
            stompClient.connect()
        }

        binding.connectBtn.setOnClickListener {
            val authCode = binding.authCodeText.text.toString()
            subscribeToAuthTopic(authCode)
            stompClient.sendMessage("/topic/sub/connect/$authCode","watch-connected") //구독후 메시지 보내기
        }

    }

    fun subscribeToAuthTopic(authCode: String) {
        stompClient.subscribeToTopic("/topic/sub/connect/$authCode") { payload ->
            // 구독 채널에서 받은 데이터 처리
            val memberId = Gson().fromJson(payload, MemberInfo::class.java)
            Log.d(TAG, "memberID : $memberId")

            CoroutineScope(Dispatchers.IO).launch {
                memberId?.let {
                    Log.d(TAG, "멤버 저장")
                    memberDao.insertMember(Member(memberId.toString()))
                }

            }
        }
    }

}