package com.easter.watch.presentation.view

import StompWebSocketClient
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.easter.watch.R
import com.easter.watch.presentation.dataModel.StartInfo
import com.easter.watch.presentation.db.MemberDatabase
import com.easter.watch.presentation.db.dao.MemberDao
import com.easter.watch.presentation.view.intro.AuthActivity
import com.easter.watch.presentation.view.intro.SplashActivity
import com.easter.watch.presentation.view.run.RunActivity
import com.google.gson.Gson
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class RecordActivity : AppCompatActivity() {

    private lateinit var memberDao: MemberDao
    private lateinit var stompClient: StompWebSocketClient
    val TAG =  "RecordActivity"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_record)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // Database 초기화
        val db = MemberDatabase.getDatabase(this)
        memberDao = db.memberDao()

        CoroutineScope(Dispatchers.Main).launch {
            val memberId = memberDao.getMemberId()
            stompClient = StompWebSocketClient("wss://k11c207.p.ssafy.io/maon/route/ws/location")

            stompClient.connect {
                Log.d(TAG, "STOMP 연결 후 구독 요청 실행")
                subscribeToMemberTopic(memberId)
            }
        }

        //연동해제
        val disconnectBtn = findViewById<Button>(R.id.disConnectBtn)
        disconnectBtn.setOnClickListener {
            // 모든 데이터 삭제
            CoroutineScope(Dispatchers.IO).launch {
                memberDao.deleteAll() // 테이블 초기화
            }

            val intent = Intent(this, SplashActivity::class.java)
            startActivity(intent)
            finish()

        }
    }

    // STOMP 메시지에서 JSON 추출
    private fun extractJsonFromStompMessage(stompMessage: String): String {
        val parts = stompMessage.split("\n\n")
        val json = if (parts.size >= 2) {
            parts.last().trim()
        } else {
            stompMessage.trim()
        }
        // 한글(AC00-D7A3)을 제외한 모든 비ASCII 유니코드 문자 제거
        return json.replace(Regex("[^\\x20-\\x7E가-힣]"), "").trim()
    }

    fun subscribeToMemberTopic(memberId : String){
        stompClient.subscribeToTopic("/sub/start/$memberId","sub-member"){ payload ->
            try{
                // JSON 데이터를 AuthInfo 객체로 변환
                val jsonBody = extractJsonFromStompMessage(payload)
                Log.d(TAG, "추출된 JSON: $jsonBody")

                // Gson을 사용해 JSON을 StartInfo 객체로 변환
                val startInfo = Gson().fromJson(jsonBody, StartInfo::class.java)
                Log.d(TAG, "변환된 StartInfo 객체: $startInfo")

                val recordId = startInfo.recordId

                when(startInfo.mode){
                    "notSelectedRoute" ->{
                        val intent = Intent(this, RunActivity::class.java)
                        intent.putExtra("recordId",recordId)
                        startActivity(intent)
                        finish()
                    }
                }

            }catch (e : Exception){
                Log.d(TAG, e.toString())
            }
        }
    }
}