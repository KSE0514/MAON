package com.easter.watch.presentation.view.run

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import android.view.MotionEvent
import android.view.WindowManager
import android.view.animation.AnimationUtils
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContentProviderCompat.requireContext
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.isInvisible
import androidx.databinding.DataBindingUtil.setContentView
import androidx.viewpager2.widget.ViewPager2
import androidx.wear.ambient.AmbientModeSupport
import androidx.wear.widget.SwipeDismissFrameLayout
import androidx.wear.widget.drawer.WearableDrawerLayout
import com.easter.watch.R
import com.easter.watch.databinding.ActivityAuthBinding
import com.easter.watch.databinding.ActivityRestartBinding
import com.easter.watch.databinding.ActivityRunBinding
import com.easter.watch.presentation.view.adapter.ScreenSlidePagerAdapter

class RunActivity : AppCompatActivity() {

    val TAG : String = "RunActivity"
    private lateinit var binding : ActivityRunBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRunBinding.inflate(layoutInflater)
        setContentView(binding.root)

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

        val pulseAnimation = AnimationUtils.loadAnimation(this@RunActivity, R.anim.pulse_animation)
        binding.heartImg.startAnimation(pulseAnimation) // Fragment가 보일 때마다 애니메이션 재적용


        // 페이지 변경 시 색상 업데이트
        viewPager.registerOnPageChangeCallback(object : ViewPager2.OnPageChangeCallback() {
            override fun onPageSelected(position: Int) {
                super.onPageSelected(position)

                if(position == 0){
                    binding.runtimeText.isInvisible = false
                    binding.runTime.isInvisible = false
                    binding.clockText.setTextColor(ContextCompat.getColor(this@RunActivity,R.color.light_beige))
                    binding.page1.setImageDrawable(ContextCompat.getDrawable(this@RunActivity,R.drawable.round_selected_page))
                    binding.page2.setImageDrawable(ContextCompat.getDrawable(this@RunActivity,R.drawable.round_not_selected_page))
                    binding.page3.setImageDrawable(ContextCompat.getDrawable(this@RunActivity,R.drawable.round_not_selected_page))
                    binding.heartText.setTextColor(ContextCompat.getColor(this@RunActivity,R.color.white))

                }else if(position ==1){
                    binding.runtimeText.isInvisible = false
                    binding.runTime.isInvisible = false
                    binding.clockText.setTextColor(ContextCompat.getColor(this@RunActivity,R.color.light_beige))
                    binding.page1.setImageDrawable(ContextCompat.getDrawable(this@RunActivity,R.drawable.round_not_selected_page))
                    binding.page2.setImageDrawable(ContextCompat.getDrawable(this@RunActivity,R.drawable.round_selected_page))
                    binding.page3.setImageDrawable(ContextCompat.getDrawable(this@RunActivity,R.drawable.round_not_selected_page))
                    binding.heartText.setTextColor(ContextCompat.getColor(this@RunActivity,R.color.white))

                }else{
                    binding.runtimeText.isInvisible = true
                    binding.runTime.isInvisible = true
                    binding.clockText.setTextColor(ContextCompat.getColor(this@RunActivity,R.color.real_black))
                    binding.page1.setImageDrawable(ContextCompat.getDrawable(this@RunActivity,R.drawable.round_not_selected_page))
                    binding.page2.setImageDrawable(ContextCompat.getDrawable(this@RunActivity,R.drawable.round_not_selected_page))
                    binding.page3.setImageDrawable(ContextCompat.getDrawable(this@RunActivity,R.drawable.round_selected_page))
                    binding.heartText.setTextColor(ContextCompat.getColor(this@RunActivity,R.color.real_black))
                }


            }
        })
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