# Flow Ext Backend – Skeleton

SQLite 연결 확인부터 차근차근 시작하는 최소 백엔드 스켈레톤입니다.

## 빠른 시작
```bash
# 1) 의존성 설치
npm install

# 2) (선택) 환경변수 파일
cp .env.example .env

# 3) 실행
npm run dev
```

## 연결 확인
```bash
# 서버 살아있는지
curl http://localhost:4000/health

# SQLite 파일/테이블/행수 확인
curl http://localhost:4000/db/ping

# 시드된 고정 확장자 확인
curl http://localhost:4000/extensions/fixed
```
