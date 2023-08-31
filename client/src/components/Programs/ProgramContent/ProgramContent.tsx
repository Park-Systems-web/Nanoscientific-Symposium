/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from "react";
import {
  calTimezoneDate,
  dateToLocaleString,
  userTimezoneToUTC,
} from "utils/Date";
import InnerHTML from "dangerously-set-html-content";
import {
  styled,
  TableRow,
  TableCell,
  useTheme,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import {
  ArrowCircleUp,
  ArrowCircleDown,
  NoEncryption,
} from "@mui/icons-material";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import useCurrentYear from "hooks/useCurrentYear";
import useAdminStore from "store/AdminStore";
import { mainFontSize } from "utils/FontSize";
import dayjs from "dayjs";

interface ProgramContentProps extends Program.programType {
  id: number;
  index: number;
  isAdmin: boolean;
  nextProgram: Program.programType | null;
  prevProgram: Program.programType | null;
  onClick?: () => void;
  selectedTimezone?: string;
  selectedTimeZoneOffset?: string;
  selectedAgenda?: Program.programAgendaType;
  setSelectedAgenda?: React.Dispatch<Program.programAgendaType>;
  setOpenAgendaForm?: React.Dispatch<boolean>;
  setAgendaEdit?: React.Dispatch<boolean>;
}

interface programAgendaEditType extends Program.programAgendaType {
  edit: boolean;
}

const ProgramContent = ({
  id,
  start_time,
  end_time,
  title,
  title_en,
  speakers,
  speakers_en,
  emphasize,
  description,
  description_en,
  index,
  nextProgram,
  prevProgram,
  isAdmin,
  onClick,
  selectedTimezone,
  selectedTimeZoneOffset,
  selectedAgenda,
  setSelectedAgenda,
  setOpenAgendaForm,
  setAgendaEdit,
}: ProgramContentProps) => {
  const theme = useTheme();
  const nation = usePageViews();
  const currentYear = useCurrentYear();
  const { currentLanguage } = useAdminStore();
  const langSfx = currentLanguage === "china" ? "" : "_en";

  const curSpeaker =
    nation === "china" && currentLanguage === "english"
      ? speakers_en
      : speakers;
  const curTitle =
    nation === "china" && currentLanguage === "english" ? title_en : title;
  const curDescription =
    nation === "china" && currentLanguage === "english"
      ? description_en
      : description;

  // time
  const startTime = calTimezoneDate(
    userTimezoneToUTC(dayjs(start_time), new Date().getTimezoneOffset()),
    selectedTimeZoneOffset,
  );
  const startHH =
    startTime.get("hour") < 10
      ? `0${startTime.get("hour")}`
      : startTime.get("hour");
  const startMM =
    startTime.get("minutes") < 10
      ? `0${startTime.get("minutes")}`
      : startTime.get("minutes");
  const endTime = calTimezoneDate(
    userTimezoneToUTC(dayjs(end_time), new Date().getTimezoneOffset()),
    selectedTimeZoneOffset,
  );
  const endHH =
    endTime.get("hour") < 10 ? `0${endTime.get("hour")}` : endTime.get("hour");
  const endMM =
    endTime.get("minutes") < 10
      ? `0${endTime.get("minutes")}`
      : endTime.get("minutes");

  // 다음 program과 시간 같은 지 여부
  // const nextStartTime = calTimezoneDate(
  //   userTimezoneToUTC(
  //     dayjs(nextProgram.start_time),
  //     new Date().getTimezoneOffset(),
  //   ),
  //   selectedTimeZoneOffset,
  // );
  // const nextEndTime = calTimezoneDate(
  //   userTimezoneToUTC(
  //     dayjs(nextProgram.end_time),
  //     new Date().getTimezoneOffset(),
  //   ),
  //   selectedTimeZoneOffset,
  // );
  let isNextParallel = false;
  let isPrevParallel = false;
  let nextSpeaker = null;
  let nextTitle = null;
  let nextDescription = null;

  if (nextProgram) {
    const nextStartTime = dayjs(nextProgram.start_time);
    const nextEndTime = dayjs(nextProgram.end_time);
    isNextParallel =
      startTime.isSame(nextStartTime, "m") && endTime.isSame(nextEndTime, "m");

    nextSpeaker =
      nation === "china" && currentLanguage === "english"
        ? nextProgram.speakers_en
        : nextProgram.speakers;
    nextTitle =
      nation === "china" && currentLanguage === "english"
        ? nextProgram.title_en
        : nextProgram.title;
    nextDescription =
      nation === "china" && currentLanguage === "english"
        ? nextProgram.description_en
        : nextProgram.description;
  }
  if (prevProgram) {
    const prevStartTime = dayjs(prevProgram.start_time);
    const prevEndTime = dayjs(prevProgram.end_time);
    isPrevParallel =
      startTime.isSame(prevStartTime, "m") && endTime.isSame(prevEndTime, "m");
  }

  // 아젠다 edit 여부 포함된 리스트

  const [agendaEditList, setAgendaEditList] = useState<programAgendaEditType[]>(
    [],
  );

  // reordering loading
  const [reorderLoading, setReorderLoading] = useState<boolean>(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.common.black,
    "&.parallel": {
      cursor: "default",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    visibility: !isAdmin && isPrevParallel ? "hidden" : "visible",
    cursor: isAdmin ? "pointer" : "default",
    td: {
      // lineHeight: "2.2",
      padding: "6px 20px",
    },
    transition: "all 0.2s ease-in-out",
    opacity: isAdmin && isPrevParallel ? "0.3" : "1.0",
    ".speaker-text": {
      color: "#14b1e7",
    },
    ".title-col": {
      // whiteSpace: "nowrap",
      "&.emphasize .title": {
        fontWeight: theme.typography.fontWeightBold,
      },
    },
    "&.program-row:nth-of-type(odd)": {
      ".time-col": {
        backgroundColor: "#dbdbdb",
      },

      ".title-col": {
        backgroundColor: "#f6f6f6",
      },
    },
    "&.program-row:nth-of-type(even)": {
      ".time-col": {
        backgroundColor: "#cacaca",
      },

      ".title-col": {
        backgroundColor: "#ececec",
      },
    },
    // admin
    "&.admin": {
      transition: "all 0.2s ease",
    },
    "&.admin:hover": {
      opacity: "0.7",
    },
    ".agenda-move-section": {
      padding: "6px 20px",
      display: "flex",
      position: "absolute",
      transform: "translate(-80%,-50%)",
      color: "white",
    },
    // "&.admin.program-wrap:hover": {
    //   transform: "translateY(-5px)",
    // },

    "&.disabled": {
      pointerEvents: "none",
      opacity: "0.3",
    },
  }));

  const clickUpHandler = (
    agenda: Program.programAgendaType,
    indexInParent: number,
  ) => {
    const index = agendaEditList.findIndex((o) => o.id === agenda.id);
    const listCpy = [...agendaEditList];

    // 0
    const id0 = listCpy[index].id;
    const next0 = listCpy[index].next_id;
    // -1
    const idm1 = listCpy[index - 1].id;
    const nextm1 = listCpy[index - 1].next_id;
    // -2

    if (indexInParent - 2 >= 0 && listCpy[index - 2].next_id !== 99999) {
      const idm2 = listCpy[index - 2].id;
      const nextm2 = listCpy[index - 2].next_id;
    }

    // swap
    const tmp = listCpy[index - 1];
    listCpy[index - 1] = listCpy[index];
    listCpy[index] = tmp;

    // next id 재배정
    if (indexInParent - 2 >= 0 && listCpy[index - 2].next_id !== 99999) {
      listCpy[index - 2].next_id = id0;
    }
    listCpy[index - 1].next_id = idm1;
    listCpy[index].next_id = next0;

    setAgendaEditList(listCpy);
    const updatedList = [listCpy[index - 1], listCpy[index]];
    if (indexInParent - 2 >= 0 && listCpy[index - 2].next_id !== 99999) {
      updatedList.unshift(listCpy[index - 2]);
    }
  };

  const clickDownHandler = (
    agenda: Program.programAgendaType,
    indexInParent: number,
  ) => {
    const index = agendaEditList.findIndex((o) => o.id === agenda.id);
    const listCpy = [...agendaEditList];

    // 0
    const id0 = listCpy[index].id;
    const next0 = listCpy[index].next_id;
    // +1
    const idp1 = listCpy[index + 1].id;
    const nextp1 = listCpy[index + 1].next_id;
    // m1

    if (indexInParent > 0) {
      const idm1 = listCpy[index - 1].id;
      const nextm1 = listCpy[index - 1].next_id;
    }

    // swap
    const tmp = listCpy[index + 1];
    listCpy[index + 1] = listCpy[index];
    listCpy[index] = tmp;

    // next id 재배정

    if (indexInParent > 0) {
      listCpy[index - 1].next_id = idp1;
    }
    listCpy[index].next_id = id0;
    listCpy[index + 1].next_id = nextp1;

    setAgendaEditList(listCpy);
    const updatedList = [listCpy[index], listCpy[index + 1]];
    if (indexInParent > 0) {
      updatedList.unshift(listCpy[index - 1]);
    }
  };

  return (
    <StyledTableRow
      className={`program-row${isAdmin ? " admin" : ""}${
        reorderLoading ? " disabled" : ""
      }`}
    >
      <StyledTableCell className="time-col" align="center" width="134px">
        <Typography
          fontSize={mainFontSize}
          fontWeight={theme.typography.fontWeightMedium}
        >
          {`${startHH}:${startMM} - ${endHH}:${endMM}`}
        </Typography>
      </StyledTableCell>
      <StyledTableCell
        className={`title-col${emphasize ? " emphasize" : ""}`}
        align="left"
        colSpan={isNextParallel ? 1 : 2}
        onClick={onClick}
      >
        {speakers && (
          <Typography
            component="span"
            className="speaker-text title"
            fontSize={mainFontSize}
            fontWeight={theme.typography.fontWeightMedium}
          >
            {curSpeaker}
          </Typography>
        )}
        {speakers && title && (
          <Typography
            component="span"
            className="title"
            fontSize={mainFontSize}
            fontWeight={theme.typography.fontWeightMedium}
          >
            {" "}
            |{" "}
          </Typography>
        )}
        <Typography
          component="span"
          className="title"
          fontSize={mainFontSize}
          fontWeight={theme.typography.fontWeightMedium}
        >
          {curTitle}
        </Typography>
        <br />
        <Typography
          component="span"
          fontSize={mainFontSize}
          fontWeight={theme.typography.fontWeightMedium}
          color={theme.palette.grey[600]}
        >
          <InnerHTML html={curDescription} />
        </Typography>
      </StyledTableCell>
      {isNextParallel && (
        <StyledTableCell
          className={`title-col${emphasize ? " emphasize" : ""} parallel`}
          align="left"
        >
          {speakers && (
            <Typography
              component="span"
              className="speaker-text title"
              fontSize={mainFontSize}
              fontWeight={theme.typography.fontWeightMedium}
            >
              {nextSpeaker}
            </Typography>
          )}
          {speakers && title && (
            <Typography
              component="span"
              className="title"
              fontSize={mainFontSize}
              fontWeight={theme.typography.fontWeightMedium}
            >
              {" "}
              |{" "}
            </Typography>
          )}
          <Typography
            component="span"
            className="title"
            fontSize={mainFontSize}
            fontWeight={theme.typography.fontWeightMedium}
          >
            {nextTitle}
          </Typography>
          <br />
          <Typography
            component="span"
            fontSize={mainFontSize}
            fontWeight={theme.typography.fontWeightMedium}
            color={theme.palette.grey[600]}
          >
            <InnerHTML html={nextDescription} />
          </Typography>
        </StyledTableCell>
      )}
    </StyledTableRow>
  );
};

export default ProgramContent;
