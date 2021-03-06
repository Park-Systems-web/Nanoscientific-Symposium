import { Stack, TextField, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useAuthState } from "context/AuthContext";
import usePageViews from "hooks/usePageViews";
import React, { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { dateToLocaleString, jsTimeToTimeStamp } from "utils/Date";
import {
  headingFontSize,
  smallFontSize,
  subHeadingFontSize,
  xsmallFontSize,
} from "utils/FontSize";
import { globalData } from "utils/GlobalData";
import { editorRole } from "utils/Roles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import InnerHTML from "dangerously-set-html-content";
import CommonModal from "components/CommonModal/CommonModal";
import QuillEditor from "components/QuillEditor/QuillEditor";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import { AnnouncementDetailContainer } from "./AnnouncementDetailStyles";

const AnnouncementDetail = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const pathname = usePageViews();
  const theme = useTheme();
  const navigate = useNavigate();
  const [currentAnnouncement, setCurrentAnnouncement] =
    useState<Announcement.announcementType>(null);
  const authState = useAuthState();
  const isEditor = editorRole.includes(authState.role);

  // inputs
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // modals
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  // alert
  const [openEditSuccessAlert, setOpenEditSuccessAlert] =
    useState<boolean>(false);

  // loading

  const { viewsLabel } = globalData.get(pathname) as Common.globalDataType;

  const getAnnouncementDetail = async () => {
    try {
      const result = await axios.get(
        `/api/announcement/post?nation=${pathname}&id=${id}&admin=${
          isEditor ? 1 : 0
        }`,
      );
      setCurrentAnnouncement(result.data.result);
      setTitle(result.data.result.title);
      setContent(result.data.result.content);
    } catch (err) {
      alert(err);
    }
  };

  const editHandler = async () => {
    try {
      const result = await axios.post(`/api/announcement/post`, {
        nation: pathname,
        id: currentAnnouncement.id,
        title,
        content,
      });
      getAnnouncementDetail();
      setOpenEditSuccessAlert(true);
      setOpenEditModal(false);
    } catch (err) {
      alert(err);
    }
  };
  const deleteHandler = async () => {
    try {
      const result = await axios.delete(
        `/api/announcement/post?nation=${pathname}&id=${id}`,
      );
      alert("Announcement is sucessfully deleted.");
      navigate(`/${pathname}/announcement${search}`);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getAnnouncementDetail();
  }, []);
  return (
    <AnnouncementDetailContainer className="layout body-fit">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Link to={`/${pathname}/announcement${search}`} className="p0">
          <ArrowBackIcon className="btn-alpha" />
        </Link>
        {isEditor && (
          <Stack direction="row" spacing={1}>
            <Typography
              className="btn-alpha"
              fontSize={smallFontSize}
              onClick={() => {
                setOpenEditModal(true);
              }}
            >
              Edit
            </Typography>
            <Typography
              color={theme.palette.grey.A400}
              fontSize={smallFontSize}
            >
              |
            </Typography>
            <Typography
              className="btn-alpha"
              fontSize={smallFontSize}
              onClick={() => {
                setOpenDeleteModal(true);
              }}
            >
              Delete
            </Typography>
          </Stack>
        )}
      </Stack>
      {currentAnnouncement && (
        <Stack className="border-grey" sx={{ padding: "30px" }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              fontSize={xsmallFontSize}
              color={theme.palette.grey[500]}
            >
              {dateToLocaleString(
                currentAnnouncement.created,
                Intl.DateTimeFormat().resolvedOptions().timeZone,
                "MMM DD YYYY hh:mm",
              )}
            </Typography>
            <Typography
              fontSize={xsmallFontSize}
              color={theme.palette.grey[500]}
              sx={{ mt: "auto" }}
            >
              {currentAnnouncement.hits} {viewsLabel || "views"}
            </Typography>
          </Stack>
          <Typography fontWeight={400} fontSize={headingFontSize}>
            {currentAnnouncement.title}
          </Typography>
          <Typography component="span" fontSize={smallFontSize}>
            <InnerHTML
              className="editor-content"
              html={currentAnnouncement.content}
            />
          </Typography>
        </Stack>
      )}

      {/* modals */}
      <CommonModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        onSubmit={editHandler}
        title="Edit an announcement"
        submitText="Edit"
      >
        <Stack spacing={2}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            value={title}
            onChange={(
              event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => {
              const {
                currentTarget: { value },
              } = event;
              setTitle(value);
            }}
          />
          <Typography fontSize={subHeadingFontSize} fontWeight={500}>
            Content
          </Typography>
          <QuillEditor value={content} setValue={setContent} />
        </Stack>
      </CommonModal>
      <CommonModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        onSubmit={deleteHandler}
        title="Delete an announcement"
        submitText="DELETE"
        desc="Are you sure to delete an announcement?"
      />

      {/* alert */}
      <TopCenterSnackBar
        value={openEditSuccessAlert}
        setValue={setOpenEditSuccessAlert}
        severity="success"
        variant="filled"
        content="Successfully modified."
      />
    </AnnouncementDetailContainer>
  );
};

export default AnnouncementDetail;
