import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { modifyMember } from "../../api/memberApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import ResultModal from "../common/ResultModal";

const initState = {
  email: "",
  pw: "",
  nickname: "",
};

const ModifyComponent = () => {
  const [member, setMember] = useState(initState);
  const loginInfo = useSelector((state) => state.loginSlice);

  const { moveToLogin, doLogout } = useCustomLogin();

  const [result, setResult] = useState();

  useEffect(() => {
    setMember({ ...loginInfo, pw: "ABCD" });
  }, [loginInfo]);

  const handleChange = (e) => {
    member[e.target.name] = e.target.value;

    setMember({ ...member });
  };

  const handleClickModify = () => {
    modifyMember(member).then((result) => {
      setResult("Modified");
    });
  };

  const closeModal = () => {
    setResult(null);
    doLogout();
    moveToLogin();
  };

  return (
    <div className="mt-6">
      {result ? (
        <ResultModal
          title={"회원정보"}
          content={"정보수정완료"}
          callbackFn={closeModal}
        ></ResultModal>
      ) : (
        <></>
      )}

      <div className="flex justify-center">
        <div className="flex relative flex-wrap items-stretch mb-4 w-full">
          <div className="p-6 w-1/5 font-bold text-right">Email</div>
          <input
            className="p-6 w-4/5 rounded-r border border-solid shadow-md border-neutral-300"
            name="email"
            type={"text"}
            value={member.email}
            readOnly
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex relative flex-wrap items-stretch mb-4 w-full">
          <div className="p-6 w-1/5 font-bold text-right">Password</div>
          <input
            className="p-6 w-4/5 rounded-r border border-solid shadow-md border-neutral-300"
            name="pw"
            type={"password"}
            value={member.pw}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex relative flex-wrap items-stretch mb-4 w-full">
          <div className="p-6 w-1/5 font-bold text-right">Nickname</div>
          <input
            className="p-6 w-4/5 rounded-r border border-solid shadow-md border-neutral-300"
            name="nickname"
            type={"text"}
            value={member.nickname}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex relative flex-wrap justify-end mb-4 w-full">
          <button
            type="button"
            className="p-4 m-2 w-32 text-xl text-white bg-blue-500 rounded"
            onClick={handleClickModify}
          >
            Modify
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyComponent;
