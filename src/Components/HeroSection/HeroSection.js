import React from "react";
import { Link } from "react-router";

const data = [
  {
    heading: "restaurants",
    subHeading: "From Restaurants",
    discount: "60",
    link: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/1/fa01e85b-3057-482d-9523-5289722b1df2_Food4BU.png",
  },
  {
    heading: "Instamart",
    subHeading: "Instant Grocery",
    discount: "60",
    link: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/16/ca34e375-f1bd-4a2e-a3e7-0a20833be83b_IM4BU1.png",
  },
  {
    heading: "Dineout",
    subHeading: "Eat Out & Save More",
    discount: "60",
    link: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/1/76c30e5a-8adb-4795-bf5b-fa64e9e9e1d3_DO4BU.png",
  },
  {
    heading: "Genire",
    subHeading: "Pickup and Drop",
    discount: null,
    link: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/31/14033c0b-8907-420b-b72a-d26cfa68dc7b_Genie4BU.png",
  },
];

const HeroSection = () => {
  return (
    <div className="w-full bg-[#FF5200] flex flex-col items-center justify-start gap-10 py-20 relative h-lvh">
      <div className="font-bold text-5xl text-white w-8/12 text-center">
        Order food & groceries. Discover best restaurants. Swiggy it!
      </div>
      <div className="absolute -top-6 -right-84">
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
          className="w-[50%]"
        />
      </div>
      <div className="absolute -top-6 -left-20">
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
          className="w-[50%]"
        />
      </div>
      <div className="flex items-center justify-end z-10 w-[80%]">
        {data.map((item, index) => (
          <Link to={`/${item.heading}`}>
            <img
              key={index}
              src={item.link}
              className="w-[100%]  cursor-pointer hover:scale-[1.1] duration-1000 ease-in-out flex-shrink-0"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
