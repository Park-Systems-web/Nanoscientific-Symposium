/* eslint-disable no-nested-ternary */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";
import axios, { AxiosResponse } from "axios";
import CommonModal from "components/CommonModal/CommonModal";
import useInput from "hooks/useInput";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import {
  calTimezoneDate,
  calTimezoneDateEurope,
  getUserTimezoneDate,
  isDateValid,
  userTimezoneToUTC,
} from "utils/Date";
import usePageViews from "hooks/usePageViews";
import useAdminStore from "store/AdminStore";
import useCurrentYear from "hooks/useCurrentYear";
import { escapeQuotes } from "utils/String";
import { useAuthState } from "../../../context/AuthContext";

interface SessionFormProps {
  openSessionForm: boolean;
  setOpenSessionForm: Dispatch<SetStateAction<boolean>>;
  setSessionSuccess: Dispatch<SetStateAction<boolean>>;
  selectedSession: Program.sessionType;
  getSessions: () => void;
  getPrograms: () => void;
  selectedTimezone: string;
  selectedTimeZoneOffset: string;
  edit: boolean;
  sessionValidAlert: boolean;
  setSessionValidAlert: Dispatch<SetStateAction<boolean>>;
}

const SessionForm = ({
  openSessionForm,
  setOpenSessionForm,
  setSessionSuccess,
  selectedSession,
  getSessions,
  getPrograms,
  selectedTimezone,
  selectedTimeZoneOffset,
  sessionValidAlert,
  setSessionValidAlert,
  // 편집모달일때는 edit 이 true 로 넘어온다
  edit = false,
}: SessionFormProps) => {
  const authState = useAuthState();
  const pathname = usePageViews();
  const { currentLanguage } = useAdminStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Common.showStatus>("show");
  const [date, setDate] = useState<Dayjs | null>(
    edit
      ? pathname !== "eu"
        ? calTimezoneDate(
            userTimezoneToUTC(
              dayjs(selectedSession.date),
              new Date().getTimezoneOffset(),
            ),
            selectedTimeZoneOffset,
          )
        : calTimezoneDateEurope(
            userTimezoneToUTC(
              dayjs(selectedSession.date),
              new Date().getTimezoneOffset(),
            ),
            selectedTimeZoneOffset,
          )
      : dayjs(),
  );

  const title = useInput(edit ? selectedSession.session_title : "");
  const title_en = useInput(edit ? selectedSession.session_title_en : "");
  const currentYear = useCurrentYear();

  const sessionSubmitHandler = async () => {
    if (title.value === "" || !date || !date.isValid()) {
      setSessionValidAlert(true);
      return;
    }
    setLoading(true);
    let data;

    // 편집 모달이라면 put 호출
    if (edit) {
      data = await axios.put("/api/admin/session", {
        nation: pathname,
        language: pathname === "china" ? currentLanguage : undefined,
        id: selectedSession.id,
        title: escapeQuotes(title.value),
        title_en: pathname === "china" ? title_en.value : undefined,
        status: status === "show" ? 1 : 0,
        date:
          pathname !== "eu"
            ? calTimezoneDate(dayjs(date), selectedTimeZoneOffset, true)
            : calTimezoneDateEurope(dayjs(date), selectedTimeZoneOffset, true)
                .toDate()
                .toLocaleString("sv-SE"),
        year: currentYear,
      });
    } else {
      // 추가 모달이라면 post 호출
      data = await axios.post("/api/admin/session", {
        nation: pathname,
        title: escapeQuotes(title.value),
        title_en: pathname === "china" ? title_en.value : undefined,
        language: pathname === "china" ? currentLanguage : undefined,
        date:
          pathname !== "eu"
            ? calTimezoneDate(dayjs(date), selectedTimeZoneOffset, true)
            : calTimezoneDateEurope(dayjs(date), selectedTimeZoneOffset, true)
                .toDate()
                .toLocaleString("sv-SE"),
        year: currentYear,
      });
    }
    if (data.data.success) {
      setLoading(true);
      setSessionSuccess(true);
      setOpenSessionForm(false);
      getSessions();
    }
  };
  const dateChangeHandler = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  const statusChangeHandler = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: Common.showStatus,
  ) => {
    setStatus(newStatus);
  };

  const deleteHandler = async () => {
    try {
      setDeleteLoading(true);
      const data = await axios.delete(
        `/api/admin/session/${selectedSession.id}?nation=${pathname}`,
      );

      console.log(data.data.success);
    } catch (err) {
      alert(err);
    } finally {
      setDeleteLoading(false);
      setSessionSuccess(true);
      setOpenSessionForm(false);
      getSessions();
      getPrograms();
    }
  };

  return (
    <CommonModal
      open={openSessionForm}
      setOpen={setOpenSessionForm}
      title={edit ? "Modify Session" : "Add Session"}
      desc={
        edit
          ? "Please choose the title and date that you want to change."
          : "Please write down the session title and choose a date."
      }
      onSubmit={sessionSubmitHandler}
      loading={loading}
      submitDisabled={title.value === "" || !date.isValid()}
      deleteHandler={edit && deleteHandler}
    >
      {pathname === "china" ? ( // china 일때는 language 2개
        <>
          <TextField
            autoFocus
            margin="dense"
            label="Session Title (Chinese)"
            fullWidth
            variant="filled"
            required
            {...title}
            error={title.value === ""}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Session Title (English)"
            fullWidth
            variant="filled"
            sx={{ marginBottom: "30px" }}
            required
            {...title_en}
            error={title_en.value === ""}
          />
        </>
      ) : (
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          variant="filled"
          sx={{ marginBottom: "30px" }}
          required
          {...title}
          error={title.value === ""}
        />
      )}

      <LocalizationProvider dateAdapter={AdapterDayjs as any}>
        <DatePicker
          label="Session Date"
          value={date}
          onChange={dateChangeHandler}
          format="YYYY-MM-DD"
        />
      </LocalizationProvider>

      {/* 편집 모달일때만 show hide 보여주기 */}
      {/* {edit && (
        <ToggleButtonGroup
          size="large"
          color="primary"
          value={status}
          exclusive
          onChange={statusChangeHandler}
          sx={{ ml: 5 }}
        >
          <ToggleButton value="show">show</ToggleButton>
          <ToggleButton value="hide">hide</ToggleButton>
        </ToggleButtonGroup>
      )} */}
    </CommonModal>
  );
};

export default SessionForm;
