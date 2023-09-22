import styled, { css } from "styled-components";
import { useTheme, MenuItem } from "@mui/material";

export const NavBarContainer = styled.div`
  .op5 {
    opacity: 0.5;
  }
  width: 100%;
  height: 110px;
  border-bottom: ${() => {
    const theme = useTheme();
    return `3px solid ${theme.palette.background.default}`;
  }};
  z-index: 101;
  position: sticky;
  top: 0;
  background-color: ${() => {
    const theme = useTheme();
    return theme.palette.background.default;
  }};
  box-shadow: 0 3px 6px #0000001c;

  .overlay {
    background: #0000001b;
    position: absolute;
    width: 100vw;
    height: 0;
    z-index: 1;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out, visibility 0s linear 1s;
  }
  .nav-wrap {
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    .menu-container {
      align-self: flex-end;
    }
    .logo-link {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: auto;
      img {
        height: 85px;
        padding: 20px 0;
      }
      &.disabled {
        pointer-events: none;
      }
    }
    .user-menu-wrap {
      display: flex;
      margin-left: 20px;
      .user-menu {
        padding: 10px 10px 15px 10px;
      }
    }

    .menu-item-wrap {
      // width: 50%;
    }

    .login-wrap {
      width: 20%;
    }

    .mobile-menu-btn {
      display: none;
      // height: 40px;
    }
  }

  .return-main-btn {
    top: 50%;
    transform: translateY(-50%);
  }

  .parent {
    display: flex;
    align-items: center;
    position: relative;

    &.active {
      .parent-label {
        color: ${() => {
          const theme = useTheme();
          return theme.palette.text.primary;
        }};
        span::before {
          background-color: ${() => {
            const theme = useTheme();
            return theme.palette.primary.main;
          }};
        }
      }
      .child-container {
        max-height: 50vh;
        border-width: 1px;
      }
    }

    .parent-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      color: rgba(0, 0, 0, 0.6);
      transition: color 0.2s ease-in-out;
      span {
        position: relative;
        padding: 10px 10px 22px 10px !important;
        &::before {
          content: "";
          position: absolute;
          width: calc(100% - 10px);
          top: 5px;
          height: 3px;
          background-color: transparent;
          transition: background-color 0.2s ease-in-out;
        }
      }
      svg {
        margin-bottom: 14px;
      }
      &.active {
        cursor: default;
        span {
          &::before {
            background-color: ${() => {
              const theme = useTheme();
              return theme.palette.primary.main;
            }};
          }
        }
      }

      &:hover {
        color: ${() => {
          const theme = useTheme();
          return theme.palette.text.primary;
        }};
      }
      &.hover {
        color: ${() => {
          const theme = useTheme();
          return theme.palette.text.primary;
        }};

        span::before {
          background-color: ${() => {
            const theme = useTheme();
            return theme.palette.primary.main;
          }};
        }
      }
    }

    .child-container {
      position: absolute;
      background-color: white;
      overflow: hidden;
      top: 43px;
      min-width: calc(100% - 23px);
      max-height: 0%;
      border-width: 0px;
      border-style: solid;
      border-color: ${() => {
        const theme = useTheme();
        return theme.palette.grey.A200;
      }};
      transition-property: max-height, border-width;
      transition-duration: 0.5s, 0.5s;
      transition-timing-function: ease-in-out, ease-in-out;
      box-shadow: 2px 2px 6px #00000030;

      .child-item {
        background-color: rgba(33, 173, 229, 0);
        transition: background-color 0.3s ease-in-out;
        &.active {
          background-color: rgba(33, 173, 229, 0.06);
          a {
            color: rgba(0, 0, 0, 0.87);
          }
        }
        &:hover {
          background-color: rgba(33, 173, 229, 0.06);
        }

        a {
          width: 100%;
          text-align: center;
          padding: 10px 15px !important;
        }
      }
    }
  }

  @media screen and (max-width: 1140px) {
    height: 70px;

    .return-main-btn {
      svg {
        width: 0.8em;
        height: 0.8em;
      }
    }

    .nav-wrap {
      .menu-container {
        position: absolute;
        top: 67px;
        width: 100%;
        max-height: 0px;
        overflow: hidden;
        z-index: 10;
        transition: max-height 0.5s ease-in-out;
        .menu-item-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: white;
          width: 100%;
          max-height: 100vh;
          box-shadow: 0px 2px 2px #0000002b;
          padding: 0 20px;
          box-sizing: border-box;
          & > div {
            transform: scale(1.05) translateY(-10px);
            transition: transform 0.5s ease-in-out;
          }
        }
      }
      .mobile-menu-btn {
        display: inline-block;
        position: absolute;
        right: 0;
      }
      .logo-link {
        margin-right: 0;
        img {
          margin: 0;
          height: 73px;
        }
      }
      .user-menu-wrap {
        margin-left: 0;
        width: 100%;
        justify-content: flex-end;
        .user-menu {
          // margin-right: auto;
        }
      }

      // mobile
    }
    &.mobile {
      .menu-container {
        max-height: 100vh;
        .menu-item-wrap {
          div {
            transform: none;
          }
        }

        .parent {
          .parent-label {
            justify-content: center;
            span {
              padding: 10px !important;
            }
            svg {
              margin-bottom: 0px;
            }
          }
          .child-container {
            width: 100vw;
            display: none;
            position: relative;
            background-color: #0000000b;
            top: 0;
            .child-item {
              &.active,
              &:hover {
                background-color: rgb(33 173 229 / 13%);
              }
            }
          }

          &.active {
            .child-container {
              display: block;
            }
          }
        }
      }
      .overlay {
        visibility: visible;
        height: 100vh;
        opacity: 1;
        transition-delay: 0s;
      }
      .login-wrap {
        align-self: initial;

        button:not(.user-menu) {
          display: none;
        }
      }
    }
  }
`;

export const AnnouncementMenuItemContainer = styled(MenuItem)`
  ${(props) =>
    props.className.toLowerCase() === "announcement" &&
    css`
      position: relative;
    `}
`;

export const AnnouncementAlarm = styled.div`
  position: absolute;
  top: 3px;
  right: 7px;
  width: 5px;
  height: 5px;
  border-radius: 50px;
  background: red;
`;
