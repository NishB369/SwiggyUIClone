import React, { useState, useEffect } from "react";
import RestaurantHeader from "../Components/Header/RestaurantHeader";
import RestaurantCard1 from "../Components/RestaurantCard/RestaurantCard1";
import List from "../Components/List/List";
import Footer from "../Components/Footer/Footer";
import { Link } from "react-router";
import { ShimmerCircularImage } from "react-shimmer-effects";
import { ShimmerTitle } from "react-shimmer-effects";
import { ShimmerPostItem } from "react-shimmer-effects";
import { ScrollRestoration } from "react-router";

const RestaurantMain = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9698196&lng=77.7499721&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await response.json();

      const categories = json.data.cards;

      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  function dishClick(str) {
    if (str.length === 5) return str;

    const match = str.match(/collection_id=(\d+)/);
    return match ? match[1] : null;
  }

  return (
    <>
      <RestaurantHeader />
      {isLoading ? (
        <div className="px-40 flex flex-col gap-20 py-20 mt-20">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="w-5/6">
                <ShimmerTitle line={1} variant="secondary" />
              </div>
              <div className="flex items-center justify-end gap-2 w-1/6">
                <button className="bi bi-arrow-left rounded-full bg-gray-200 px-2 py-1 cursor-pointer"></button>
                <button className="bi bi-arrow-right rounded-full bg-gray-200 px-2 py-1 cursor-pointer"></button>
              </div>
            </div>
            <div className="flex items-center justify-start gap-12 overflow-x-scroll scrollbar-hide mt-8">
              {[...Array(6)].map((_, index) => (
                <ShimmerCircularImage size={115} />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="w-5/6">
                <ShimmerTitle line={1} variant="secondary" />
              </div>
              <div className="flex items-center justify-end gap-2 w-1/6">
                <button className="bi bi-arrow-left rounded-full bg-gray-200 px-2 py-1 cursor-pointer"></button>
                <button className="bi bi-arrow-right rounded-full bg-gray-200 px-2 py-1 cursor-pointer"></button>
              </div>
            </div>
            <div className="flex items-center justify-start gap-12 overflow-x-scroll scrollbar-hide mt-8">
              {[...Array(6)].map((_, index) => (
                <ShimmerPostItem
                  key={index}
                  card
                  title
                  cta
                  imageType="thumbnail"
                  imageWidth={150}
                  imageHeight={75}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="w-5/6">
                <ShimmerTitle line={1} variant="secondary" />
              </div>
              <div className="flex items-center justify-end gap-2 w-1/6">
                <button className="bi bi-arrow-left rounded-full bg-gray-200 px-2 py-1 cursor-pointer"></button>
                <button className="bi bi-arrow-right rounded-full bg-gray-200 px-2 py-1 cursor-pointer"></button>
              </div>
            </div>
            <div className="grid grid-cols-4 overflow-x-scroll gap-10 mt-2">
              {[...Array(8)].map((_, index) => (
                <ShimmerPostItem
                  key={index}
                  card
                  title
                  cta
                  imageType="thumbnail"
                  imageWidth={150}
                  imageHeight={75}
                />
              ))}
            </div>
          </div>
        </div>
      ) : categoryList.length > 0 ? (
        <div className="px-40 flex flex-col gap-20 py-20 mt-20">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="font-bold text-xl">
                {categoryList[0].card.card.header.title}
              </div>
              <div className="flex gap-2">
                <button className="bi bi-arrow-left rounded-full bg-gray-200 px-2 py-1 cursor-pointer"></button>
                <button className="bi bi-arrow-right rounded-full bg-gray-200 px-2 py-1 cursor-pointer"></button>
              </div>
            </div>
            <div className="flex items-center justify-start gap-3 overflow-x-scroll scrollbar-hide">
              {categoryList[0].card.card.imageGridCards.info.map(
                (item, index) => (
                  <Link to={`/categories/${dishClick(item.entityId)}`}>
                    <div className="w-[150px]">
                      <img
                        key={index}
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
                        className="cursor-pointer"
                        // onClick={() => console.log(dishClick(item.entityId))}
                      />
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="font-bold text-xl">
                {categoryList[1].card.card.header.title}
              </div>
              <div className="flex gap-2">
                <button className="bi bi-arrow-left rounded-full bg-gray-200 px-2 py-1 cursor-pointer"></button>
                <button className="bi bi-arrow-right rounded-full bg-gray-200 px-2 py-1 cursor-pointer"></button>
              </div>
            </div>
            <div className="flex items-center justify-start gap-3 overflow-x-scroll scrollbar-hide mt-2">
              {categoryList[1].card.card.gridElements.infoWithStyle.restaurants.map(
                (item, index) => (
                  <Link to={`/restaurants/${item.info.id}`}>
                    <RestaurantCard1
                      key={index}
                      imgId={item.info.cloudinaryImageId}
                      discount={
                        item.info.aggregatedDiscountInfoV3
                          ? `${item.info.aggregatedDiscountInfoV3.header} ${item.info.aggregatedDiscountInfoV3.subHeader}`
                          : null
                      }
                      name={item.info.name}
                      rating={item.info.avgRating}
                      time={item.info.sla.slaString}
                      cusine={item.info.cuisines}
                      location={item.info.areaName}
                    />
                  </Link>
                )
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="font-bold text-xl">
                {categoryList[2].card.card.title}
              </div>
              <div className="flex gap-2">
                <button className="bi bi-arrow-left rounded-full bg-gray-200 px-2 py-1 cursor-pointer"></button>
                <button className="bi bi-arrow-right rounded-full bg-gray-200 px-2 py-1 cursor-pointer"></button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-x-20 gap-y-10 overflow-x-scroll scrollbar-hide mt-2">
              {categoryList[4].card.card.gridElements.infoWithStyle.restaurants.map(
                (item, index) => (
                  <Link to={`/restaurants/${item.info.id}`}>
                    <RestaurantCard1
                      key={index}
                      imgId={item.info.cloudinaryImageId}
                      discount={
                        item.info.aggregatedDiscountInfoV3
                          ? `${item.info.aggregatedDiscountInfoV3.header} ${item.info.aggregatedDiscountInfoV3.subHeader}`
                          : null
                      }
                      name={item.info.name}
                      rating={item.info.avgRating}
                      time={item.info.sla.slaString}
                      cusine={item.info.cuisines}
                      location={item.info.areaName}
                    />
                  </Link>
                )
              )}
            </div>
          </div>
          <List data={categoryList[6]} btnNeeded={true} />
          <List data={categoryList[7]} btnNeeded={true} />
          <List data={categoryList[8]} btnNeeded={false} />
        </div>
      ) : null}
      <Footer />
      <ScrollRestoration />
    </>
  );
};

export default RestaurantMain;
