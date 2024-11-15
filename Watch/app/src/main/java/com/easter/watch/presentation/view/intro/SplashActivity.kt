package com.easter.watch.presentation.view.intro

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.easter.watch.R
import com.easter.watch.presentation.db.MemberDatabase
import com.easter.watch.presentation.db.dao.MemberDao
import com.easter.watch.presentation.view.MemberActivity
import com.easter.watch.presentation.view.run.StartActivity
import com.google.android.gms.wearable.NodeClient
import com.google.android.gms.wearable.Wearable
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class SplashActivity : AppCompatActivity() {

    private lateinit var nodeClient: NodeClient
    private lateinit var intent : Intent
    private lateinit var memberDao: MemberDao

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)

        // 윈도우 배경을 투명하게 설정하여 더 빠른 로딩처럼 보이게 함
        window.setBackgroundDrawable(null)

        // Database 초기화
        val db = MemberDatabase.getDatabase(this)
        memberDao = db.memberDao()

        nodeClient = Wearable.getNodeClient(this)


        Handler().postDelayed(Runnable { // 타이머가 끝나면 내부 실행

            //test용 - 후에 주석 쳐주기
            intent = Intent(this@SplashActivity, StartActivity::class.java) // 앱의 MainActivity로 넘어가기
            startActivity(intent)
            finish()

            var anyMemberExists = false
//            //핸드폰 연결 여부 따른 페이지 이동
//            checkConnectionToPhone{isConnected ->
//                if(isConnected){
//
//                    // 전체 테이블에 memberId가 하나라도 있는지 확인
//                    CoroutineScope(Dispatchers.IO).launch {
//                        anyMemberExists = memberDao.isAnyMemberExists()
//                    }
//                    if(anyMemberExists){ //연동이 되어있다면
//                        intent = Intent(this@SplashActivity,MemberActivity::class.java)
//                    }else{
//                        intent = Intent(this@SplashActivity,AuthActivity::class.java)
//                    }
//                    startActivity(intent)
//                    finish()
//                }else{
//                    intent = Intent(this@SplashActivity,RestartActivity::class.java)
//                    startActivity(intent)
//                    finish() // 현재 액티비티 닫기
//                }
//            }

        }, 2000) // 2초
    }

    //비동기 -> callback
    fun checkConnectionToPhone(callback: (Boolean) -> Unit) {
        nodeClient.connectedNodes.addOnSuccessListener { nodes ->
            if (nodes.isNotEmpty()) {
                Log.d("WatchConnection", "스마트폰과 연결되어 있습니다.")
                callback(true)
            } else {
                Log.d("WatchConnection", "스마트폰과 연결되어 있지 않습니다.")
                callback(false)
            }
        }.addOnFailureListener { e ->
            Log.e("WatchConnection", "연결 확인 중 오류 발생", e)
            callback(false)
        }
    }
}