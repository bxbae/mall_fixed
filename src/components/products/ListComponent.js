import { useEffect, useState } from "react";
import { getList } from "../../api/productsApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
// import useCustomLogin from "../../hooks/useCustomLogin"; // 무한 로딩 방지를 위해 잠시 비활성화

const host = API_SERVER_HOST;

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  // 로그인 예외 처리 기능은 인증 문제로 무한 로딩이 발생할 수 있으므로 잠시 사용하지 않음
  // const { exceptionHandle } = useCustomLogin();

  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();

  const [serverData, setServerData] = useState(initState);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    getList({ page, size })
      .then((data) => {
        console.log("API 응답:", data);

        setServerData({
          ...initState,
          ...data,
          dtoList: data?.dtoList || [],
        });

        setFetching(false);
      })
      .catch((err) => {
        console.error("상품 목록 조회 오류:", err);

        // 오류가 발생해도 빈 목록으로 초기화
        setServerData(initState);

        // 로딩 모달 종료
        setFetching(false);

        // 인증 예외 처리 제거 (무한 로딩 방지)
        // exceptionHandle(err);
      });
  }, [page, size, refresh]);

  return (
    <div className="mt-10 mr-2 ml-2 border-2 border-blue-100">
      {/* 로딩 중일 때 표시 */}
      {fetching && <FetchingModal />}

      {/* 상품 목록 */}
      <div className="flex flex-wrap p-6 mx-auto">
        {(serverData?.dtoList || []).map((product) => (
          <div
            key={product.pno}
            className="p-1 w-1/2 rounded border-2 shadow-md cursor-pointer"
            onClick={() => moveToRead(product.pno)}
          >
            <div className="flex flex-col h-full">
              {/* 상품 번호 */}
              <div className="p-2 w-full text-2xl font-extrabold">
                {product.pno}
              </div>

              <div className="flex flex-col p-2 m-1 w-full text-1xl">
                {/* 상품 이미지 */}
                <div className="overflow-hidden w-full">
                  <img
                    alt="product"
                    className="m-auto w-60 rounded-md"
                    src={
                      product.uploadFileNames &&
                      product.uploadFileNames.length > 0
                        ? `${host}/api/products/view/s_${product.uploadFileNames[0]}`
                        : "/no-image.png"
                    }
                  />
                </div>

                {/* 상품 정보 */}
                <div className="bottom-0 font-extrabold bg-white">
                  <div className="p-1 text-center">이름: {product.pname}</div>
                  <div className="p-1 text-center">가격: {product.price}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
};

export default ListComponent;
