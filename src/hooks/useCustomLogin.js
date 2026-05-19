import { useDispatch, useSelector } from "react-redux";
import { Navigate, createSearchParams, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";

const useCustomLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const exceptionHandle = (ex) => {
    console.log("Exception------------------------");
    console.log(ex);

    // ✅ 옵셔널 체이닝으로 안전하게 접근
    const errorMsg = ex?.response?.data?.error;

    if (!errorMsg) {
      alert("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    const errorStr = createSearchParams({ error: errorMsg }).toString();

    if (errorMsg === "REQUIRE_LOGIN") {
      alert("로그인 해야만 합니다.");
      navigate({ pathname: "/member/login", search: errorStr });
      return;
    }

    if (errorMsg === "ERROR_ACCESSDENIED") {
      alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.");
      navigate({ pathname: "/member/login", search: errorStr });
      return;
    }
  };

  const loginState = useSelector((state) => state.loginSlice);

  const isLogin = loginState.email ? true : false;

  const doLogin = async (loginParam) => {
    const action = await dispatch(loginPostAsync(loginParam));

    // ✅ 실패 시 error 객체 반환 (undefined 방지)
    if (action.error) {
      return { error: action.error.message || "로그인 실패" };
    }

    return action.payload;
  };

  const doLogout = () => {
    dispatch(logout());
  };

  const moveToPath = (path) => {
    navigate({ pathname: path }, { replace: true });
  };

  const moveToLogin = () => {
    navigate({ pathname: "/member/login" }, { replace: true });
  };

  const moveToLoginReturn = () => {
    return <Navigate replace to="/member/login" />;
  };

  return {
    loginState,
    isLogin,
    doLogin,
    doLogout,
    moveToPath,
    moveToLogin,
    moveToLoginReturn,
    exceptionHandle,
  };
};

export default useCustomLogin;
