package com.easter.watch.presentation.view.intro

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.easter.watch.databinding.ActivityAuthBinding
import com.easter.watch.presentation.service.ApiService
import com.easter.watch.presentation.MainActivity
import com.easter.watch.presentation.dataModel.AuthInfo
import com.google.firebase.messaging.FirebaseMessaging
import kotlinx.coroutines.launch
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class AuthActivity : AppCompatActivity() {

    private lateinit var binding: ActivityAuthBinding
    val TAG = "authActivity"

    private val sharedPreferences by lazy {
        getSharedPreferences("watch_prefs", Context.MODE_PRIVATE)
    }

    private val retrofit = Retrofit.Builder()
        .baseUrl("https://k11c207.p.ssafy.io/maon/")  // 서버 URL은 받으셔야 합니다
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    private val apiService = retrofit.create(ApiService::class.java)

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
            startRunActivity(deviceToken)
        } else {
            generateAndShowAuthCode()
        }
    }

    private fun generateAndShowAuthCode() {
        val authCode = (100000..999999).random().toString()
        binding.authCodeText.text = authCode
        binding.authCodeText.visibility = View.VISIBLE

        // FCM 토큰 생성하고 서버로 전송
        FirebaseMessaging.getInstance().token.addOnCompleteListener { task ->
            if (task.isSuccessful) {
                val fcmToken = task.result
                sendAuthInfoToServer(authCode, fcmToken)
            }
        }
    }

    private fun sendAuthInfoToServer(authCode: String, fcmToken: String) {
        val authInfo = AuthInfo(authCode, fcmToken)

        lifecycleScope.launch {
            try {
                val response = apiService.sendAuthInfo(authInfo)
                if (!response.isSuccessful) {
                    showError("서버 통신 오류가 발생했습니다.")
                }
            } catch (e: Exception) {
                showError("네트워크 오류가 발생했습니다.")
            }
        }
    }

    private fun showError(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }

    private fun startRunActivity(deviceToken: String) {
        val intent = Intent(this, MainActivity::class.java)
        intent.putExtra("deviceToken", deviceToken)
        startActivity(intent)
        finish()
    }


}