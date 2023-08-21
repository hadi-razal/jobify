import React from "react";
import imgUrl from "/src/assets/PngItem_5350214.png";

const AboutUs = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <h1 className="text-center m-3 text-[20px]">About Us</h1>
      </div>
      <div>
        <img
          className=" w-[400px] h-[200px] rounded-lg"
          src={imgUrl}
          alt="officeImage"
        />
      </div>
      <div className="mt-6">
        <h1 className="text-[30px] text-center text-green-700">Jobify</h1>
        <p className="px-3 mt-3 text-sm">
          Welcome to Jobify, your gateway to the perfect career opportunities.
          At Jobify, we're dedicated to connecting job seekers with their dream
          jobs and helping employers find exceptional talent. With a deep
          understanding of the dynamic job market, we've crafted a platform that
          streamlines the job search process, making it effortless for
          candidates to explore a diverse range of openings across various
          industries. Our commitment to innovation and user-centric design
          ensures a seamless and enjoyable experience for both job seekers and
          employers. Whether you're an ambitious professional aiming to take the
          next step in your career or a company seeking top-tier talent, Jobify
          is here to make your job journey smooth and successful
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
