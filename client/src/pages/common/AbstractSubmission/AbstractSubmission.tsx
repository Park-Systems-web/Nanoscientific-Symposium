/* eslint-disable no-restricted-globals */
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import useNSSType from "hooks/useNSSType";
import axios from "axios";
import NSSButton from "components/Button/NSSButton";
import LandingTextEditor from "components/LandingTextEditor/LandingTextEditor";
import Loading from "components/Loading/Loading";
import MarketoForm from "components/MarketoForm/MarketoForm";
import S3MultiplePdfUpload from "components/S3Upload/S3MultiplePdfUpload";
import usePageViews from "hooks/usePageViews";
import React, { useEffect, useRef, useState } from "react";
import useCurrentYear from "hooks/useCurrentYear";
import { useNavigate } from "react-router";
import useConfigStore from "store/ConfigStore";
import {
  mainFontSize,
  smallFontSize,
  subHeadingFontSize,
} from "utils/FontSize";
import { globalData } from "utils/GlobalData";
import { escapeQuotes } from "utils/String";
import useMenuStore from "store/MenuStore";
import { editorRole } from "utils/Roles";
import { useAuthState } from "context/AuthContext";
import { AbstractSubmissionContainer } from "./AbstractSubmissionStyles";

interface abstractProps {
  formNo: string;
}

const AbstractSubmission = ({ formNo }: abstractProps) => {
  const theme = useTheme();
  const pathname = usePageViews();
  const nssType = useNSSType();
  const currentYear = useCurrentYear();
  const [mktoLoading, setMktoLoading] = useState<boolean>(false);
  const { currentMenu } = useMenuStore();
  const authState = useAuthState();

  const mktoRef = useRef<HTMLFormElement>();

  // s3
  // const [filePath, setFilePath] = useState<string[]>([]);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  // const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  //
  const [description, setDescription] = useState<string>("");
  const [initialDescription, setInitialDescription] = useState<string>("");
  const [descId, setDescId] = useState(0);
  const [descriptionEdit, setDescriptionEdit] = useState<boolean>(false);
  const [descriptionPreview, setDescriptionPreview] = useState<boolean>(false);
  const [descriptionPreviewContent, setDescriptionPreviewContent] =
    useState<string>("");
  //
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const configStore = useConfigStore();
  const { configState } = configStore;
  const { submitBtnText } = globalData.get(nssType);
  const navigate = useNavigate();

  const jpSubmitHandler = async () => {
    if (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      !window.MktoForms2.allForms()[
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.MktoForms2.allForms().length - 1
      ]?.validate()
    ) {
      //
    } else {
      setSubmitLoading(true);
      const mktoForm =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.MktoForms2.allForms()[
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          window.MktoForms2.allForms().length - 1
        ];
      const formData = mktoForm.getValues();
      const {
        FirstName,
        LastName,
        psJPkanaLastName,
        psJPkanaFirstName,
        Company,
        Department,
        Email,
        Phone,
        psAbstractTitle,
        abstractDescription,
      } = formData;
      // 제출
      mktoForm.submit().onSuccess(() => {
        return false;
      });
      try {
        // DB에 저장
        const res = await axios.post("/api/abstract", {
          nation: pathname,
          abstract_title: psAbstractTitle,
          first_name: FirstName,
          last_name: LastName,
          institution: Company,
          department: Department,
          email: Email,
          phone: Phone,
          presentation_form: "Poster",
          year: currentYear,
        });

        // 메일 전송
        const res2 = await axios.post("/api/mail/abstract", {
          email: configState.alert_receive_email || "eric.kim@parksystems.com",
          nation: pathname,
          formData,
          year: currentYear,
        });

        setSubmitSuccess(true);
      } catch (err) {
        alert(err);
      } finally {
        setSubmitLoading(false);
      }
    }
  };

  // description 가져오기
  const getDescription = async () => {
    const res = await axios.get("/api/page/common/abstract", {
      params: {
        nation: pathname,
        year: currentYear,
      },
    });
    setDescId(res.data.result[0].id);
    const { desc } = res.data.result[0];
    setInitialDescription(desc);
    setDescription(desc);
  };

  const applyDescription = async () => {
    // eslint-disable-next-line no-alert
    console.log(initialDescription);
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/abstract`, {
        nation: pathname,
        desc: escapeQuotes(description),
        id: descId,
        year: currentYear,
      });
      // setInitialDescription(description);
      getDescription();
      setDescriptionEdit(false);
    }
  };
  useEffect(() => {
    getDescription();
    console.log(currentMenu);
  }, []);

  useEffect(() => {
    setMktoLoading(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.MktoForms2.loadForm(
      "//pages.parksystems.com",
      "988-FTP-549",
      formNo,
      (form: any) => {
        // 체크박스 layout 변경
        // const check1 =
        //   document.querySelector("#LblpsmktOptin")?.parentElement;
        // const check2 = document.querySelector("#LblpsOptin")?.parentElement;
        // check1?.classList.add("flex-reverse");
        // check2?.classList.add("flex-reverse");

        // Register button 제거
        const registerBtn = document.querySelector(".mktoButtonRow");
        registerBtn.remove();
        setMktoLoading(false);
      },
    );
  }, []);
  // }, [mktoLoading]);

  return (
    <AbstractSubmissionContainer className="body-fit">
      <Box className="layout">
        <Box sx={{ textAlign: "center" }}>
          <LandingTextEditor
            initialValue={initialDescription}
            value={description}
            setValue={setDescription}
            edit={descriptionEdit}
            setEdit={setDescriptionEdit}
            preview={descriptionPreview}
            setPreview={setDescriptionPreview}
            previewContent={descriptionPreviewContent}
            setPreviewContent={setDescriptionPreviewContent}
            applyHandler={applyDescription}
          >
            {initialDescription || ""}
          </LandingTextEditor>
        </Box>
        {((currentMenu && currentMenu.show === 1) ||
          editorRole.includes(authState.role)) &&
          mktoLoading && (
            <Box
              sx={{
                width: "100%",
                margin: "25% 0",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}

        {((currentMenu && currentMenu.show === 1) ||
          editorRole.includes(authState.role)) &&
          !submitSuccess && <MarketoForm formId={formNo} />}
        {!mktoLoading && !submitSuccess && pathname !== "jp" && (
          <Stack justifyContent="center" alignItems="center">
            <S3MultiplePdfUpload
              uploadLoading={uploadLoading}
              setUploadLoading={setUploadLoading}
              setSubmitSuccess={setSubmitSuccess}
              required
            />
          </Stack>
        )}
        {!mktoLoading && !submitSuccess && pathname === "jp" && (
          <Stack justifyContent="center" alignItems="center">
            <NSSButton
              variant="gradient"
              className="registration-btn"
              onClick={jpSubmitHandler}
              disabled={uploadLoading}
              loading={submitLoading}
            >
              {submitBtnText}
            </NSSButton>
          </Stack>
        )}
        {submitSuccess && (
          <Typography
            textAlign="center"
            sx={{ margin: "100px 0" }}
            fontWeight={600}
          >
            Thanks for your submission.
          </Typography>
        )}
      </Box>
    </AbstractSubmissionContainer>
  );
};

export default AbstractSubmission;
