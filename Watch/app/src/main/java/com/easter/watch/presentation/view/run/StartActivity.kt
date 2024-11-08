package com.easter.watch.presentation.view.run

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.animation.AnimationUtils
import android.view.animation.ScaleAnimation
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

        binding.runStartBtn.setOnClickListener {
            // 버튼 클릭 시 Activity 전환
            val intent = Intent(this, RunActivity::class.java)
            startActivity(intent)
            finish()
        }

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
            "https://k11c207.p.ssafy.io/maon/",  // 웹소켓 서버 URL
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