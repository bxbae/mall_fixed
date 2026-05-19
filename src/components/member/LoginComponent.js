import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { loginPostAsync } from "../../slices/loginSlice";
// import { useNavigate } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import KakaoLoginComponent from "./kakaoLoginComponent";

const initState = {
  email: "",
  pw: "",
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });

  //const navigate = useNavigate();

  const { doLogin, moveToPath } = useCustomLogin();

  //const dispatch = useDispatch();

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;

    setLoginParam({ ...loginParam });
  };

  // const handleClickLogin = (e) => {
  //   dispatch(loginPostAsync(loginParam)) // ← dispatch() 먼저 닫고
  //     .unwrap() // dispatch 반환값에 .unwrap()
  //     .then((data) => {
  //       console.log("after unwrap...");
  //       console.log(data);
  //       if (data.error) {
  //         alert("이메일과 패스워드를 다시 확인하세요");
  //       } else {
  //         alert("로그인 성공");
  //         navigate({ pathname: `/` }, { replace: true });
  //         // moveToPath("/");
  //       }
  //     });
  // };

  const handleClickLogin = (e) => {
    doLogin(loginParam)
      .then((data) => {
        console.log(data);

        if (!data || data.error) {
          // ✅ undefined 체크 추가
          alert("이메일과 패스워드를 다시 확인하세요");
        } else {
          alert("로그인 성공");
          moveToPath("/");
        }
      })
      .catch((err) => {
        // ✅ catch 추가
        console.error(err);
        alert("로그인 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="p-4 m-2 mt-10 border-2 border-sky-200">
      <div className="flex justify-center">
        <div className="p-4 m-4 text-4xl font-extrabold text-blue-500">
          Login Component
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex relative flex-wrap items-stretch mb-4 w-full">
          <div className="p-3 w-full font-bold text-left">Email</div>
          <input
            className="p-3 w-full rounded-r border border-solid shadow-md border-neutral-500"
            name="email"
            type={"text"}
            value={loginParam.email}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex relative flex-wrap items-stretch mb-4 w-full">
          <div className="p-3 w-full font-bold text-left">Password</div>
          <input
            className="p-3 w-full rounded-r border border-solid shadow-md border-neutral-500"
            name="pw"
            type={"password"}
            value={loginParam.pw}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex relative justify-center mb-4 w-full">
          <div className="flex justify-center p-6 w-2/5 font-bold">
            <button
              className="p-4 w-36 text-xl text-white bg-blue-500 rounded"
              onClick={handleClickLogin}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
      <KakaoLoginComponent />
    </div>
  );
};

export default LoginComponent;
