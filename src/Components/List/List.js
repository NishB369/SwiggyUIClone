import React, { useState } from "react";

const List = ({ data, btnNeeded }) => {
  const [clicked, setClicked] = useState(false);
  const toggleClick = () => {
    return setClicked(!clicked);
  };

  let cardsToShow = clicked ? data.card.card.brands.length : 12;

  return (
    <div className="flex flex-col gap-3">
      <div className="font-bold text-xl">{data.card.card.title}</div>
      <div className="grid grid-cols-4 gap-x-4 gap-y-4 w-full">
        {data.card.card.brands.slice(0, cardsToShow).map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 flex items-center justify-center text-center leading-tight text-gray-700 font-semibold border-gray-500 shadow-sm cursor-pointer"
            onClick={() => window.open(item.link, "_blank")}
          >
            {item.text}
          </div>
        ))}
      </div>
      {btnNeeded && (
        <button
          className="p-2 self-center text-orange-500 font-semibold border border-gray-500 rounded-xl cursor-pointer w-full text-center py-3"
          onClick={toggleClick}
        >
          Show More{" "}
          <span
            className={`${
              clicked ? "bi bi-chevron-up" : "bi bi-chevron-down"
            } ml-2`}
          ></span>
        </button>
      )}
    </div>
  );
};

export default List;
