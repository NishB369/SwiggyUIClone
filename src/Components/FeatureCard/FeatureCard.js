import React from "react";

const FeatureCard = ({ heading, subHeading, discount }) => {
  console.log(heading, subHeading, discount);

  return (
    <div className="bg-white rounded-4xl p-6 h-[250px] w-[220px] relative">
      <div className="flex flex-col gap-1">
        <div className="uppercase text-gray-700 font-extrabold text-xl tracking-tighter">
          {heading}
        </div>
        <div className="uppercase text-gray-500 font-semibold tracking-tighter">
          {subHeading}
        </div>
        {discount && (
          <div className="uppercase text-[#FF5200] font-semibold text-sm tracking-tighter">
            upto {discount}% off
          </div>
        )}
      </div>
      <div className="rounded-full bg-[#FF5200] w-fit px-2 py-1 text-white text-xl absolute bottom-6 cursor-pointer">
        <span className="bi bi-arrow-right"></span>
      </div>
    </div>
  );
};

export default FeatureCard;
