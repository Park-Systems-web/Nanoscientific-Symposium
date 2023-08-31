import { useTheme } from "@mui/material";
import styled from "styled-components";

export const FooterContainer = styled.div`
  width: 100%;
  max-width: 1920px;
  padding: 10px 0;
  background-color: ${() => {
    const theme = useTheme();
    return theme.palette.primary.mainBg;
  }};
  text-align: center;
  position: absolute;

  .nss {
    color: #d3d3d3;
    margin: 0px;
  }

  .privacy-policy {
    padding: 0;
    margin-bottom: 5px;
  }
`;

export const FooterIconContainer = styled.ul`
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  font-size: 30px;
  list-style: none;
  a {
    padding: 0 10px !important;
  }
`;
