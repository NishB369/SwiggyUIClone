import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer/Footer";
import RestaurantHeader from "../Components/Header/RestaurantHeader";
import { Link, useParams } from "react-router";
import RestaurantCard1 from "../Components/RestaurantCard/RestaurantCard1";

const RestaurantList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let collectionId = useParams();

  useEffect(() => {
    fetchList();
    console.log(collectionId.restaurantListId);
  }, []);

  const fetchList = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9698196&lng=77.7499721&collection=${collectionId.restaurantListId}&tags=layout_CCS_Biryani&sortBy=&filters=&type=rcv2&offset=0&page_type=null`
      );
      const json = await response.json();
      console.log(json.data.cards);

      const categories = json.data.cards;

      setCategoryList(categories);
      //   console.log(categoryList.slice(3, categoryList.length));
    } catch (error) {
      console.error("Error fetching menu data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <RestaurantHeader />
      {isLoading ? (
        <h1 className="mt-20">Loading</h1>
      ) : categoryList.length > 0 ? (
        <div className="px-20 py-10 mt-20">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-4xl">
              {categoryList[0].card.card.title}
            </div>
            <div className="text-lg">
              {categoryList[0].card.card.description}
            </div>
            <div className="text-xl font-semibold">
              {categoryList[0].card.card.count} to explore
            </div>
          </div>
          <div className="grid grid-cols-4 gap-x-4 gap-y-4 mt-6">
            {categoryList.slice(3, categoryList.length).map((item, index) => (
              <Link to={`/restaurants/${item.card.card.info.id}`}>
                <RestaurantCard1
                  key={index}
                  imgId={item.card.card.info.cloudinaryImageId}
                  discount={
                    item.card.card.info.aggregatedDiscountInfoV3
                      ? `${item.card.card.info.aggregatedDiscountInfoV3.header} ${item.card.card.info.aggregatedDiscountInfoV3.subHeader}`
                      : null
                  }
                  name={item.card.card.info.name}
                  rating={item.card.card.info.avgRating}
                  time={item.card.card.info.sla.slaString}
                  cusine={item.card.card.info.cuisines}
                  location={item.card.card.info.areaName}
                />
              </Link>
            ))}
          </div>
        </div>
      ) : null}
      <Footer />
    </>
  );
};

export default RestaurantList;
