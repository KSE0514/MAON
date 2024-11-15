import android.util.Log
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.serialization.json.Json
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.WebSocket
import okhttp3.WebSocketListener
import java.util.concurrent.TimeUnit

class StompWebSocketClient(private val serverUrl: String) {
    private lateinit var webSocket: WebSocket
    val TAG = "STOMP"
    private var onMessageCallback: ((String) -> Unit)? = null
    private var isStompConnected = false  // STOMP 연결 상태 플래그 추가

    fun connect() {
        val okHttpClient = OkHttpClient.Builder()
            .pingInterval(10, TimeUnit.SECONDS)
            .build()
        val request = Request.Builder().url(serverUrl).build()

        webSocket = okHttpClient.newWebSocket(request, object : WebSocketListener() {
            override fun onOpen(webSocket: WebSocket, response: okhttp3.Response) {
                // WebSocket 연결 성공 시 처리
                Log.d(TAG, "웹소켓 연결 완료")
                // STOMP 연결
                sendStompConnect()
            }

            override fun onFailure(webSocket: WebSocket, t: Throwable, response: okhttp3.Response?) {
                // 연결 실패 시 처리
                Log.d(TAG, "웹소켓 연결 실패")
            }

            override fun onMessage(webSocket: WebSocket, text: String) {
                Log.d(TAG, "메시지 수신: $text")
                if (text.contains("CONNECTED")) {
                    Log.d(TAG, "STOMP 연결 성공")
                    isStompConnected = true  // STOMP 연결 성공 시 플래그 설정
                }else{
                    Log.d(TAG, "일반 메시지 받기")
                }

                // STOMP 메시지에서 JSON 부분만 추출
                //val jsonBody = extractJsonFromStompMessage(text)
                //Log.d(TAG, "추출된 JSON: $jsonBody")
                onMessageCallback?.invoke(text)
            }
        })
    }

    private fun extractJsonFromStompMessage(stompMessage: String): String {
        // 빈 줄을 기준으로 헤더와 바디를 분리
        val parts = stompMessage.split("\n\n")
        return if (parts.size >= 2) {
            parts.last().trim() // 마지막 부분(JSON 바디) 반환
        } else {
            stompMessage // JSON을 찾지 못한 경우 원본 반환
        }
    }

    private fun sendStompConnect() {
        val connectFrame = "CONNECT\naccept-version:1.0,1.1,1.2\nhost:myHost\n\n\u0000"
        webSocket.send(connectFrame)
    }

    fun subscribeToTopic(topic: String, callback: (String) -> Unit) {
        if (!isStompConnected) {
            Log.d(TAG, "STOMP가 아직 연결되지 않았습니다. 구독 대기 중: $topic")
            return
        }

        onMessageCallback = callback
        val subscribeFrame = "SUBSCRIBE\ndestination:$topic\nid:sub-001\n\n\u0000"
        webSocket.send(subscribeFrame)
        Log.d(TAG, "구독 요청 전송: $topic")
    }

    fun sendMessageString(topic: String, message: String) {
        val sendFrame = "SEND\ndestination:$topic\ncontent-type:text/plain\n\n$message\u0000"
        webSocket.send(sendFrame)
        Log.d(TAG, "메시지 전송: $message to $topic")
    }

    fun sendMessageJson(topic:String, message:String){
        val sendFrame = "SEND\ndestination:$topic\ncontent-type:application/json\n\n$message\u0000"
        webSocket.send(sendFrame)
        Log.d(TAG, "메시지 전송: $message to $topic")
    }
}