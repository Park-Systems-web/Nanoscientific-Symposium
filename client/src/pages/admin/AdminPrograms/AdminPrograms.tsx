import React, { useEffect, useState } from "react";
import AdminLayout from "components/AdminLayout/AdminLayout";
import axios from "axios";
import Loading from "components/Loading/Loading";
import ProgramTitle from "components/Programs/ProgramTitle/ProgramTitle";
import ProgramContent from "components/Programs/ProgramContent/ProgramContent";
import { ProgramsListContainer } from "components/Programs/ProgramsListContainer";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import { AdminProgramsContainer } from "./AdminProgramsStyles";
import AddSessionForm from "../Forms/AddSessionForm";
import ModifySessionForm from "../Forms/ModifySessionForm";
import AddProgramForm from "../Forms/AddProgramForm";
import ModifyProgramForm from "../Forms/ModifyProgramForm";

const AdminPrograms = () => {
  const myCountry = "asia";

  const [programs, setPrograms] = useState<Program.programType[]>([]);
  const [sessions, setSessions] = useState<Program.sessionType[]>([]);
  const [programLoading, setProgramLoading] = useState<boolean>(false);
  const [sessionLoading, setSessionLoading] = useState<boolean>(false);

  const [addSessionSuccess, setAddSessionSuccess] = useState<boolean>(false);
  const [modifySessionSuccess, setModifySessionSuccess] =
    useState<boolean>(false);

  const [addProgramSuccess, setAddProgramSuccess] = useState<boolean>(false);
  const [modifyProgramSuccess, setModifyProgramSuccess] =
    useState<boolean>(false);

  const [openAddSessionForm, setOpenAddSesisonForm] = useState<boolean>(false);
  const [openModifySessionForm, setOpenModifySessionForm] =
    useState<boolean>(false);

  const [openAddProgramForm, setOpenAddProgramForm] = useState<boolean>(false);
  const [openModifyProgramForm, setOpenModifyProgramForm] =
    useState<boolean>(false);

  const [seletedSession, setSelectedSession] = useState<Program.sessionType>();
  const [seletedProgram, setSelectedProgram] = useState<Program.programType>();

  useEffect(() => {
    // 프로그램 가져오기
    const getPrograms = async () => {
      setProgramLoading(true);
      const programs = await axios.get(`/api/page/${myCountry}/programs`);
      setPrograms(programs.data);
      setProgramLoading(false);
    };

    getPrograms();
  }, [openAddProgramForm, openModifyProgramForm]);

  useEffect(() => {
    // 세션 가져오기
    const getSessions = async () => {
      setSessionLoading(true);
      const sessions = await axios.get(`/api/page/${myCountry}/sessions`);
      setSessions(sessions.data);
      setSessionLoading(false);
    };

    getSessions();
  }, [openModifySessionForm, openAddSessionForm]);

  if (programLoading || sessionLoading) {
    return <Loading />;
  }

  const openAddSessionFormHandler = () => {
    setOpenAddSesisonForm(true);
  };

  const openAddProgramFormHandler = () => {
    setOpenAddProgramForm(true);
  };

  return (
    <AdminLayout
      title="Programs"
      menu1="Add Session"
      menu1ClickHandler={openAddSessionFormHandler}
      menu2="Add Programs"
      menu2ClickHandler={openAddProgramFormHandler}
    >
      <AdminProgramsContainer>
        <ProgramsListContainer isAdmin>
          <article className="program-wrap">
            <section className="timeline-wrap timeline-0">
              {/* 세션을 크게 돌면서 세션에 해당하는값과 일치하는 프로그램 뿌려주기 */}
              {sessions.map((session) => {
                return (
                  <>
                    <ProgramTitle
                      onClick={() => {
                        setSelectedSession(session);
                        setOpenModifySessionForm(true);
                      }}
                      isAdmin
                      title={session.session_title}
                    />
                    <ul className="cbp_tmtimeline">
                      {programs
                        .filter((program) => {
                          return program.session === session.id;
                        })
                        .map((program, index) => (
                          <ProgramContent
                            onClick={() => {
                              setSelectedProgram(program);
                              setOpenModifyProgramForm(true);
                            }}
                            isAdmin
                            key={program.id}
                            {...program}
                            index={index}
                          />
                        ))}
                    </ul>
                  </>
                );
              })}
            </section>
          </article>
        </ProgramsListContainer>
      </AdminProgramsContainer>
      {openAddSessionForm && (
        <AddSessionForm
          openAddSessionForm={openAddSessionForm}
          setOpenAddSesisonForm={setOpenAddSesisonForm}
          setAddSessionSuccess={setAddSessionSuccess}
        />
      )}

      {openModifySessionForm && (
        <ModifySessionForm
          seletedSession={seletedSession as Program.sessionType}
          openModifySessionForm={openModifySessionForm}
          setOpenModifySessionForm={setOpenModifySessionForm}
          setModifySessionSuccess={setModifySessionSuccess}
        />
      )}

      {openAddProgramForm && (
        <AddProgramForm
          sessions={sessions}
          openAddProgramForm={openAddProgramForm}
          setOpenAddProgramForm={setOpenAddProgramForm}
          setAddProgramSuccess={setAddProgramSuccess}
        />
      )}

      {openModifyProgramForm && (
        <ModifyProgramForm
          sessions={sessions}
          seletedProgram={seletedProgram as Program.programType}
          openModifyProgramForm={openModifyProgramForm}
          setOpenModifyProgramForm={setOpenModifyProgramForm}
          setModifyProgramSuccess={setModifyProgramSuccess}
        />
      )}

      <TopCenterSnackBar
        value={addSessionSuccess}
        setValue={setAddSessionSuccess}
        severity="success"
        content="Success add session"
      />
      <TopCenterSnackBar
        value={modifySessionSuccess}
        setValue={setModifySessionSuccess}
        severity="success"
        content="Success modify session"
      />
    </AdminLayout>
  );
};

export default AdminPrograms;
