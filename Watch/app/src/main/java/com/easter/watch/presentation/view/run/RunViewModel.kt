package com.easter.watch.presentation.view.run

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*


class RunViewModel : ViewModel() {
    // 타이머 관련
    private var timerJob: Job? = null
    private var timeInSeconds = 0
    private val _timerText = MutableLiveData("00:00")
    val timerText: LiveData<String> = _timerText

    // 달린 거리 관련
    private val _distance = MutableLiveData(0.0)
    val distance: LiveData<Double> = _distance

    // 페이스 관련
    private val _pace = MutableLiveData("00'00\"")
    val pace: LiveData<String> = _pace

    // 심박수 관련
    private val _heartRate = MutableLiveData(0)
    val heartRate: LiveData<Int> = _heartRate

    // 운동 상태
    private val _isRunning = MutableLiveData(false)
    val isRunning: LiveData<Boolean> = _isRunning

    // 타이머 시작
    fun startTimer() {
        if (timerJob == null) {
            _isRunning.value = true
            timerJob = viewModelScope.launch {
                while (isActive) {
                    delay(1000)
                    timeInSeconds++
                    updateTimerText()
                    calculatePace()
                }
            }
        }
    }

    // 타이머 일시정지
    fun pauseTimer() {
        _isRunning.value = false
        timerJob?.cancel()
        timerJob = null
    }

    // 타이머 정지 (리셋)
    fun stopTimer() {
        pauseTimer()
        timeInSeconds = 0
        _distance.value = 0.0
        _pace.value = "00'00\""
        _heartRate.value = 0
        updateTimerText()
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

    // 거리 업데이트
    fun updateDistance(newDistance: Double) {
        _distance.value = newDistance
        calculatePace()
    }

    // 페이스 계산 (분/km)
    private fun calculatePace() {
        val distanceValue = _distance.value ?: 0.0
        if (distanceValue > 0) {
            val paceInSeconds = (timeInSeconds / distanceValue).toInt()
            val paceMinutes = paceInSeconds / 60
            val paceSeconds = paceInSeconds % 60
            _pace.value = String.format("%02d'%02d\"", paceMinutes, paceSeconds)
        }
    }

    // 심박수 업데이트
    fun updateHeartRate(heartRate: Int) {
        _heartRate.value = heartRate
    }
}