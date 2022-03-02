import styled from "styled-components";
import { useTheme } from "@mui/material/styles";

export const RegistrationContainer = styled.div`
  font-size: 12px;
  .registration-desc {
    display: flex;
    flex-direction: column;
    align-items: center;

    p.reg-head {
      font-size: 23px;
      font-weight: 500;
      margin-bottom: 15px;
    }

    .reg-body {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        font-weight: 700;
        .red {
          color: red;
        }
      }
    }
  }
`;
