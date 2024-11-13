package com.easter.watch.presentation.service

import android.util.Log
import okhttp3.*
import java.util.concurrent.TimeUnit

class WebSocketClient(private val serverUrl: String) {

    private val client: OkHttpClient
    private var webSocket: WebSocket? = null

    init {
        client = OkHttpClient.Builder()
            .connectTimeout(10, TimeUnit.SECONDS)
            .build()
    }

    fun connect(token: String) {
        val request = Request.Builder().url(serverUrl).build()

        webSocket = client.newWebSocket(request, object : WebSocketListener() {
            override fun onOpen(webSocket: WebSocket, response: Response) {
                // STOMP 연결 초기화
                val connectMessage = "CONNECT\naccept-version:1.2\n\n\u0000"
                webSocket.send(connectMessage)
                Log.d("WebSocket", "websocket 연결")
            }

            override fun onMessage(webSocket: WebSocket, text: String) {
                // 서버로부터 메시지 수신 시
                println("서버로부터 메시지 수신: $text")
            }

            override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
                println("WebSocket 연결 실패: ${t.message}")
            }
        })

        // 연결이 완료된 후에 토큰을 서버로 전송
        sendToken(token)
    }

    private fun sendToken(token: String) {
        // 토큰 전송 메시지 작성 (STOMP 형식)
        val message = "SEND\ndestination:/topic/token\ncontent-type:text/plain\n\n$token\u0000"
        webSocket?.send(message)
    }

    fun disconnect() {
        webSocket?.close(1000, "연결 종료")
        client.dispatcher.executorService.shutdown()
    }
}
