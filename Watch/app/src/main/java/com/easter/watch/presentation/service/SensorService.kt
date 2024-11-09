//package com.easter.watch.presentation.service
//
//import android.Manifest
//import android.app.Service
//import android.content.Intent
//import android.content.pm.PackageManager
//import android.hardware.Sensor
//import android.hardware.SensorEvent
//import android.hardware.SensorEventListener
//import android.hardware.SensorManager
//import android.os.Binder
//import android.os.IBinder
//import androidx.core.app.ActivityCompat.requestPermissions
//
//class SensorService : Service(),SensorEventListener {
//
//    private lateinit var sensorManager: SensorManager
//    private lateinit var heartRateSensor: Sensor
//
//    private val binder = LocalBinder()
//    private val callbacks = mutableListOf<SensorCallback>()
//
//    inner class LocalBinder : Binder() {
//        fun getService(): SensorService = this@SensorService
//    }
//
//    interface SensorCallback {
//        fun onHeartRateChanged(value: Int)
//    }
//
//    override fun onBind(p0: Intent?): IBinder? {
//        return binder
//    }
//
//    override fun onCreate() {
//        super.onCreate()
//        sensorManager = getSystemService(SENSOR_SERVICE) as SensorManager
//        heartRateSensor = sensorManager.getDefaultSensor(Sensor.TYPE_HEART_RATE)!!
//    }
//
//    fun startSensorUpdates() {
//        if (checkPermissions()) {
//            sensorManager.registerListener(this, heartRateSensor, SensorManager.SENSOR_DELAY_NORMAL)
//        } else {
//            requestPermissions()
//        }
//    }
//
//    fun stopSensorUpdates() {
//        sensorManager.unregisterListener(this)
//    }
//
//    private fun checkPermissions(): Boolean {
//        return checkSelfPermission(Manifest.permission.BODY_SENSORS) == PackageManager.PERMISSION_GRANTED
//    }
//
//    private fun requestPermissions() {
//        // Permission should be requested from Activity
//        // Service will notify activity through callback
//        callbacks.forEach { it.onPermissionRequired() }
//    }
//
//    fun registerCallback(callback: SensorCallback) {
//        callbacks.add(callback)
//    }
//
//    fun unregisterCallback(callback: SensorCallback) {
//        callbacks.remove(callback)
//    }
//
//
//    override fun onSensorChanged(event: SensorEvent?) {
//        event?.let {
//            when (it.sensor.type) {
//                Sensor.TYPE_HEART_RATE -> {
//                    val heartRate = it.values[0].toInt()
//                    callbacks.forEach { callback ->
//                        callback.onHeartRateChanged(heartRate)
//                    }
//                }
//            }
//        }
//    }
//
//    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
//        // Handle accuracy changes if needed
//    }
//
//}