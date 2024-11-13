FROM node:20.15.0 AS build

WORKDIR /app

# 빌드 성능 향상을 위한 캐시 설정
COPY package*.json ./
RUN npm ci

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

FROM nginx:1.24.0

# nginx 기본 설정 제거 (메인 nginx.conf에서 관리되므로)
# RUN rm /etc/nginx/conf.d/default.conf

# 빌드된 파일을 /web 디렉토리로 복사
COPY --from=build /app/build /usr/share/nginx/html/web

# 컨테이너 헬스체크를 위한 상태 페이지
RUN echo "OK" > /usr/share/nginx/html/health.html

# 80번 포트 노출
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]