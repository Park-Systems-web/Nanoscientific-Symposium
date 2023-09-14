import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CommonModal from "components/CommonModal/CommonModal";
import S3Upload from "components/S3Upload/S3Upload";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import useInput from "hooks/useInput";
import { useAuthState } from "context/AuthContext";
import usePageViews from "hooks/usePageViews";
import { subHeadingFontSize } from "utils/FontSize";
import QuillEditor from "components/QuillEditor/QuillEditor";
import { escapeQuotes, replaceBr } from "utils/String";
import ModalLanguageSwitcher from "components/LanguageSwitcher/ModalLanguageSwitcher";
import useCurrentYear from "hooks/useCurrentYear";

interface SpeakerFormProps {
  openSpeakerForm: boolean;
  setOpenSpeakerForm: Dispatch<SetStateAction<boolean>>;
  setSpeakerSuccessAlert: Dispatch<SetStateAction<boolean>>;
  refreshFunction: () => void;
  selectedSpeaker: Speaker.speakerType;
  selectedSpeakerDetail: Speaker.speakerDetailType;
  // eslint-disable-next-line react/require-default-props
  edit?: boolean;
}

const SpeakerFormCN = ({
  openSpeakerForm,
  setOpenSpeakerForm,
  setSpeakerSuccessAlert,
  refreshFunction,
  selectedSpeaker,
  selectedSpeakerDetail,
  edit = false,
}: SpeakerFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const currentYear = useCurrentYear();

  const [editLanguage, setEditLanguage] =
    useState<Common.languageType>("china");

  const [keynoteCheck, setKeynoteCheck] = useState<boolean>(
    edit ? selectedSpeaker.keynote === 1 : false,
  );
  const [hasAbstractCheck, setHasAbstractCheck] = useState<boolean>(
    edit ? selectedSpeaker.has_abstract === 1 : false,
  );

  const [isHideCheck, setIsHideCheck] = useState<boolean>(
    edit ? selectedSpeaker.is_hide === 1 : false,
  );

  const name = useInput(edit ? selectedSpeaker.name : "");
  const name_en = useInput(edit ? selectedSpeaker.name_en : "");
  const belong = useInput(edit ? selectedSpeaker.belong : "");
  const belong_en = useInput(edit ? selectedSpeaker.belong_en : "");
  const description = useInput(
    edit ? replaceBr(selectedSpeaker.description) : "",
  );
  const description_en = useInput(
    edit ? replaceBr(selectedSpeaker.description_en) : "",
  );
  const [abstractBelong, setAbstractBelong] = useState<string>(
    edit && selectedSpeakerDetail !== undefined
      ? selectedSpeakerDetail.belong
      : "",
  );
  const [abstractBelongEN, setAbstractBelongEN] = useState<string>(
    edit && selectedSpeakerDetail !== undefined
      ? selectedSpeakerDetail.belong_en
      : "",
  );
  const [abstractDesc, setAbstractDesc] = useState<string>(
    edit && selectedSpeakerDetail ? selectedSpeakerDetail.description : "",
  );
  const [abstractDescEN, setAbstractDescEN] = useState<string>(
    edit && selectedSpeakerDetail ? selectedSpeakerDetail.description_en : "",
  );
  const [imagePath, setImagePath] = useState<string>(
    edit && selectedSpeaker ? selectedSpeaker.image_path : "",
  );
  const [previewURL, setPreviewURL] = useState<string>("");

  const authState = useAuthState();
  const pathname = usePageViews();

  useEffect(() => {
    setPreviewURL(selectedSpeaker?.image_path);
  }, [selectedSpeaker]);

  const speakerSubmitHandler = async () => {
    if (imagePath === "") return;
    setLoading(true);

    let speakerResult;
    // 편집 모드일때 즉, 스피커 카드를 클릭한 경우
    if (edit) {
      speakerResult = await axios.put("/api/admin/speaker", {
        id: selectedSpeaker.id,
        nation: pathname,
        name: escapeQuotes(name.value),
        name_en: escapeQuotes(name_en.value),
        belong: escapeQuotes(belong.value),
        belong_en: escapeQuotes(belong_en.value),
        description: replaceBr(escapeQuotes(description.value)),
        description_en: replaceBr(escapeQuotes(description_en.value)),
        imagePath,
        keynote: keynoteCheck,
        abstractBelong: escapeQuotes(abstractBelong),
        abstractBelong_en: escapeQuotes(abstractBelongEN),
        abstractDesc: escapeQuotes(abstractDesc),
        abstractDesc_en: escapeQuotes(abstractDescEN),
        hasAbstract: hasAbstractCheck,
        is_hide: isHideCheck,
        year: currentYear,
      });
    } else {
      // 새롭게 생성하는 경우 즉, ADD SPEAKER 를 클릭한경우
      speakerResult = await axios.post("/api/admin/speaker", {
        nation: pathname,
        name: escapeQuotes(name.value),
        name_en: escapeQuotes(name_en.value),
        belong: escapeQuotes(belong.value),
        belong_en: escapeQuotes(belong_en.value),
        description: replaceBr(escapeQuotes(description.value)),
        description_en: replaceBr(escapeQuotes(description_en.value)),
        imagePath,
        keynote: keynoteCheck,
        abstractBelong: escapeQuotes(abstractBelong),
        abstractBelong_en: escapeQuotes(abstractBelongEN),
        abstractDesc: escapeQuotes(abstractDesc),
        abstractDesc_en: escapeQuotes(abstractDescEN),
        hasAbstract: hasAbstractCheck,
        is_hide: isHideCheck,
        year: currentYear,
      });
    }

    if (speakerResult.data.success) {
      setLoading(false);
      setOpenSpeakerForm(false);
      setSpeakerSuccessAlert(true);
      refreshFunction();
    }
  };

  const deleteHandler = async () => {
    try {
      setDeleteLoading(true);
      await axios.delete(
        `/api/admin/speaker/${selectedSpeaker.id}?nation=${pathname}`,
      );
      setSpeakerSuccessAlert(true);
      setOpenSpeakerForm(false);
    } catch (err) {
      alert(err);
    } finally {
      setDeleteLoading(false);
      refreshFunction();
    }
  };

  return (
    <CommonModal
      open={openSpeakerForm}
      setOpen={setOpenSpeakerForm}
      title={edit ? "Modify Speaker" : "Add Speaker"}
      desc={
        edit
          ? "Please write down the name and affiliation of the speaker you want to change."
          : "Please write down the name and affiliation of the speaker."
      }
      onSubmit={speakerSubmitHandler}
      submitDisabled={name.value === "" || imagePath === ""}
      loading={loading || uploadLoading}
      deleteHandler={edit && deleteHandler}
    >
      <ModalLanguageSwitcher
        language={editLanguage}
        setLanguage={setEditLanguage}
      />
      {editLanguage === "china" && (
        <>
          <TextField
            margin="dense"
            label="Name (Chinese)"
            fullWidth
            variant="filled"
            required
            error={name.value === ""}
            sx={{ marginBottom: "15px" }}
            {...name}
          />
          <TextField
            margin="dense"
            label="Belong (Chinese)"
            fullWidth
            variant="filled"
            multiline
            sx={{ marginBottom: "15px" }}
            {...belong}
          />
          <TextField
            margin="dense"
            label="Description (Chinese)"
            fullWidth
            variant="filled"
            multiline
            sx={{ marginBottom: "15px" }}
            {...description}
          />
        </>
      )}

      {editLanguage === "english" && (
        <>
          <TextField
            margin="dense"
            label="Name (English)"
            fullWidth
            variant="filled"
            required
            sx={{ marginBottom: "15px" }}
            {...name_en}
          />

          <TextField
            margin="dense"
            label="Belong (English)"
            fullWidth
            variant="filled"
            multiline
            sx={{ marginBottom: "15px" }}
            {...belong_en}
          />

          <TextField
            margin="dense"
            label="Description (English)"
            fullWidth
            variant="filled"
            multiline
            sx={{ marginBottom: "15px" }}
            {...description_en}
          />
        </>
      )}
      <Stack direction="row">
        <FormControlLabel
          control={
            <Checkbox
              checked={keynoteCheck}
              onClick={() => setKeynoteCheck(!keynoteCheck)}
            />
          }
          label="Show the speaker on main page"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={hasAbstractCheck}
              onClick={() => setHasAbstractCheck(!hasAbstractCheck)}
            />
          }
          label="Show Speakers Abstract"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isHideCheck}
              onClick={() => setIsHideCheck(!isHideCheck)}
            />
          }
          label="Hide Speaker?"
        />
      </Stack>
      {/* abstract form */}
      {hasAbstractCheck && editLanguage === "china" && (
        <>
          <Typography fontWeight={600}>
            Abstract affiliation: (Chinese)
          </Typography>
          <QuillEditor value={abstractBelong} setValue={setAbstractBelong} />
          <br />
          <Typography fontWeight={600}>
            Abstract description: (Chinese)
          </Typography>
          <QuillEditor value={abstractDesc} setValue={setAbstractDesc} />
        </>
      )}
      {hasAbstractCheck && editLanguage === "english" && (
        <>
          <Typography fontWeight={600}>
            Abstract affiliation: (English)
          </Typography>
          <QuillEditor
            value={abstractBelongEN}
            setValue={setAbstractBelongEN}
          />
          <br />
          <Typography fontWeight={600}>
            Abstract description: (English)
          </Typography>
          <QuillEditor value={abstractDescEN} setValue={setAbstractDescEN} />
        </>
      )}
      {/* abstract form end */}
      <S3Upload
        setImagePath={setImagePath}
        edit={edit}
        previewURL={previewURL}
        setPreviewURL={setPreviewURL}
        setUploadLoading={setUploadLoading}
      />
    </CommonModal>
  );
};

export default SpeakerFormCN;
