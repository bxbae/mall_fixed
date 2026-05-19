import useCustomLogin from "../../hooks/useCustomLogin";
// import { useDispatch } from "react-redux";
// import { logout } from "../../slices/loginSlice";

const LogoutComponent = () => {
  const { doLogout, moveToPath } = useCustomLogin();
  // const dispatch = useDispatch();

  const handleClickLogout = () => {
    doLogout();
    alert("로그아웃되었습니다.");
    moveToPath("/");
    // dispatch(logout());
  };

  return (
    <div className="p-4 m-2 mt-10 border-2 border-red-200">
      <div className="flex justify-center">
        <div className="p-4 m-4 text-4xl font-extrabold text-red-500">
          Logout Component
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex relative justify-center mb-4 w-full">
          <div className="flex justify-center p-6 w-2/5 font-bold">
            <button
              className="p-4 w-36 text-xl text-white bg-red-500 rounded"
              onClick={handleClickLogout}
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutComponent;
