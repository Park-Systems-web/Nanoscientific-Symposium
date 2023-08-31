import React, { useEffect, useState } from "react";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import Loading from "components/Loading/Loading";

import { Table, TableContainer, TableBody, Box } from "@mui/material";
import LandingSection from "components/Section/LandingSection";
import { globalData } from "utils/GlobalData";
import ComingSoon from "components/ComingSoon/ComingSoon";
import useMenuStore from "store/MenuStore";
import { editorRole } from "utils/Roles";
import { useAuthState } from "context/AuthContext";
import NSSButton from "components/Button/NSSButton";
import useNSSType from "hooks/useNSSType";
import useCurrentYear from "hooks/useCurrentYear";
import useAdminStore from "store/AdminStore";
import dayjs from "dayjs";
import {
  ProgramsListContainer,
  StyledTimezoneSelect,
  SessionContainer,
} from "./ProgramsListContainer";
import ProgramContent from "./ProgramContent/ProgramContent";
import ProgramTitle from "./ProgramTitle/ProgramTitle";

const ProgramsList = () => {
  const { currentMenu } = useMenuStore();
  const { currentLanguage } = useAdminStore();
  const nssType = useNSSType();
  const authState = useAuthState();
  const pathname = usePageViews();
  const currentYear = useCurrentYear();
  const [programs, setPrograms] = useState<Program.programType[]>([]);
  const [sessions, setSessions] = useState<Program.sessionType[]>([]);
  const [programLoading, setProgramLoading] = useState<boolean>(false);
  const [sessionLoading, setSessionLoading] = useState<boolean>(false);
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
  const { programFileLink } = globalData.get(nssType) as Common.globalDataType;
  const config = {
    params: {
      nation: pathname,
      year: currentYear,
    },
  };
  useEffect(() => {
    const getPrograms = async () => {
      setProgramLoading(true);
      const programs = await axios.get(`/api/page/common/programs`, config);
      setPrograms(programs.data);
      setProgramLoading(false);
    };

    getPrograms();
  }, []);

  useEffect(() => {
    // 세션 가져오기
    const getSessions = async () => {
      setSessionLoading(true);
      const sessions = await axios.get(`/api/page/common/sessions`, config);
      setSessions(sessions.data);
      setSessionLoading(false);
    };

    getSessions();
  }, []);

  if (programLoading || sessionLoading) {
    return <Loading />;
  }

  return (
    <ProgramsListContainer className="body-fit">
      <Box className="layout">
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
        {((currentMenu &&
          currentMenu.is_published === 0 &&
          !editorRole.includes(authState.role)) ||
          sessions.length === 0) && <ComingSoon />}
        {((currentMenu && currentMenu.is_published === 1) ||
          editorRole.includes(authState.role)) &&
          sessions.map((session) => {
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
                sx={{ overflowX: "hidden", mb: 2 }}
              >
                <ProgramTitle
                  title={session.session_title}
                  timezone={selectedTimezone}
                  selectedTimeZoneOffset={selectedTimeZoneOffset}
                  date={session.date}
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
                      {filteredPrograms.map((program, index) => {
                        return (
                          <ProgramContent
                            selectedTimezone={selectedTimezone}
                            selectedTimeZoneOffset={selectedTimeZoneOffset}
                            isAdmin={false}
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
                          />
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </TableContainer>
            );
          })}
        {programFileLink && (
          <NSSButton
            variant="gradient"
            style={{ margin: "0 auto" }}
            onClick={() => {
              window.open(programFileLink, "_blank", "noopener noreferrer");
            }}
          >
            전체 프로그램 다운로드
          </NSSButton>
        )}
      </Box>
    </ProgramsListContainer>
  );
};

export default ProgramsList;
