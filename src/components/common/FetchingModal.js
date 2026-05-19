const FetchingModal = () => {
  return (
    <div
      className={`flex fixed top-0 left-0 justify-center place-items-center w-full h-full bg-black bg-opacity-20 z-[1055]`}
    >
      <div className=" bg-white rounded-3xl opacity-100 min-w-min h-1/4  min-w-[600px] flex justify-center items-center ">
        <div className="m-20 text-4xl font-extrabold text-orange-400">
          Loading.....
        </div>
      </div>
    </div>
  );
};

export default FetchingModal;
