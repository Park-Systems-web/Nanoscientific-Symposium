import React, { useState, useEffect } from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";
import Loading from "components/Loading/Loading";
import usePageViews from "hooks/usePageViews";
import useSeoTitle from "hooks/useSeoTitle";
import { globalData } from "utils/GlobalData";
import LandingTitle from "components/Title/LandingTitle";
import LandingSection from "components/Section/LandingSection";
import { Box, Stack, Typography, useTheme } from "@mui/material";
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
import { SpeakersContainer } from "../Speakers/SpeakersStyles";

const Landing = () => {
  const pathname = usePageViews();
  const theme = useTheme();

  const {
    home,
    registration,
    landingSection1Desc,
    landingSection1LogoURL,
    landingSection1BackgroundURL,
    landingSection2Title,
    landingSection2Desc,
    landingSection2Video,
    landingSection3Title,
    landingSection3Desc,
    landingSection4Title,
    landingSection4List1Title,
    landingSection4List1,
    landingSection4List2Title,
    landingSection4List2,
    landingSection4List3Title,
    landingSection4List3,
    landingSection5Title,
    landingSection6Title,
    landingSection6Desc,
    landingSection6ButtonText,
    landingSection6ButtonLink,
    landingSection6Videos,
    landingSection7Title,
    landingSection7Sponsors,
    cookieConsentText,
  } = globalData.get(pathname) as Common.globalDataType;
  useSeoTitle(home as string, pathname);

  const navigate = useNavigate();

  const [keynoteSpeakers, setKeynoteSpeakers] = useState<Speaker.speakerType[]>(
    [],
  );

  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    axios
      .get(`/api/page/common/speakers/keynote?nation=${pathname}`)
      .then((res) => {
        setKeynoteSpeakers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <LandingSection
        fullWidth
        background={landingSection1BackgroundURL}
        className="section1"
      >
        <BackgroundVectorWhite>
          <div className="overlay secondary z0" />
          <Stack
            className="layout"
            direction="column"
            alignItems="center"
            spacing={5}
          >
            <img
              className="z1"
              src={landingSection1LogoURL}
              alt="logo"
              style={{
                maxWidth: "600px",
                height: "300px",
                width: "100%",
                minWidth: "200px",
              }}
            />
            <NSSButton
              className="z1"
              variant="gradient"
              style={{ padding: "5px 20px" }}
              onClick={() => {
                navigate(`/${pathname}/registration`);
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    mobile: theme.typography.body1.fontSize,
                    tablet: theme.typography.h6.fontSize,
                  },
                }}
              >
                {registration}
              </Typography>
            </NSSButton>
            <Typography
              className="z1"
              textAlign="center"
              color={theme.palette.common.white}
              fontWeight={theme.typography.fontWeightMedium}
              sx={{
                fontSize: {
                  mobile: theme.typography.h6.fontSize,
                  tablet: theme.typography.h5.fontSize,
                },
              }}
            >
              {landingSection1Desc && <InnerHTML html={landingSection1Desc} />}
            </Typography>
          </Stack>
        </BackgroundVectorWhite>
      </LandingSection>
      <BackgroundVectorColored>
        {landingSection2Title && landingSection2Video && landingSection2Desc && (
          <LandingSection fullWidth>
            <Stack
              className="layout"
              flexDirection={{
                mobile: "column-reverse",
                tablet: "row",
              }}
              alignItems="center"
              justifyContent="space-between"
              spacing={{ mobile: 5, tablet: 0 }}
            >
              <Stack
                flexDirection="column"
                width={{
                  tablet: "55%",
                  mobile: "100%",
                }}
                height={{
                  tablet: "100%",
                  mobile: "55%",
                }}
              >
                <LandingTitle title={landingSection2Title} />
                <Box
                  fontSize={{
                    mobile: theme.typography.body2.fontSize,
                    tablet: theme.typography.body1.fontSize,
                  }}
                  height="80%"
                  maxHeight="220px"
                  pr={2}
                  sx={{
                    overflowY: "scroll",
                  }}
                >
                  <InnerHTML html={landingSection2Desc} />
                </Box>
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  width: {
                    tablet: "40%",
                    mobile: "100%",
                  },
                  height: {
                    tablet: "100%",
                    mobile: "40%",
                  },
                  position: "relative",
                }}
              >
                <Box
                  className="z1"
                  sx={{
                    width: "100%",
                    height: "100%",
                    mb: { mobile: 4, tablet: 0 },
                  }}
                >
                  <YoutubeEmbed
                    embedId={landingSection2Video}
                    width="400"
                    height="250"
                  />
                </Box>
                {/* <div className="overlay secondary z0" /> */}
              </Stack>
            </Stack>
          </LandingSection>
        )}

        <LandingSection fullWidth>
          <Box className="layout">
            {landingSection3Title && (
              <LandingTitle title={landingSection3Title} />
            )}
            {landingSection3Desc && (
              <Typography>{landingSection3Desc}</Typography>
            )}
          </Box>
        </LandingSection>
        <LandingSection fullWidth>
          <Stack className="layout" direction="column">
            {landingSection4Title && (
              <LandingTitle title={landingSection4Title} textAlign="left" />
            )}
            <Stack
              direction={{ mobile: "column", laptop: "row" }}
              flexWrap="wrap"
              justifyContent="space-between"
              sx={{
                color: theme.palette.common.white,
              }}
            >
              <Box
                className="gradient-box"
                sx={{
                  width: { laptop: "25%" },
                  p: 3,
                  mb: { mobile: 5, laptop: 0 },
                }}
              >
                <Typography
                  fontSize={{
                    mobile: theme.typography.body1.fontSize,
                    laptop: theme.typography.h6.fontSize,
                  }}
                  fontWeight={theme.typography.fontWeightBold}
                >
                  {landingSection4List1Title}
                </Typography>
                <ul style={{ marginInlineStart: "35px" }}>
                  {landingSection4List1?.map((item) => (
                    <li style={{ marginBottom: "15px" }}>
                      <Typography
                        variant="body2"
                        fontWeight={theme.typography.fontWeightMedium}
                      >
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
              <Box
                className="gradient-box"
                sx={{
                  width: { laptop: "25%" },
                  p: 3,
                  mb: { mobile: 5, laptop: 0 },
                }}
              >
                <Typography
                  fontSize={{
                    mobile: theme.typography.body1.fontSize,
                    laptop: theme.typography.h6.fontSize,
                  }}
                  fontWeight={theme.typography.fontWeightBold}
                >
                  {landingSection4List2Title}
                </Typography>
                <ul style={{ marginInlineStart: "35px" }}>
                  {landingSection4List2?.map((item) => (
                    <li style={{ marginBottom: "15px" }}>
                      <Typography
                        variant="body2"
                        fontWeight={theme.typography.fontWeightMedium}
                      >
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
              <Box
                className="gradient-box"
                sx={{
                  width: { laptop: "25%" },
                  p: 3,
                }}
              >
                <Typography
                  fontSize={{
                    mobile: theme.typography.body1.fontSize,
                    laptop: theme.typography.h6.fontSize,
                  }}
                  fontWeight={theme.typography.fontWeightBold}
                >
                  {landingSection4List3Title}
                </Typography>
                <ul style={{ marginInlineStart: "35px" }}>
                  {landingSection4List3?.map((item) => (
                    <li style={{ marginBottom: "15px" }}>
                      <Typography
                        variant="body2"
                        fontWeight={theme.typography.fontWeightMedium}
                      >
                        <InnerHTML html={item} />
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </Stack>
          </Stack>
        </LandingSection>
      </BackgroundVectorColored>

      <BackgroundVectorColoredReversed>
        <LandingSection fullWidth>
          <SpeakersContainer className="layout">
            <Stack direction="column">
              {landingSection5Title && (
                <LandingTitle title={landingSection5Title} textAlign="right" />
              )}
              <Stack direction="row" flexWrap="wrap">
                {keynoteSpeakers.map((speaker) => (
                  <SpeakerCard key={speaker.id} speaker={speaker} />
                ))}
              </Stack>
            </Stack>
          </SpeakersContainer>
        </LandingSection>

        {/* section5 */}
        <LandingSection fullWidth>
          <Stack className="layout">
            {landingSection6Title && (
              <LandingTitle title={landingSection6Title} />
            )}

            {landingSection6ButtonText &&
              landingSection6Desc &&
              landingSection6ButtonLink && (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ margin: "-27px 0 20px 0" }}
                >
                  <Box sx={{ width: "50%" }}>
                    <Typography
                      variant="h6"
                      fontWeight={theme.typography.fontWeightMedium}
                      lineHeight={1.1}
                    >
                      {landingSection6Desc}
                    </Typography>
                  </Box>

                  <Box sx={{ m: "15px", width: "30%" }}>
                    <NSSButton
                      variant="gradient"
                      onClick={() => {
                        openLink(landingSection6ButtonLink);
                      }}
                    >
                      {landingSection6ButtonText}
                    </NSSButton>
                  </Box>
                </Stack>
              )}
            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              {landingSection6Videos?.map((video) => (
                <Box
                  key={video}
                  sx={{
                    backgroundColor: "#fff",
                    width: "46%",
                    position: "relative",
                  }}
                >
                  <YoutubeEmbed embedId={video} height="250" />
                </Box>
              ))}
            </Stack>
          </Stack>
        </LandingSection>
      </BackgroundVectorColoredReversed>
      {landingSection7Title && landingSection7Sponsors && (
        <LandingSection fullWidth>
          <Stack className="layout">
            <LandingTitle title="Sponsored By" />
            <Box display="inline-block">
              {landingSection7Sponsors.map((sponsor) => (
                <a
                  className="hover-zoom"
                  href={sponsor.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "inline-block" }}
                >
                  <img
                    src={sponsor.img}
                    alt={sponsor.name}
                    style={{ maxHeight: "80px" }}
                  />
                </a>
              ))}
            </Box>
          </Stack>
        </LandingSection>
      )}

      <CookieConsent
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
          See privacy policy
        </a>
      </CookieConsent>
      {/* <LiveChatWidget license="13874505" group="0" /> */}
    </>
  );
};

export default Landing;
