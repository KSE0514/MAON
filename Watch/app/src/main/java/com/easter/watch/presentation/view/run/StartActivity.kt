package com.easter.watch.presentation.view.run

import android.content.Context
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.easter.watch.R
import com.easter.watch.databinding.ActivityStartBinding
import com.easter.watch.presentation.WebSocketManager
import com.easter.watch.presentation.dataModel.MemberInfo

class StartActivity : AppCompatActivity() {

    private lateinit var binding: ActivityStartBinding
    private val webSocketManager = WebSocketManager.getInstance()
    private var memberId: String? = null

    private val sharedPreferences by lazy {
        getSharedPreferences("watch_prefs", Context.MODE_PRIVATE)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityStartBinding.inflate(layoutInflater)
        setContentView(binding.root)

        intent.getStringExtra("deviceToken")?.let { deviceToken ->
            connectWebSocket(deviceToken)
        }
    }


    private fun connectWebSocket(deviceToken: String) {
        webSocketManager.setMemberInfoCallback { memberInfo ->
            // 회원 정보 저장
            memberId = memberInfo.uuid
            sharedPreferences.edit()
                .putString("member_id", memberInfo.uuid)
                .putString("member_name", memberInfo.name)
                .apply()

            // UI 업데이트
            updateUI(memberInfo)
        }

        webSocketManager.connect(
            "your-websocket-server-url",  // 웹소켓 서버 URL
            deviceToken
        )
    }

    private fun updateUI(memberInfo: MemberInfo) {
        // UI 업데이트 로직
        binding.memberName.text = memberInfo.name
    }

    override fun onDestroy() {
        super.onDestroy()
        webSocketManager.disconnect()
    }

}