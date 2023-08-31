/* eslint-disable react/require-default-props */
import React from "react";
import { ProgramTitleContainer } from "components/Programs/ProgramTitle/ProgramTitleStyles";
import { Typography, useTheme } from "@mui/material";
import {
  calTimezoneDate,
  calTimezoneDateEurope,
  dateToLocaleString,
  userTimezoneToUTC,
} from "utils/Date";
import { mainFontSize } from "utils/FontSize";
import dayjs from "dayjs";
import usePageViews from "hooks/usePageViews";

interface ProgramTitleProps {
  title: string;
  // eslint-disable-next-line react/require-default-props
  isAdmin?: boolean;
  date: string;
  timezone: string;
  selectedTimeZoneOffset?: string;
  // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
  onClick?: () => void;
}

const ProgramTitle = ({
  title,
  date,
  isAdmin,
  onClick,
  timezone,
  selectedTimeZoneOffset,
}: ProgramTitleProps) => {
  const theme = useTheme();
  const nation = usePageViews();

  const dateString =
    nation !== "eu"
      ? calTimezoneDate(
          userTimezoneToUTC(dayjs(date), new Date().getTimezoneOffset()),
          selectedTimeZoneOffset,
        )
      : calTimezoneDateEurope(
          userTimezoneToUTC(dayjs(date), new Date().getTimezoneOffset()),
          selectedTimeZoneOffset,
        );
  return (
    <ProgramTitleContainer onClick={onClick} isAdmin={isAdmin as boolean}>
      <Typography
        component="span"
        fontWeight={theme.typography.fontWeightBold}
        color="white"
        fontSize={mainFontSize}
        letterSpacing="1.3px"
      >
        {title} | {dateToLocaleString(date, timezone, "MMM DD (d) YYYY")}
      </Typography>
    </ProgramTitleContainer>
  );
};

export default ProgramTitle;
