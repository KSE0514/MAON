package com.easter.route.global.utils;

import lombok.extern.slf4j.Slf4j;

import org.bson.json.JsonObject;
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
            con.setRequestMethod("POST");

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
                    address = getFormattedAddress(results);
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

    private static String getFormattedAddress(JSONArray resultsArray) {
        String city = null;
        String district = null;

        for (int i = 0; i < resultsArray.length(); i++) {
            JSONObject resultObject = resultsArray.getJSONObject(i);
            JSONArray addressComponents = resultObject.getJSONArray("address_components");

            for (int j = 0; j < addressComponents.length(); j++) {
                JSONObject componentObject = addressComponents.getJSONObject(j);
                JSONArray typesArray = componentObject.getJSONArray("types");

                for (int k = 0; k < typesArray.length(); k++) {
                    String type = typesArray.getString(k);

                    if (type.equals("administrative_area_level_1")) {
                        city = componentObject.getString("long_name");
                    } else if (type.equals("sublocality_level_1")) {
                        district = componentObject.getString("long_name");
                    }
                }
            }

            // city와 district 값을 모두 찾았다면 루프를 종료합니다.
            if (city != null && district != null) {
                break;
            }
        }

        // city와 district를 합쳐 결과 문자열을 만듭니다.
        String result = (city != null && district != null) ? city + " " + district : "지역 정보가 없습니다.";
        return result;
    }
}
