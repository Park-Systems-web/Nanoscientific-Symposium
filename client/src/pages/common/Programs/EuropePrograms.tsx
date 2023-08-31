import { Stack, Typography } from "@mui/material";
import React from "react";
import { mainFontSize } from "utils/FontSize";
import { S3_URL } from "utils/GlobalData";

const EuropePrograms = () => {
  return (
    <Stack className="layout">
      <Typography
        fontSize={mainFontSize}
        color="#898989"
        align="right"
        // margin="0 20px 10px 0"
      >
        CEST (GMT+2)
      </Typography>
      <img src={`${S3_URL}/eu/program/eu-program-1.png`} alt="" />
      <img src={`${S3_URL}/eu/program/eu-program-2.png`} alt="" />
      <img src={`${S3_URL}/eu/program/eu-program-3.png`} alt="" />
      <img src={`${S3_URL}/eu/program/eu-program-4.png`} alt="" />
      <img src={`${S3_URL}/eu/program/eu-program-5.png`} alt="" />
      <img src={`${S3_URL}/eu/program/eu-program-6.png`} alt="" />
    </Stack>
  );
};

export default EuropePrograms;
