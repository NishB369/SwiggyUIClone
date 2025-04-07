import React, { useEffect } from "react";
import RestaurantHeader from "../Components/Header/RestaurantHeader";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../utils/cartSlice";
import { Link } from "react-router";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  useEffect(() => console.log(cartItems));

  const dispatch = useDispatch();

  const handleClearBtn = () => {
    dispatch(clearCart());
  };

  const handleRemoveBtn = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <>
      <RestaurantHeader />

      {cartItems.length !== 0 ? (
        <div className="px-60 py-10 mt-20">
          <div className="w-full flex items-center justify-between border-b border-black/25 pb-2 mb-6">
            <div className="font-semibold text-3xl">Your Cart</div>
            <span
              className="bi bi-trash text-2xl -mb-2 cursor-pointer"
              title="Clear Cart"
              onClick={handleClearBtn}
            ></span>
          </div>
          {cartItems.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className="flex items-start justify-between border-b border-black/25 mb-6 pb-6"
            >
              <div className="bg-white w-[500px] h-[550px] border-2 border-black left-32 rounded-xl absolute z-10 hidden flex-col">
                <div className="w-full h-[225px]">
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.imageId}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start w-8/12">
                <div
                  className={`border-2 rounded-lg px-2 text-xs py-1 scale-[0.75] mb-2 ${
                    item.isVeg
                      ? "border-green-600 text-green-600"
                      : "border-red-600 text-red-600"
                  }`}
                >
                  <span
                    className={`${
                      item.isVeg ? "bi bi-circle-fill" : "bi bi-caret-up-fill"
                    }`}
                  ></span>
                </div>
                <div className="font-semibold text-gray-600 text-xl">
                  {item.name}
                </div>
                <div className="font-semibold">
                  ₹ {item.price / 100 || item.defaultPrice / 100}
                </div>
                {item.ratings.aggregatedRating.rating && (
                  <div className="text-sm text-green-800 mt-2">
                    <span className="bi bi-star-fill mr-2"></span>
                    {item.ratings.aggregatedRating.rating}(
                    {item.ratings.aggregatedRating.ratingCountV2})
                  </div>
                )}
                <div className="text-gray-500 mt-2 line-clamp-2">
                  {item.description}
                </div>
              </div>
              <div className="rounded-xl w-[150px] h-[150px] bg-gray-200 relative">
                {item.imageId && (
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.imageId}`}
                    className="rounded-xl w-full h-full object-cover"
                  />
                )}
                <div
                  className="absolute bg-white text-red-600 uppercase shadow-md p-2 px-6 font-semibold -bottom-4 left-4 cursor-pointer rounded-lg hover:bg-gray-100 duration-200 ease-in-out"
                  onClick={() => handleRemoveBtn(item)}
                >
                  remove
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-60 py-10 mt-20 flex flex-col gap-6 items-center">
          <img
            src="https://media0.giphy.com/media/piwLYTTDYHYQzFEySf/200w.gif?cid=6c09b952hs44ny2outacv8yxiqwsh3tymduk5tbeeq2lant3&ep=v1_gifs_search&rid=200w.gif&ct=g"
            className="rounded-lg w-[40%]"
          />
          <Link to="/restaurants">
            <button className="shadow-md font-semibold text-xl bg-orange-400 rounded-lg px-16 py-4 text-white cursor-pointer">
              Explore Restaurants
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
