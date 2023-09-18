/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Routes,
  Route,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import { useNavigate as useNavigateWithSearch } from "hooks/useNavigateWithSearch";
import EventLanding from "pages/common/EventLanding/EventLanding";
import NavBar from "components/NavBar/NavBar";
import usePageViews from "hooks/usePageViews";
import Footer from "components/Footer/Footer";
import { Theme, ThemeProvider } from "@mui/material/styles";
import useSubPath from "hooks/useSubPath";
import useNSSType from "hooks/useNSSType";
import { theme, jpTheme, enTheme } from "theme/themes";
import PrivateRoute from "components/Route/PrivateRoute";
import LoginModal from "components/Modal/LoginModal";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import NotFound from "pages/common/NotFound/NotFound";
import useMenuStore from "store/MenuStore";
import useSeoTitle from "hooks/useSeoTitle";
import useConfigStore from "store/ConfigStore";
import LandingSection from "components/Section/LandingSection";
import { S3_URL } from "utils/GlobalData";
import useLoadingStore from "store/LoadingStore";
import useWindowSize from "hooks/useWindowSize";
import setMetaTag from "utils/MetaTag/SetMetaTag";
import useCurrentYear, { defaultYear, yearList } from "hooks/useCurrentYear";
import useNationRoutes from "hooks/useNationRoutes";
import { useYearList } from "utils/useYear";
import ChinaRoutes from "Routes/ChinaRoutes";
import CommonRoutes from "Routes/CommonRoutes";
import useAdminStore from "store/AdminStore";
import useCurrentURL from "hooks/useCurrentURL";
import CommonChinaRoutes from "Routes/CommonChinaRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import { useAuthState, useAuthDispatch } from "./context/AuthContext";
import { useThemeState, useThemeDispatch } from "./context/ThemeContext";
import { useUnreadListDispatch } from "./context/UnreadAnnouncementList";
import { useAlarmDispatch } from "./context/NavBarMarkContext";
import Loading from "./components/Loading/Loading";
import { AppContainer } from "./AppStyles";
import "./css/font.css";

interface routeType {
  path: string;
  element: JSX.Element;
  isPrivate?: boolean;
  allowVisitor?: boolean;
}

declare global {
  interface Window {
    gtag: Gtag.Gtag;
  }
}

const gaID = "G-BS77NX7Z9T";

const App = () => {
  const pathname = usePageViews();
  const nssType = useNSSType();
  const nationRoutes = useNationRoutes();

  const currentYear = useCurrentYear();
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();
  const themeState = useThemeState();
  const navigate = useNavigate();
  const navigateWithSearch = useNavigateWithSearch();
  // 로그인 관련
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [passwordSetSuccessAlert, setPasswordSetSuccessAlert] =
    useState<boolean>(false);
  const [noRegionAlert, setNoRegionAlert] = useState<boolean>(false);

  const [logoutSuccess, setLogoutSuccess] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const themeObj = theme(themeState.darkMode);
  const jpThemeObj = jpTheme(themeState.darkMode);
  const enThemeObj = enTheme(themeState.darkMode);
  const themeDispatch = useThemeDispatch();
  const alarmDispatch = useAlarmDispatch();
  const unreadAnnouncementListDispatch = useUnreadListDispatch();
  const { bannerLoading, setBannerLoading, landingListLoading } =
    useLoadingStore();
  const {
    currentLanguage,
    setCurrentLanguage,
    currentNation,
    setCurrentNation,
  } = useAdminStore();
  const [currentTheme, setCurrentTheme] = useState<Theme>(themeObj);
  const [nationList, setNationList] = useState([]);

  const currentURL = useCurrentURL();

  // mode
  useEffect(() => {
    themeDispatch({ type: "LIGHTMODE" });

    // 현재 nation 값 저장
    if (pathname !== "home" && pathname !== "common") {
      setCurrentNation(pathname);
    }
  }, []);

  // url에 year가 없으면 추가해주기
  const checkYearAndRedirect = () => {
    if (
      pathname !== "home" &&
      pathname !== "common" &&
      !yearList.includes(window.location.pathname.split("/")[2])
    ) {
      const addressWithYear = window.location.href.replace(
        pathname,
        `${pathname}/${defaultYear}`,
      );
      window.location.replace(addressWithYear);
    }
  };

  // 로그인 모달 state
  const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false);
  const [passwordSetModalOpen, setPasswordSetModalOpen] =
    useState<boolean>(false);
  const [passwordInputModalOpen, setPasswordInputModalOpen] =
    useState<boolean>(false);

  // subpath 가져오기
  const subpath = useSubPath();

  // banner
  const [bannerURL, setBannerURL] = useState<string>("");
  const calcAnnouncementCached = () => {
    axios
      .get(
        `/api/announcement/readlist?nation=${pathname}&id=${authState.id}&year=${currentYear}`,
      )
      .then((res) => {
        if (res.data.success) {
          if (res.data.result) {
            // 모두 읽었을 때,(유저가 announcement를 읽었을 경우)
            alarmDispatch({ type: "OFF" });
            axios
              .post("/api/users/updateAnnouncementCache", {
                email: authState.email,
                nation: currentNation,
                flag: "cached",
                year: currentYear,
              })
              .then((res) => {
                if (res.data.success === true) {
                  console.log(res.data.msg);
                } else {
                  console.log(res.data.msg);
                }
              });
          } else if (!res.data.result) {
            // console.log(res.data.result, res.data.unread);
            // 모두 읽지 않음
            alarmDispatch({ type: "ON" });
          }
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBanner = async () => {
    setBannerLoading(true);
    const banner = await axios.get(
      `/api/page/common/banner?nation=${pathname}&year=${currentYear}&path=${encodeURIComponent(
        window.location.pathname
          .replace(`/${pathname}`, "")
          .replace(/\/+(\d)+/g, ""),
      )}`,
    );
    if (banner.data.success) {
      setBannerURL(banner.data.result);
    } else {
      setBannerURL("");
    }

    setBannerLoading(false);
  };

  const location = useLocation();
  const checkUser = (nation: string) => {
    axios
      .post("/api/users/check", {
        accessToken: authState.accessToken,
        nation,
        year: currentYear,
      })
      .then((res) => {
        /** 로그인 시, 페이지 이동 및 새로고침 할 때마다 검사 */
        if (res.data.success !== false) {
          const {
            accessToken,
            id,
            email,
            role,
            nation,
            isPasswordSet,
            isNewAnnouncement,
            isAnnouncementCached,
          } = res.data.data;
          if (accessToken !== undefined) {
            authDispatch({
              type: "LOGIN",
              authState: {
                ...authState,
                isLogin: true,
                id,
                email,
                role,
                nation,
                accessToken,
                isPasswordSet,
                isLoading: false,
                isNewAnnouncement,
                isAnnouncementCached,
              },
            });

            if (isAnnouncementCached) {
              alarmDispatch({ type: "OFF" });
            } else if (pathname !== "common" && pathname !== "home") {
              calcAnnouncementCached();
            }
            if (isNewAnnouncement) {
              alarmDispatch({ type: "ON" });
            }
          }
          // 비밀번호 미설정 시 reset 시키기
          if (!isPasswordSet && !location.pathname.includes("reset-password")) {
            localStorage.setItem("redirectTo", location.pathname);
            navigate({
              pathname: `/${nation}/${currentYear}/user/reset-password`,
              search: `?redirectTo=${localStorage.getItem("redirectTo")}`,
            });
          }
        } else {
          if (nation !== "" && nation !== "home") {
            // console.log("LOGOUT");
            setLocalStorage();
          }
          authDispatch({
            type: "LOGOUT",
            authState: {
              ...authState,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        authDispatch({ type: "FINISHLOADING", authState: { ...authState } });
        // authState를 바로 사용할 수 없음 따라서, then내부에서 로그인할 때, 검사
      });
  };

  useEffect(() => {
    if (pathname === "jp") {
      setCurrentTheme(jpThemeObj);
    } else if (pathname === "china")
      setCurrentTheme(currentLanguage === "china" ? enThemeObj : themeObj);
    else setCurrentTheme(themeObj);

    if (currentURL === "china") {
      setNationList(["china", "common"]);
    } else setNationList(["asia", "eu", "jp", "kr", "americas", "common"]);

    if (pathname !== "common") {
      checkUser(pathname);
    } else {
      checkUser(currentNation);
    }
    //
  }, [authState.isLoading, pathname, subpath]);
  useEffect(() => {
    checkYearAndRedirect();
    setDocumentTitle(useSeoTitle(pathname, currentYear, nssType));

    // 스크롤 to top
    window.scrollTo(0, 0);
  }, [pathname, subpath, window.location.search]);
  // 로그아웃

  const routeLoopHelper = (route: routeType, isPrivate?: boolean) => {
    let resultElement = route.element;
    if (route.isPrivate || isPrivate) {
      resultElement = (
        <PrivateRoute
          setEmailModalOpen={setEmailModalOpen}
          allowVisitor={route.allowVisitor}
        >
          {route.element}
        </PrivateRoute>
      );
    }
    return <Route key={route.path} path={route.path} element={resultElement} />;
  };
  // menu state
  const [menuStateLoading, setMenuStateLoading] = useState<boolean>(true);
  // const [menuList, setMenuList] = useState<Common.menuType[]>(null);
  const menuStore = useMenuStore();
  const { menuList, currentMenu, setMenuList, setCurrentMenu } = menuStore;
  const [documentTitle, setDocumentTitle] = useState<string>();

  // config state
  const configStore = useConfigStore();
  const { setConfigState } = configStore;

  const getConfig = async () => {
    const res = await axios.get(`/api/configuration?nation=${pathname}`);
    setConfigState(res.data.result);
  };

  const setLocalStorage = useCallback(async () => {
    console.log("setlocalstorage in App");
    const savedData = localStorage.getItem(
      `readAnnouncementList_${pathname}${currentYear}`,
    );
    if (!savedData) {
      const readAnnouncementObj = {
        country: pathname,
        announcementList: [],
        announcementLength: 0,
        isAnnouncementCached: 0,
        isThereNewAnnouncement: 1,
      };

      localStorage.setItem(
        `readAnnouncementList_${pathname}${currentYear}`,
        JSON.stringify(readAnnouncementObj),
      );

      // 먼저 해당 지역에 해당하는 공지사항이 있는지 확인
      axios
        .get(
          `/api/announcement/originlist?nation=${pathname}&year=${currentYear}`,
        )
        .then((res) => {
          if (res.data.success) {
            if (typeof res.data.result === "number") {
              alarmDispatch({ type: "ON" }); // 있으면 알람표시
            } else {
              alarmDispatch({ type: "OFF" });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const parsedData = JSON.parse(savedData);
      if (
        // cache되어 있다면 불필요한 계산 x
        !parsedData.isAnnouncementCached
      ) {
        if (parsedData.isThereNewAnnouncement) {
          try {
            const response = await axios.get(
              `/api/announcement/originlist?nation=${pathname}&year=${currentYear}`,
            );
            if (response.data.success) {
              parsedData.announcementLength = response.data.result;
            }
          } catch (err) {
            console.log("Error >>", err);
          } finally {
            parsedData.isThereNewAnnouncement = 0;
          }
        }
        if (
          parsedData.announcementList.length < parsedData.announcementLength
        ) {
          alarmDispatch({ type: "ON" });
        } else {
          alarmDispatch({ type: "OFF" });
        }
      }
      localStorage.setItem(
        `readAnnouncementList_${pathname}${currentYear}`,
        JSON.stringify(parsedData),
      );
    }
  }, [pathname, alarmDispatch]);

  useEffect(() => {
    if (pathname !== "" && pathname !== "home") {
      setMenuStateLoading(true);
      axios
        .get(`/api/menu/list`, {
          params: {
            nation: pathname,
            year: currentYear,
            language: pathname === "china" ? currentLanguage : undefined,
          },
        })
        .then((res) => {
          setMenuList(res.data.result);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setMenuStateLoading(false);
        });

      getConfig();
    }
  }, [pathname]);

  useEffect(() => {
    setCurrentMenu(window.location.pathname);
    // ga
    const { title } = window.document;
    const { href } = window.location;
    const path = window.location.pathname;
    window.gtag("config", gaID, {
      page_title: title,
      page_location: href,
      page_path: path,
    });
  }, [menuList, window.location.href]);

  // doc title 변경
  useEffect(() => {
    // seo title
    document.title = currentMenu
      ? `${currentMenu.name.toUpperCase()} | ${documentTitle}`
      : documentTitle;
  }, [currentMenu, documentTitle]);

  // meta tag
  useEffect(() => {
    const { metaDescription, metaKeywords } = setMetaTag(pathname, subpath);
    const setMetaAttribute = (name: string, value: string) => {
      document
        .querySelector(`meta[name='${name}']`)
        .setAttribute("content", value);
    };
    setMetaAttribute("description", metaDescription);
    setMetaAttribute("keywords", metaKeywords);
  }, [window.location.href]);

  useEffect(() => {
    if (window.location.pathname !== "/") {
      getBanner();
    } else {
      setBannerURL("");
    }
  }, [bannerURL, window.location.pathname]);

  useEffect(() => {
    if (
      pathname !== "common" &&
      pathname !== "home" &&
      loginSuccess &&
      authState.isLogin
    ) {
      // 캐쉬가 되어있든 안되어있든 로그인하자마자 데이터 획득
      // useeffect memory error x
      if (window.location.pathname.includes("announcement")) {
        axios
          .get(
            `/api/announcement/readlist?nation=${pathname}&id=${authState.id}&year=${currentYear}`,
          )
          .then((res) => {
            if (res.data.success) {
              unreadAnnouncementListDispatch({
                type: "INSERT_ANNOUNCEMENT",
                arr: res.data.unread,
              });
            } else {
              console.log(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (pathname !== "common" && pathname !== "home") {
        calcAnnouncementCached();
      }
    }
  }, [loginSuccess]);

  if (
    authState.isLoading
    // || bannerLoading
  )
    return (
      <ThemeProvider theme={themeObj}>
        <Loading />
      </ThemeProvider>
    );

  return (
    <ThemeProvider theme={currentTheme}>
      <AppContainer>
        {pathname !== "home" &&
          subpath.indexOf("admin") === -1 &&
          nationList.indexOf(pathname) !== -1 && (
            <NavBar
              checkLoading={authState.isLoading}
              setEmailModalOpen={setEmailModalOpen}
              setLogoutSuccess={setLogoutSuccess}
              setLogoutLoading={setLogoutLoading}
              menuStateLoading={menuStateLoading}
            />
          )}
        {!bannerLoading && bannerURL && (
          <LandingSection
            className="banner"
            background={`${S3_URL}/${bannerURL}`}
            maxWidth="1920px"
            fullWidth
          />
        )}
        <Routes>
          {/* common */}
          {currentURL !== "china"
            ? CommonRoutes.map((route) => {
                return routeLoopHelper(route);
              })
            : CommonChinaRoutes.map((route) => {
                return routeLoopHelper(route);
              })}
          {/* admin */}
          {AdminRoutes.map((route) => {
            return routeLoopHelper(route, true);
          })}
          <Route path="*" element={<NotFound />} />
          {nationRoutes.map((m) => {
            return m.map((route) => {
              return routeLoopHelper(route);
            });
          })}
        </Routes>
        {pathname !== "home" &&
          window.location.pathname.indexOf("admin") === -1 && <Footer />}

        {pathname !== "" && (
          <LoginModal
            setSuccess={setLoginSuccess}
            setFailed={setLoginFailed}
            setNoRegionAlert={setNoRegionAlert}
            emailModalOpen={emailModalOpen}
            setEmailModalOpen={setEmailModalOpen}
            setPasswordSetSuccessAlert={setPasswordSetSuccessAlert}
            passwordSetModalOpen={passwordSetModalOpen}
            setPasswordSetModalOpen={setPasswordSetModalOpen}
            passwordInputModalOpen={passwordInputModalOpen}
            setPasswordInputModalOpen={setPasswordInputModalOpen}
          />
        )}

        {/* alert */}
        <TopCenterSnackBar
          value={loginSuccess}
          setValue={setLoginSuccess}
          variant="filled"
          severity="success"
          content="Successfully signed in."
        />
        <TopCenterSnackBar
          value={loginFailed}
          setValue={setLoginFailed}
          variant="filled"
          severity="error"
          content="User info not matched."
        />
        <TopCenterSnackBar
          value={logoutSuccess}
          setValue={setLogoutSuccess}
          variant="filled"
          severity="info"
          content="Successfully signed out."
        />

        <TopCenterSnackBar
          value={passwordSetSuccessAlert}
          setValue={setPasswordSetSuccessAlert}
          variant="filled"
          severity="success"
          content="Password is successfully set."
        />
        <TopCenterSnackBar
          value={noRegionAlert}
          setValue={setNoRegionAlert}
          variant="filled"
          severity="error"
          content="Please select your region."
        />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
