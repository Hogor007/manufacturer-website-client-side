import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="d-flex flex-column-reverse flex-lg-row align-items-center justify-content-between container mx-auto">
      <div className="banner-info">
        <h1 className="font-serif">Fibix. Your desired manufacturer</h1>
        <h6>
          We have a wide selection of tools that will help you work in the best
          possible way. We have all kinds of materials can fulfill all your
          needs.
        </h6>
        <button className="btn btn-primary my-2 d-lg-inline d-block mx-lg-0 mx-auto">
          Explore More
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <img
          className="w-75"
          src="https://cdn.dribbble.com/users/77598/screenshots/5919494/dribbble.png"
          alt="banner"
        />
      </div>
    </div>
  );
};

export default Banner;
