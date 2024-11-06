package com.easter.watch.presentation

import android.content.Context
import android.content.Intent
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.databinding.DataBindingUtil
import com.easter.watch.R
import com.easter.watch.databinding.ActivityRestartBinding

class RestartActivity : AppCompatActivity() {

    private lateinit var binding : ActivityRestartBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_restart)

        binding = DataBindingUtil.setContentView(this,R.layout.activity_restart)
        binding.restartBtn.setOnClickListener {
            restartApp()
        }

    }

    fun restartApp(){
        val intent = Intent(this, SplashActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
        startActivity(intent)

        // 선택적으로 애니메이션 제거
        overridePendingTransition(0, 0)
        finish()
    }
}