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
        val intent = Intent(this,SplashActivity::class.java)
        if(intent!=null){
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
            startActivity(intent)
            finish()
            Runtime.getRuntime().exit(0)
        }
    }
}