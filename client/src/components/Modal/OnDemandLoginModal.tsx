import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import CommonModal from "components/CommonModal/CommonModal";
import Loading from "components/Loading/Loading";
import MarketoForm from "components/MarketoForm/MarketoForm";
import { useAuthDispatch, useAuthState } from "context/AuthContext";
import useInput from "hooks/useInput";
import usePageViews from "hooks/usePageViews";
import useSelect from "hooks/useSelect";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import useAdminStore from "store/AdminStore";
import { smallFontSize } from "utils/FontSize";
import { globalData } from "utils/GlobalData";
import { useYearList } from "utils/useYear";

interface OnDemandLoginModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  callback: () => void;
  setLoginSuccess: Dispatch<SetStateAction<boolean>>;
  setLoginFailed: Dispatch<SetStateAction<boolean>>;
}

const currentYear = `2023`;

const OnDemandLoginModal = (props: OnDemandLoginModalProps) => {
  const { currentNation, setCurrentNation } = useAdminStore();

  const pathname = usePageViews();
  const { open, setOpen, callback, setLoginSuccess, setLoginFailed } = props;
  const navigate = useNavigate();
  const email = useInput("");
  const password = useInput("");
  const region = useSelect(currentNation || "default");

  const state = useAuthState();
  const dispatch = useAuthDispatch();
  const dispatchLogin = (e: string, r: string, t: string, i: number) =>
    dispatch({
      type: "LOGIN",
      authState: {
        ...state,
        isLogin: true,
        role: r,
        email: e,
        accessToken: t,
        id: i,
      },
    });

  const [stage, setStage] = useState<number>(1);
  const [formId, setFormId] = useState<string>("");
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [loginFailAlert, setLoginFailAlert] = useState<boolean>(false);

  const handleClose = () => {
    navigate(-1);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setLoginLoading(true);
    try {
      const res = await axios.post(
        `/api/users/login`,
        {
          email: email.value,
          password: password.value,
          nation: currentNation,
          year: currentYear,
        },
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        dispatchLogin(
          email.value,
          res.data.role,
          res.data.accessToken,
          res.data.userId,
        );

        setLoginSuccess(true);

        // callback();
      } else {
        setLoginFailed(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoginLoading(false);
    }
  };

  useEffect(() => {
    console.log(region.value);

    if (stage === 2) {
      setFormLoading(true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MktoForms2.loadForm(
        "//pages.parksystems.com",
        "988-FTP-549",
        formId,
        (form: any) => {
          const $check1 =
            document.querySelector("#LblpsmktOptin")?.parentElement;
          const $check2 = document.querySelector("#LblpsOptin")?.parentElement;
          const $form = document.querySelector("#mktoForm_2312");
          const $submitBtn = document
            .querySelector(".mktoButton[type='submit']")
            ?.remove();

          $check1?.classList.add("flex-reverse");
          $check2?.classList.add("flex-reverse");
          // $submitBtn?.classList.remove("mktoButton");
          // $submitBtn?.classList.add(
          //   "MuiButtonBase-root",
          //   "MuiButton-root",
          //   "MuiLoadingButton-root",
          //   "MuiButton-contained",
          //   "MuiButton-containedPrimary",
          //   "MuiButton-sizeMedium",
          //   "MuiButton-containedSizeMedium",
          //   "css-1xsmak0-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root",
          //   "register",
          // );
          setFormLoading(false);
        },
      );
    }
  }, [stage]);
  // 나라 변경에 따라 formNo 변경
  useEffect(() => {
    switch (currentNation) {
      case "europe": {
        setFormId("2312");
        break;
      }
      case "china": {
        setFormId("2325");
        break;
      }
      case "jp": {
        setFormId("2326");
        break;
      }
      case "kr": {
        setFormId("2327");
        break;
      }
      case "asia": {
        setFormId("2328");
        break;
      }
      case "americas": {
        setFormId("2330");
        break;
      }
      default:
        break;
    }
  }, [currentNation]);

  const [cookies, setCookie] = useCookies(["isSubmittedOnDemand"]);
  const handleSubmitMktoForm = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.MktoForms2.allForms()
      [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.MktoForms2.allForms().length - 1
      ].submit()
      .onSuccess(() => {
        setCookie("isSubmittedOnDemand", "true");
      });
  };
  const { createAccountText, forgotPasswordText, signInText } = globalData.get(
    `americas${currentYear}`,
  ) as Common.globalDataType;
  return (
    <>
      {stage === 1 && (
        <CommonModal
          key={`on-demand-modal-${stage}`}
          open={open}
          setOpen={setOpen}
          title={signInText}
          onCloseCallback={handleClose}
          IsCustomWidth
          onSubmit={handleSubmit}
          submitText={signInText}
          submitDisabled={region.value === "default" || !region.value}
          loading={loginLoading}
        >
          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel id="region-label">Region</InputLabel>
            <Select
              labelId="region-label"
              label="Region"
              error={region.value === "default"}
              readOnly={pathname !== "common"}
              sx={{ width: "100%" }}
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
            margin="dense"
            id="email"
            label="Email"
            type="email"
            variant="filled"
            fullWidth
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            {...email}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            variant="filled"
            fullWidth
            sx={{ mb: 3 }}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            {...password}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
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
                to={`/${region.value}/${currentYear}/registration`}
                onClick={closeModal}
              >
                <Typography fontSize={smallFontSize}>
                  {createAccountText}
                </Typography>
              </Link>
            )}
            {region.value === "default" ? (
              <Tooltip title="Please Select Region" placement="bottom">
                <Button
                  sx={{
                    p: 0,
                    textTransform: "none",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    margin: "0 30px",
                    opacity: 0.3,
                    cursor: "default",
                  }}
                >
                  <Typography fontSize={smallFontSize} />
                  Explore without logging in
                </Button>
              </Tooltip>
            ) : (
              <Button
                sx={{
                  p: 0,
                  textTransform: "none",
                  color: "black",
                  margin: "0 30px",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                onClick={() => {
                  setStage(2);
                }}
              >
                <Typography fontSize={smallFontSize} />
                Explore without logging in
              </Button>
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
                to={`/${region.value}/${currentYear}/user/forgot-password`}
                onClick={closeModal}
              >
                <Typography fontSize={smallFontSize}>
                  {forgotPasswordText}
                </Typography>
              </Link>
            )}
          </Box>
        </CommonModal>
      )}
      {stage === 2 && (
        <CommonModal
          key={`on-demand-modal-${stage}`}
          open={open}
          setOpen={setOpen}
          title={signInText}
          onCloseCallback={handleClose}
          IsCustomWidth
          loading={loginLoading}
          onSubmit={handleSubmitMktoForm}
          submitText="Submit"
        >
          {formLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "300px",
                height: "300px",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {!formLoading && (
            <ArrowBackIcon
              sx={{
                mb: 1,
                opacity: "0.5",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": { opacity: "1.0" },
              }}
              onClick={() => {
                navigate(0);
              }}
            />
          )}
          <MarketoForm formId={formId} />
        </CommonModal>
      )}
    </>
  );
};

export default OnDemandLoginModal;
