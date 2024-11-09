package com.easter.watch.presentation.view.run

import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.view.animation.AnimationUtils
import android.view.animation.ScaleAnimation
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.easter.watch.R
import com.easter.watch.databinding.ActivityStartBinding
import com.easter.watch.presentation.WebSocketManager
import com.easter.watch.presentation.dataModel.MemberInfo
import com.easter.watch.presentation.service.SensorPermissionService

class StartActivity : AppCompatActivity() {

    private lateinit var binding: ActivityStartBinding
    private val webSocketManager = WebSocketManager.getInstance()
    private var memberId: String? = null

    private lateinit var permissionService: SensorPermissionService

    private val sharedPreferences by lazy {
        getSharedPreferences("watch_prefs", Context.MODE_PRIVATE)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityStartBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.runStartBtn.setOnClickListener {
            // SensorPermissionService 초기화
            permissionService = SensorPermissionService()
            // 권한 확인 및 요청
            permissionService.checkAndRequestPermissions(this)
        }

        intent.getStringExtra("deviceToken")?.let { deviceToken ->
            connectWebSocket(deviceToken)
        }
    }

    // 권한 요청 결과 확인
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        if (requestCode == SensorPermissionService.PERMISSION_REQUEST_CODE) {
            // 권한이 모두 허용되었는지 확인
            if (grantResults.isNotEmpty() && grantResults.all { it == PackageManager.PERMISSION_GRANTED }) {
                // 모든 권한이 허용되었을 때 RunActivity로 이동
                val intent = Intent(this, RunActivity::class.java)
                startActivity(intent)
                finish()
            } else {
                // 권한이 허용되지 않은 경우 사용자에게 안내
                //Toast.makeText(this, "권한이 필요합니다.", Toast.LENGTH_SHORT).show()
                finish()
            }
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