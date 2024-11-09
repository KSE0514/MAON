package com.easter.watch.presentation.view.run

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import com.easter.watch.R
import com.easter.watch.databinding.FragmentRun3Binding
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.MapView
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions

class RunFragment3 : Fragment(), OnMapReadyCallback {

    private var _binding: FragmentRun3Binding? = null
    private val binding get() = _binding!!
    private lateinit var mapView: MapView
    private var googleMap: GoogleMap? = null

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

        // MapView 초기화
        mapView = binding.mapView.apply {
            onCreate(savedInstanceState)
            getMapAsync(this@RunFragment3)
        }
    }

    override fun onMapReady(map: GoogleMap) {
        googleMap = map

        try {
            // 초기 카메라 위치 설정 (예: 서울)
            val seoul = LatLng(37.5665, 126.9780)
            googleMap?.moveCamera(CameraUpdateFactory.newLatLngZoom(seoul, 18f))

            googleMap?.animateCamera(CameraUpdateFactory.newLatLngZoom(seoul,18f))

            // 기본 설정
            googleMap?.apply {
                uiSettings.isZoomControlsEnabled = true
                uiSettings.isMyLocationButtonEnabled = true

                // 위치 권한이 있다면 현재 위치 활성화
                if (ContextCompat.checkSelfPermission(
                        requireContext(),
                        Manifest.permission.ACCESS_FINE_LOCATION
                    ) == PackageManager.PERMISSION_GRANTED
                ) {
                    isMyLocationEnabled = true
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    // MapView 생명주기 관리
    override fun onStart() {
        super.onStart()
        mapView.onStart()
    }

    override fun onResume() {
        super.onResume()
        mapView.onResume()
    }

    override fun onPause() {
        super.onPause()
        mapView.onPause()
    }

    override fun onStop() {
        super.onStop()
        mapView.onStop()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        mapView.onDestroy()
        _binding = null
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        mapView.onSaveInstanceState(outState)
    }

    override fun onLowMemory() {
        super.onLowMemory()
        mapView.onLowMemory()
    }
}