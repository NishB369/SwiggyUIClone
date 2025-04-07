import React from "react";

const RestaurantCard1 = ({
  imgId,
  discount,
  name,
  rating,
  time,
  cusine,
  location,
}) => {
  return (
    <div className="w-[250px] flex-shrink-0 cursor-pointer hover:scale-[0.9] duration-300 ease-in-out">
      <div className="h-[175px] w-full relative shadow-md">
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${imgId}`}
          className="rounded-xl object-cover h-full w-full border"
        />
        {discount && (
          <div className="absolute bg-black/75 text-white bottom-0 w-full rounded-b-xl pl-4 py-2 font-semibold uppercase">
            {discount}
          </div>
        )}
      </div>
      <div className="w-full px-2 mt-3">
        <div className="w-full font-semibold text-gray-900 tracking-tight">
          {name}
        </div>
        <div className="w-full flex items-center">
          <span className="bi bi-star-fill text-white bg-green-700 rounded-full text-xs py-[2px] px-[4px] mr-1 scale-[0.8]"></span>
          {rating} • {time}
        </div>
        <div className="w-full line-clamp-1 text-gray-500">
          {cusine.join(", ")}
        </div>
        <div className="w-full text-gray-500">{location}</div>
      </div>
    </div>
  );
};

export default RestaurantCard1;
