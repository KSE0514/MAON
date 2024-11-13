package com.easter.watch.presentation.dataModel

data class RunInfo (
    val latitude: Double, //경도
    val longitude : Double, //위도
    val heartRate : Int, //심박수
    val pace : String, //페이스
    val distance : String, // 뛴거리
    val time : String // 해당 위치에서 경과 시간
)