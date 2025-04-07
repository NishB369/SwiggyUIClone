import React from "react";

const Footer = () => {
  return (
    <div className="flex items-center justify-between px-40 gap-10 py-10 bg-[#F0F0F5]">
      <div className="font-bold text-gray-800 text-xl leading-tight">
        For better experience,download the Swiggy app now
      </div>
      <div className="flex gap-8 ">
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png"
          className="w-[200px] object-contain"
        />
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png"
          className="w-[200px]  object-contain"
        />
      </div>
    </div>
  );
};

export default Footer;
