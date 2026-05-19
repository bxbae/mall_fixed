import { useEffect, useMemo } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
// import { getCartItemsAsync } from "../../slices/cartSlice";
// import { useDispatch, useSelector } from "react-redux";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/CartItemComponent";

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin();

  // const dispatch = useDispatch();

  // const cartItems = useSelector((state) => state.cartSlice);

  const { refreshCart, cartItems, changeCart } = useCustomCart();

  useEffect(() => {
    if (isLogin) {
      refreshCart();
    }
  }, [isLogin]);

  const total = useMemo(() => {
    let total = 0;

    for (const item of cartItems) {
      total += item.price * item.qty;
    }

    return total;
  }, [cartItems]);

  // useEffect(() => {
  //   if (isLogin) {
  //     refreshCart();
  //   }
  // }, [isLogin]);

  return (
    <div className="w-full">
      {isLogin ? (
        <div className="flex flex-col">
          <div className="flex w-full">
            <div className="w-4/5 text-2xl font-extrabold">
              {loginState.nickname}'s Cart
            </div>
            <div className="m-1 w-1/5 font-bold text-center text-white bg-orange-600 rounded-full">
              {cartItems.length}
            </div>
          </div>

          <div>
            <ul>
              {cartItems.map((item) => (
                <CartItemComponent
                  {...item}
                  key={item.cino}
                  changeCart={changeCart}
                  email={loginState.email}
                />
              ))}
            </ul>
          </div>

          <div>
            <div className="text-2xl font-extrabold text-right">
              TOTAL: {total}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartComponent;
