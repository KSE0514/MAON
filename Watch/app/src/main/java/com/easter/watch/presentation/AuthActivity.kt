package com.easter.watch.presentation

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.PendingIntentCompat.send
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.easter.watch.R
import com.easter.watch.databinding.ActivityAuthBinding
import com.easter.watch.presentation.dataModel.MemberInfo
import com.google.firebase.messaging.FirebaseMessaging
import kotlinx.serialization.json.Json
import okhttp3.OkHttpClient
import ua.naiksoftware.stomp.Stomp
import ua.naiksoftware.stomp.StompClient
import java.util.concurrent.TimeUnit

class AuthActivity : AppCompatActivity() {

    private lateinit var binding: ActivityAuthBinding
    val TAG = "authActivity"

    private val sharedPreferences by lazy {
        getSharedPreferences("watch_prefs", Context.MODE_PRIVATE)
    }
    private var stompClient: StompClient? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAuthBinding.inflate(layoutInflater)
        setContentView(binding.root)

        checkPairing()

    }

    private fun checkPairing() {
        val isPaired = sharedPreferences.getBoolean("is_paired", false)
        val deviceToken = sharedPreferences.getString("device_token", null)

        if (isPaired && deviceToken != null) {
            Log.d(TAG, "모바일 앱과 페어링 완료")
            connectWebSocket(deviceToken)
        } else {
            Log.d(TAG, "모바일 앱과 페어링 필요")
            generateAndShowAuthCode()
        }
    }

    private fun generateAndShowAuthCode() {
        val authCode = (100000..999999).random().toString()
        binding.authCodeText.text = authCode
        binding.authCodeText.visibility = View.VISIBLE

        // FCM 토큰 생성 (React Native 앱과의 통신을 위해)
        FirebaseMessaging.getInstance().token.addOnCompleteListener { task ->
            if (task.isSuccessful) {
                val token = task.result
                listenForAuthConfirmation(authCode, token)
            }
        }
    }

    private fun listenForAuthConfirmation(authCode: String, fcmToken: String) {
        // FCM 메시지 수신을 위한 서비스 등록
        val intent = Intent(this, WatchMessageService::class.java)
        intent.putExtra("authCode", authCode)
        intent.putExtra("fcmToken", fcmToken)
        startService(intent)
    }

    private fun connectWebSocket(deviceToken: String) {
        val url = "ws://your-spring-server-url/ws"
        val client = OkHttpClient.Builder()
            .readTimeout(0, TimeUnit.MILLISECONDS)
            .build()

        val stomp = Stomp.over(Stomp.ConnectionProvider.OKHTTP, url)

        // STOMP 설정
        stompClient = stomp.apply {
            connect()

            topic("/topic/user/$deviceToken").subscribe { topicMessage ->
                val memberInfo = Json.decodeFromString<MemberInfo>(topicMessage.toString())
                handleMemberInfo(memberInfo)
            }

            // 연결 성공시 deviceToken 전송
            send("/app/watch/connect", deviceToken).subscribe()
        }
    }

    private fun handleMemberInfo(memberInfo: MemberInfo) {
        // 멤버 정보 처리 및 UI 업데이트
        runOnUiThread {
            // UI 업데이트 로직
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        stompClient?.disconnect()
    }

}