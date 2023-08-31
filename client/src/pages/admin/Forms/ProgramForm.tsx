/* eslint-disable no-nested-ternary */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Checkbox,
  Select,
  SelectChangeEvent,
  TextField,
  FormControlLabel,
} from "@mui/material";
import CommonModal from "components/CommonModal/CommonModal";

import MenuItem from "@mui/material/MenuItem";
import {
  DateTimePicker,
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { escapeQuotes } from "utils/String";
import { LoadingButton } from "@mui/lab";
import dayjs, { Dayjs } from "dayjs";

import axios from "axios";
import useInput from "hooks/useInput";
import usePageViews from "hooks/usePageViews";
import useCurrentYear from "hooks/useCurrentYear";
import {
  calTimezoneDate,
  calTimezoneDateEurope,
  getUserTimezoneDate,
  getUserTimezoneString,
  isDateStringValid,
  isDateValid,
  userTimezoneToUTC,
} from "utils/Date";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiPickersAdapter } from "@mui/x-date-pickers/internals";

interface ProgramFormProps {
  openProgramForm: boolean;
  programValidAlert: boolean;
  setOpenProgramForm: Dispatch<SetStateAction<boolean>>;
  setProgramSuccess: Dispatch<SetStateAction<boolean>>;
  setProgramValidAlert: Dispatch<SetStateAction<boolean>>;
  selectedProgram: Program.programType;
  sessions: Program.sessionType[];
  getPrograms: () => void;
  selectedTimezone: string;
  selectedTimeZoneOffset: string;
  edit: boolean;
}
const ProgramForm = ({
  openProgramForm,
  setOpenProgramForm,
  selectedProgram,
  setProgramSuccess,
  programValidAlert,
  setProgramValidAlert,
  sessions,
  getPrograms,
  selectedTimezone,
  selectedTimeZoneOffset,
  edit = false,
}: ProgramFormProps) => {
  const pathname = usePageViews();
  const currentYear = useCurrentYear();

  const [startTime, setStartTime] = useState<Dayjs | null>(
    edit
      ? pathname !== "eu"
        ? calTimezoneDate(
            userTimezoneToUTC(
              dayjs(selectedProgram.start_time),
              new Date().getTimezoneOffset(),
            ),
            selectedTimeZoneOffset,
          )
        : calTimezoneDateEurope(
            userTimezoneToUTC(
              dayjs(selectedProgram.start_time),
              new Date().getTimezoneOffset(),
            ),
            selectedTimeZoneOffset,
          )
      : dayjs(sessions[0].date),
  );
  const [endTime, setEndTime] = useState<Dayjs | null>(
    edit
      ? pathname !== "eu"
        ? calTimezoneDate(
            userTimezoneToUTC(
              dayjs(selectedProgram.end_time),
              new Date().getTimezoneOffset(),
            ),
            selectedTimeZoneOffset,
          )
        : calTimezoneDateEurope(
            userTimezoneToUTC(
              dayjs(selectedProgram.end_time),
              new Date().getTimezoneOffset(),
            ),
            selectedTimeZoneOffset,
          )
      : dayjs(sessions[0].date),
  );
  const [emphasizeCheck, setEmphasizeCheck] = useState<boolean>(
    edit ? selectedProgram.emphasize === 1 : false,
  );
  const [speakerCheck, setSpeakerCheck] = useState<boolean>(
    edit ? selectedProgram.speakers !== "" : false,
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const programSubmitHandler = async () => {
    if (!startTime || !endTime || !startTime.isValid() || !endTime.isValid()) {
      setProgramValidAlert(true);
      return;
    }
    setLoading(true);
    let data;

    if (edit) {
      data = await axios.put("/api/admin/program", {
        nation: pathname,
        id: selectedProgram.id,
        title: escapeQuotes(title.value),
        speakers: escapeQuotes(speakers.value),
        description: escapeQuotes(description.value),
        startTime:
          pathname !== "eu"
            ? calTimezoneDate(dayjs(startTime), selectedTimeZoneOffset, true)
            : calTimezoneDateEurope(
                dayjs(startTime),
                selectedTimeZoneOffset,
                true,
              )
                .toDate()
                .toLocaleString("sv-SE"),
        endTime:
          pathname !== "eu"
            ? calTimezoneDate(dayjs(endTime), selectedTimeZoneOffset, true)
            : calTimezoneDateEurope(
                dayjs(endTime),
                selectedTimeZoneOffset,
                true,
              )
                .toDate()
                .toLocaleString("sv-SE"),
        // startTime: getUserTimezoneString(startTime, "utc"),
        // endTime: getUserTimezoneString(endTime, "utc"),
        session: selectedSession,
        emphasize: emphasizeCheck,
        year: currentYear,
      });
    } else {
      data = await axios.post("/api/admin/program", {
        nation: pathname,
        session: selectedSession,
        title: escapeQuotes(title.value),
        speakers: escapeQuotes(speakers.value),
        description: escapeQuotes(description.value),
        startTime:
          pathname !== "eu"
            ? calTimezoneDate(dayjs(startTime), selectedTimeZoneOffset, true)
            : calTimezoneDateEurope(
                dayjs(startTime),
                selectedTimeZoneOffset,
                true,
              )
                .toDate()
                .toLocaleString("sv-SE"),
        endTime:
          pathname !== "eu"
            ? calTimezoneDate(dayjs(endTime), selectedTimeZoneOffset, true)
            : calTimezoneDateEurope(
                dayjs(endTime),
                selectedTimeZoneOffset,
                true,
              )
                .toDate()
                .toLocaleString("sv-SE"),
        // startTime: getUserTimezoneString(startTime, "utc"),
        // endTime: getUserTimezoneString(endTime, "utc"),
        emphasize: emphasizeCheck ? 1 : 0,
        year: currentYear,
      });
    }

    if (data.data.success) {
      setLoading(false);
      setProgramSuccess(true);
      setOpenProgramForm(false);
      getPrograms();
    }
  };

  // selectedProgram.session 은 id 이고 selectedSession 은 string 이 들어가야한다
  const [selectedSession, setSelectedSession] = useState<number>(
    edit ? selectedProgram.session : sessions[0].id,
  );

  const title = useInput(edit ? selectedProgram.title : "");
  const speakers = useInput(edit ? selectedProgram.speakers : "");
  const description = useInput(edit ? selectedProgram.description : "");

  const changeSessionHandler = (event: SelectChangeEvent<number>) => {
    setSelectedSession(event.target.value as number);

    const selectedSessionArr = sessions.filter((session) => {
      return session.id === event.target.value;
    });
    const selectedDate = dayjs(selectedSessionArr[0].date);
    const newYear = selectedDate.get("year");
    const newMonth = selectedDate.get("month");
    const newDate = selectedDate.get("date");

    const newStart = dayjs()
      .set("year", newYear)
      .set("month", newMonth)
      .set("date", newDate);

    setStartTime(newStart);
    setEndTime(newStart);

    // const newDate = getUserTimezoneString(
    //   selectedSessionArr[0].date,
    //   selectedTimezone,
    // );
    // setStartTime(newDate);
    // setEndTime(newDate);
  };

  const deleteHandler = async () => {
    try {
      setDeleteLoading(true);
      const result = await axios.delete(
        `/api/admin/program/${selectedProgram.id}?nation=${pathname}`,
      );
      if (result.data.success) {
        setProgramSuccess(true);
        setOpenProgramForm(false);
      }
    } catch (err) {
      alert(err);
    } finally {
      setDeleteLoading(false);
      getPrograms();
    }
  };

  useEffect(() => {
    if (!speakerCheck) {
      speakers.value = "";
    }
  }, [speakerCheck]);

  return (
    <CommonModal
      open={openProgramForm}
      setOpen={setOpenProgramForm}
      title={edit ? "Modify Program" : "Add Program"}
      desc={
        edit
          ? "Please choose the title and date that you want to change."
          : "Please choose the proper item to add the program."
      }
      onSubmit={programSubmitHandler}
      loading={loading}
      submitDisabled={
        // title.value === "" ||
        // !isDateStringValid(startTime) || !isDateStringValid(endTime)
        false
      }
      deleteHandler={edit && deleteHandler}
    >
      <FormControl fullWidth sx={{ mt: 3, mb: 3 }}>
        <InputLabel id="demo-simple-select-label">Session</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSession}
          label="Session"
          onChange={(event: SelectChangeEvent<number>) => {
            changeSessionHandler(event);
          }}
          required
        >
          {sessions.map((session) => (
            <MenuItem key={session.id} value={session.id}>
              {session.session_title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={emphasizeCheck}
            onClick={() => setEmphasizeCheck(!emphasizeCheck)}
          />
        }
        label="Emphasize?"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={speakerCheck}
            onClick={() => setSpeakerCheck(!speakerCheck)}
          />
        }
        label="Has Speaker?"
      />
      <TextField
        margin="dense"
        label="Speaker"
        fullWidth
        variant="filled"
        disabled={!speakerCheck}
        sx={{ marginBottom: "30px" }}
        {...speakers}
        value={!speakerCheck ? "" : speakers.value}
      />
      <TextField
        margin="dense"
        label={speakerCheck ? "Affiliation" : "Title"}
        fullWidth
        variant="filled"
        sx={{ marginBottom: "30px" }}
        // error={escapeQuotes(title.value) === ""}
        {...title}
      />
      <TextField
        margin="dense"
        label="Description"
        fullWidth
        variant="filled"
        multiline
        sx={{ marginBottom: "30px" }}
        {...description}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs as any}>
        <DateTimePicker
          label="Start Time"
          value={startTime}
          onChange={(newValue: Dayjs) => {
            setStartTime(newValue);
          }}
          format="YYYY-MM-DD HH:mm"
          ampm={false}
        />
        {"  "}
        <DateTimePicker
          label="End Time"
          value={endTime}
          onChange={(newValue: Dayjs) => {
            setEndTime(newValue);
          }}
          format="YYYY-MM-DD HH:mm"
          ampm={false}
        />
      </LocalizationProvider>
      <h3 style={{ marginTop: "5px" }}>
        {" "}
        Please enter the above time based on your location. ✔ {selectedTimezone}
        (GMT{selectedTimeZoneOffset})
      </h3>
      {/* {edit && (
        <ToggleButtonGroup
          size="large"
          color="primary"
          value={status}
          exclusive
          onChange={statusChangeHandler}
        >
          <ToggleButton value="show">show</ToggleButton>
          <ToggleButton value="hide">hide</ToggleButton>
        </ToggleButtonGroup>
      )} */}
    </CommonModal>
  );
};

export default ProgramForm;
