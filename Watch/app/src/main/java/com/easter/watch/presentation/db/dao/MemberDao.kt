package com.easter.watch.presentation.db.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.easter.watch.presentation.db.entity.Member

@Dao
interface MemberDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertMember(member: Member)

    // 특정 memberId가 존재하는지 확인
    @Query("SELECT EXISTS(SELECT 1 FROM member WHERE memberId = :memberId)")
    suspend fun isMemberExists(memberId: String): Boolean

    // member 테이블에 데이터가 하나라도 존재하는지 확인
    @Query("SELECT EXISTS(SELECT 1 FROM member)")
    suspend fun isAnyMemberExists(): Boolean
}