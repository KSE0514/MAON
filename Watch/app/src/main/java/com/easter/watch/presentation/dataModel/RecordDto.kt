package com.easter.watch.presentation.dataModel

import android.os.Parcelable
import androidx.versionedparcelable.VersionedParcelize
import kotlinx.android.parcel.Parcelize
import java.time.LocalDateTime

@Parcelize
data class RecordDto(
    val id: String,
    val routeId: String,
    val paceList: List<String>,
    val distanceList: List<Double>,
    val startPoint: String,
    //val recordedTrack: GeoJsonLineString,
    val runningTime: String,
    val averagePace: String,
    val averageHeartRate: Int,
    val distance: Double,
    val createdAt: String
) : Parcelable
