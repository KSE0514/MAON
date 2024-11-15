package com.easter.watch.presentation.dataModel

import com.easter.watch.presentation.dataModel.Enum.Connect
import java.time.LocalDateTime

data class AuthInfo(
    val type: Connect,
    val memberId: String,
    val timestamp: LocalDateTime
)