import Image from "next/image";
import React from "react";

const HomeLayout = () => {
  return (
    <div className="bg-components h-[90vh] w-[90vw] center-div rounded-[3rem] flex-row">
      <div className="left flex flex-1">
        <h1>Welcome</h1>
      </div>
      <div className="right flex flex-1 ">
      <Image
          src="/Images/home-pizza.jpg"
          alt="home pizza"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default HomeLayout;
