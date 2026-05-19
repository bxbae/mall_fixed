import { API_SERVER_HOST } from "../../api/todoApi";

const host = API_SERVER_HOST;

const CartItemComponent = ({
  cino,
  pname,
  price,
  pno,
  qty,
  imageFile,
  changeCart,
  email,
}) => {
  const handleClickQty = (amount) => {
    changeCart({ email, cino, pno, qty: qty + amount });
  };

  return (
    <li key={cino} className="border-2">
      <div className="w-full border-2">
        <div className="p-1 m-1">
          <img src={`${host}/api/products/view/s_${imageFile}`} />
        </div>

        <div className="justify-center p-2 text-xl">
          <div className="justify-end w-full"></div>
          <div>Cart Item No: {cino}</div>
          <div>Pno: {pno}</div>
          <div>Name: {pname}</div>
          <div>Price: {price}</div>
          <div className="flex">
            <div className="w-2/3">Qty: {qty}</div>
            <div>
              <button
                className="p-1 m-1 w-8 text-2xl bg-orange-500 rounded-lg"
                onClick={() => handleClickQty(1)}
              >
                +
              </button>
              <button
                className="p-1 m-1 w-8 text-2xl bg-orange-500 rounded-lg"
                onClick={() => handleClickQty(-1)}
              >
                -
              </button>
            </div>
          </div>
          <div>
            <div className="flex justify-center p-2 font-bold text-white">
              <button
                className="p-1 m-1 w-8 text-xl text-white bg-red-500 rounded-lg"
                onClick={() => handleClickQty(-1 * qty)}
              >
                X
              </button>
            </div>
            <div className="pr-4 m-2 font-extrabold text-right border-t-2">
              {qty * price} 원
            </div>
          </div>
        </div>
      </div>
    </li>
    // <>
    //   <div>
    //     {cino} -- {pname}{" "}
    //   </div>
    // </>
  );
};

export default CartItemComponent;
