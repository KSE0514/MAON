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
import androidx.fragment.app.activityViewModels
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
    private var _binding: FragmentRun3Binding? = null
    private val binding get() = _binding!!

    private val viewModel: RunViewModel by activityViewModels()
    private var mMap: GoogleMap? = null
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private val LOCATION_PERMISSION_REQUEST = 1

    // 경로 추적 관련 변수
    private val locationList = mutableListOf<LatLng>()
    private var polyline: Polyline? = null

    // Location Service 관련 Intent
    private val serviceIntent by lazy {
        Intent(requireContext(), LocationTrackingService::class.java)
    }

    // Location Updates Receiver
    private val locationReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            if (intent?.action == LocationTrackingService.ACTION_UPDATE_LOCATION) {
                val latitude = intent.getDoubleExtra("latitude", 0.0)
                val longitude = intent.getDoubleExtra("longitude", 0.0)
                val currentLatLng = LatLng(latitude, longitude)

                // 위치 업데이트 및 경로 추가
                updateMapLocation(currentLatLng)
                if (viewModel.isTracking.value == true && viewModel.isPaused.value == false) {
                    locationList.add(currentLatLng)
                    updatePolyline()
                }
            }
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentRun3Binding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(requireActivity())

        // 지도 초기화
        val mapFragment = childFragmentManager.findFragmentById(R.id.map) as SupportMapFragment?
        mapFragment?.getMapAsync(this)

        setupObservers()

        // 위치 권한 확인
        checkLocationPermission()

        // BroadcastReceiver 등록
        requireActivity().registerReceiver(
            locationReceiver,
            IntentFilter(LocationTrackingService.ACTION_UPDATE_LOCATION),
            Context.RECEIVER_NOT_EXPORTED
        )
    }

    private fun setupObservers() {
        viewModel.isTracking.observe(viewLifecycleOwner) { isTracking ->
            if (isTracking) {
                if (viewModel.isPaused.value == true) {
                    resumeTracking()
                } else {
                    startTracking()
                }
            } else {
                stopTracking()
            }
        }
    }

    private fun startTracking() {
        if (viewModel.isPaused.value == true) {
            resumeTracking()
            return
        }

        locationList.clear()
        polyline?.remove()

        serviceIntent.action = LocationTrackingService.ACTION_START_TRACKING
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            requireContext().startForegroundService(serviceIntent)
        } else {
            requireContext().startService(serviceIntent)
        }
    }

    private fun stopTracking() {
        serviceIntent.action = LocationTrackingService.ACTION_STOP_TRACKING
        requireContext().startService(serviceIntent)
    }

    private fun pauseTracking() {
        stopLocationUpdates()
    }

    private fun resumeTracking() {
        startLocationUpdates()
    }


    // 위치 업데이트 시작
    private fun startLocationUpdates() {
        // 위치 권한 확인
        checkLocationPermission()

        fusedLocationClient.requestLocationUpdates(
            LocationRequest.create().apply {
                priority = LocationRequest.PRIORITY_BALANCED_POWER_ACCURACY
                interval = 1000
                fastestInterval = 500
            },
            locationCallback,
            Looper.getMainLooper()
        )
    }

    // 위치 업데이트 중지
    private fun stopLocationUpdates() {
        fusedLocationClient.removeLocationUpdates(locationCallback)
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

    // 위치 콜백
    private val locationCallback = object : LocationCallback() {
        override fun onLocationResult(locationResult: LocationResult) {
            for (location in locationResult.locations) {
                val currentLatLng = LatLng(location.latitude, location.longitude)
                if (viewModel.isTracking.value == true && viewModel.isPaused.value == false) {
                    locationList.add(currentLatLng)
                    updateMapLocation(currentLatLng)
                }
            }
        }
    }

    private fun updateMapLocation(currentLatLng: LatLng) {
        mMap?.let { map ->
            if (viewModel.isTracking.value == true && viewModel.isPaused.value == false) {
                updatePolyline()
            }
            map.animateCamera(CameraUpdateFactory.newLatLngZoom(currentLatLng, 18f))
        }
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
            enableMyLocation()
        }
    }

    private fun enableMyLocation() {
        if (ContextCompat.checkSelfPermission(
                requireContext(),
                Manifest.permission.ACCESS_FINE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED
        ) {
            mMap?.isMyLocationEnabled = true
            mMap?.uiSettings?.isMyLocationButtonEnabled = true
        }
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap
        enableMyLocation()
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
    ) {
        when (requestCode) {
            LOCATION_PERMISSION_REQUEST -> {
                if (grantResults.isNotEmpty() &&
                    grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    enableMyLocation()
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        try {
            requireActivity().unregisterReceiver(locationReceiver)
        } catch (e: IllegalArgumentException) {
        }
        _binding = null
    }
}
