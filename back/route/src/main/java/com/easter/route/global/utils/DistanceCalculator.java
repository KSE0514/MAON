package com.easter.route.global.utils;

public class DistanceCalculator {
    private static final double EARTH_RADIUS = 6371000;

    // 위도 경도 좌표 2개를 받아 두 지점 간의 거리가 k 이내인지 확인하는 메소드
    public static boolean isWithinDistance(double xLat, double xLon, double yLat, double yLon, double k) {
        double distance = calculateDistance(xLat, xLon, yLat, yLon);
        return distance <= k;
    }

    // Haversine 공식을 사용하여 두 지점 간의 거리 계산 (미터 단위로 반환)
    private static double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS * c;
    }
}
