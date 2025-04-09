import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import RestaurantHeader from "../Components/Header/RestaurantHeader";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { ShimmerThumbnail, ShimmerTitle } from "react-shimmer-effects";
import { ScrollRestoration } from "react-router";

const IndiviudalRestaurant = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState([]);
  const [menuBtn, setMenuBtn] = useState(false);

  function toggleExpand(index) {
    setExpanded((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  }

  function toggleMenu() {
    return setMenuBtn(!menuBtn);
  }

  let restaurantId = useParams();

  useEffect(() => {
    fetchList();
  }, []);

  const dispatch = useDispatch();

  const handleAddBtn = (item) => {
    dispatch(addItem(item));
  };

  const fetchList = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9698196&lng=77.7499721&restaurantId=${restaurantId.restaurantId}&catalog_qa=undefined&query=Burger&submitAction=ENTER`
      );
      const json = await response.json();
      const categories =
        json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards.filter(
          (card) => card.card.card.hasOwnProperty("itemCards")
        );

      setBannerList(json.data.cards);

      setCategoryList(categories);
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
        <div className="px-60 py-10 pb-0 mt-20">
          <div className="breadcrumbs flex flex-col gap-2">
            <ShimmerTitle line={1} />
          </div>
          <div className="banner w-full mt-2">
            <ShimmerThumbnail height={175} rounded />
          </div>
          <div className="flex flex-col gap-3 my-2">
            <ShimmerTitle line={1} />
            <div className="discounts flex items-center justify-start gap-3 overflow-x-hidden scrollbar-hide">
              {[...Array(3)].map((_, index) => (
                <ShimmerThumbnail key={index} height={75} rounded width={300} />
              ))}
            </div>
          </div>
          {[...Array(10)].map((_, index) => (
            <ShimmerThumbnail key={index} height={50} rounded />
          ))}
        </div>
      ) : categoryList.length > 0 ? (
        <div className="px-60 py-10 pb-0 mt-20">
          <div
            className={`fixed max-h-[425px] w-[575px] bg-black rounded-xl shadow-xl z-10 text-gray-200 bottom-10 right-80 px-8 py-8 text-lg flex-col overflow-y-scroll gap-3 ${
              menuBtn ? "flex" : "hidden"
            }`}
          >
            {categoryList.map((mainItem, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-md"
              >
                <div
                  className="w-8/12 cursor-pointer"
                  onClick={() => {
                    const targetId =
                      mainItem.card.card.itemCards[0].card.info.category;
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                      const elementPosition =
                        targetElement.getBoundingClientRect().top;
                      const offsetPosition =
                        elementPosition + window.pageYOffset - 100;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });

                      targetElement.children[0].classList.add("bg-orange-300");

                      setTimeout(() => {
                        targetElement.children[0].classList.remove(
                          "bg-orange-300"
                        );
                      }, 1000);

                      setMenuBtn(false);
                    }
                  }}
                >
                  {mainItem.card.card.itemCards[0].card.info.category}
                </div>
                <div>{mainItem.card.card.itemCards.length}</div>
              </div>
            ))}
          </div>

          {/* Menu Btn */}
          <div
            className="fixed bg-black rounded-full px-4 py-6 text-white cursor-pointer bottom-10 right-60 z-10 shadow-xl"
            onClick={() => {
              toggleMenu();
            }}
          >
            Menu
          </div>

          {/* Breadcrumbs */}
          <div className="breadcrumbs flex flex-col gap-2">
            <div className="text-sm">
              Home / Restaurants / {bannerList[0].card.card.text}
            </div>
            <div className="font-semibold text-4xl">
              {categoryList[0].card.card.text}
            </div>
          </div>

          {/* Rest Description */}
          <div className="banner w-full rounded-xl border mt-2 p-6 flex flex-col gap-2 justify-start shadow-md">
            <div className="w-full flex items-center font-semibold tracking-tight">
              <span className="bi bi-star-fill text-white bg-green-700 rounded-full text-xs py-[2px] px-[4px] mr-1 scale-[0.8]"></span>
              {bannerList[2].card.card.info.avgRatingString} (
              {bannerList[2].card.card.info.totalRatingsString}) •{" "}
              {bannerList[2].card.card.info.costForTwoMessage}
            </div>
            <div className="text-sm font-semibold text-orange-600 underline">
              {bannerList[2].card.card.info.cuisines.join(", ")}
            </div>
            <div className="flex flex-col text-sm font-semibold">
              <div className="flex items-center">
                <span className="text-gray-500 text-xl mr-2">•</span>Outlet
                <span className="font-normal ml-2">
                  {bannerList[2].card.card.info.areaName}
                </span>
              </div>
              <div className="lowercase flex items-center">
                <span className="text-gray-500 text-xl mr-2">•</span>
                {bannerList[2].card.card.info.sla.slaString}
              </div>
            </div>
          </div>

          {/* Discounts Carousel */}
          <div className="flex flex-col gap-3 my-6">
            <div className="font-bold text-xl">Discounts</div>
            <div className="discounts flex items-center justify-start gap-3 overflow-x-scroll scrollbar-hide">
              {bannerList[3].card.card.gridElements.infoWithStyle.offers.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex w-[300px] h-[75px] border border-black/25 shadow-md rounded-lg items-center justify-start pr-3 cursor-pointer flex-shrink-0"
                  >
                    <div className="w-3/12 flex items-center justify-center">
                      <img
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/offers/generic"
                        className="w-[60%]"
                      />
                    </div>
                    <div className=" h-full flex flex-col justify-center w-9/12">
                      <div className="font-semibold text-lg">
                        {item.info.header}
                      </div>
                      <div className="font-semibold text-sm -mt-1 uppercase text-gray-600">
                        {item.info.couponCode}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Rest List */}
          {categoryList.map((mainItem, index) => (
            <div
              key={index}
              className="cards_list flex flex-col items-between justify-start mt-8"
            >
              <div
                className="heading flex items-center justify-between cursor-pointer"
                id={mainItem.card.card.itemCards[0].card.info.category}
                onClick={() => {
                  toggleExpand(index);
                }}
              >
                <div className="font-semibold text-xl mb-6">
                  {mainItem.card.card.itemCards[0].card.info.category}
                </div>

                <div
                  className={`text-xl flex items-center justify-center ${
                    expanded[index] ? "bi bi-chevron-up" : "bi bi-chevron-down"
                  }`}
                ></div>
              </div>
              {mainItem.card.card.itemCards.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`items-center justify-between border-t border-b border-black/25 py-4 pb-10 relative ${
                    expanded[index] ? "flex" : "hidden"
                  }`}
                >
                  <div className="bg-white w-[500px] h-[550px] border-2 border-black left-32 rounded-xl absolute z-10 hidden flex-col">
                    <div className="w-full h-[225px]">
                      <img
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start w-8/12">
                    <div
                      className={`border-2 rounded-lg px-2 text-xs py-1 scale-[0.75] mb-2 ${
                        item.card.info.isVeg
                          ? "border-green-600 text-green-600"
                          : "border-red-600 text-red-600"
                      }`}
                    >
                      <span
                        className={`${
                          item.isVeg
                            ? "bi bi-circle-fill"
                            : "bi bi-caret-up-fill"
                        }`}
                      ></span>
                    </div>
                    <div className="font-semibold text-gray-600 text-xl">
                      {item.card.info.name}
                    </div>
                    <div className="font-semibold">
                      ₹{" "}
                      {item.card.info.price / 100 ||
                        item.card.info.defaultPrice / 100}
                    </div>
                    {item.card.info.ratings.aggregatedRating.rating && (
                      <div className="text-sm text-green-800 mt-2">
                        <span className="bi bi-star-fill mr-2"></span>
                        {item.card.info.ratings.aggregatedRating.rating}(
                        {item.card.info.ratings.aggregatedRating.ratingCountV2})
                      </div>
                    )}
                    <div className="text-gray-500 mt-2 line-clamp-2">
                      {item.card.info.description}
                    </div>
                  </div>
                  <div className="rounded-xl w-[150px] h-[150px] bg-gray-200 relative">
                    <img
                      src={
                        item.card.info.imageId
                          ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}`
                          : "https://worldfoodtour.co.uk/wp-content/uploads/2013/06/neptune-placeholder-48.jpg"
                      }
                      className="rounded-xl w-full h-full object-cover"
                    />
                    <div
                      className="absolute bg-white text-green-600 uppercase shadow-md p-2 px-6 font-semibold -bottom-4 left-10 cursor-pointer rounded-lg hover:bg-gray-100 duration-200 ease-in-out"
                      onClick={() => handleAddBtn(item.card.info)}
                    >
                      add
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Ind Footer */}
          <div className="IndividualRestFooter bg-gray-100 px-6 py-4 pb-40 flex flex-col gap-4 mt-4">
            <div className="flex items-center border-b pb-4">
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_120,h_60/fssai_final_edss9i"
                className="w-[60px]"
              />
              <div className="text-sm text-gray-600 mt-2 ml-4">
                {
                  bannerList[bannerList.length - 1].groupedCard.cardGroupMap
                    .REGULAR.cards[
                    bannerList[bannerList.length - 1].groupedCard.cardGroupMap
                      .REGULAR.cards.length - 2
                  ].card.card.text[0]
                }
              </div>
            </div>
            <div className="border-b pb-4 text-gray-600">
              <div className="font-semibold">
                {
                  bannerList[bannerList.length - 1].groupedCard.cardGroupMap
                    .REGULAR.cards[
                    bannerList[bannerList.length - 1].groupedCard.cardGroupMap
                      .REGULAR.cards.length - 1
                  ].card.card.name
                }
              </div>
              <div className="text-sm">
                (Outlet:
                {
                  bannerList[bannerList.length - 1].groupedCard.cardGroupMap
                    .REGULAR.cards[
                    bannerList[bannerList.length - 1].groupedCard.cardGroupMap
                      .REGULAR.cards.length - 1
                  ].card.card.area
                }
                )
              </div>
              <div className="text-xs mt-2">
                <span className="bi bi-geo-fill mr-2"></span>
                {
                  bannerList[bannerList.length - 1].groupedCard.cardGroupMap
                    .REGULAR.cards[
                    bannerList[bannerList.length - 1].groupedCard.cardGroupMap
                      .REGULAR.cards.length - 1
                  ].card.card.completeAddress
                }
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="font-semibold">
                For better experience, download the Swiggy app now
              </div>
              <div className="flex gap-2 ">
                <img
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png"
                  className="w-[150px] object-contain"
                />
                <img
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png"
                  className="w-[150px]  object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <ScrollRestoration />
    </>
  );
};

export default IndiviudalRestaurant;
