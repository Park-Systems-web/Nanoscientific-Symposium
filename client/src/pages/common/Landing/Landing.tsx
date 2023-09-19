/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect, useRef } from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";
import Loading from "components/Loading/Loading";
import usePageViews from "hooks/usePageViews";
import { globalData, S3_URL } from "utils/GlobalData";
import LandingTitle from "components/Title/LandingTitle";
import LandingSection from "components/Section/LandingSection";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Switch,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import NSSButton from "components/Button/NSSButton";
import { useNavigate } from "react-router";
import axios from "axios";
import SpeakerCard from "components/SpeakerCard/SpeakerCard";
import CookieConsent, { Cookies } from "react-cookie-consent";
import YoutubeEmbed from "components/YoutubeEmbed/YoutubeEmbed";
import BackgroundVectorWhite from "components/BackgroundVector/BackgroundVectorWhite";
import BackgroundVectorColored from "components/BackgroundVector/BackgroundVectorColored";
import BackgroundVectorColoredReversed from "components/BackgroundVector/BackgroundVectorColoredReversed";
// import { LiveChatWidget } from "@livechat/widget-react";
import {
  subHeadingFontSize,
  mainFontSize,
  smallFontSize,
  headingFontSize,
} from "utils/FontSize";
import Link from "components/Link/LinkWithSearch";
import useLoadingStore from "store/LoadingStore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { adminRole, editorRole } from "utils/Roles";
import { useAuthState } from "context/AuthContext";
import LandingSection4Form from "pages/admin/Forms/LandingSection4Form";
import { LoadingButton } from "@mui/lab";
import LandingTextEditor from "components/LandingTextEditor/LandingTextEditor";
import EditIcon from "@mui/icons-material/Edit";
import SponsorForm from "pages/admin/Forms/SponsorForm";
import useAdminStore from "store/AdminStore";
import useCurrentYear from "hooks/useCurrentYear";
import Landing6Form from "pages/admin/Forms/Landing6Form";
import { escapeQuotes } from "utils/String";
import useNSSType from "hooks/useNSSType";
import LandingBannerForm from "pages/admin/Forms/LandingBannerForm";
import useCurrentURL from "hooks/useCurrentURL";
import { useNavigate as useNavigateWithSearch } from "hooks/useNavigateWithSearch";
import { SpeakersContainer } from "../Speakers/SpeakersStyles";
import { LandingContainer } from "./LandingStyles";

interface LandingSectionProps extends React.ComponentPropsWithRef<"div"> {
  children?: JSX.Element | JSX.Element[] | string | string[];
  maxWidth?: string;
  height?: string;
  fullWidth?: boolean;
  background?: string;
}
// interface LandingProps {
//   currentYear?: string;
// }

const Landing = () => {
  const currentYear = useCurrentYear();
  const currentURL = useCurrentURL();
  // const { currentYear } = props;

  const pathname = usePageViews();
  // const nssType = `${pathname}${currentYear !== undefined ? currentYear : ""}`;
  const nssType = useNSSType();
  const theme = useTheme();
  const authState = useAuthState();
  const isEditor = editorRole.includes(authState.role);
  const isAdmin = adminRole.includes(authState.role);
  const { currentLanguage } = useAdminStore();
  const landingRefList = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const { registration } = globalData.get(nssType) as Common.globalDataType;

  // S: landing banner 관련

  // E: landing banner 관련

  const navigate = useNavigate();
  const navigateWithSearch = useNavigateWithSearch();

  const [originalLandingList, setOriginalLandingList] = useState<
    Landing.landingType[]
  >([]);
  const [landingList, setLandingList] = useState<Landing.landingType[]>([]);
  // title
  const [landing2Title, setLanding2Title] = useState<string>("");
  const [landing3Title, setLanding3Title] = useState<string>("");
  const [landing4Title, setLanding4Title] = useState<string>("");
  const [landing5Title, setLanding5Title] = useState<string>("");
  const [landing6Title, setLanding6Title] = useState<string>("");
  const [landing7Title, setLanding7Title] = useState<string>("");
  const [landing8Title, setLanding8Title] = useState<string>("");
  const [landing9Title, setLanding9Title] = useState<string>("");

  // content
  const [landing2Desc, setLanding2Desc] = useState<string>("");
  const [landing2DescCpy, setLanding2DescCpy] = useState<string>("");
  const [landing3Desc, setLanding3Desc] = useState<string>("");
  const [landing3DescCpy, setLanding3DescCpy] = useState<string>("");
  const [landingSection4List, setLandingSection4List] =
    useState<Landing.landing4Type[]>(null);
  const [landing6Desc, setLanding6Desc] = useState<string>("");
  const [landing6DescCpy, setLanding6DescCpy] = useState<string>("");

  // landing banner content
  const [landingBannerContent, setLandingBannerContent] =
    useState<Landing.landingBannerType>(null);

  // landing4 modal
  const [openSection4Modal, setOpenSection4Modal] = useState<boolean>(false);
  const [editSection4, setEditSection4] = useState<boolean>(false);
  // landing4 state
  const [selectedSection4, setSelectedSection4] =
    useState<Landing.landing4Type>();
  const [keynoteSpeakers, setKeynoteSpeakers] = useState<Speaker.speakerType[]>(
    [],
  );
  // landing6
  const [landing6Content, setLanding6Content] =
    useState<Landing.landing6Type>(null);
  const [openLanding6Modal, setOpenLanding6Modal] = useState<boolean>(false);
  // landing7
  const [isSponsorPreview, setIsSponsorPreview] = useState<boolean>(false);
  const [isSponsor2Preview, setIsSponsor2Preview] = useState<boolean>(false);
  const [isSponsor3Preview, setIsSponsor3Preview] = useState<boolean>(false);
  const [previewSponsorList, setPreviewSponsorList] = useState<
    Landing.landing7Type[]
  >([]);
  const [landingSection7Sponsors, setLandingSection7Sponsors] = useState<
    Landing.landing7Type[]
  >([]);
  const [selectedSponsor, setSelectedSponsor] =
    useState<Landing.landing7Type>();
  // landing8
  const [previewSponsor2List, setPreviewSponsor2List] = useState<
    Landing.landing7Type[]
  >([]);
  const [landingSection8Sponsors, setLandingSection8Sponsors] = useState<
    Landing.landing7Type[]
  >([]);
  const [selectedSponsor2, setSelectedSponsor2] =
    useState<Landing.landing7Type>();
  // landing9
  const [previewSponsor3List, setPreviewSponsor3List] = useState<
    Landing.landing7Type[]
  >([]);
  const [landingSection9Sponsors, setLandingSection9Sponsors] = useState<
    Landing.landing7Type[]
  >([]);
  const [selectedSponsor3, setSelectedSponsor3] =
    useState<Landing.landing7Type>();

  const [openSponsorModal, setOpenSponsorModal] = useState<boolean>(false);
  const [editSponsor, setEditSponsor] = useState<boolean>(false);

  const [openSponsorModal2, setOpenSponsorModal2] = useState<boolean>(false);
  const [editSponsor2, setEditSponsor2] = useState<boolean>(false);

  const [openSponsorModal3, setOpenSponsorModal3] = useState<boolean>(false);
  const [editSponsor3, setEditSponsor3] = useState<boolean>(false);

  const [openLandingBannerModal, setOpenLandingBannerModal] =
    useState<boolean>(false);
  // for text editor
  const [landing2TitleEdit, setLanding2TitleEdit] = useState<boolean>(false);
  const [landing2TitlePreviewContent, setLanding2TitlePreviewContent] =
    useState<string>("");
  const [landing2TitlePreview, setLanding2TitlePreview] =
    useState<boolean>(false);
  const [landing2DescEdit, setLanding2DescEdit] = useState<boolean>(false);
  const [landing2DescPreviewContent, setLanding2DescPreviewContent] =
    useState<string>("");
  const [landing2DescPreview, setLanding2DescPreview] =
    useState<boolean>(false);
  // teaser url
  const [teaserID, setTeaserID] = useState<string>("");
  //
  const [landing3TitleEdit, setLanding3TitleEdit] = useState<boolean>(false);
  const [landing3TitlePreviewContent, setLanding3TitlePreviewContent] =
    useState<string>("");
  const [landing3TitlePreview, setLanding3TitlePreview] =
    useState<boolean>(false);
  const [landing3DescEdit, setLanding3DescEdit] = useState<boolean>(false);
  const [landing3DescPreviewContent, setLanding3DescPreviewContent] =
    useState<string>("");
  const [landing3DescPreview, setLanding3DescPreview] =
    useState<boolean>(false);
  //
  const [landing4TitleEdit, setLanding4TitleEdit] = useState<boolean>(false);
  const [landing4TitlePreviewContent, setLanding4TitlePreviewContent] =
    useState<string>("");
  const [landing4TitlePreview, setLanding4TitlePreview] =
    useState<boolean>(false);
  //
  const [landing5TitleEdit, setLanding5TitleEdit] = useState<boolean>(false);
  const [landing5TitlePreviewContent, setLanding5TitlePreviewContent] =
    useState<string>("");
  const [landing5TitlePreview, setLanding5TitlePreview] =
    useState<boolean>(false);
  //
  const [landing6TitleEdit, setLanding6TitleEdit] = useState<boolean>(false);
  const [landing6TitlePreviewContent, setLanding6TitlePreviewContent] =
    useState<string>("");
  const [landing6TitlePreview, setLanding6TitlePreview] =
    useState<boolean>(false);
  const [landing6DescEdit, setLanding6DescEdit] = useState<boolean>(false);
  const [landing6DescPreviewContent, setLanding6DescPreviewContent] =
    useState<string>("");
  const [landing6DescPreview, setLanding6DescPreview] =
    useState<boolean>(false);
  //
  const [landing7TitleEdit, setLanding7TitleEdit] = useState<boolean>(false);
  const [landing7TitlePreviewContent, setLanding7TitlePreviewContent] =
    useState<string>("");
  const [landing7TitlePreview, setLanding7TitlePreview] =
    useState<boolean>(false);

  const [landing8TitleEdit, setLanding8TitleEdit] = useState<boolean>(false);
  const [landing8TitlePreviewContent, setLanding8TitlePreviewContent] =
    useState<string>("");
  const [landing8TitlePreview, setLanding8TitlePreview] =
    useState<boolean>(false);

  const [landing9TitleEdit, setLanding9TitleEdit] = useState<boolean>(false);
  const [landing9TitlePreviewContent, setLanding9TitlePreviewContent] =
    useState<string>("");
  const [landing9TitlePreview, setLanding9TitlePreview] =
    useState<boolean>(false);

  // Loading
  const [stickyApplyLoading, setStickyApplyLoading] = useState<boolean>(false);
  const {
    landingListLoading,
    setLandingListLoading,
    landingLoading,
    setLandingLoading,
  } = useLoadingStore();

  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  const getLandingBanner = async () => {
    try {
      const res = await axios.get(`/api/page/common/landing/banner`, {
        params: {
          nation: pathname,
          language: pathname === "china" ? currentLanguage : undefined,
          year: currentYear,
        },
      });
      setLandingBannerContent(res.data.result[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const getLandingList = async () => {
    try {
      setLandingListLoading(true);
      const res = await axios.get(`/api/page/common/landing`, {
        params: {
          nation: pathname,
          language: pathname === "china" ? currentLanguage : undefined,
          year: currentYear,
        },
      });
      setLandingList(res.data.result);
      setOriginalLandingList(res.data.result);
      setLanding2Title(res.data.result[0].title);
      setLanding3Title(res.data.result[1].title);
      setLanding4Title(res.data.result[2].title);
      setLanding5Title(res.data.result[3].title);
      setLanding6Title(res.data.result[4].title);
      setLanding7Title(res.data.result[5].title);
      setLanding8Title(res.data.result[6].title);
      setLanding9Title(res.data.result[7].title);
    } catch (err) {
      console.log(err);
    } finally {
      setLandingListLoading(false);
    }
  };

  // landing2 handler
  const getLandingSection2 = async () => {
    try {
      const res = await axios.get(`/api/page/common/landing/2`, {
        params: {
          nation: pathname,
          language: pathname === "china" ? currentLanguage : undefined,
          year: currentYear,
        },
      });
      setLanding2Desc(res.data.result[0].description);
      setLanding2DescCpy(res.data.result[0].description);
      setTeaserID(res.data.result[0].teaser);
    } catch (err) {
      console.log(err);
    }
  };
  const applyLanding2Content = async () => {
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/landing/2`, {
        nation: pathname,
        title: escapeQuotes(landing2Title),
        description: escapeQuotes(landing2Desc),
        language: pathname === "china" ? currentLanguage : undefined,
        year: currentYear,
      });
      landingList[0].title = landing2Title;
      setLanding2DescCpy(landing2Desc);
      setLanding2TitleEdit(false);
      setLanding2DescEdit(false);
    }
  };

  // landing3 handler
  const getLandingSection3 = async () => {
    try {
      const res = await axios.get(`/api/page/common/landing/3`, {
        params: {
          nation: pathname,
          language: pathname === "china" ? currentLanguage : undefined,
          year: currentYear,
        },
      });
      setLanding3Desc(res.data.result[0].description);
      setLanding3DescCpy(res.data.result[0].description);
    } catch (err) {
      console.log(err);
    }
  };
  const applyLanding3Content = async () => {
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/landing/3`, {
        nation: pathname,
        title: escapeQuotes(landing3Title),
        description: escapeQuotes(landing3Desc),
        language: pathname === "china" ? currentLanguage : undefined,
        year: currentYear,
      });
      landingList[1].title = landing3Title;
      setLanding3DescCpy(landing3Desc);
      setLanding3TitleEdit(false);
      setLanding3DescEdit(false);
    }
  };

  // landing4 handler
  const getLandingSection4 = async () => {
    setLandingLoading(true);
    try {
      const result = await axios.get(`/api/page/common/landing/4`, {
        params: {
          nation: pathname,
          year: currentYear,
        },
      });
      setLandingSection4List(result.data.result);
    } catch (err) {
      console.log(err);
    } finally {
      setLandingLoading(false);
    }
  };

  const applyLanding4Title = async () => {
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/landing/title/4`, {
        nation: pathname,
        title: escapeQuotes(landing4Title),
        language: pathname === "china" ? currentLanguage : undefined,
        year: currentYear,
      });
      setLanding4Title(landing4Title);
      setLanding4TitleEdit(false);
    }
  };
  const handleAddSection4 = () => {
    setSelectedSection4(null);
    setEditSection4(false);
    setOpenSection4Modal(true);
  };
  const handleEditSection4 = (section: Landing.landing4Type) => {
    setSelectedSection4(section);
    setEditSection4(true);
    setOpenSection4Modal(true);
  };

  // landing5 handler
  const applyLanding5Title = async () => {
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/landing/title/5`, {
        nation: pathname,
        title: escapeQuotes(landing5Title),
        language: pathname === "china" ? currentLanguage : undefined,
        year: currentYear,
      });
      setLanding5Title(landing5Title);
      setLanding5TitleEdit(false);
    }
  };
  // landing6 title
  const applyLanding6Title = async () => {
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/landing/title/6`, {
        nation: pathname,
        title: escapeQuotes(landing6Title),
        language: pathname === "china" ? currentLanguage : undefined,
        year: currentYear,
      });
      setLanding6Title(landing6Title);
      setLanding6TitleEdit(false);
    }
  };

  // landing6 handler
  const applyLanding6Content = async () => {
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/landing/6`, {
        nation: pathname,
        title: escapeQuotes(landing6Title),
        description: escapeQuotes(landing6Desc),
        language: pathname === "china" ? currentLanguage : undefined,
        year: currentYear,
      });
      setLanding6Title(landing6Title);
      setLanding6Desc(landing6Desc);
      setLanding6TitleEdit(false);
      setLanding6DescEdit(false);
    }
  };
  const getLandingSection6 = async () => {
    setLandingLoading(true);
    try {
      const result = await axios.get(`/api/page/common/landing/6`, {
        params: {
          nation: pathname,
          language: pathname === "china" ? currentLanguage : undefined,
          year: currentYear,
        },
      });
      setLanding6Content(result.data.result[0]);
      setLanding6Desc(result.data.result[0].description);
      setLanding6DescCpy(result.data.result[0].description);
    } catch (err) {
      console.log(err);
    } finally {
      setLandingLoading(false);
    }
  };

  const getKeynoteList = async () => {
    try {
      const res = await axios.get(`/api/page/common/speakers/keynote`, {
        params: {
          nation: pathname,
          year: currentYear,
        },
      });
      setKeynoteSpeakers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // landing 7 handler
  const applyLanding7Title = async () => {
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/landing/title/7`, {
        nation: pathname,
        title: escapeQuotes(landing7Title),
        language: pathname === "china" ? currentLanguage : undefined,
        year: currentYear,
      });
      setLanding7Title(landing7Title);
      setLanding7TitleEdit(false);
    }
  };
  const getLandingSection7 = async () => {
    try {
      const result = await axios.get(`/api/page/common/landing/7`, {
        params: {
          nation: pathname,
          year: currentYear,
        },
      });
      setLandingSection7Sponsors(result.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const addSponsorHandler = () => {
    setSelectedSponsor(null);
    setEditSponsor(false);
    setOpenSponsorModal(true);
  };
  const editSponsorHandler = (sponsor: Landing.landing7Type) => {
    setSelectedSponsor(sponsor);
    setEditSponsor(true);
    setOpenSponsorModal(true);
  };
  const handleReturnSponsor = () => {
    setIsSponsorPreview(false);
    setOpenSponsorModal(true);
  };

  // landing 8 handler
  const applyLanding8Title = async () => {
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/landing/title/8`, {
        nation: pathname,
        title: escapeQuotes(landing8Title),
        language: pathname === "china" ? currentLanguage : undefined,
        year: currentYear,
      });
      setLanding8Title(landing8Title);
      setLanding8TitleEdit(false);
    }
  };
  const getLandingSection8 = async () => {
    try {
      const result = await axios.get(`/api/page/common/landing/8`, {
        params: {
          nation: pathname,
          language: pathname === "china" ? currentLanguage : undefined,
          year: currentYear,
        },
      });
      setLandingSection8Sponsors(result.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  const addSponsorHandler2 = () => {
    setSelectedSponsor2(null);
    setEditSponsor2(false);
    setOpenSponsorModal2(true);
  };
  const editSponsorHandler2 = (sponsor: Landing.landing7Type) => {
    setSelectedSponsor2(sponsor);
    setEditSponsor2(true);
    setOpenSponsorModal2(true);
  };
  const handleReturnSponsor2 = () => {
    setIsSponsor2Preview(false);
    setOpenSponsorModal2(true);
  };
  // landing9 handler
  const applyLanding9Title = async () => {
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/landing/title/9`, {
        nation: pathname,
        title: escapeQuotes(landing9Title),
        language: pathname === "china" ? currentLanguage : undefined,
        year: currentYear,
      });
      setLanding9Title(landing9Title);
      setLanding9TitleEdit(false);
    }
  };
  const getLandingSection9 = async () => {
    try {
      const result = await axios.get(`/api/page/common/landing/9`, {
        params: {
          nation: pathname,
          language: pathname === "china" ? currentLanguage : undefined,
          year: currentYear,
        },
      });
      setLandingSection9Sponsors(result.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  const addSponsorHandler3 = () => {
    setSelectedSponsor3(null);
    setEditSponsor3(false);
    setOpenSponsorModal3(true);
  };
  const editSponsorHandler3 = (sponsor: Landing.landing7Type) => {
    setSelectedSponsor3(sponsor);
    setEditSponsor3(true);
    setOpenSponsorModal3(true);
  };
  const handleReturnSponsor3 = () => {
    setIsSponsor3Preview(false);
    setOpenSponsorModal3(true);
  };

  // sticky
  const handleStickyMenuSectionClick = (
    ref: React.MutableRefObject<HTMLDivElement>,
  ) => {
    ref.current.parentElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    ref.current.parentElement.classList.add("bg-alpha");
    setTimeout(() => {
      ref.current.parentElement.classList.remove("bg-alpha");
    }, 400);
  };
  const setLandingTitle = (i: number, title: string) => {
    const newLanding = [...landingList];
    newLanding[i] = {
      ...landingList[i],
      title,
    };
    setLandingList(newLanding);
  };
  const handleStickyReset = () => {
    if (confirm("Are you sure to reset?")) {
      setLandingList(originalLandingList);
    }
  };
  const handleStickyApply = async () => {
    if (confirm("Are you sure to apply?")) {
      try {
        setStickyApplyLoading(true);
        await axios.post("/api/page/common/landing", {
          nation: pathname,
          landingSectionList: landingList,
        });
      } catch (err) {
        console.log(err);
      } finally {
        getLandingList();
        setStickyApplyLoading(false);
      }
    }
  };

  useEffect(() => {
    if (currentURL === "china" && !location.pathname.includes("china")) {
      navigateWithSearch("/china");
    }
    getLandingBanner();
    getLandingList();
    getKeynoteList();
    getLandingSection2();
    getLandingSection3();
    getLandingSection4();
    getLandingSection6();
    getLandingSection7();
    getLandingSection8();
    getLandingSection9();
  }, []);

  if (landingListLoading) {
    return <Box className="body-fit" />;
  }
  return (
    <LandingContainer>
      {landingBannerContent && (
        <LandingSection
          fullWidth
          maxWidth="1920px"
          background={
            landingBannerContent.background.indexOf("https://") === -1
              ? `${S3_URL}/${landingBannerContent.background}`
              : landingBannerContent.background
          }
          className="section1"
        >
          <Box
            sx={{ cursor: isEditor ? "pointer" : "default" }}
            onClick={
              isEditor &&
              (() => {
                setOpenLandingBannerModal(true);
              })
            }
          >
            <BackgroundVectorWhite maxWidth="1920px">
              <div
                className="overlay z0"
                style={{ background: landingBannerContent.bg_overlay }}
              />
              <Stack
                className="layout"
                direction="column"
                alignItems="center"
                spacing={5}
                sx={{
                  padding: { laptop: "135px 50px !important" },
                  maxWidth: "1400px !important",
                  textAlign: "center",
                }}
              >
                <img
                  className="z1 banner-logo"
                  src={landingBannerContent.logo}
                  alt="logo"
                />
                <Stack
                  className="z1"
                  sx={{
                    flexDirection: {
                      mobile: "column",
                      laptop: "row",
                    },
                    backgroundColor: theme.palette.common.white,
                    padding: "0 10px",
                  }}
                  style={{ marginTop: 0 }}
                  alignItems="center"
                >
                  {landingBannerContent.venue && (
                    <>
                      <Typography
                        fontSize={headingFontSize}
                        fontWeight={700}
                        color={theme.palette.primary.navy}
                      >
                        {landingBannerContent.venue}
                      </Typography>
                      <Typography
                        sx={{
                          display: { mobile: "none", laptop: "inline-block" },
                          margin: "0 8px",
                        }}
                        fontWeight={700}
                        fontSize={subHeadingFontSize}
                        color={theme.palette.primary.navy}
                      >
                        |
                      </Typography>
                    </>
                  )}
                  {landingBannerContent.date && (
                    <Typography
                      fontSize={headingFontSize}
                      fontWeight={700}
                      color={theme.palette.primary.navy}
                    >
                      {landingBannerContent.date}
                    </Typography>
                  )}
                </Stack>
                {landingBannerContent.show_register === 1 && (
                  <NSSButton
                    className="z1"
                    variant="gradient"
                    style={{ padding: "5px 20px" }}
                    fontSize={mainFontSize}
                    fontWeight={theme.typography.fontWeightBold}
                    letterSpacing="1.2px"
                  >
                    <Link
                      style={{ padding: 0, color: "white" }}
                      to={
                        pathname === "kr"
                          ? `/${pathname}/${currentYear}/register-info`
                          : `/${pathname}/${currentYear}/registration`
                      }
                    >
                      {registration || ""}
                    </Link>
                  </NSSButton>
                )}
                {/* {pathname === "jp" && (
              <NSSButton
                className="z1"
                variant="gradient"
                style={{ padding: "5px 20px", marginTop: "10px" }}
                fontSize={mainFontSize}
                fontWeight={theme.typography.fontWeightBold}
                letterSpacing="1.2px"
              >
                <Link
                  style={{ padding: 0, color: "white" }}
                  to={`/${pathname}/abstract`}
                >
                  ポスターセッション申込はこちらから
                </Link>
              </NSSButton>
            )} */}
                <Typography
                  className="z1"
                  textAlign="center"
                  color={theme.palette.common.white}
                  fontWeight={theme.typography.fontWeightMedium}
                  fontSize={subHeadingFontSize}
                >
                  {landingBannerContent.desc && (
                    <InnerHTML html={landingBannerContent.desc} />
                  )}
                </Typography>
              </Stack>
            </BackgroundVectorWhite>
          </Box>
        </LandingSection>
      )}
      {openLandingBannerModal && (
        <LandingBannerForm
          year={currentYear}
          open={openLandingBannerModal}
          setOpen={setOpenLandingBannerModal}
          selected={landingBannerContent}
        />
      )}

      {/* section2 */}
      {!landingListLoading && landingList.length !== 0 && (
        <BackgroundVectorColored maxWidth="1920px">
          {landingList[0].show !== 0 && (
            // <LandingSectionWithRef ref={landingRefList[0]} fullWidth>
            <LandingSection fullWidth>
              {/* client view */}
              <Box ref={landingRefList[0]} />
              <Stack
                className="layout"
                flexDirection={{
                  mobile: "column-reverse",
                  tablet: "row",
                }}
                maxWidth="1920px"
                alignItems="center"
                justifyContent="space-between"
                spacing={{ mobile: 5, tablet: 0 }}
              >
                <Stack flexDirection="column" width="100%" height="100%">
                  <LandingTextEditor
                    initialValue={landingList[0].title}
                    value={landing2Title}
                    setValue={setLanding2Title}
                    edit={landing2TitleEdit}
                    setEdit={setLanding2TitleEdit}
                    preview={landing2TitlePreview}
                    setPreview={setLanding2TitlePreview}
                    previewContent={landing2TitlePreviewContent}
                    setPreviewContent={setLanding2TitlePreviewContent}
                    applyHandler={applyLanding2Content}
                    sx={{
                      mb: 3,
                      fontSize: headingFontSize,
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
                    {landingList[0].title || ""}
                  </LandingTextEditor>
                  <LandingTextEditor
                    initialValue={landing2DescCpy}
                    value={landing2Desc}
                    setValue={setLanding2Desc}
                    edit={landing2DescEdit}
                    setEdit={setLanding2DescEdit}
                    preview={landing2DescPreview}
                    setPreview={setLanding2DescPreview}
                    previewContent={landing2DescPreviewContent}
                    setPreviewContent={setLanding2DescPreviewContent}
                    applyHandler={applyLanding2Content}
                    sx={{
                      fontSize: smallFontSize,
                    }}
                    embedURL={teaserID}
                  >
                    {landing2Desc || ""}
                  </LandingTextEditor>
                  {/* <LandingTitle title={landingList[0].title || ""} /> */}
                  {/* <Box fontSize={mainFontSize}>
                    <InnerHTML html={landing2Content || ""} />
                  </Box> */}
                </Stack>
              </Stack>
              {/* admin view */}
            </LandingSection>
          )}
          {/* section3 */}
          {landingList[1].show !== 0 && (
            <LandingSection fullWidth maxWidth="1920px">
              <Box ref={landingRefList[1]} />
              <Box className="layout">
                <LandingTextEditor
                  initialValue={landingList[1].title}
                  value={landing3Title}
                  setValue={setLanding3Title}
                  edit={landing3TitleEdit}
                  setEdit={setLanding3TitleEdit}
                  preview={landing3TitlePreview}
                  setPreview={setLanding3TitlePreview}
                  previewContent={landing3TitlePreviewContent}
                  setPreviewContent={setLanding3TitlePreviewContent}
                  applyHandler={applyLanding3Content}
                  sx={{
                    mb: 3,
                    fontSize: headingFontSize,
                    fontWeight: theme.typography.fontWeightBold,
                  }}
                >
                  {landing3Title || ""}
                </LandingTextEditor>
                <LandingTextEditor
                  initialValue={landing3DescCpy}
                  value={landing3Desc}
                  setValue={setLanding3Desc}
                  edit={landing3DescEdit}
                  setEdit={setLanding3DescEdit}
                  preview={landing3DescPreview}
                  setPreview={setLanding3DescPreview}
                  previewContent={landing3DescPreviewContent}
                  setPreviewContent={setLanding3DescPreviewContent}
                  applyHandler={applyLanding3Content}
                  sx={{
                    fontSize: mainFontSize,
                  }}
                >
                  {landing3Desc || ""}
                </LandingTextEditor>
              </Box>
            </LandingSection>
          )}
          {/* section4 */}
          {landingList[2].show !== 0 && (
            <LandingSection fullWidth maxWidth="1920px">
              <Box ref={landingRefList[2]} />
              <Stack className="layout" direction="column">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <LandingTextEditor
                    initialValue={landingList[2].title}
                    value={landing4Title}
                    setValue={setLanding4Title}
                    edit={landing4TitleEdit}
                    setEdit={setLanding4TitleEdit}
                    preview={landing4TitlePreview}
                    setPreview={setLanding4TitlePreview}
                    previewContent={landing4TitlePreviewContent}
                    setPreviewContent={setLanding4TitlePreviewContent}
                    applyHandler={applyLanding4Title}
                    sx={{
                      mb: 3,
                      fontSize: headingFontSize,
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
                    {landing4Title || ""}
                  </LandingTextEditor>

                  {isEditor && (
                    <IconButton onClick={handleAddSection4}>
                      <AddCircleOutlineIcon color="primary" />
                    </IconButton>
                  )}
                </Stack>
                <Stack
                  direction={{ mobile: "column", laptop: "row" }}
                  flexWrap="wrap"
                  justifyContent="space-between"
                  sx={{
                    color: theme.palette.common.white,
                  }}
                >
                  {landingSection4List?.map((item) => (
                    <Box
                      component={isEditor ? "button" : "div"}
                      className="gradient-box"
                      sx={{
                        width: {
                          laptop:
                            landingSection4List.length > 3
                              ? "30%"
                              : `calc(95% / ${landingSection4List.length})`,
                          mobile: "100%",
                        },
                        textAlign: "inherit",
                        textIndent: "inherit",
                        p: 3,
                        mb: { mobile: 5, laptop: 0 },
                        li: {
                          ml: 2,
                        },
                        display: "flex",
                        flexDirection: "column",
                      }}
                      key={`box-${item.id}`}
                      onClick={() => {
                        if (isEditor) {
                          setSelectedSection4(item);
                          setEditSection4(true);
                          setOpenSection4Modal(true);
                        }
                      }}
                    >
                      {item.title && (
                        <Typography fontWeight={600} sx={{ mb: 2 }}>
                          {item.title}
                        </Typography>
                      )}
                      <Typography fontSize={smallFontSize}>
                        <InnerHTML html={item.description} />
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </LandingSection>
          )}
          {/* Form */}
          {openSection4Modal && (
            <LandingSection4Form
              open={openSection4Modal}
              setOpen={setOpenSection4Modal}
              edit={editSection4}
              selectedSection={selectedSection4}
              year={currentYear}
            />
          )}
          {/* </BackgroundVectorColored> */}
          {/* <BackgroundVectorColoredReversed maxWidth="1920px"> */}
          {/* section5 */}
          {landingList[3].show !== 0 && (
            <LandingSection fullWidth maxWidth="1920px">
              <Box ref={landingRefList[3]} />

              <SpeakersContainer className="layout">
                <Stack direction="column">
                  <LandingTextEditor
                    initialValue={landingList[3].title}
                    value={landing5Title}
                    setValue={setLanding5Title}
                    edit={landing5TitleEdit}
                    setEdit={setLanding5TitleEdit}
                    preview={landing5TitlePreview}
                    setPreview={setLanding5TitlePreview}
                    previewContent={landing5TitlePreviewContent}
                    setPreviewContent={setLanding5TitlePreviewContent}
                    applyHandler={applyLanding5Title}
                    sx={{
                      mb: 3,
                      fontSize: headingFontSize,
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
                    {landing5Title || ""}
                  </LandingTextEditor>
                  <Stack direction="row" flexWrap="wrap">
                    {keynoteSpeakers.map((speaker) => (
                      <SpeakerCard key={speaker.id} speaker={speaker} />
                    ))}
                  </Stack>
                </Stack>
              </SpeakersContainer>
            </LandingSection>
          )}
          {/* section6 */}
          {landingList[4].show !== 0 && (
            <LandingSection fullWidth maxWidth="1920px">
              <Box ref={landingRefList[4]} />
              <Stack className="layout">
                <LandingTextEditor
                  initialValue={landingList[4].title}
                  value={landing6Title}
                  setValue={setLanding6Title}
                  edit={landing6TitleEdit}
                  setEdit={setLanding6TitleEdit}
                  preview={landing6TitlePreview}
                  setPreview={setLanding6TitlePreview}
                  previewContent={landing6TitlePreviewContent}
                  setPreviewContent={setLanding6TitlePreviewContent}
                  applyHandler={applyLanding6Title}
                  sx={{
                    mb: 3,
                    fontSize: headingFontSize,
                    fontWeight: theme.typography.fontWeightBold,
                  }}
                >
                  {landing6Title || ""}
                </LandingTextEditor>
                {landing6Content && (
                  <Stack
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      margin: "-15px 0 20px 0",
                      flexDirection: {
                        laptop: "row",
                      },
                    }}
                  >
                    <Box sx={{ width: { laptop: "50%" } }}>
                      <LandingTextEditor
                        initialValue={landing6DescCpy}
                        value={landing6Desc}
                        setValue={setLanding6Desc}
                        edit={landing6DescEdit}
                        setEdit={setLanding6DescEdit}
                        preview={landing6DescPreview}
                        setPreview={setLanding6DescPreview}
                        previewContent={landing6DescPreviewContent}
                        setPreviewContent={setLanding6DescPreviewContent}
                        applyHandler={applyLanding6Content}
                        sx={{
                          fontSize: mainFontSize,
                          fontWeight: theme.typography.fontWeightMedium,
                        }}
                      >
                        {landing6Content.description || ""}
                      </LandingTextEditor>
                    </Box>

                    <Box
                      sx={{
                        m: "15px",
                        width: { mobile: "70%", laptop: "30%" },
                      }}
                    >
                      {landing6Content.button_text && landing6Content.url && (
                        <NSSButton
                          variant="gradient"
                          style={{ margin: "0 auto" }}
                          onClick={() => {
                            openLink(landing6Content.url);
                          }}
                          fontSize={smallFontSize}
                          fontWeight={theme.typography.fontWeightBold}
                        >
                          {landing6Content.button_text}
                        </NSSButton>
                      )}
                      {isEditor && (
                        <IconButton
                          component="span"
                          className="landing6-edit-btn"
                          size="small"
                          onClick={() => {
                            setOpenLanding6Modal(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                    </Box>
                  </Stack>
                )}
                <Stack
                  sx={{
                    flexDirection: {
                      mobile: "column",
                      laptop: "row",
                    },
                  }}
                  justifyContent="space-between"
                  flexWrap="wrap"
                >
                  {/* {landingSection6Videos?.map((video) => (
                <Box
                  key={video}
                  sx={{
                    backgroundColor: "#fff",
                    width: {
                      mobile: "100%",
                      laptop: "46%",
                    },
                    mb: {
                      mobile: 2,
                      laptop: 0,
                    },
                    position: "relative",
                  }}
                >
                  <YoutubeEmbed embedId={video} height="250" />
                </Box>
              ))} */}
                </Stack>
              </Stack>
            </LandingSection>
          )}
          {/* </BackgroundVectorColoredReversed> */}
          {/* section7 */}
          {landingList[5].show !== 0 && landingSection7Sponsors && (
            <LandingSection fullWidth maxWidth="1920px">
              <Box ref={landingRefList[5]} />
              <Stack className="layout">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <LandingTextEditor
                    initialValue={landingList[5].title}
                    value={landing7Title}
                    setValue={setLanding7Title}
                    edit={landing7TitleEdit}
                    setEdit={setLanding7TitleEdit}
                    preview={landing7TitlePreview}
                    setPreview={setLanding7TitlePreview}
                    previewContent={landing7TitlePreviewContent}
                    setPreviewContent={setLanding7TitlePreviewContent}
                    applyHandler={applyLanding7Title}
                    sx={{
                      mb: 3,
                      fontSize: headingFontSize,
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
                    {landing7Title || ""}
                  </LandingTextEditor>
                  {isSponsorPreview && (
                    <Button variant="outlined" onClick={handleReturnSponsor}>
                      Return to editor
                    </Button>
                  )}
                </Stack>
                <Stack
                  flexWrap="wrap"
                  alignItems="center"
                  sx={{
                    flexDirection: "row",
                    justifyContent: {
                      mobile: "center",
                      tablet: "flex-start",
                    },
                  }}
                >
                  {isSponsorPreview &&
                    previewSponsorList.map((sponsor) => (
                      <Box>
                        <a
                          className="hover-zoom"
                          href={sponsor.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            pointerEvents: sponsor.url ? "inherit" : "none",
                            position: "relative",
                          }}
                        >
                          <img
                            src={`${S3_URL}/${sponsor.image_path}`}
                            alt={sponsor.name}
                            style={{
                              maxHeight: sponsor.height
                                ? sponsor.height
                                : "80px",
                              width: "100%",
                            }}
                          />
                        </a>
                        {isEditor && !isSponsorPreview && (
                          <IconButton
                            component="span"
                            className="sponsor-edit-btn"
                            key="sponsor-1-edit"
                            size="small"
                            onClick={() => {
                              editSponsorHandler(sponsor);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                  {!isSponsorPreview &&
                    landingSection7Sponsors.map((sponsor) => (
                      <Box>
                        <a
                          className="hover-zoom"
                          href={sponsor.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            pointerEvents: sponsor.url ? "inherit" : "none",
                            position: "relative",
                          }}
                        >
                          <img
                            src={`${S3_URL}/${sponsor.image_path}`}
                            alt={sponsor.name}
                            style={{
                              height: sponsor.height ? sponsor.height : "80px",
                              width: "100%",
                            }}
                          />
                        </a>
                        {isEditor && !isSponsorPreview && (
                          <IconButton
                            component="span"
                            className="sponsor-edit-btn"
                            key="sponsor-1-edit"
                            size="small"
                            color="primary"
                            onClick={() => {
                              editSponsorHandler(sponsor);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                  {isEditor && !isSponsorPreview && (
                    <Stack
                      sx={{
                        width: "110px",
                        height: "80px",
                      }}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton onClick={addSponsorHandler}>
                        <AddCircleOutlineIcon color="primary" />
                      </IconButton>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </LandingSection>
          )}

          {/* section8 */}
          {landingList[6].show !== 0 && landingSection8Sponsors && (
            <LandingSection fullWidth maxWidth="1920px">
              <Box ref={landingRefList[6]} />
              <Stack className="layout">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <LandingTextEditor
                    initialValue={landingList[6].title}
                    value={landing8Title}
                    setValue={setLanding8Title}
                    edit={landing8TitleEdit}
                    setEdit={setLanding8TitleEdit}
                    preview={landing8TitlePreview}
                    setPreview={setLanding8TitlePreview}
                    previewContent={landing8TitlePreviewContent}
                    setPreviewContent={setLanding8TitlePreviewContent}
                    applyHandler={applyLanding8Title}
                    sx={{
                      mb: 3,
                      fontSize: headingFontSize,
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
                    {landing8Title || ""}
                  </LandingTextEditor>
                  {isSponsor2Preview && (
                    <Button variant="outlined" onClick={handleReturnSponsor2}>
                      Return to editor
                    </Button>
                  )}
                </Stack>
                <Stack
                  flexWrap="wrap"
                  alignItems="center"
                  sx={{
                    flexDirection: "row",
                    justifyContent: {
                      mobile: "center",
                      tablet: "flex-start",
                    },
                  }}
                >
                  {isSponsor2Preview &&
                    previewSponsor2List.map((sponsor) => (
                      <Box>
                        <a
                          className="hover-zoom"
                          href={sponsor.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            pointerEvents: sponsor.url ? "inherit" : "none",
                            position: "relative",
                          }}
                        >
                          <img
                            src={`${S3_URL}/${sponsor.image_path}`}
                            alt={sponsor.name}
                            style={{
                              maxHeight: sponsor.height
                                ? sponsor.height
                                : "80px",
                              width: "100%",
                            }}
                          />
                        </a>
                        {isEditor && !isSponsor2Preview && (
                          <IconButton
                            component="span"
                            className="sponsor-edit-btn"
                            key="sponsor-2-edit"
                            size="small"
                            onClick={() => {
                              editSponsorHandler2(sponsor);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                  {!isSponsor2Preview &&
                    landingSection8Sponsors.map((sponsor) => (
                      <Box>
                        <a
                          className="hover-zoom"
                          href={sponsor.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            pointerEvents: sponsor.url ? "inherit" : "none",
                            position: "relative",
                          }}
                        >
                          <img
                            src={`${S3_URL}/${sponsor.image_path}`}
                            alt={sponsor.name}
                            style={{
                              maxHeight: sponsor.height
                                ? sponsor.height
                                : "80px",
                              width: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </a>
                        {isEditor && !isSponsor2Preview && (
                          <IconButton
                            component="span"
                            className="sponsor-edit-btn"
                            key="sponsor-2-edit"
                            size="small"
                            color="primary"
                            onClick={() => {
                              editSponsorHandler2(sponsor);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                  {isEditor && !isSponsor2Preview && (
                    <Stack
                      sx={{
                        width: "110px",
                        height: "80px",
                      }}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton onClick={addSponsorHandler2}>
                        <AddCircleOutlineIcon color="primary" />
                      </IconButton>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </LandingSection>
          )}
          {/* section9 */}
          {landingList[7].show !== 0 && landingSection9Sponsors && (
            <LandingSection fullWidth maxWidth="1920px">
              <Box ref={landingRefList[7]} />
              <Stack className="layout">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <LandingTextEditor
                    initialValue={landingList[7].title}
                    value={landing9Title}
                    setValue={setLanding9Title}
                    edit={landing9TitleEdit}
                    setEdit={setLanding9TitleEdit}
                    preview={landing9TitlePreview}
                    setPreview={setLanding9TitlePreview}
                    previewContent={landing9TitlePreviewContent}
                    setPreviewContent={setLanding9TitlePreviewContent}
                    applyHandler={applyLanding9Title}
                    sx={{
                      mb: 3,
                      fontSize: headingFontSize,
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
                    {landing9Title || ""}
                  </LandingTextEditor>
                  {isSponsor3Preview && (
                    <Button variant="outlined" onClick={handleReturnSponsor3}>
                      Return to editor
                    </Button>
                  )}
                </Stack>
                <Stack
                  flexWrap="wrap"
                  alignItems="center"
                  sx={{
                    flexDirection: "row",
                    justifyContent: {
                      mobile: "center",
                      tablet: "flex-start",
                    },
                  }}
                >
                  {isSponsor3Preview &&
                    previewSponsor3List.map((sponsor) => (
                      <Box>
                        <a
                          className="hover-zoom"
                          href={sponsor.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            pointerEvents: sponsor.url ? "inherit" : "none",
                            position: "relative",
                          }}
                        >
                          <img
                            src={`${S3_URL}/${sponsor.image_path}`}
                            alt={sponsor.name}
                            style={{
                              maxHeight: sponsor.height
                                ? sponsor.height
                                : "80px",
                              width: "100%",
                            }}
                          />
                        </a>
                        {isEditor && !isSponsor3Preview && (
                          <IconButton
                            component="span"
                            className="sponsor-edit-btn"
                            key="sponsor-3-edit"
                            size="small"
                            onClick={() => {
                              editSponsorHandler3(sponsor);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                  {!isSponsor3Preview &&
                    landingSection9Sponsors.map((sponsor) => (
                      <Box>
                        <a
                          className="hover-zoom"
                          href={sponsor.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            pointerEvents: sponsor.url ? "inherit" : "none",
                            position: "relative",
                          }}
                        >
                          <img
                            src={`${S3_URL}/${sponsor.image_path}`}
                            alt={sponsor.name}
                            style={{
                              maxHeight: sponsor.height
                                ? sponsor.height
                                : "80px",
                              width: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </a>
                        {isEditor && !isSponsor3Preview && (
                          <IconButton
                            component="span"
                            className="sponsor-edit-btn"
                            key="sponsor-2-edit"
                            size="small"
                            color="primary"
                            onClick={() => {
                              editSponsorHandler3(sponsor);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                  {isEditor && !isSponsor3Preview && (
                    <Stack
                      sx={{
                        width: "110px",
                        height: "80px",
                      }}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton onClick={addSponsorHandler3}>
                        <AddCircleOutlineIcon color="primary" />
                      </IconButton>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </LandingSection>
          )}
          {/* sticky menu */}
          {isEditor && (
            <Stack className="sticky-menu">
              {landingList.map((l, i) => (
                <Stack
                  key={`sticky-landing-${l.id}`}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Tooltip
                    title={l.title.replace(/<(\/)*\w+>/g, "")}
                    placement="left"
                  >
                    {l.show ? (
                      <Typography
                        component="button"
                        onClick={() => {
                          handleStickyMenuSectionClick(landingRefList[i]);
                        }}
                        sx={{ textDecoration: "underline" }}
                      >
                        Section {i + 1}
                      </Typography>
                    ) : (
                      <Typography>Section {i + 1}</Typography>
                    )}
                  </Tooltip>
                  <Switch
                    checked={l.show === 1}
                    onClick={() => {
                      if (l.show === 1) {
                        landingRefList[i].current.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }
                      const landingListCpy = [...landingList];
                      landingListCpy[i] = {
                        ...l,
                        show: l.show === 1 ? 0 : 1,
                      };
                      setLandingList(landingListCpy);
                      if (l.show === 0) {
                        setTimeout(() => {
                          handleStickyMenuSectionClick(landingRefList[i]);
                        }, 300);
                      }
                    }}
                    disabled={stickyApplyLoading}
                    size="small"
                  />
                </Stack>
              ))}
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ margin: "10px 0" }}
              >
                <Button size="small" onClick={handleStickyReset}>
                  reset
                </Button>
                <LoadingButton
                  variant="contained"
                  size="small"
                  onClick={handleStickyApply}
                  loading={stickyApplyLoading}
                >
                  apply
                </LoadingButton>
              </Stack>
            </Stack>
          )}
          {/*  */}
          {(openSponsorModal || isSponsorPreview) && (
            <SponsorForm
              key="sponsor-1"
              sectionNo="7"
              open={openSponsorModal}
              setOpen={setOpenSponsorModal}
              edit={editSponsor}
              selectedSponsor={selectedSponsor}
              className={isSponsorPreview ? "hide" : ""}
              sponsorList={landingSection7Sponsors}
              setIsSponsorPreview={setIsSponsorPreview}
              setPreviewSponsorList={setPreviewSponsorList}
              year={currentYear}
            />
          )}
          {(openSponsorModal2 || isSponsor2Preview) && (
            <SponsorForm
              key="sponsor-2"
              sectionNo="8"
              open={openSponsorModal2}
              setOpen={setOpenSponsorModal2}
              edit={editSponsor2}
              selectedSponsor={selectedSponsor2}
              className={isSponsor2Preview ? "hide" : ""}
              sponsorList={landingSection8Sponsors}
              setIsSponsorPreview={setIsSponsor2Preview}
              setPreviewSponsorList={setPreviewSponsor2List}
              year={currentYear}
            />
          )}
          {(openSponsorModal3 || isSponsor3Preview) && (
            <SponsorForm
              key="sponsor-3"
              sectionNo="9"
              open={openSponsorModal3}
              setOpen={setOpenSponsorModal3}
              edit={editSponsor3}
              selectedSponsor={selectedSponsor3}
              className={isSponsor3Preview ? "hide" : ""}
              sponsorList={landingSection9Sponsors}
              setIsSponsorPreview={setIsSponsor3Preview}
              setPreviewSponsorList={setPreviewSponsor3List}
              year={currentYear}
            />
          )}
          {openLanding6Modal && (
            <Landing6Form
              open={openLanding6Modal}
              setOpen={setOpenLanding6Modal}
              selected={landing6Content}
              year={currentYear}
            />
          )}
        </BackgroundVectorColored>
      )}
      {/* <CookieConsent
        style={{
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#EDF4FC",
        }}
        contentStyle={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          flex: "none",
          color: theme.palette.common.black,
        }}
        buttonText="ACCEPT"
        buttonClasses="hover-zoom"
        buttonStyle={{
          color: theme.palette.common.white,
          fontWeight: "500",
          background: theme.palette.primary.gradation,
          border: `2px solid ${theme.palette.common.white}`,
          borderRadius: "15px",
          padding: "2px 15px",
        }}
      >
        {cookieConsentText && <InnerHTML html={cookieConsentText} />}
        <a href="/" target="_blank" style={{ padding: 0, width: "20%" }}>
          {seePrivacyPolicyText || ""}
        </a>
      </CookieConsent> */}

      {/* <LiveChatWidget license="13874505" group="0" /> */}
    </LandingContainer>
  );
};

export default Landing;
