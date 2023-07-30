import React from "react";

const Hero = () => {
  return (
    <div className=" p-10 flex flex-col  justify-center items-center lg:px-36 lg:py-24">
      <h1 className="text-[30px] font-semibold">
        Hello Welcome to
        <span className="text-green-500 text-[35px] font-bold"> Jobify</span>
      </h1>
      <p className="text-[14px] md:px-[100px] mt-5">
        Join our thriving community of job seekers today and embark on an
        exciting new chapter in your professional life. Let Jobify be your
        trusted companion on the path to success. Your dream job awaits!
      </p>
    </div>
  );
};

export default Hero;
