import React, { useState, useEffect } from "react";
import { Button, Box, Stack, Typography, IconButton } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router";
import { globalData } from "utils/GlobalData";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import { useAuthState, useAuthDispatch } from "context/AuthContext";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import { RegistrationContainer } from "pages/common/Registration/RegistrationStyles";
import LandingSection from "components/Section/LandingSection";
import Loading from "components/Loading/Loading";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  smallFontSize,
  headingFontSize,
  subHeadingFontSize,
} from "utils/FontSize";
import NSSButton from "components/Button/NSSButton";

type TFN = 1 | 0 | -1;

const EuropeRegistration = () => {
  const pathname = usePageViews();

  // stage
  const [stage, setStage] = useState<number>(1);

  // 등록비
  const [registrationFee, setRegistrationFee] = useState<string>("0");
  // student 여부
  const [isStudent, setIsStudent] = useState<boolean>(false);

  //
  const [checkout, setCheckout] = useState<boolean>(false);
  const [mktoLoading, setMktoLoading] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<TFN>(-1);
  const navigate = useNavigate();
  const nation = usePageViews();

  const authState = useAuthState();
  const dispatch = useAuthDispatch();

  const {
    goNextText,
    logoURL,
    registrationStep1Label,
    registrationStep2Label,
    registrationStep3Label,
  } = globalData.get(pathname) as Common.globalDataType;

  // alert
  const [emailNotValidAlert, setEmailNotValidAlert] = useState<boolean>(false);

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

  const clickFeeHandler = (fee: string) => {
    setRegistrationFee(fee);
    setStage(2);
  };

  const regTestHandler = async () => {
    // snackBar?

    const formData =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MktoForms2.allForms()[
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.MktoForms2.allForms().length - 1
      ].getValues();
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
        isStudent,
      });

      // marketo submit
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MktoForms2.allForms()
        [
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          window.MktoForms2.allForms().length - 1
        ].submit()
        .onSuccess(() => {
          return false;
        });
      try {
        const res = await axios.post("/api/users/login", {
          nation,
          email: formData.Email,
          password: null,
        });
        if (res.data.success) {
          dispatchLogin(formData.Email, res.data.role, res.data.accessToken);
        }
        navigate(`/${nation}/user/reset-password`);
      } catch (err) {
        console.log(err);
        alert("login failed");
      }
    } catch (err) {
      console.log(err);
      alert("error: saving user data. Please try again.");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    document.body.appendChild(script);
    setMktoLoading(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.MktoForms2.loadForm(
      "//pages.parksystems.com",
      "988-FTP-549",
      1149,
      (form: any) => {
        document.querySelector(".mktoButton[type='submit']")?.remove();

        setMktoLoading(false);

        // validation 끼워넣기
        const validationDiv = document.createElement("div");
        validationDiv.className = "validation-msg";
        document
          .querySelector("#LblEmail")
          ?.parentElement?.appendChild(validationDiv);

        // 체크박스 layout 변경
        const check1 = document.querySelector("#LblpsmktOptin")?.parentElement;
        const check2 = document.querySelector("#LblpsOptin")?.parentElement;
        check1?.classList.add("flex-reverse");
        check2?.classList.add("flex-reverse");

        // validation & 중복체크
        document
          .querySelector("input#Email")
          ?.addEventListener("focusout", async (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (
              target.value.indexOf("@") === -1 &&
              target.value.indexOf(".") === -1
            ) {
              setEmailValid(0);
            } else {
              try {
                const res = await axios.post("/api/users/checkemail", {
                  email: target.value,
                  nation,
                });
                setEmailValid(!res.data.result ? 1 : 0);
              } catch (err) {
                console.log(err);
              }
            }
          });
      },
    );
  }, [stage]);
  // 마케토폼 2개 렌더링 될 시 refresh
  useEffect(() => {
    setTimeout(() => {
      if (document.querySelectorAll("#LblpsOptin").length > 2) {
        navigate(0);
      }
    }, 1000);
  }, [mktoLoading]);

  useEffect(() => {
    if (document.querySelector(".validation-msg") !== null) {
      const validationDOM = document.querySelector(
        ".validation-msg",
      ) as HTMLParagraphElement;
      if (emailValid === 1) {
        validationDOM.classList.add("valid");
        validationDOM.classList.remove("invalid");
        validationDOM.innerText = "Valid Email!";
      } else if (emailValid === 0) {
        validationDOM.classList.add("invalid");
        validationDOM.classList.remove("valid");
        validationDOM.innerText = "Invalid or duplicate email.";
      }
    }
  }, [emailValid]);

  return (
    <>
      {/* {mktoLoading && <Loading />} */}
      <RegistrationContainer>
        <LandingSection className="banner" maxWidth="1920px" fullWidth>
          <Stack justifyContent="center" alignItems="center" height="100%">
            <img className="banner-img" src={logoURL} alt="NSS Logo" />
          </Stack>
        </LandingSection>

        {stage === 1 && (
          <Stack className="layout body-fit-banner">
            <Box className="text-center" mb={5}>
              <Typography fontSize={headingFontSize} mb={1}>
                Registration
              </Typography>
              <Typography component="span" fontWeight={700}>
                Deadline:&nbsp;
                <Typography color="red" component="span" fontWeight={600}>
                  20 September 2022
                </Typography>
              </Typography>
              <Typography fontSize={smallFontSize}>
                After successful registration, click on LECTURE HALL button at{" "}
                <Typography
                  component="a"
                  href="https://event.nanoscientific.org/eu"
                  fontSize={smallFontSize}
                  sx={{ padding: "0 !important" }}
                >
                  event.nanoscientific.org/eu
                </Typography>{" "}
                on the event date to join all online sessions.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  tablet: "row",
                  mobile: "column",
                },
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack
                className="registration-fee-container"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Typography textAlign="center" color="white">
                  €20
                </Typography>
                <Typography textAlign="center" color="white">
                  Student/PhD
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  disableElevation
                  onClick={() => {
                    clickFeeHandler("20");
                    // clickFeeHandler("1");
                    setIsStudent(true);
                  }}
                >
                  Register
                </Button>
              </Stack>
              <Stack
                className="registration-fee-container"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Typography textAlign="center" color="white">
                  €35
                </Typography>
                <Typography textAlign="center" color="white">
                  PostDoc/Professor/Industry
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  disableElevation
                  onClick={() => {
                    clickFeeHandler("35");
                    setIsStudent(false);
                  }}
                >
                  Register
                </Button>
              </Stack>
            </Box>
          </Stack>
        )}
        {stage === 2 && (
          <LandingSection className="layout body-fit">
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
            <IconButton
              onClick={() => {
                setStage(1);
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <form id="mktoForm_1149" />
            {!mktoLoading && !checkout && (
              <NSSButton
                variant="gradient"
                className="mktoButton2"
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
                  } else if (emailValid !== 1) {
                    setEmailNotValidAlert(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    setCheckout(true);
                  }
                }}
              >
                CHECKOUT
              </NSSButton>
            )}
            <NSSButton
              variant="gradient"
              className="mktoButton2"
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
                } else if (emailValid !== 1) {
                  setEmailNotValidAlert(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  regTestHandler();
                }
              }}
            >
              REG TEST
            </NSSButton>
            {checkout && (
              <div className="paypal-container">
                <PayPalScriptProvider
                  options={{
                    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
                    currency: "EUR",
                  }}
                >
                  <PayPalButtons
                    style={{ color: "blue" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: registrationFee,
                            },
                          },
                        ],
                      });
                    }}
                    onError={() => {
                      alert("Paypal Module Error. Please try again later.");
                    }}
                    onApprove={async (data, actions) => {
                      const result = actions?.order
                        ?.capture()
                        .then(async (details) => {
                          // snackBar?

                          const formData =
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            window.MktoForms2.allForms()[
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              window.MktoForms2.allForms().length - 1
                            ].getValues();
                          try {
                            // user db submit
                            const regResponse = await axios.post(
                              "/api/users/register",
                              {
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
                                isStudent,
                              },
                            );

                            // save transaction to db
                            await axios.post("/api/page/eu/transaction", {
                              details,
                              userId: regResponse.data.id,
                            });

                            // marketo submit
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            window.MktoForms2.allForms()
                              [
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                window.MktoForms2.allForms().length - 1
                              ].submit()
                              .onSuccess(() => {
                                return false;
                              });
                            try {
                              const res = await axios.post("/api/users/login", {
                                nation,
                                email: formData.Email,
                                password: null,
                              });
                              if (res.data.success) {
                                dispatchLogin(
                                  formData.Email,
                                  res.data.role,
                                  res.data.accessToken,
                                );
                              }
                              navigate(`/${nation}/user/reset-password`);
                            } catch (err) {
                              console.log(err);
                              alert("login failed");
                            }
                          } catch (err) {
                            console.log(err);
                            alert("error: saving user data. Please try again.");
                          }
                          // });
                        });
                      return result;
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}
          </LandingSection>
        )}

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

export default EuropeRegistration;
