# 파일 확장자 차단 – 프론트 (React + Vite)

백엔드 API와 연동되는 최소 구현 프론트입니다.

## 빠른 시작
```bash
# 1) 의존성 설치
npm install

# 2) API 주소 설정 (선택)
cp .env.example .env
# .env 파일에서 VITE_API_BASE를 백엔드 주소로 설정
# 기본값: http://localhost:4000

# 3) 개발 서버 실행
npm run dev
# → http://localhost:5173
```

### 기능
- 고정 확장자 체크/해제 (DB 저장/유지)
- 커스텀 확장자 추가/삭제 (≤20자, 최대 200개, 중복 방지)
- 파일 업로드 데모 (서버 단 차단 여부 메시지 표시)

### 주의
- 이 프론트는 API 서버가 필요합니다. 기본 주소는 `http://localhost:4000` 입니다.
- 백엔드 없이 실행하면 목록/저장 요청이 실패합니다.
