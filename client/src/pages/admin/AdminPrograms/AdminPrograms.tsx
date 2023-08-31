import React, { useEffect, useState } from "react";
import AdminLayout from "components/AdminLayout/AdminLayout";
import axios from "axios";
import Loading from "components/Loading/Loading";
import ProgramTitle from "components/Programs/ProgramTitle/ProgramTitle";
import ProgramContent from "components/Programs/ProgramContent/ProgramContent";
import {
  ProgramsListContainer,
  StyledTimezoneSelect,
} from "components/Programs/ProgramsListContainer";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import SessionForm from "pages/admin/Forms/SessionForm";
import ProgramForm from "pages/admin/Forms/ProgramForm";
import ProgramHideForm from "pages/admin/Forms/ProgramHideForm";
import { useAuthState } from "context/AuthContext";
import usePageViews from "hooks/usePageViews";
import useCurrentYear from "hooks/useCurrentYear";
import { Table, TableContainer, TableBody } from "@mui/material";
import dayjs from "dayjs";
import { AdminProgramsContainer } from "./AdminProgramsStyles";
import AgendaForm from "../Forms/AgendaForm";

interface ProgramListProps {
  // eslint-disable-next-line react/require-default-props
  concurrent?: boolean;
}
const AdminPrograms = ({ concurrent }: ProgramListProps) => {
  const authState = useAuthState();
  const pathname = usePageViews();
  const currentYear = useCurrentYear();

  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [selectedTimeZoneOffset, setSelectedTimeZoneOffset] = useState<string>(
    new Date()
      .toLocaleString("sv-SE", {
        timeZone: selectedTimezone,
        timeZoneName: "short",
      })
      .split("GMT")[1],
  );
  // 스위치 상태
  const [hideToggle, setHideToggle] = useState<boolean>(false);
  // publish loading
  const [isAdminLoading, setIsAdminLoading] = useState<boolean>(false);
  // 현재 publish 상태
  const [isPublished, setIsPublished] = useState<boolean>(false);

  const [programs, setPrograms] = useState<Program.programType[]>([]);
  const [programAgenda, setProgramAgenda] = useState<
    Program.programAgendaType[]
  >([]);
  const [sessions, setSessions] = useState<Program.sessionType[]>([]);
  const [programLoading, setProgramLoading] = useState<boolean>(false);
  const [sessionLoading, setSessionLoading] = useState<boolean>(false);
  const [agendaEdit, setAgendaEdit] = useState<boolean>(false);
  const [sessionEdit, setSessionEdit] = useState<boolean>(false);
  const [programEdit, setProgramEdit] = useState<boolean>(false);

  const [openSessionForm, setOpenSessionForm] = useState<boolean>(false);
  const [sessionSuccess, setSessionSuccess] = useState<boolean>(false);

  const [openAgendaForm, setOpenAgendaForm] = useState<boolean>(false);
  const [agendaSuccess, setAgendaSuccess] = useState<boolean>(false);

  const [openProgramForm, setOpenProgramForm] = useState<boolean>(false);
  const [programSuccess, setProgramSuccess] = useState<boolean>(false);

  const [openHideForm, setOpenHideForm] = useState<boolean>(false);

  const [selectedSession, setSelectedSession] = useState<Program.sessionType>();
  const [selectedProgram, setSelectedProgram] = useState<Program.programType>();
  const [selectedAgenda, setSelectedAgenda] =
    useState<Program.programAgendaType>();

  // alert
  const [agendaValidAlert, setAgendaValidAlert] = useState<boolean>(false);
  const [programValidAlert, setProgramValidAlert] = useState<boolean>(false);
  const [sessionValidAlert, setSessionValidAlert] = useState<boolean>(false);

  const config = {
    params: {
      nation: pathname,
      year: currentYear,
    },
  };
  // alert
  const [publishSuccessAlert, setPublishSuccessAlert] =
    useState<boolean>(false);
  const getPrograms = async () => {
    setProgramLoading(true);
    const programs = await axios.get(`/api/page/common/programs`, config);
    setPrograms(programs.data);
    setProgramLoading(false);
  };

  const getSessions = async () => {
    setSessionLoading(true);
    const sessions = await axios.get(`/api/page/common/sessions`, config);
    setSessions(sessions.data);
    setSessionLoading(false);
  };

  const getIsAdmin = async () => {
    setIsAdminLoading(true);
    axios
      .post("/api/menu/admin", {
        nation: pathname,
        path: `/program`,
      })
      .then((res) => {
        setHideToggle(res.data.result);
        setIsPublished(res.data.result);
      })
      .catch((err) => {
        alert(`getIsAdmin ${err}`);
      })
      .finally(() => {
        setIsAdminLoading(false);
      });
  };

  const getProgramAgenda = async () => {
    setProgramLoading(true);
    const result = await axios.get(`/api/page/common/programs/agenda`, config);
    const agendaList = result.data.data;
    const sorted = agendaList
      .sort((aa: Program.programAgendaType, bb: Program.programAgendaType) => {
        if (aa.next_id === bb.id) return -1;
        if (aa.next_id !== bb.id || aa.next_id === 9999) return 1;
        return 0;
      })
      .sort((aa: Program.programAgendaType, bb: Program.programAgendaType) => {
        if (aa.program_id >= bb.program_id) return 1;
        return 0;
      });
    setProgramAgenda(sorted);
    setProgramLoading(false);
  };

  const hideToggleHandler = () => {
    setIsAdminLoading(true);
    axios
      .put("/api/menu/admin", {
        path: "/program",
        nation: pathname,
        isPublished: hideToggle,
      })
      .then(() => {
        setPublishSuccessAlert(true);
        setIsPublished(hideToggle);
      })
      .finally(() => {
        setIsAdminLoading(false);
      });
  };

  useEffect(() => {
    // 프로그램 가져오기
    getPrograms();
    // publish state 가져오기
    getIsAdmin();
    getProgramAgenda();
  }, []);

  useEffect(() => {
    // 세션 가져오기
    getSessions();
  }, []);

  if (programLoading || sessionLoading) {
    return <Loading />;
  }

  const openSessionFormHandler = () => {
    setSessionEdit(false);
    setOpenSessionForm(true);
  };

  const openProgramFormHandler = () => {
    setProgramEdit(false);
    setOpenProgramForm(true);
  };

  const openAgendaFormHandler = () => {
    setAgendaEdit(false);
    setOpenAgendaForm(true);
  };

  return (
    <AdminLayout
      title="Programs"
      isPublished={isPublished}
      menus={[
        {
          name: "Add Session",
          clickHandler: openSessionFormHandler,
        },
        {
          name: "Add Programs",
          clickHandler: openProgramFormHandler,
          disabled: sessions.length === 0,
        },
        // {
        //   name: "Add Agenda",
        //   clickHandler: openAgendaFormHandler,
        //   disabled: programs.length === 0,
        // },
      ]}
    >
      <AdminProgramsContainer>
        <ProgramsListContainer className="layout">
          <StyledTimezoneSelect
            value={selectedTimezone}
            onChange={(e) => {
              setSelectedTimezone(e.value);
              setSelectedTimeZoneOffset(
                e.label.substring(
                  e.label.indexOf("GMT") + 3,
                  e.label.indexOf(")"),
                ),
              );
            }}
          />
          {sessions.map((session) => {
            const filteredPrograms = programs
              .filter((program) => {
                return program.session === session.id;
              })
              .sort((a, b) => {
                // eslint-disable-next-line no-nested-ternary
                return dayjs(a.start_time).isAfter(dayjs(b.start_time))
                  ? 1
                  : a.id > b.id
                  ? 1
                  : -1;
              });

            return (
              <TableContainer
                key={session.id}
                sx={{ overflowX: "hidden", mb: 8 }}
              >
                <ProgramTitle
                  title={session.session_title}
                  timezone={selectedTimezone}
                  selectedTimeZoneOffset={selectedTimeZoneOffset}
                  date={session.date}
                  isAdmin
                  onClick={() => {
                    setSelectedSession(session);
                    setSessionEdit(true);
                    setOpenSessionForm(true);
                  }}
                />
                <div className="program-table-container">
                  <Table
                    sx={{
                      width: "100%",
                      // minWidth: "600px",
                      mb: 1,
                      borderCollapse: "separate",
                      borderSpacing: "10px",
                    }}
                  >
                    <TableBody>
                      {!concurrent &&
                        programs
                          .filter((program) => {
                            return program.session === session.id;
                          })
                          .map((program, index) => (
                            <ProgramContent
                              selectedTimezone={selectedTimezone}
                              selectedTimeZoneOffset={selectedTimeZoneOffset}
                              isAdmin
                              key={program.id}
                              {...program}
                              index={index}
                              onClick={() => {
                                setSelectedProgram(program);
                                setProgramEdit(true);
                                setOpenProgramForm(true);
                              }}
                            />
                          ))}
                      {concurrent &&
                        filteredPrograms.map((program, index) => (
                          <ProgramContent
                            selectedTimezone={selectedTimezone}
                            selectedTimeZoneOffset={selectedTimeZoneOffset}
                            isAdmin
                            key={program.id}
                            nextProgram={
                              index === filteredPrograms.length - 1
                                ? null
                                : filteredPrograms[index + 1]
                            }
                            prevProgram={
                              index === 0 ? null : filteredPrograms[index - 1]
                            }
                            {...program}
                            index={index}
                            onClick={() => {
                              setSelectedProgram(program);
                              setProgramEdit(true);
                              setOpenProgramForm(true);
                            }}
                          />
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TableContainer>
            );
          })}
        </ProgramsListContainer>
      </AdminProgramsContainer>

      {openSessionForm && (
        <SessionForm
          getSessions={() => {
            getSessions();
          }}
          getPrograms={() => {
            getPrograms();
          }}
          selectedSession={selectedSession as Program.sessionType}
          openSessionForm={openSessionForm}
          setOpenSessionForm={setOpenSessionForm}
          setSessionSuccess={setSessionSuccess}
          edit={sessionEdit}
          selectedTimezone={selectedTimezone}
          selectedTimeZoneOffset={selectedTimeZoneOffset}
          sessionValidAlert={sessionValidAlert}
          setSessionValidAlert={setSessionValidAlert}
        />
      )}

      {openProgramForm && (
        <ProgramForm
          getPrograms={() => {
            getPrograms();
          }}
          sessions={sessions}
          selectedProgram={selectedProgram as Program.programType}
          openProgramForm={openProgramForm}
          setOpenProgramForm={setOpenProgramForm}
          setProgramSuccess={setProgramSuccess}
          edit={programEdit}
          selectedTimezone={selectedTimezone}
          selectedTimeZoneOffset={selectedTimeZoneOffset}
          programValidAlert={programValidAlert}
          setProgramValidAlert={setProgramValidAlert}
        />
      )}

      {openAgendaForm && (
        <AgendaForm
          getProgramAgenda={() => {
            getProgramAgenda();
          }}
          programs={programs}
          sessions={sessions}
          selectedAgenda={selectedAgenda as Program.programAgendaType}
          openAgendaForm={openAgendaForm}
          setOpenAgendaForm={setOpenAgendaForm}
          setAgendaSuccess={setAgendaSuccess}
          edit={agendaEdit}
          agendaValidAlert={agendaValidAlert}
          setAgendaValidAlert={setAgendaValidAlert}
        />
      )}

      {openHideForm && (
        <ProgramHideForm
          openHideForm={openHideForm}
          setOpenHideForm={setOpenHideForm}
          refreshFunction={() => {
            getSessions();
            getPrograms();
          }}
        />
      )}
      <TopCenterSnackBar
        value={sessionSuccess}
        setValue={setSessionSuccess}
        severity="success"
        content="Success"
      />
      <TopCenterSnackBar
        value={programSuccess}
        setValue={setProgramSuccess}
        severity="success"
        content="Success"
      />
      <TopCenterSnackBar
        value={agendaSuccess}
        setValue={setAgendaSuccess}
        severity="success"
        content="Success"
      />
      <TopCenterSnackBar
        value={agendaValidAlert}
        setValue={setAgendaValidAlert}
        severity="warning"
        content="Please fill required fields"
      />
      <TopCenterSnackBar
        value={programValidAlert}
        setValue={setProgramValidAlert}
        severity="warning"
        content="Please fill required fields"
      />
      <TopCenterSnackBar
        value={sessionValidAlert}
        setValue={setSessionValidAlert}
        severity="warning"
        content="Please fill required fields"
      />
      <TopCenterSnackBar
        value={publishSuccessAlert}
        setValue={setPublishSuccessAlert}
        severity="success"
        content="Publish state is successfully updated."
      />
    </AdminLayout>
  );
};

export default AdminPrograms;
