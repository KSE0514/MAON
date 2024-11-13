package com.easter.watch.presentation

import android.app.Application
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Bundle
import android.util.Log
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.databinding.DataBindingUtil.setContentView
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import com.easter.watch.R
import com.easter.watch.presentation.service.WebSocketClient
import com.google.firebase.messaging.FirebaseMessaging

class MainActivity : AppCompatActivity() {

    private lateinit var webSocketClient: WebSocketClient
    private val serverUrl = "wss://k11c207.p.ssafy.io/maon/route/ws/location"  // 서버 URL로 변경 필요

    private val dataReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            if (intent?.action == "FCM_DATA_MESSAGE") {
                // 받은 데이터 처리
                handleReceivedData(intent.extras)
            }
        }
    }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        webSocketClient = WebSocketClient(serverUrl)

        // 데이터 수신을 위한 BroadcastReceiver 등록
        LocalBroadcastManager.getInstance(this).registerReceiver(
            dataReceiver,
            IntentFilter("FCM_DATA_MESSAGE")
        )

        FirebaseMessaging.getInstance().token.addOnCompleteListener { task ->
            if (task.isSuccessful) {
                val token = task.result
                Log.d("토큰 확인", "FCM 토큰: $token")
                webSocketClient.connect(token)
                // 토큰을 사용하거나 UI에 표시
            } else {
                Log.w("토큰 확인", "토큰 가져오기 실패", task.exception)
            }
        }
    }

    private fun handleReceivedData(extras: Bundle?) {
        extras?.let { bundle ->
            // 번들에서 데이터 추출 및 처리
            bundle.keySet().forEach { key ->
                val value = bundle.getString(key)
                Log.d("FCMData", "Received: $key = $value")
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        LocalBroadcastManager.getInstance(this).unregisterReceiver(dataReceiver)
    }
}