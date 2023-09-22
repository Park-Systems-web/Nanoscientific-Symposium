import { useTheme } from "@mui/material";
import styled from "styled-components";

export const LandingGalleryContainer = styled.div`
  margin-bottom: 50px;
  .swiper {
    &:before {
      content: "";
      width: 140px;
      height: 100%;
      background: linear-gradient(270deg, rgb(255 255 255 / 0%) 0%, white 150%);
      position: absolute;
      z-index: 2;
    }
    &:after {
      content: "";
      width: 140px;
      height: 100%;
      top: 0;
      right: 0;
      background: linear-gradient(90deg, rgb(255 255 255 / 0%) 0%, white 150%);
      position: absolute;
      z-index: 2;
    }

    .prev-button,
    .next-button {
      position: absolute;
      z-index: 3;
      top: 50%;
      transform: translateY(-50%);
      width: 48px;
    }
    .prev-button {
      left: 8%;
    }
    .next-button {
      right: 8%;
    }
  }
  .swiper-wrapper {
    .swiper-slide {
      padding: 0 7.5px;
      justify-content: center;
      display: flex;

      img {
        width: 100%;
        height: auto;
        border-radius: 15px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .swiper {
      &:before,
      &after {
        width: 50px;
      }
      .prev-button,
      .next-button {
        width: 30px;
      }
      .prev-button {
        left: 10px;
      }
      .next-button {
        right: 10px;
      }
    }
  }
`;
