/* eslint-disable react/require-default-props */
import React from "react";
import { Grid, Box, Typography, useTheme } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import {
  mainFontSize,
  smallFontSize,
  subHeadingFontSize,
  xsmallFontSize,
} from "utils/FontSize";
import SpeakerImage from "components/SpeakerImage/SpeakerImage";
import Link from "components/Link/LinkWithSearch";
import usePageViews from "hooks/usePageViews";
import InnerHTML from "dangerously-set-html-content";
import useAdminStore from "store/AdminStore";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
}));

interface SpeakerCardProps {
  speaker: Speaker.speakerType;
  isAdmin?: boolean;
  onClick?: () => void;
}

const SpeakerCard = ({
  speaker,
  isAdmin = false,
  onClick,
}: SpeakerCardProps) => {
  const theme = useTheme();
  const pathname = usePageViews();
  const { currentLanguage } = useAdminStore();
  const langSfx = currentLanguage === "china" ? "" : "_en";

  const currentName =
    pathname === "china"
      ? speaker[`name${langSfx}`] || speaker.name || speaker.name_en
      : speaker.name;
  const currentBelong =
    pathname === "china"
      ? speaker[`belong${langSfx}`] || speaker.belong || speaker.belong_en
      : speaker.belong;
  const currentDescription =
    pathname === "china"
      ? speaker[`description${langSfx}`] ||
        speaker.description ||
        speaker.description_en
      : speaker.description;

  return (
    <Grid
      item
      key={speaker.id}
      sx={{
        cursor: `${isAdmin ? "pointer" : "auto"}`,
        width: { laptop: "33.3%", mobile: "100%" },
      }}
      className={`${isAdmin ? "hover-zoom" : ""}`}
      onClick={onClick}
    >
      <Link
        to={`/${pathname}/speakers/${speaker.id}`}
        style={{
          padding: 0,
          pointerEvents:
            isAdmin || speaker.has_abstract === 0 ? "none" : "initial",

          display: "flex",
          justifyContent: "center",
        }}
      >
        <Item className="speaker-card">
          <SpeakerImage src={speaker.image_path} alt={`${currentName}`} />
          <Typography
            variant="h6"
            color={theme.palette.text.primary}
            fontWeight={theme.typography.fontWeightBold}
            fontSize={subHeadingFontSize}
            sx={{
              marginTop: "5px",
              marginBottom: 0,
            }}
          >
            {currentName}
          </Typography>
          <Typography
            variant="body2"
            color={theme.palette.text.primary}
            fontSize={mainFontSize}
            fontWeight={theme.typography.fontWeightMedium}
            style={{ margin: 0 }}
          >
            {currentBelong}
          </Typography>
          {currentDescription && (
            <Typography
              sx={{
                mt: 1,
                textDecoration: speaker.has_abstract === 1 ? "underline" : "",
              }}
              color={theme.palette.grey[600]}
              fontSize={xsmallFontSize}
            >
              <InnerHTML html={currentDescription} />
            </Typography>
          )}
        </Item>
      </Link>
    </Grid>
  );
};

export default SpeakerCard;
