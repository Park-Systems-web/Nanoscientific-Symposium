import styled from "styled-components";
import { useTheme } from "@mui/material/styles";

export const AppContainer = styled.div`
  background-color: ${() => {
    const theme = useTheme();
    return theme.palette.background.default;
  }};
  font-family: ${() => {
    const theme = useTheme();
    return theme.typography.body1.fontFamily;
  }};
  color: ${() => {
    const theme = useTheme();
    return theme.palette.text.primary;
  }};

  hr.dashed {
    margin: 0;
    border-style: dashed;
    border-color: #ececec;
  }

  a {
    color: ${() => {
      const theme = useTheme();
      return theme.palette.text.secondary;
    }};
    transition: color 0.2s ease-in-out;
    display: inline-block;

    &:hover {
      color: ${() => {
        const theme = useTheme();
        return theme.palette.text.primary;
      }};
    }

    &.link-white {
      color: white;
      &:hover {
        color: ${() => {
          const theme = useTheme();
          return theme.palette.primary.main;
        }};
      }
    }

    &.hover-blue:hover {
      color: ${() => {
        const theme = useTheme();
        return theme.palette.primary.main;
      }};
    }

    &.link-default {
      padding: 0;
      color: #0563c1;
      text-decoration: underline;
    }
  }

  .hover-zoom {
    transition: transform 0.15s ease-in-out;
    &:hover {
      transform: scale(105%);
    }
  }

  .border-grey {
    border: 1px solid
      ${() => {
        const theme = useTheme();
        return theme.palette.grey.A200;
      }};
  }

  .text-center {
    text-align: center;
  }

  .z0 {
    z-index: 0;
  }
  .z1 {
    z-index: 1;
  }

  .layout {
    margin: 0 auto;
    padding: 70px 0px;
    box-sizing: border-box;
  }

  .editor-content {
    p {
      margin: 0;
    }
    a {
      padding: 0;
    }

    .landing-teaser {
      width: 500px;
      height: 281px;
      float: right;
      transform: translateY(-60px);
      margin-left: 30px;
    }
  }

  .body-fit {
    min-height: calc(100vh - 64px);
  }

  .body-fit-banner {
    min-height: calc(100vh - 364px);
  }

  .ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .p0 {
    padding: 0;
  }
  .btn-alpha {
    cursor: pointer;
    color: ${() => {
      const theme = useTheme();
      return theme.palette.grey.A400;
    }};
    transition: all 0.2s ease-in-out;
    &:hover {
      color: ${() => {
        const theme = useTheme();
        return theme.palette.common.black;
      }};
    }
  }

  .btn-disabled {
    color: ${() => {
      const theme = useTheme();
      return theme.palette.grey.A200;
    }};
  }

  .ql-size-large {
    font-size: 1.5rem;
  }
  .ql-size-small {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 1199px) {
    .banner {
      height: 195px;
    }
    .layout {
      width: 90%;
    }

    a {
      padding: 10px 5px;
    }

    .editor-content {
      .landing-teaser {
        width: 100%;
        float: none;
        transform: none;
        margin-left: 0;
        margin-bottom: 20px;
      }
    }
  }
  @media screen and (min-width: 1200px) {
    // banner
    .banner {
      height: 300px;
    }

    .layout {
      padding: 50px 0px;
      max-width: 1200px;
    }
    a {
      padding: 15px 10px;
    }
  }
  @media screen and (min-width: 1921px) {
    .layout {
      padding: 70px 50px;
      max-width: 1680px;
    }
    a {
      padding: 15px 10px;
    }
  }
`;
