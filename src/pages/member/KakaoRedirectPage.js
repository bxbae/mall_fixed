import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const { moveToPath } = useCustomLogin();
  const dispatch = useDispatch();
  const authCode = searchParams.get("code");

  // React StrictMode 이중 실행 방지
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    getAccessToken(authCode)
      .then((accessToken) => {
        console.log("accessToken:", accessToken);
        return getMemberWithAccessToken(accessToken);
      })
      .then((memberInfo) => {
        console.log("memberInfo:", memberInfo);
        dispatch(login(memberInfo));

        if (memberInfo && memberInfo.social) {
          moveToPath("/member/modify");
        } else {
          moveToPath("/");
        }
      })
      .catch((err) => {
        console.error("카카오 로그인 처리 중 오류 발생:", err);
        alert("카카오 로그인에 실패했습니다. 다시 시도해주세요.");
        moveToPath("/member/login");
      });
    // ✅ 경고 수정: dispatch, moveToPath 의존성 추가
  }, [authCode, dispatch, moveToPath]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div>Kakao Login Redirect...</div>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
