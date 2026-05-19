import { useState } from "react";
import { postAdd } from "../../api/todoApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  title: "",
  writer: "",
  dueDate: "",
};

const AddComponent = () => {
  const [todo, setTodo] = useState({ ...initState });

  const [result, setResult] = useState(null); //결과 상태

  const { moveToList } = useCustomMove(); //useCustomMove 활용

  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value;

    setTodo({ ...todo });
  };

  const handleClickAdd = () => {
    // console.log(todo);
    postAdd(todo)
      .then((result) => {
        console.log(result);

        setResult(result.TNO); //결과 데이터 변경
        setTodo({ ...initState });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const closeModal = () => {
    setResult(null);
    moveToList(); //moveToList( )호출
  };

  return (
    <div className="p-4 m-2 mt-10 border-2 border-sky-200">
      {/* 모달 처리 */}

      {result ? (
        <ResultModal
          title={"Add Result"}
          content={`New ${result} Added`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      <div className="flex justify-center">
        <div className="flex relative flex-wrap items-stretch mb-4 w-full">
          <div className="p-6 w-1/5 font-bold text-right">TITLE</div>
          <input
            className="p-6 w-4/5 rounded-r border border-solid shadow-md border-neutral-500"
            name="title"
            type={"text"}
            value={todo.title}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex relative flex-wrap items-stretch mb-4 w-full">
          <div className="p-6 w-1/5 font-bold text-right">WRITER</div>
          <input
            className="p-6 w-4/5 rounded-r border border-solid shadow-md border-neutral-500"
            name="writer"
            type={"text"}
            value={todo.writer}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex relative flex-wrap items-stretch mb-4 w-full">
          <div className="p-6 w-1/5 font-bold text-right">DUEDATE</div>
          <input
            className="p-6 w-4/5 rounded-r border border-solid shadow-md border-neutral-500"
            name="dueDate"
            type={"date"}
            value={todo.dueDate}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex relative flex-wrap items-stretch p-4 mb-4">
          <button
            type="button"
            className="p-4 w-36 text-xl text-white bg-blue-500 rounded"
            onClick={handleClickAdd}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;
