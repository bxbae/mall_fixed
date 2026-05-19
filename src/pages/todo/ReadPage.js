import { useParams } from "react-router-dom";
import ReadComponent from "../../components/todo/ReadComponent";

const ReadPage = () => {
  const { tno } = useParams();

  return (
    <div className="mt-6 w-full font-extrabold bg-white">
      <div className="text-2xl">Todo Read Page Component {tno}</div>

      <ReadComponent tno={tno}></ReadComponent>
    </div>
  );
};

export default ReadPage;
