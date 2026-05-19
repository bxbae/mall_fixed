import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

// ======================================================
// 카카오 REST API 설정
// ======================================================
// 카카오 Developers > 앱 설정 > 앱 > 플랫폼 키 > REST API 키
const REST_API_KEY = "5ac998210ab6a06be8c6a991bd35eb92";

// 카카오 Developers > 플랫폼 키 수정 > 클라이언트 시크릿 (재발급 2026-05-18)
const CLIENT_SECRET = "Kh7vpHrBi49I226VkBRHeurCXqsM8sT2";

// 카카오 로그인 Redirect URI
const REDIRECT_URI = "http://localhost:3000/member/kakao";

// 카카오 인증 URL
const AUTH_CODE_URL = "https://kauth.kakao.com/oauth/authorize";

// 카카오 토큰 발급 URL
const ACCESS_TOKEN_URL = "https://kauth.kakao.com/oauth/token";

// ======================================================
// 카카오 로그인 링크 생성
// ======================================================
export const getKakaoLoginLink = () => {
  return (
    `${AUTH_CODE_URL}` +
    `?client_id=${REST_API_KEY}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=code`
  );
};

// ======================================================
// 인가 코드(code)로 Access Token 발급
// ======================================================
export const getAccessToken = async (authCode) => {
  const headers = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", REST_API_KEY);
  params.append("redirect_uri", REDIRECT_URI);
  params.append("code", authCode);
  params.append("client_secret", CLIENT_SECRET);

  const res = await axios.post(ACCESS_TOKEN_URL, params, headers);

  return res.data.access_token;
};

// ======================================================
// Access Token으로 백엔드 로그인 요청
// GET http://localhost:8080/api/member/kakao?accessToken=...
// ======================================================
export const getMemberWithAccessToken = async (accessToken) => {
  const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao`, {
    params: {
      accessToken: accessToken,
    },
  });

  return res.data;
};
