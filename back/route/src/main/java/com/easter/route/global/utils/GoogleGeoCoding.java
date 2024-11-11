package com.easter.route.global.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import org.json.JSONArray;
import org.json.JSONObject;

@Slf4j
public class GoogleGeoCoding {

    @Value("${google.api.key}")
    private static String API_KEY;

    public static String getAddress(double latitude, double longitude) {
        String address = "";
        try {
            String url = String.format(
                    "https://maps.googleapis.com/maps/api/geocode/json?latlng=%f,%f&language=ko&key=%s",
                    latitude, longitude, API_KEY
            );

            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("GET");

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
                String inputLine;
                StringBuilder response = new StringBuilder();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();

                JSONObject jsonObject = new JSONObject(response.toString());
                JSONArray results = jsonObject.getJSONArray("results");

                if (!results.isEmpty()) {
                    address = results.getJSONObject(0).getString("formatted_address");
                } else {
                    address = "주소를 찾을 수 없습니다.";
                }
            } else {
                address = "API 요청 실패: 응답 코드 " + responseCode;
            }
        } catch (Exception e) {
            log.error("Failed to get address: {}", e.getMessage());
            address = "오류 발생: " + e.getMessage();
        }
        return address;
    }
}
