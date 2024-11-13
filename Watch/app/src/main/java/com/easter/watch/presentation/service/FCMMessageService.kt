package com.easter.watch.presentation.service

import android.content.Intent
import android.util.Log
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

// FCM 메시지 수신을 위한 서비스
class FCMMessageService : FirebaseMessagingService() {
//    private val sharedPreferences by lazy {
//        getSharedPreferences("watch_prefs", Context.MODE_PRIVATE)
//    }
//
//    override fun onMessageReceived(remoteMessage: RemoteMessage) {
//        super.onMessageReceived(remoteMessage)
//
//        remoteMessage.data["type"]?.let { type ->
//            when (type) {
//                "AUTH_CONFIRMATION" -> {
//                    val deviceToken = remoteMessage.data["deviceToken"]
//                    val authStatus = remoteMessage.data["status"]
//
//                    if (authStatus == "success" && deviceToken != null) {
//                        // 페어링 성공 처리
//                        sharedPreferences.edit()
//                            .putBoolean("is_paired", true)
//                            .putString("device_token", deviceToken)
//                            .apply()
//
//                        // AuthActivity 다시 시작
//                        val intent = Intent(this, AuthActivity::class.java)
//                            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
//                        startActivity(intent)
//                    }
//                }
//            }
//        }
//    }
//}

    private val TAG = "FCM MessageService"
    private val serverUrl = "wss://k11c207.p.ssafy.io/maon"  // 서버 URL로 변경 필요
    private lateinit var webSocketClient: WebSocketClient

    override fun onCreate() {
        super.onCreate()
        webSocketClient = WebSocketClient(serverUrl)
    }


    override fun onNewToken(token: String) {
        super.onNewToken(token)
        Log.d(TAG, token)
        sendTokenToServer(token)
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)

        // 데이터 페이로드만 처리
        if (remoteMessage.data.isNotEmpty()) {
            handleDataMessage(remoteMessage.data)
        }
    }

    private fun handleDataMessage(messageData: Map<String, String>) {
        // 데이터 처리 로직
        val intent = Intent("FCM_DATA_MESSAGE")
        // 받은 모든 데이터를 Intent에 추가
        messageData.forEach { (key, value) ->
            intent.putExtra(key, value)
        }
        LocalBroadcastManager.getInstance(this).sendBroadcast(intent)
    }

    private fun sendTokenToServer(token: String) {
        webSocketClient.connect(token)
    }

    override fun onDestroy() {
        super.onDestroy()
        webSocketClient.disconnect()
    }
}


