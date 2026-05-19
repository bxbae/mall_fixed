import ListComponent from "../../components/products/ListComponent";

const ListPage = () => {
  return (
    <div className="p-4 w-full bg-white">
      {/* 상품 목록 페이지 제목 */}
      <div className="mb-4 text-3xl font-extrabold">
        Product List Page Component
      </div>

      {/* 상품 목록 컴포넌트 */}
      <ListComponent />
    </div>
  );
};

export default ListPage;
