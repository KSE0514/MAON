package com.easter.watch.presentation.dataModel

import kotlinx.serialization.Serializable

@Serializable
data class MemberInfo (
    val uuid:String,
    val name : String
)