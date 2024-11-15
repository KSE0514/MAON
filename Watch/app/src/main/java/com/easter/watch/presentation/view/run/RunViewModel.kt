package com.easter.watch.presentation.view.run

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import androidx.core.content.ContentProviderCompat.requireContext
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.easter.watch.presentation.service.LocationTrackingService
import com.google.android.gms.maps.model.LatLng
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*


class RunViewModel : ViewModel() {

    private var tt = 0
    private var total = 0.0  // total 변수도 추가
    private var previousLat: Double? = null
    private var previousLong: Double? = null


    // LiveData 선언
    private val _pace = MutableLiveData<String>()
    val pace: LiveData<String> = _pace

    private val _currentDistance = MutableLiveData<Double>()
    val currentDistance: LiveData<Double> = _currentDistance

    private val _totalDistance = MutableLiveData<Double>()
    val totalDistance: LiveData<Double> = _totalDistance


    init {
        viewModelScope.launch(Dispatchers.Main) {
            _pace.value = "00'00''"
            _totalDistance.value = 0.0
        }
    }

    //---------------

    // 타이머 관련
    private var timerJob: Job? = null
    private var timeInSeconds = 0
    private val _timerText = MutableLiveData("00:00")
    val timerText: LiveData<String> = _timerText

    // 달린 거리 관련
    private val _distance = MutableLiveData(0.0)
    val distance: LiveData<Double> = _distance

    // 심박수 관련
    private val _heartRate = MutableLiveData(0)
    val heartRate: LiveData<Int> = _heartRate

    // 운동 상태
    private val _isRunning = MutableLiveData(false)
    val isRunning: LiveData<Boolean> = _isRunning

    // 트래킹 상태
    private val _isTracking = MutableLiveData(false)
    val isTracking: LiveData<Boolean> = _isTracking

    // 트래킹 일시정지 상태 (내부용으로만 변경 가능)
    private val _isPaused = MutableLiveData(false)
    val isPaused: LiveData<Boolean> = _isPaused

    // 일시정지 상태 설정 메서드
    fun setPausedState(isPaused: Boolean) {
        _isPaused.value = isPaused
    }

    // 타이머 시작
    fun startTimer() {
        if (timerJob == null) {
            _isRunning.value = true
            setPausedState(false)
            timerJob = viewModelScope.launch {
                while (isActive) {
                    delay(1000)
                    timeInSeconds++
                    updateTimerText()
                }
            }
        }
    }

    // 타이머 일시정지
    fun pauseTimer() {
        _isRunning.value = false
        setPausedState(true)
        timerJob?.cancel()
        timerJob = null
    }

    // 타이머 재개
    fun resumeTimer() {
        if (_isPaused.value == true) {
            startTimer()
        }
    }

    // 타이머 정지 (리셋)
    fun stopTimer() {
        pauseTimer()
        timeInSeconds = 0
        _distance.value = 0.0
        _pace.value = "00'00''"
        _heartRate.value = 0
        updateTimerText()
        setPausedState(false)
    }

    // 트래킹 시작
    fun startTracking() {
        _isTracking.value = true
        setPausedState(false)
    }

    // 트래킹 일시정지
    fun pauseTracking() {
        _isPaused.value = true
        setPausedState(true)
    }

    // 트래킹 재개
    fun resumeTracking() {
        _isPaused.value = false
        setPausedState(false)
    }

    // 트래킹 중지
    fun stopTracking() {
        tt=0
        _isTracking.value = false
        setPausedState(false)
    }

    // 타이머 텍스트 업데이트
    private fun updateTimerText() {
        val hours = timeInSeconds / 3600
        val minutes = (timeInSeconds % 3600) / 60
        val seconds = timeInSeconds % 60

        _timerText.value = if (hours > 0) {
            String.format(" %02d:%02d:%02d ", hours, minutes, seconds)
        } else {
            String.format(" %02d:%02d ", minutes, seconds)
        }
    }

    private fun calculatePace(distance: Double, tt: Int) {
        viewModelScope.launch(Dispatchers.Main) {
            if (distance > 0) {
                val paceInSeconds = (tt / distance).toInt()
                val paceMinutes = paceInSeconds / 60
                val paceSeconds = paceInSeconds % 60
                val paceString = String.format("%02d'%02d''", paceMinutes, paceSeconds)

                Log.d("Pace", "Calculating pace - Time: $tt, Distance: $distance")
                Log.d("Pace", "New pace value: $paceString")

                _pace.value = paceString
                Log.d("Pace", "Pace updated in LiveData: ${_pace.value}")
            }
        }
    }

    // 심박수 업데이트
    fun updateHeartRate(heartRate: Int) {
        _heartRate.value = heartRate
    }

    fun updateDistance(newLat: Double, newLong: Double) {
        viewModelScope.launch(Dispatchers.Main) {
            if (previousLat != null && previousLong != null) {
                val distance = calculateDistance(previousLat!!, previousLong!!, newLat, newLong)
                total += distance

                Log.d("Distance", "Current: $distance, Total: $total")

                _currentDistance.value = distance
                _totalDistance.value = total

                Log.d("거리 LiveData", "Total Distance Updated: ${_totalDistance.value}")

                tt++
                calculatePace(total, tt)
            }
            previousLat = newLat
            previousLong = newLong
        }
    }


    // Haversine 공식을 사용한 두 지점 간의 거리 계산 (km 단위)
    private fun calculateDistance(lat1: Double, lon1: Double, lat2: Double, lon2: Double): Double {
        val R = 6371.0 // 지구의 반경 (km)

        val lat1Rad = Math.toRadians(lat1)
        val lat2Rad = Math.toRadians(lat2)
        val latDiff = Math.toRadians(lat2 - lat1)
        val lonDiff = Math.toRadians(lon2 - lon1)

        val a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
                Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2)

        val c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

        return R * c // km 단위로 반환
    }

    // 거리를 소수점 2자리까지 표시하는 헬퍼 함수
    fun formatDistance(distance: Double): String {
        return String.format("%.2f", distance)
    }

}
