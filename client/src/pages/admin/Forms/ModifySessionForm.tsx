import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from "axios";
import CommonModal from "components/CommonModal/CommonModal";
import useInput from "hooks/useInput";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface ModifySessionFormProps {
  openModifySessionForm: boolean;
  setOpenModifySessionForm: Dispatch<SetStateAction<boolean>>;
  setModifySessionSuccess: Dispatch<SetStateAction<boolean>>;
  seletedSession: Program.sessionType;
}

const ModifySessionForm = ({
  openModifySessionForm,
  setOpenModifySessionForm,
  setModifySessionSuccess,
  seletedSession,
}: ModifySessionFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Common.showStatus>("show");
  const [date, setDate] = useState<Date | null>(new Date(seletedSession.date));
  const title = useInput(seletedSession.session_title);

  const modifySessionSubmitHandler = async () => {
    setLoading(true);
    const { data } = await axios.put("/api/admin/session", {
      country: "asia",
      id: seletedSession.id,
      title: title.value,
      status: status === "show" ? 1 : 0,
      date,
    });
    if (data.success) {
      setLoading(true);
      setModifySessionSuccess(true);
      setOpenModifySessionForm(false);
    }
  };
  const dateChangeHandler = (newValue: Date | null) => {
    setDate(newValue);
  };

  const statusChangeHandler = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: Common.showStatus,
  ) => {
    setStatus(newStatus);
  };

  return (
    <CommonModal
      open={openModifySessionForm}
      setOpen={setOpenModifySessionForm}
      title="Modify Session"
      desc="Please choose the title and date that you want to change."
      onSubmit={modifySessionSubmitHandler}
      loading={loading}
    >
      <TextField
        autoFocus
        margin="dense"
        label="Session Title"
        fullWidth
        variant="filled"
        sx={{ marginBottom: "30px" }}
        {...title}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/dd/yyyy"
          value={date}
          onChange={dateChangeHandler}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
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
    </CommonModal>
  );
};

export default ModifySessionForm;
