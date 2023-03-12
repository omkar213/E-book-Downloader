import React, { useState } from "react";
import Slider from "react-slick";
import { sliderData } from "./slider-data";

const Swiperslider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="banner-slider-folder">
        <Slider {...settings}>
          {sliderData.map((slide, index) => {
            return (
              <div className="banner-slider-image">
                <img src={slide.image} alt="banner" />
                <div className="content">
                  <h2 className="content-heading">{slide.heading}</h2>
                  <p className="content-desc">
                    {slide.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default Swiperslider;
