import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import Loading from "components/Loading/Loading";
import { globalData } from "utils/GlobalData";
import useNSSType from "hooks/useNSSType";
import { useYearList } from "utils/useYear";
import { LoadingButton } from "@mui/lab";
import { useAuthState, useAuthDispatch } from "context/AuthContext";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import NSSButton from "components/Button/NSSButton";
import useCurrentYear from "hooks/useCurrentYear";
import LandingSection from "components/Section/LandingSection";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import { smallFontSize } from "utils/FontSize";
import MarketoForm from "components/MarketoForm/MarketoForm";
import { useNavigate } from "hooks/useNavigateWithSearch";
import { RegistrationContainer, MktoFormContainer } from "./RegistrationStyles";

interface RegistrationProps {
  formNo: string;
}

type TFN = 1 | 0 | -1;

const Registration = ({ formNo }: RegistrationProps) => {
  const [mktoLoading, setMktoLoading] = useState<boolean>(false);
  const [submitBlock, setSubmitBlock] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<TFN>(-1);
  const [emailValidLoading, setEmailValidLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [mktoSaveCompleted, setMktoSaveCompleted] = useState<boolean>(false);

  const nation = usePageViews();
  const currentYear = useCurrentYear();
  const authState = useAuthState();
  const dispatch = useAuthDispatch();
  const nssType = useNSSType();

  // alert
  const [emailNotValidAlert, setEmailNotValidAlert] = useState<boolean>(false);

  // seo
  const {
    registrationStep1Label,
    registrationStep2Label,
    registrationStep3Label,
  } = globalData.get(nssType) as Common.globalDataType;

  const dispatchLogin = (e: string, r: string, t: string) =>
    dispatch({
      type: "LOGIN",
      authState: {
        ...authState,
        isLogin: true,
        role: r,
        email: e,
        accessToken: t,
      },
    });

  useEffect(() => {
    if (nation === "china") {
      window.open("https://www.koushare.com/lives/room/758343");
      window.history.back();
    } else {
      // validation & 중복체크
      const handleChange = async (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (
          target.value.indexOf("@") === -1 ||
          target.value.lastIndexOf(".") <= target.value.indexOf("@")
        ) {
          setEmailValid(0);
        } else {
          try {
            setEmailValidLoading(true);
            const res = await axios.post("/api/users/checkemail", {
              email: target.value,
              nation,
              year: currentYear,
            });
            setEmailValid(!res.data.result ? 1 : 0);
          } catch (err) {
            console.log(err);
          } finally {
            setEmailValidLoading(false);
          }
        }
      };
      // const script = document.createElement("script");
      // document.body.appendChild(script);
      setMktoLoading(true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MktoForms2.loadForm(
        "//pages.parksystems.com",
        "988-FTP-549",
        formNo,
        (form: any) => {
          document.querySelector(".mktoButton[type='submit']")?.remove();

          setMktoLoading(false);

          // validation 끼워넣기
          const validationDiv = document.createElement("div");
          validationDiv.className = "validation-msg";

          // 체크박스 layout 변경
          const check1 =
            document.querySelector("#LblpsmktOptin")?.parentElement;
          const check2 = document.querySelector("#LblpsOptin")?.parentElement;

          // check1?.classList.add("flex-reverse");
          // check2?.classList.add("flex-reverse");

          document
            .querySelector("#LblEmail")
            ?.parentElement?.appendChild(validationDiv);
          document
            .querySelector("input#Email")
            ?.removeEventListener("change", handleChange);
          document
            .querySelector("input#Email")
            ?.addEventListener("change", handleChange);
        },
      );
      return () => {
        document
          .querySelector("input#Email")
          ?.removeEventListener("change", handleChange);
      };
    }
    return () => {
      //
    };
  }, []);

  useEffect(() => {
    if (document.querySelector(".validation-msg") !== null) {
      const validationDOM = document.querySelector(
        ".validation-msg",
      ) as HTMLParagraphElement;
      if (emailValidLoading) {
        validationDOM.classList.remove("valid");
        validationDOM.classList.remove("invalid");
        validationDOM.innerText = "Checking an email address...";
      } else if (emailValid === 1) {
        validationDOM.classList.add("valid");
        validationDOM.classList.remove("invalid");
        validationDOM.innerText = "Valid Email!";
      } else if (emailValid === 0) {
        validationDOM.classList.add("invalid");
        validationDOM.classList.remove("valid");
        validationDOM.innerText = "Invalid or duplicate email.";
      }
    }
  }, [emailValid, emailValidLoading]);

  const pathname = usePageViews();
  const { goNextText, logoURL } = globalData.get(
    nssType,
  ) as Common.globalDataType;
  const theme = useTheme();

  const submitHandler = async () => {
    const formData =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MktoForms2.allForms()[
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.MktoForms2.allForms().length - 1
      ].getValues();
    // setPasswordSetModalOpen(true);
    setSubmitBlock(true);
    try {
      // user db submit
      const regResponse = await axios.post("/api/users/register", {
        title: formData.Salutation,
        firstName: formData.FirstName,
        lastName: formData.LastName,
        email: formData.Email,
        phone: formData.Phone,
        institute: formData.Company,
        department: formData.Department,
        country: formData.Country,
        state: formData.State,
        nation,
        year: currentYear,
      });

      const mktoFormInstance =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.MktoForms2.allForms()[
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          window.MktoForms2.allForms().length - 1
        ];

      // marketo submit
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mktoFormInstance
        .submit()
        .onSubmit(() => {
          console.log("start");
        })
        .onSuccess(() => {
          return false;
        });
      setMktoSaveCompleted(true);
    } catch (err) {
      console.log(err);
      setSubmitBlock(false);
      alert("error: saving user data. Please try again.");
    }
  };

  useEffect(() => {
    if (mktoSaveCompleted) {
      setTimeout(() => {
        const formData =
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          window.MktoForms2.allForms()[
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.MktoForms2.allForms().length - 1
          ].getValues();
        handleAfterSubmitMkto(formData);
      }, 3000);
    }
  }, [mktoSaveCompleted]);

  const handleAfterSubmitMkto = async (formData) => {
    await axios.post(`/api/zoom/webinar/registrant/fetch`, {
      email: formData.Email,
      nation: pathname,
    });
    try {
      const res = await axios.post("/api/users/login", {
        nation,
        email: formData.Email,
        password: null,
        year: currentYear,
      });
      if (res.data.success) {
        dispatchLogin(formData.Email, res.data.role, res.data.accessToken);
        navigate(`/${nation}/user/reset-password`);
      }
    } catch (err) {
      console.log(err);
      alert("login failed");
    } finally {
      setSubmitBlock(false);
    }
  };

  return (
    <>
      {mktoLoading && <Loading />}
      <RegistrationContainer>
        <LandingSection className="banner" maxWidth="1920px" fullWidth>
          <Stack justifyContent="center" alignItems="center" height="100%">
            <img className="banner-img" src={logoURL} alt="NSS Logo" />
          </Stack>
        </LandingSection>

        <LandingSection className="layout">
          <Stack
            className="step-container"
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <div>
              <LooksOneIcon className="step-icon active" />
              <Typography
                className="step-caption active"
                fontSize={smallFontSize}
                sx={{ position: "absolute" }}
              >
                {registrationStep1Label || "Your Information"}
              </Typography>
            </div>
            <div className="icon-divider" />
            <div>
              <LooksTwoIcon className="step-icon" />
              <Typography
                className="step-caption caption2"
                fontSize={smallFontSize}
                sx={{ position: "absolute" }}
              >
                {registrationStep2Label || "Setting a password"}
              </Typography>
            </div>
            <div className="icon-divider" />
            <div>
              <Looks3Icon className="step-icon" />
              <Typography
                className="step-caption"
                fontSize={smallFontSize}
                sx={{ position: "absolute" }}
              >
                {registrationStep3Label || "Complete"}
              </Typography>
            </div>
          </Stack>
          <MktoFormContainer>
            <MarketoForm formId={formNo} />
            {!mktoLoading && (
              <NSSButton
                variant="gradient"
                disabled={emailValid !== 1 || emailValidLoading}
                className="mktoButton2"
                loading={submitBlock}
                fontWeight={theme.typography.fontWeightBold}
                letterSpacing="1.2px"
                onClick={() => {
                  if (
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    !window.MktoForms2.allForms()[
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      window.MktoForms2.allForms().length - 1
                    ]?.validate()
                  ) {
                    // 마케토 validator가 알려줌
                    // console.log("not validated");
                  } else if (emailValid !== 1) {
                    setEmailNotValidAlert(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    submitHandler();
                  }
                }}
              >
                {goNextText || "Next"}
              </NSSButton>
            )}
          </MktoFormContainer>
        </LandingSection>

        <TopCenterSnackBar
          value={emailNotValidAlert}
          setValue={setEmailNotValidAlert}
          severity="warning"
          content="Email already exists or not valid."
          variant="filled"
        />
      </RegistrationContainer>
    </>
  );
};

export default Registration;
