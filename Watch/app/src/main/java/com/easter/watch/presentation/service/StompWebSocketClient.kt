import android.util.Log
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.WebSocket
import okhttp3.WebSocketListener
import java.util.concurrent.TimeUnit

class StompWebSocketClient() {
    private lateinit var webSocket: WebSocket
    val serverUrl = "wss://k11c207.p.ssafy.io/maon/route/ws/location"
    val TAG = "STOMP"

    fun connect() {
        val okHttpClient = OkHttpClient.Builder()
            .pingInterval(10, TimeUnit.SECONDS)
            .build()
        val request = Request.Builder().url(serverUrl).build()

        webSocket = okHttpClient.newWebSocket(request, object : WebSocketListener() {
            override fun onOpen(webSocket: WebSocket, response: okhttp3.Response) {
                // WebSocket 연결 성공 시 처리
                Log.d(TAG, "웹소켓 연결 완료")
            }

            override fun onFailure(webSocket: WebSocket, t: Throwable, response: okhttp3.Response?) {
                // 연결 실패 시 처리
                Log.d(TAG, "웹소켓 연결 실패")
            }

            override fun onMessage(webSocket: WebSocket, text: String) {
                // 메시지 수신 시 처리
            }
        })
    }

    fun subscribe(topic: String, onMessageReceived: (Any?) -> Unit) {
        webSocket.send("SUBSCRIBE\ndestination:$topic\n\n")
        // 구독 처리 로직
        onMessageReceived(null) // 샘플로 null 전달
    }

    fun send(destination: String, payload: String) {
        webSocket.send("SEND\ndestination:$destination\n\n$payload")
        // 데이터 발행 로직
    }
}