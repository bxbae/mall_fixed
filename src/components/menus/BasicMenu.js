import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BasicMenu = () => {
  const loginState = useSelector((state) => state.loginSlice);

  return (
    <nav id="navbar" className="flex bg-blue-300">
      <div className="w-4/5 bg-gray-500">
        <ul className="flex p-4 font-bold text-white">
          <li className="pr-6 text-2xl">
            <Link to={"/"}>Main</Link>
          </li>
          <li className="pr-6 text-2xl">
            <Link to={"/about"}>About</Link>
          </li>
          {loginState.email ? ( //로그인한 사용자만 출력되는 메뉴
            <>
              <li className="pr-6 text-2xl">
                <Link to={"/todo/"}>Todo</Link>
              </li>
              <li className="pr-6 text-2xl">
                <Link to={"/products/"}>products</Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>

      <div className="flex justify-end p-4 w-1/5 font-medium bg-orange-300">
        {!loginState.email ? (
          <div className="m-1 text-sm text-white rounded">
            <Link to={"/member/login"}>Login</Link>
          </div>
        ) : (
          <div className="m-1 text-sm text-white rounded">
            <Link to={"/member/logout"}>Logout</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default BasicMenu;
