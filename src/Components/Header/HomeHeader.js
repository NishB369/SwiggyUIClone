const HomeHeader = () => {
  return (
    <div className="w-full bg-[#FF5200] flex items-center justify-between px-30 py-6 text-white font-semibold">
      <div className="right_div">
        <img
          src="https://res.cloudinary.com/dutdah0l9/image/upload/v1720058694/Swiggy_logo_bml6he.png"
          className="w-40"
        />
      </div>
      <div className="left_div flex items-center justify-between gap-8">
        <div>Swiggy Corporate</div>
        <div>Partner with us</div>
        <button className="font-medium border-2 border-white rounded-xl p-4 cursor-pointer">
          Get the App<span className="bi bi-arrow-up-right ml-2"></span>
        </button>
        <button className="rounded-xl p-4 px-10 bg-black cursor-pointer">Sign in</button>
      </div>
    </div>
  );
};

export default HomeHeader;
