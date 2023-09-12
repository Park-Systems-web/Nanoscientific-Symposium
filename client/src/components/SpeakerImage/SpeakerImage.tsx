import { Box } from "@mui/system";
import React from "react";
import { S3_URL } from "utils/GlobalData";
import { SpeakerImageContainer } from "./SpeakerImageStyles";

interface speakerImageProps extends React.ComponentPropsWithoutRef<"div"> {
  src: string;
  alt: string;
}

const blacklistURL = [
  "upload/china/speakers/5048c8e0-f2d6-428f-b4e2-79bf57317ccd_1694496145881.jpg",
];

const SpeakerImage = (props: speakerImageProps) => {
  const { src, alt, ...rest } = props;
  return (
    <SpeakerImageContainer {...rest}>
      <img className="speaker-image" src={`${S3_URL}/${src}`} alt={alt} />
      {!blacklistURL.includes(src) && <div className="overlay" />}
    </SpeakerImageContainer>
  );
};

export default SpeakerImage;
