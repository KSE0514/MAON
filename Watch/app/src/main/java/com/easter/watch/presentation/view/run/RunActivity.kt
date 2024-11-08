package com.easter.watch.presentation.view.run

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.view.MotionEvent
import android.view.WindowManager
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.databinding.DataBindingUtil.setContentView
import androidx.viewpager2.widget.ViewPager2
import androidx.wear.ambient.AmbientModeSupport
import androidx.wear.widget.SwipeDismissFrameLayout
import androidx.wear.widget.drawer.WearableDrawerLayout
import com.easter.watch.R
import com.easter.watch.presentation.view.adapter.ScreenSlidePagerAdapter

class RunActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_run)

        // 위치 권한 체크 및 요청
        checkLocationPermissions()

        // ViewPager2와 어댑터 설정
        val viewPager: ViewPager2 = findViewById(R.id.viewPager)
        val pagerAdapter = ScreenSlidePagerAdapter(this)
        viewPager.adapter = pagerAdapter

        // 페이지 캐싱 설정 - 맵 fragment의 상태 유지를 위해
        viewPager.offscreenPageLimit = 2

        // 기본 페이지를 가운데 Fragment(1번 인덱스)로 설정
        viewPager.currentItem = 1
    }

    private fun checkLocationPermissions() {
        if (ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(
                    Manifest.permission.ACCESS_FINE_LOCATION,
                    Manifest.permission.ACCESS_COARSE_LOCATION
                ),
                LOCATION_PERMISSION_REQUEST_CODE
            )
        }
    }

    companion object {
        private const val LOCATION_PERMISSION_REQUEST_CODE = 1000
    }

    // 권한 요청 결과 처리
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        when (requestCode) {
            LOCATION_PERMISSION_REQUEST_CODE -> {
                if (grantResults.isNotEmpty() &&
                    grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    // 권한이 승인된 경우 맵 관련 초기화 작업
                } else {
                    // 권한이 거부된 경우 처리
                    Toast.makeText(
                        this,
                        "위치 권한이 필요합니다",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
        }
    }
}