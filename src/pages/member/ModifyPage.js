import ModifyComponent from "../../components/member/ModifyComponent";
import BasicLayout from "../../layouts/BasicLayout";

const ModfyPage = () => {
  return (
    <BasicLayout>
      <div className="text-3xl">Member Modify Page</div>

      <div className="p-2 mt-4 w-full bg-white">
        <ModifyComponent></ModifyComponent>
      </div>
    </BasicLayout>
  );
};

export default ModfyPage;
