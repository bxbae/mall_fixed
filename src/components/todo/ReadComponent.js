import { useEffect, useState } from "react";
import { getOne } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  tno: 0,
  title: "",
  writer: "",
  dueDate: null,
  complete: false,
};

const ReadComponent = ({ tno }) => {
  const [todo, setTodo] = useState(initState); //아직 todo는 사용하지 않음

  const { moveToList, moveToModify } = useCustomMove();

  useEffect(() => {
    getOne(tno).then((data) => {
      console.log(data);
      setTodo(data);
    });
  }, [tno]);

  return (
    <div className="p-4 m-2 mt-10 border-2 border-sky-200">
      {makeDiv("Tno", todo.tno)}
      {makeDiv("Writer", todo.writer)}
      {makeDiv("Title", todo.title)}
      {makeDiv("Due Date", todo.dueDate)}
      {makeDiv("Complete", todo.complete ? "Completed" : "Not Yet")}

      {/* buttons.........start */}
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="p-4 m-2 w-32 text-xl text-white bg-blue-500 rounded"
          onClick={() => moveToList()}
        >
          List
        </button>

        <button
          type="button"
          className="p-4 m-2 w-32 text-xl text-white bg-red-500 rounded"
          onClick={() => moveToModify(tno)}
        >
          Modify
        </button>
      </div>
    </div>
  );
};

const makeDiv = (title, value) => (
  <div className="flex justify-center">
    <div className="flex relative flex-wrap items-stretch mb-4 w-full">
      <div className="p-6 w-1/5 font-bold text-right">{title}</div>
      <div className="p-6 w-4/5 rounded-r border border-solid shadow-md">
        {value}
      </div>
    </div>
  </div>
);

export default ReadComponent;
