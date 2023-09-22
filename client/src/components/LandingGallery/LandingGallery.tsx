import React, { useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Box, Button } from "@mui/material";
import useWindowSize from "hooks/useWindowSize";
import { S3_URL } from "utils/GlobalData";
import { LandingGalleryContainer } from "./LandingGalleryStyles";

interface LandingGalleryProps {
  imageList: string[];
}

const LandingGallery = ({ imageList }: LandingGalleryProps) => {
  const isMobile = useWindowSize().width < 768;

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <LandingGalleryContainer>
      <Swiper
        className="swiper"
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        slidesPerView={isMobile ? 1.3 : 3.4}
        centeredSlides
        draggable
        loop
      >
        {imageList.map((img) => (
          <SwiperSlide className="swiper-slide">
            <img src={img} alt="" />
          </SwiperSlide>
        ))}
        <button type="button" className="prev-button" ref={prevRef}>
          <img src={`${S3_URL}/common/landing/swiper-left.svg`} alt="" />
        </button>
        <button type="button" className="next-button" ref={nextRef}>
          <img src={`${S3_URL}/common/landing/swiper-right.svg`} alt="" />
        </button>
      </Swiper>
    </LandingGalleryContainer>
  );
};

export default LandingGallery;
