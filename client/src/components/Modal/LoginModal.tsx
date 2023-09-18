/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from "react";
import Link from "components/Link/LinkWithSearch";
import { useNavigate } from "hooks/useNavigateWithSearch";
import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import CloseButton from "components/CloseButton/CloseButton";
import axios from "axios";
import Timer from "components/Timer/Timer";
import { globalData } from "utils/GlobalData";
import useInput from "hooks/useInput";
import { smallFontSize } from "utils/FontSize";
import useNSSType from "hooks/useNSSType";
import useCurrentYear from "hooks/useCurrentYear";
import usePageViews from "hooks/usePageViews";
import useSelect from "hooks/useSelect";
import useAdminStore from "store/AdminStore";
import { useAuthState, useAuthDispatch } from "../../context/AuthContext";

interface ModalProps {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setFailed: React.Dispatch<React.SetStateAction<boolean>>;
  setNoRegionAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordSetSuccessAlert: React.Dispatch<React.SetStateAction<boolean>>;
  emailModalOpen: boolean;
  setEmailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  passwordSetModalOpen: boolean;
  setPasswordSetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  passwordInputModalOpen: boolean;
  setPasswordInputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransitionRight = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="right" ref={ref} {...props} />;
});
const TransitionLeft = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const LoginModal = ({
  setSuccess,
  setFailed,
  setNoRegionAlert,
  setPasswordSetSuccessAlert,
  emailModalOpen,
  setEmailModalOpen,
  passwordSetModalOpen,
  setPasswordSetModalOpen,
  passwordInputModalOpen,
  setPasswordInputModalOpen,
}: ModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [passwordNotMatch, setPasswordNotMatch] = useState<boolean>(false);

  // snackbar alert
  const [passwordNotMatchAlert, setPasswordNotMatchAlert] =
    useState<boolean>(false);
  const [emptyAlert, setEmptyAlert] = useState<boolean>(false);
  const [nameNotMatchAlert, setNameNotMatchAlert] = useState<boolean>(false);

  // 인증번호
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [sendHandlerLoading, setSendHandlerLoading] = useState<boolean>(false);

  // 타이머 관련
  const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  // alert
  const [emailSentAlert, setEmailSentAlert] = useState<boolean>(false);
  const [emailNotVerifiedAlert, setEmailNotVerifiedAlert] =
    useState<boolean>(false);
  const [emailNotExistAlert, setEmailNotExistAlert] = useState<boolean>(false);
  const [timerExpiredAlert, setTimerExpiredAlert] = useState<boolean>(false);
  const [codeCorrectAlert, setCodeCorrectAlert] = useState<boolean>(false);
  const [codeWrongAlert, setCodeWrongAlert] = useState<boolean>(false);
  const [passwordChangeSuccessAlert, setPasswordChangeSuccessAlert] =
    useState<boolean>(false);
  //
  const { currentNation, setCurrentNation } = useAdminStore();

  //
  const pathname = usePageViews();
  const nssType = useNSSType();
  const email = useInput("");
  const password = useInput("");
  const password1 = useInput("");
  const password2 = useInput("");
  const region = useSelect(pathname === "common" ? currentNation : pathname);
  const verificationCode = useInput("");
  const currentYear = useCurrentYear();

  // refs
  const emailFocus = useRef<HTMLInputElement>(null);
  const passwordInputFocus = useRef<HTMLInputElement>(null);
  const passwordSetFocus = useRef<HTMLInputElement>(null);
  const vCodeFocus = useRef<HTMLInputElement>(null);

  // global data
  const {
    signInText,
    emailInputLabel,
    passwordInputLabel,
    forgotPasswordText,
    createAccountText,
    goNextText,
    goPrevText,
  } = globalData.get(nssType) as Common.globalDataType;

  const handleOpen = (setOpen: (val: boolean) => void) => {
    setOpen(true);
  };
  const handleClose = (setOpen: (val: boolean) => void) => {
    setOpen(false);
  };

  // navigate hook
  const navigate = useNavigate();

  // 인증 이메일 보내기 버튼 handler
  const sendHandler = async () => {
    setIsExpired(false);
    setSendHandlerLoading(true);
    try {
      const res = await axios.post("/api/mail/vcode/send", {
        email: email.value,
        nation: currentNation,
        year: currentYear,
      });
      if (res.data.result) {
        setEmailSentAlert(true);
        setIsTimerStarted(false);
        setIsTimerStarted(true);
      } else {
        // alert: 이메일이 존재하지 않아요
        setEmailNotExistAlert(true);
      }
    } catch (err) {
      alert(err);
    } finally {
      setSendHandlerLoading(false);
    }
  };

  // 인증번호 확인 버튼 handler
  const confirmCodeHandler = async () => {
    try {
      const res = await axios.post(`/api/mail/vcode/check`, {
        nation: currentNation,
        email: email.value.trim(),
        code: verificationCode.value.trim(),
      });

      if (res.data.success) {
        setIsEmailVerified(true);
        setCodeCorrectAlert(true);
        setIsExpired(true);
      } else {
        setIsEmailVerified(false);
        setCodeWrongAlert(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 모달 모두 닫아주는 메서드
  const closeAllModal = () => {
    setEmailModalOpen(false);
    setPasswordSetModalOpen(false);
    setPasswordInputModalOpen(false);
  };

  const handlePasswordConfirm = () => {
    if (password1.value !== password2.value) {
      setPasswordNotMatch(true);
    } else {
      setPasswordNotMatch(false);
    }
  };

  // timer 만료 handler
  const timerExpiredHandler = () => {
    setIsTimerStarted(false);
    if (!isEmailVerified) setTimerExpiredAlert(true);
  };

  // 타이머 만료 시 hook
  useEffect(() => {
    if (isExpired) {
      timerExpiredHandler();
    }
  }, [isExpired]);

  const state = useAuthState();
  const dispatch = useAuthDispatch();

  const dispatchLogin = (
    e: string,
    r: string,
    n: string,
    t: string,
    i: number,
  ) =>
    dispatch({
      type: "LOGIN",
      authState: {
        ...state,
        isLogin: true,
        role: r,
        email: e,
        nation: currentNation,
        accessToken: t,
        id: i,
      },
    });

  const loginHandler = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/users/login`,
        {
          email,
          password,
          year: currentYear,
          nation: currentNation,
        },
        {
          withCredentials: true,
        },
      );
      if (res.data.success === true) {
        dispatchLogin(
          email,
          res.data.role,
          currentNation,
          res.data.accessToken,
          res.data.userId,
        );
        setSuccess(true);
        setPasswordInputModalOpen(false);
        if (currentNation !== "china") {
          await axios.post(`/api/zoom/webinar/registrant/fetch`, {
            email,
            nation: currentNation,
          });
        }
      } else {
        setPasswordNotMatchAlert(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const nextHandler = () => {
    if (region.value === "default") {
      console.log("hi");

      setNoRegionAlert(true);
      return;
    }
    setLoading(true);
    axios
      .post("/api/users/passwordset/check", {
        email: email.value,
        year: currentYear,
        nation: currentNation,
      })
      .then((res) => {
        if (res.data.success) {
          if (res.data.result) {
            // password 입력 모달
            setPasswordInputModalOpen(true);
            setEmailModalOpen(false);
          } else {
            // password 설정 모달
            setPasswordSetModalOpen(true);
            setEmailModalOpen(false);
          }
        } else {
          // 유저 없다.
          setFailed(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const passwordSetHandler = () => {
    if (passwordNotMatch) {
      setPasswordNotMatchAlert(true);
      return;
    }
    if (
      verificationCode.value === "" ||
      password1.value === "" ||
      password2.value === ""
    ) {
      setEmptyAlert(true);
      return;
    }
    if (!isEmailVerified) {
      setEmailNotVerifiedAlert(true);
      return;
    }
    setLoading(true);
    axios
      .post("/api/users/passwordset", {
        email: email.value,
        password: password1.value,
        nation: currentNation,
        year: currentYear,
      })
      .then((res) => {
        if (res.data.success) {
          setPasswordSetSuccessAlert(true);
          setPasswordSetModalOpen(false);
        } else {
          setNameNotMatchAlert(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handlePasswordConfirm();
  }, [password1, password2]);

  // 모달 변경 시 focus.
  useEffect(() => {
    if (emailModalOpen) {
      setTimeout(() => {
        const input = emailFocus.current?.children[1]
          .children[0] as HTMLInputElement;
        if (input !== undefined) {
          input.focus();
        }
      }, 10);
    }
  }, [emailModalOpen]);
  useEffect(() => {
    if (passwordInputModalOpen) {
      setTimeout(() => {
        const input = passwordInputFocus.current?.children[1]
          .children[0] as HTMLInputElement;
        if (input !== undefined) {
          input.focus();
        }
      }, 10);
    }
  }, [passwordInputModalOpen]);
  useEffect(() => {
    if (passwordSetFocus) {
      setTimeout(() => {
        const input = passwordSetFocus.current?.children[1]
          .children[0] as HTMLInputElement;
        if (input !== undefined) {
          input.focus();
        }
      }, 10);
    }
  }, [passwordSetModalOpen]);
  return (
    <div>
      {/* {signInText && (
        <NSSButton
          type="button"
          variant="primary"
          style={{ fontWeight: 700 }}
          onClick={() => {
            handleOpen(setEmailModalOpen);
          }}
        >
          {signInText}
        </NSSButton>
      )} */}
      {/* email modal */}
      <Dialog
        open={emailModalOpen}
        onClose={() => {
          handleClose(setEmailModalOpen);
        }}
        TransitionComponent={TransitionRight}
        disableScrollLock
        fullWidth
        maxWidth="tablet"
      >
        <CloseButton setOpen={setEmailModalOpen} />
        <DialogTitle>{signInText || "SIGN IN"}</DialogTitle>
        {emailInputLabel && (
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
              <InputLabel id="region-label">Region</InputLabel>
              <Select
                labelId="region-label"
                label="Region"
                error={region.value === "default"}
                readOnly={pathname !== "common"}
                onBlur={() => {
                  setCurrentNation(region.value);
                }}
                {...region}
              >
                <MenuItem value="default">Please Select Region</MenuItem>
                <MenuItem value="americas">Americas</MenuItem>
                <MenuItem value="asia">Asia</MenuItem>
                <MenuItem value="china">China</MenuItem>
                <MenuItem value="eu">Europe</MenuItem>
                <MenuItem value="jp">Japan</MenuItem>
                <MenuItem value="kr">Korea</MenuItem>
              </Select>
            </FormControl>
            <TextField
              disabled={!emailModalOpen || loading}
              ref={emailFocus}
              margin="dense"
              id="email"
              label={emailInputLabel}
              type="email"
              fullWidth
              variant="filled"
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter") {
                  nextHandler();
                }
              }}
              {...email}
            />
          </DialogContent>
        )}
        <DialogActions style={{ flexDirection: "column" }}>
          {/* {loading && (
            <LoadingButton
              loading
              style={{ margin: "10px", borderRadius: "30px", width: "100%" }}
              color="primary"
            >
              Loading
            </LoadingButton>
          )} */}
          {region.value === "default" ? (
            <Tooltip title="Please Select Region" placement="bottom">
              <LoadingButton
                style={{ margin: "10px", borderRadius: "30px", width: "100%" }}
                sx={{ opacity: 0.3, cursor: "default" }}
                variant="contained"
                color="primary"
              >
                {goNextText}
              </LoadingButton>
            </Tooltip>
          ) : (
            <LoadingButton
              loading={loading}
              style={{ margin: "10px", borderRadius: "30px", width: "100%" }}
              variant="contained"
              color="primary"
              onClick={nextHandler}
            >
              {goNextText}
            </LoadingButton>
          )}
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "95%" }}
          >
            {/* {pathname === "eu" ? ( */}

            {region.value === "default" ? (
              <Tooltip title="Please Select Region" placement="bottom">
                <Typography
                  fontSize={smallFontSize}
                  sx={{ opacity: 0.3, cursor: "default" }}
                >
                  {createAccountText}
                </Typography>
              </Tooltip>
            ) : (
              <Link
                to={
                  pathname === "kr"
                    ? `${pathname}/${currentYear}/register-info`
                    : `${pathname}/${currentYear}/registration`
                }
                onClick={closeAllModal}
              >
                <Typography fontSize={smallFontSize}>
                  {createAccountText}
                </Typography>
              </Link>
            )}
            {region.value === "default" ? (
              <Tooltip title="Please Select Region" placement="bottom">
                <Typography
                  fontSize={smallFontSize}
                  sx={{ opacity: 0.3, cursor: "default" }}
                >
                  {forgotPasswordText}
                </Typography>
              </Tooltip>
            ) : (
              <Link
                to={`${pathname}/${currentYear}/user/forgot-password`}
                onClick={closeAllModal}
              >
                <Typography fontSize={smallFontSize}>
                  {forgotPasswordText}
                </Typography>
              </Link>
            )}
          </Stack>
        </DialogActions>
      </Dialog>

      {/* 비밀번호 입력 모달 */}

      <Dialog
        open={passwordInputModalOpen}
        onClose={() => {
          handleClose(setPasswordInputModalOpen);
        }}
        TransitionComponent={TransitionLeft}
        disableScrollLock
        fullWidth
        maxWidth="tablet"
      >
        <CloseButton setOpen={setPasswordInputModalOpen} />
        <DialogTitle>{signInText || "SIGN IN"}</DialogTitle>
        <DialogContent>
          <TextField
            disabled={!passwordInputModalOpen}
            ref={passwordInputFocus}
            margin="dense"
            id="password"
            label={passwordInputLabel}
            type="password"
            fullWidth
            variant="filled"
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter") {
                loginHandler(email.value, password.value);
              }
            }}
            {...password}
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{ margin: "10px", borderRadius: "30px", width: "20%" }}
            variant="outlined"
            color="primary"
            tabIndex={-1}
            onClick={() => {
              handleClose(setPasswordInputModalOpen);
              handleOpen(setEmailModalOpen);
            }}
          >
            {goPrevText}
          </Button>
          <LoadingButton
            loading={loading}
            style={{ margin: "10px", borderRadius: "30px", width: "100%" }}
            variant="contained"
            color="primary"
            onClick={() => {
              loginHandler(email.value, password.value);
            }}
          >
            {signInText || "SIGN IN"}
          </LoadingButton>
        </DialogActions>

        {/* 비밀번호 확인 alert */}
        <TopCenterSnackBar
          value={passwordNotMatchAlert}
          setValue={setPasswordNotMatchAlert}
          variant="filled"
          severity="error"
          content="Password not match."
        />
      </Dialog>

      {/* 패스워드 설정 모달 */}
      <Dialog
        open={passwordSetModalOpen}
        onClose={() => {
          handleClose(setPasswordSetModalOpen);
        }}
        TransitionComponent={TransitionLeft}
        disableScrollLock
        fullWidth
        maxWidth="tablet"
      >
        <CloseButton setOpen={setPasswordSetModalOpen} />
        <DialogTitle>Set Your Password</DialogTitle>
        <DialogContent>
          <TextField
            disabled={!passwordSetModalOpen}
            ref={passwordSetFocus}
            margin="dense"
            id="password1"
            label="New Password"
            type="password"
            fullWidth
            variant="filled"
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter") {
                passwordSetHandler();
              }
            }}
            {...password1}
          />
          <TextField
            disabled={!passwordSetModalOpen}
            margin="dense"
            id="password2"
            label="Password Confirmation"
            type="password"
            fullWidth
            variant="filled"
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter") {
                passwordSetHandler();
              }
            }}
            {...password2}
          />
          <span style={{ color: passwordNotMatch ? "red" : "green" }}>
            {passwordNotMatch ? "Password is not matched." : <div>&nbsp;</div>}
          </span>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack
              direction="column"
              alignItems="center"
              sx={{ width: "75%", mr: 1 }}
            >
              <TextField
                disabled={!passwordSetModalOpen || !isTimerStarted}
                ref={vCodeFocus}
                style={{ width: "100%", marginTop: 0 }}
                margin="dense"
                id="v-code"
                label="Verification Code"
                type="text"
                variant="filled"
                onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === "Enter") {
                    confirmCodeHandler();
                  }
                }}
                {...verificationCode}
              />
              {isTimerStarted && (
                <LoadingButton
                  sx={{
                    height: "38px",
                  }}
                  color="primary"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onClick={confirmCodeHandler}
                  loading={sendHandlerLoading}
                >
                  Confirm
                </LoadingButton>
              )}
            </Stack>

            {isTimerStarted ? (
              <Timer second={180} setIsExpired={setIsExpired} />
            ) : (
              <Box sx={{ width: "60px" }} />
            )}
            <LoadingButton
              sx={{ borderRadius: "30px", px: 1, py: 0, height: "38px" }}
              color="primary"
              variant="outlined"
              size="small"
              onClick={sendHandler}
              loading={sendHandlerLoading}
            >
              {isTimerStarted ? "RESEND" : "SEND"}
            </LoadingButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ margin: "10px", borderRadius: "30px", width: "20%" }}
            variant="outlined"
            color="primary"
            tabIndex={-1}
            onClick={() => {
              handleClose(setPasswordSetModalOpen);
              handleOpen(setEmailModalOpen);
            }}
          >
            {goPrevText}
          </Button>

          <LoadingButton
            loading={loading}
            style={{ margin: "10px", borderRadius: "30px", width: "100%" }}
            variant="contained"
            color="primary"
            onClick={passwordSetHandler}
            disabled={!isEmailVerified}
          >
            SUBMIT
          </LoadingButton>
        </DialogActions>

        {/* 비밀번호 확인 alert */}
        <TopCenterSnackBar
          value={passwordNotMatchAlert}
          setValue={setPasswordNotMatchAlert}
          variant="filled"
          severity="error"
          content="Password not match."
        />
        {/* 빈 field alert */}
        <TopCenterSnackBar
          value={emptyAlert}
          setValue={setEmptyAlert}
          variant="filled"
          severity="error"
          content="Please fill all fields."
        />
        {/* 입력한 이름 정보 매칭 실패 */}
        <TopCenterSnackBar
          value={nameNotMatchAlert}
          setValue={setNameNotMatchAlert}
          variant="filled"
          severity="warning"
          content="Name is not matched to your account's data."
        />
        {/* alert */}
        <TopCenterSnackBar
          value={emailSentAlert}
          setValue={setEmailSentAlert}
          variant="filled"
          severity="success"
          content="Verification code sent to your email."
        />
        <TopCenterSnackBar
          value={timerExpiredAlert}
          setValue={setTimerExpiredAlert}
          variant="filled"
          severity="warning"
          content="Please resend verification email."
        />
        <TopCenterSnackBar
          value={codeCorrectAlert}
          setValue={setCodeCorrectAlert}
          variant="filled"
          severity="success"
          content="Email verified."
        />
        <TopCenterSnackBar
          value={codeWrongAlert}
          setValue={setCodeWrongAlert}
          variant="filled"
          severity="error"
          content="The code is wrong. Please check again."
        />
        <TopCenterSnackBar
          value={emailNotVerifiedAlert}
          setValue={setEmailNotVerifiedAlert}
          variant="filled"
          severity="error"
          content='Please enter verification code then "Confirm" button.'
        />
        <TopCenterSnackBar
          value={passwordChangeSuccessAlert}
          setValue={setPasswordChangeSuccessAlert}
          variant="filled"
          severity="success"
          content="Password successfully changed. Please sign in again."
        />
      </Dialog>
    </div>
  );
};

export default LoginModal;
