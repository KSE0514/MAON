package com.easter.watch.presentation.view.run

import android.Manifest
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.os.Looper
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.lifecycle.ViewModelProvider
import com.easter.watch.R
import com.easter.watch.databinding.FragmentRun3Binding
import com.easter.watch.presentation.service.LocationTrackingService
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationResult
import com.google.android.gms.location.LocationServices
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.MapView
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.google.android.gms.maps.model.Polyline
import com.google.android.gms.maps.model.PolylineOptions

class RunFragment3 : Fragment(), OnMapReadyCallback {

    private var mMap: GoogleMap? = null
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var runViewModel: RunViewModel
    private val LOCATION_PERMISSION_REQUEST = 1

    // 경로 추적 관련 변수
    private val locationList = mutableListOf<LatLng>()
    private var polyline: Polyline? = null

    private val locationReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            if (intent?.action == LocationTrackingService.ACTION_UPDATE_LOCATION) {
                val latitude = intent.getDoubleExtra("latitude", 0.0)
                val longitude = intent.getDoubleExtra("longitude", 0.0)
                val currentLatLng = LatLng(latitude, longitude)
                updateMapLocation(currentLatLng)
            }
        }
    }

    // 위치 업데이트 요청 설정
    private val locationRequest = LocationRequest.create().apply {
        priority = LocationRequest.PRIORITY_HIGH_ACCURACY
        interval = 1000
        fastestInterval = 500
    }

    // 위치 콜백
    private val locationCallback = object : LocationCallback() {
        override fun onLocationResult(locationResult: LocationResult) {
            for (location in locationResult.locations) {
                val currentLatLng = LatLng(location.latitude, location.longitude)
                updateMapLocation(currentLatLng)

                // 트래킹 중일 때만 경로 추가
                if (runViewModel.isTracking.value == true) {
                    locationList.add(currentLatLng)
                    updatePolyline()
                }
            }
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_run3, container, false)

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(requireActivity())

        // ViewModel 초기화
        runViewModel = ViewModelProvider(requireActivity()).get(RunViewModel::class.java)

        val mapFragment = childFragmentManager.findFragmentById(R.id.mapView) as SupportMapFragment?
        mapFragment?.getMapAsync(this)

        checkLocationPermission()

        // 위치 업데이트 수신을 위한 브로드캐스트 리시버 등록
        requireActivity().registerReceiver(
            locationReceiver,
            IntentFilter(LocationTrackingService.ACTION_UPDATE_LOCATION),
            Context.RECEIVER_NOT_EXPORTED
        )

        // 트래킹 상태를 관찰하여 시작 또는 중지
        observeTrackingState()

        return view
    }

    private fun observeTrackingState() {
        runViewModel.isTracking.observe(viewLifecycleOwner) { isTracking ->
            if (isTracking) {
                startTracking()
            } else {
                stopTracking()
            }
        }
    }


    private fun startTracking() {
        locationList.clear()
        polyline?.remove()

        val intent = Intent(requireContext(), LocationTrackingService::class.java).apply {
            action = LocationTrackingService.ACTION_START_TRACKING
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            requireActivity().startForegroundService(intent)
        } else {
            requireActivity().startService(intent)
        }
    }

    private fun stopTracking() {

        val intent = Intent(requireContext(), LocationTrackingService::class.java).apply {
            action = LocationTrackingService.ACTION_STOP_TRACKING
        }
        requireActivity().startService(intent)
    }

    private fun updatePolyline() {
        polyline?.remove()
        polyline = mMap?.addPolyline(
            PolylineOptions()
                .addAll(locationList)
                .color(ContextCompat.getColor(requireContext(), R.color.red))
                .width(7f)
        )
    }

    private fun checkLocationPermission() {
        if (ContextCompat.checkSelfPermission(
                requireContext(),
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            requestPermissions(
                arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
                LOCATION_PERMISSION_REQUEST
            )
        } else {
            startLocationUpdates()
        }
    }

    private fun startLocationUpdates() {
        if (ActivityCompat.checkSelfPermission(
                requireContext(),
                Manifest.permission.ACCESS_FINE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED
        ) {
            fusedLocationClient.requestLocationUpdates(
                locationRequest,
                locationCallback,
                Looper.getMainLooper()
            )
        }
    }

    private fun stopLocationUpdates() {
        fusedLocationClient.removeLocationUpdates(locationCallback)
    }

    private fun updateMapLocation(currentLatLng: LatLng) {
        mMap?.let { map ->
            val markerOptions = MarkerOptions()
                .position(currentLatLng)
                .title("현재 위치")

            map.clear()
            map.addMarker(markerOptions)

            if (runViewModel.isTracking.value == true) {
                updatePolyline()
            }

            map.moveCamera(CameraUpdateFactory.newLatLngZoom(currentLatLng, 18f))
        }
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap

        if (ContextCompat.checkSelfPermission(
                requireContext(),
                Manifest.permission.ACCESS_FINE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED
        ) {
            mMap?.isMyLocationEnabled = true
            mMap?.uiSettings?.isMyLocationButtonEnabled = true
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        when (requestCode) {
            LOCATION_PERMISSION_REQUEST -> {
                if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    startLocationUpdates()
                }
            }
        }
    }

    override fun onResume() {
        super.onResume()
        startLocationUpdates()
    }

    override fun onPause() {
        super.onPause()
        stopLocationUpdates()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        requireActivity().unregisterReceiver(locationReceiver)
    }
}
