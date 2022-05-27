import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import NSSButton from "components/Button/NSSButton";
import Loading from "components/Loading/Loading";
import S3PdfUpload from "components/S3Upload/S3PdfUpload";
import usePageViews from "hooks/usePageViews";
import React, { useEffect, useState } from "react";
import useConfigStore from "store/ConfigStore";
import {
  mainFontSize,
  smallFontSize,
  subHeadingFontSize,
} from "utils/FontSize";
import { AbstractSubmissionContainer } from "./AbstractSubmissionStyles";

interface abstractProps {
  formNo: string;
}

const AbstractSubmission = ({ formNo }: abstractProps) => {
  const theme = useTheme();
  const pathname = usePageViews();
  const [mktoLoading, setMktoLoading] = useState<boolean>(false);

  // s3
  const [filePath, setFilePath] = useState<string>("");
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const configStore = useConfigStore();
  const { configState } = configStore;

  const submitHandler = async () => {
    setSubmitLoading(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const mktoForm = window.MktoForms2.allForms()[0];
    const formData = mktoForm.getValues();
    const {
      psAbstractTitle,
      Salutation,
      FirstName,
      LastName,
      Company,
      Department,
      Email,
      Phone,
      Country,
      State,
      psApplications,
      psExistingAFMBrand,
      psPresentationForm,
    } = formData;
    // 제출
    mktoForm.submit().onSuccess(() => {
      return false;
    });
    try {
      if (mktoForm.validate()) {
        // DB에 저장
        const res = await axios.post("/api/abstract", {
          nation: pathname,
          abstract_title: psAbstractTitle,
          salutation: Salutation,
          first_name: FirstName,
          last_name: LastName,
          institution: Company,
          department: Department,
          email: Email,
          phone: Phone,
          country: Country,
          state: State,
          application: psApplications,
          afm_model: psExistingAFMBrand,
          presentation_form: psPresentationForm,
          pdf_file_path: filePath,
        });

        // 메일 전송
        const res2 = await axios.post("/api/mail/abstract", {
          email: configState.alert_receive_email,
          attachment: filePath,
          title: psAbstractTitle,
          nation: pathname,
          presentationForm: psPresentationForm,
        });
        setSubmitSuccess(true);
      }
    } catch (err) {
      alert(err);
    } finally {
      setSubmitLoading(false);
    }
  };
  useEffect(() => {
    setMktoLoading(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.MktoForms2.loadForm(
      "//pages.parksystems.com",
      "988-FTP-549",
      formNo,
      (form: any) => {
        setMktoLoading(false);
        // 체크박스 layout 변경
        const check1 = document.querySelector("#LblpsmktOptin")?.parentElement;
        const check2 = document.querySelector("#LblpsOptin")?.parentElement;
        check1?.classList.add("flex-reverse");
        check2?.classList.add("flex-reverse");

        // Register button 제거
        const registerBtn = document.querySelector(".mktoButtonRow");
        registerBtn.remove();
      },
    );
  }, []);
  return (
    <AbstractSubmissionContainer className="body-fit">
      <Box className="layout">
        <Box sx={{ textAlign: "center" }}>
          <Typography
            fontSize={subHeadingFontSize}
            fontWeight={600}
            sx={{ mb: 2 }}
          >
            Abstract Submission
          </Typography>
          <Typography fontSize={mainFontSize} sx={{ mb: 2 }}>
            Submit your Abstract at NSFE 2022 and win up to €500 AFM Scholarship
            from Park Systems. The best paper will also be acknowledged with a
            featured article in NanoScientific Journal.
          </Typography>
          <Typography color="red" fontSize={smallFontSize} fontWeight={600}>
            Abstracts Submission Deadline: 30 June 2022.
          </Typography>
        </Box>
        {mktoLoading && (
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
        {!submitSuccess && (
          <form id={`mktoForm_${formNo}`} className="mktoForm" />
        )}
        {!mktoLoading && !submitSuccess && (
          <Stack justifyContent="center" alignItems="center">
            <S3PdfUpload
              filePath={filePath}
              setFilePath={setFilePath}
              setUploadLoading={setUploadLoading}
            />
            <NSSButton
              variant="gradient"
              className="registration-btn"
              onClick={submitHandler}
              disabled={uploadLoading}
              loading={submitLoading}
            >
              Submit
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
