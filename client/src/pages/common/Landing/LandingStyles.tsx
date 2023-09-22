import { useTheme } from "@mui/material";
import styled from "styled-components";

export const LandingContainer = styled.div`
  .sticky-menu {
    position: fixed;
    z-index: 1;
    top: 15%;
    left: 85%;
    width: 200px;
    background-color: ${() => {
      const theme = useTheme();
      return theme.palette.grey[50];
    }};
    border: 1px solid
      ${() => {
        const theme = useTheme();
        return theme.palette.grey[300];
      }};
    padding: 20px 15px 5px 15px;
    margin: 15px;
    box-shadow: ${() => {
      const theme = useTheme();
      return theme.shadows[3];
    }};
  }
  .bg-alpha {
    background-color: #21ade517;
  }
  .bg-transition {
    transition: background-color 0.2s ease;
  }

  .edit-btn,
  .sponsor-edit-btn,
  .landing6-edit-btn {
    position: absolute;
    color: ${() => {
      const theme = useTheme();
      return theme.palette.primary.main;
    }};
    margin: 8px;
    transform: translateX(-150%);
    border: 1px solid #21ade542;
  }

  .banner-logo {
    height: 300px;
    margin-bottom: 40px;
  }

  .sponsor-edit-btn {
    transform: translateX(-30px);
    margin: 0;
  }
  .landing6-edit-btn {
    transform: translate(270px, -51px);
    margin: 0;
  }

  .post-event-section-1 {
    .desc-wrap {
      width: 48%;
    }
  }

  @media screen and (max-width: 1200px) {
    .post-event-section-1 {
      flex-direction: column;
      .desc-wrap {
        width: 100%;
        margin-bottom: 30px;
      }
    }
    .post-event-section-2 {
      .layout {
        padding: 20px 0;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .banner-logo {
      height: auto;
      width: 100%;
    }

    .video-responsive {
      iframe {
        width: 100%;
        height: 56vw;
        min-height: 230px;
      }
    }
  }
`;
