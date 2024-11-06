package com.easter.watch.presentation

import android.app.ProgressDialog.show
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.util.Log
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.easter.watch.R
import com.google.android.gms.wearable.NodeClient
import com.google.android.gms.wearable.Wearable

class SplashActivity : AppCompatActivity() {

    private lateinit var nodeClient: NodeClient
    private lateinit var intent : Intent

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)

        nodeClient = Wearable.getNodeClient(this)


        if(checkConnectionToPhone()){ //핸드폰과 연결 성공
            Handler().postDelayed(Runnable { // 타이머가 끝나면 내부 실행
                intent = Intent(this@SplashActivity,MainActivity::class.java) // 앱의 MainActivity로 넘어가기
                startActivity(intent)
                finish() // 현재 액티비티 닫기
            }, 2000) // 2초
            //앱 간 페어링 확인

        }else{ //핸드폰과 연결 실패
            //연결 확인 요청
            intent = Intent(this@SplashActivity,RestartActivity::class.java) // 앱의 MainActivity로 넘어가기
            startActivity(intent)

        }
    }

    fun checkConnectionToPhone() : Boolean {
        var flag : Boolean = false
        nodeClient.connectedNodes.addOnSuccessListener { nodes ->
            if (nodes.isNotEmpty()) {
                Log.d("WatchConnection", "스마트폰과 연결되어 있습니다.")
                flag = true
            } else {
                Log.d("WatchConnection", "스마트폰과 연결되어 있지 않습니다.")
            }
        }.addOnFailureListener { e ->
            Log.e("WatchConnection", "연결 확인 중 오류 발생", e)
        }
        return flag
    }
}