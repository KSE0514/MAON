package com.easter.watch.presentation

import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.IBinder
import androidx.core.content.ContextCompat.startActivity
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

// FCM 메시지 수신을 위한 서비스
class WatchMessageService : FirebaseMessagingService() {
    private val sharedPreferences by lazy {
        getSharedPreferences("watch_prefs", Context.MODE_PRIVATE)
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)

        remoteMessage.data["type"]?.let { type ->
            when (type) {
                "AUTH_CONFIRMATION" -> {
                    val deviceToken = remoteMessage.data["deviceToken"]
                    val authStatus = remoteMessage.data["status"]

                    if (authStatus == "success" && deviceToken != null) {
                        // 페어링 성공 처리
                        sharedPreferences.edit()
                            .putBoolean("is_paired", true)
                            .putString("device_token", deviceToken)
                            .apply()

                        // SplashActivity 다시 시작
                        val intent = Intent(this, AuthActivity::class.java)
                            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
                        startActivity(intent)
                    }
                }
            }
        }
    }
}