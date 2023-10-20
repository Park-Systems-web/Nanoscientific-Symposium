import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import AdminLayout from "components/AdminLayout/AdminLayout";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import usePageViews from "hooks/usePageViews";
import useCurrentYear from "hooks/useCurrentYear";
import React, { useEffect, useState } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { LoadingButton } from "@mui/lab";
import CommonModal from "components/CommonModal/CommonModal";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import PosterForm from "../Forms/PosterForm";

type PosterStageType = 0 | 1 | 2;

interface adminPosterType extends Poster.posterType {
  isChanged: boolean;
}

const AdminPosters = () => {
  const pathname = usePageViews();
  const theme = useTheme();
  const currentYear = useCurrentYear();

  //
  const [stage, setStage] = useState<PosterStageType>(0);

  //
  const [posterList, setPosterList] = useState<adminPosterType[]>([]);
  const [originalPosterList, setOriginalPosterList] = useState<
    adminPosterType[]
  >([]);
  const [selectedPoster, setSelectedPoster] = useState<Poster.posterType>(null);

  // open modal
  const [openPosterForm, setOpenPosterForm] = useState<boolean>(false);
  const [openChangingOrderModal, setOpenChangingOrderModal] =
    useState<boolean>(false);

  const [edit, setEdit] = useState<boolean>(false);
  // apply changed orders button
  const [disableApplyBtn, setDisableApplyBtn] = useState<boolean>(true);

  // loading
  const [getPosterListLoading, setGetPosterListLoading] =
    useState<boolean>(false);
  const [applyOrderLoading, setApplyOrderLoading] = useState<boolean>(false);

  // snackbar
  const [applyOrderSuccess, setApplyOrderSuccess] = useState<boolean>(false);
  const [editPosterFailed, setEditPosterFailed] = useState<boolean>(false);
  const [deletePosterFailed, setDeletePosterFailed] = useState<boolean>(false);

  const getPosterList = async () => {
    try {
      setGetPosterListLoading(true);
      const res = await axios.get(
        `/api/page/common/poster?nation=${pathname}&year=${currentYear}`,
      );
      const posterList = res.data;
      setPosterList(posterList);
      setOriginalPosterList(posterList);
    } catch (err) {
      console.log(err);
    } finally {
      setGetPosterListLoading(false);
    }
  };

  // poster 순서 변경 여부 탐지
  const checkChangedOrder = (newList: adminPosterType[]) => {
    let changedCnt = 0;
    const updatedList = [...newList];
    for (let i = 0; i < updatedList.length; i += 1) {
      if (
        originalPosterList[i].title !== updatedList[i].title ||
        originalPosterList[i].attachment !== updatedList[i].attachment
      ) {
        updatedList[i].isChanged = true;
        originalPosterList[i].isChanged = true;
        // changed.push({ ...updatedList[i] });
        changedCnt += 1;
      } else {
        updatedList[i].isChanged = false;
        originalPosterList[i].isChanged = false;
      }
    }
    if (changedCnt > 0) {
      setDisableApplyBtn(false);
    } else {
      setDisableApplyBtn(true);
    }
    return updatedList;
  };

  const handleClickUp = (idx: number) => {
    let l = JSON.parse(JSON.stringify(posterList));

    const tmp = l[idx].id;
    l[idx].id = l[idx - 1].id;
    l[idx - 1].id = tmp;

    [l[idx], l[idx - 1]] = [l[idx - 1], l[idx]];
    l = checkChangedOrder(l);
    setPosterList(l);
  };
  const handleClickDown = (idx: number) => {
    let l = JSON.parse(JSON.stringify(posterList));

    const tmp = l[idx].id;
    l[idx].id = l[idx + 1].id;
    l[idx + 1].id = tmp;

    [l[idx], l[idx + 1]] = [l[idx + 1], l[idx]];
    l = checkChangedOrder(l);
    setPosterList(l);
  };

  useEffect(() => {
    getPosterList();
  }, []);

  const handleApplyOrder = async () => {
    const changed = [];
    posterList.forEach((p) => {
      if (p.isChanged) {
        changed.push(p);
      }
    });
    try {
      setApplyOrderLoading(true);
      await axios.post("/api/page/common/poster/list", {
        nation: pathname,
        list: changed,
      });

      setApplyOrderSuccess(true);
      setOpenChangingOrderModal(false);
      getPosterList();
    } catch (err) {
      alert(err);
    } finally {
      setApplyOrderLoading(false);
    }
    setDisableApplyBtn(true);
  };
  const handleResetOrder = () => {
    const newOriginalPosterList = JSON.parse(
      JSON.stringify(originalPosterList),
    );
    for (let i = 0; i < newOriginalPosterList.length; i += 1) {
      newOriginalPosterList[i].isChanged = false;
    }
    setPosterList(newOriginalPosterList);
    setDisableApplyBtn(true);
  };
  return (
    <>
      <AdminLayout
        title="Posters"
        menus={[
          {
            name: "Add Poster",
            clickHandler: () => {
              setSelectedPoster(undefined);
              setEdit(false);
              setOpenPosterForm(true);
            },
          },
        ]}
      >
        {getPosterListLoading && <CircularProgress size="20px" />}
        <Stack alignItems="flex-start">
          {!getPosterListLoading &&
            posterList.map((poster, idx) => (
              <Box
                key={`${poster.id}`}
                sx={{
                  mb: 1,
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  disabled={idx === 0}
                  onClick={() => {
                    handleClickUp(idx);
                  }}
                >
                  <ArrowCircleUpIcon />
                </IconButton>
                <IconButton
                  disabled={idx === posterList.length - 1}
                  onClick={() => {
                    handleClickDown(idx);
                  }}
                >
                  <ArrowCircleDownIcon />
                </IconButton>
                <Typography
                  component="button"
                  onClick={() => {
                    setSelectedPoster(poster);
                    setStage(2);
                    setEdit(true);
                    setOpenPosterForm(true);
                  }}
                  sx={{
                    ml: 1,
                    textAlign: "left",
                    transition: "all 0.3s ease-in-out",
                  }}
                  color={
                    poster.isChanged
                      ? theme.palette.primary.dark
                      : theme.palette.common.black
                  }
                  // fontWeight={poster.isChanged ? 700 : 400}
                >
                  {idx + 1}. {poster.title}
                </Typography>
              </Box>
            ))}
          <Box>
            <Button
              variant="contained"
              size="small"
              disabled={disableApplyBtn}
              sx={{ mr: 1 }}
              onClick={() => {
                setOpenChangingOrderModal(true);
              }}
            >
              Apply Changed Orders
            </Button>
            <Button
              variant="outlined"
              size="small"
              disabled={disableApplyBtn}
              onClick={handleResetOrder}
            >
              Reset
            </Button>
          </Box>
        </Stack>
        {openPosterForm && (
          <PosterForm
            open={openPosterForm}
            setOpen={setOpenPosterForm}
            selected={selectedPoster}
            edit={edit}
            stage={stage}
            setStage={setStage}
            setApplyFailed={setEditPosterFailed}
            setDeleteFailed={setDeletePosterFailed}
          />
        )}
        {openChangingOrderModal && (
          <CommonModal
            title="Changing an order"
            open={openChangingOrderModal}
            setOpen={setOpenChangingOrderModal}
            onSubmit={handleApplyOrder}
            submitText="apply"
            IsCustomWidth
            loading={applyOrderLoading}
          >
            <Stack flexDirection="row" alignItems="center">
              <Stack sx={{ width: "43%" }}>
                <Typography fontWeight={600} mb={2}>
                  &lt;Before&gt;
                </Typography>
                {originalPosterList.map((poster, idx) => (
                  <Box
                    key={`${poster.id}`}
                    sx={{
                      mb: 1,
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        ml: 1,
                        textAlign: "left",
                        transition: "all 0.3s ease-in-out",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      color={
                        poster.isChanged
                          ? theme.palette.primary.dark
                          : theme.palette.common.black
                      }
                      fontWeight={poster.isChanged ? 700 : 400}
                    >
                      {idx + 1}. {poster.title}
                    </Typography>
                  </Box>
                ))}
              </Stack>
              <ArrowRightAltIcon
                sx={{
                  color: theme.palette.grey[600],
                  fontSize: 40,
                  mx: 5,
                }}
              />
              <Stack sx={{ width: "43%" }}>
                <Typography fontWeight={600} mb={2}>
                  &lt;After&gt;
                </Typography>
                {posterList.map((poster, idx) => (
                  <Box
                    key={`${poster.id}`}
                    sx={{
                      mb: 1,
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        ml: 1,
                        textAlign: "left",
                        transition: "all 0.3s ease-in-out",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      color={
                        poster.isChanged
                          ? theme.palette.primary.dark
                          : theme.palette.common.black
                      }
                      fontWeight={poster.isChanged ? 700 : 400}
                    >
                      {idx + 1}. {poster.title}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </CommonModal>
        )}
      </AdminLayout>
      <TopCenterSnackBar
        value={applyOrderSuccess}
        setValue={setApplyOrderSuccess}
        variant="filled"
        severity="success"
        content="Successfully applied changed orders."
      />
      <TopCenterSnackBar
        value={editPosterFailed}
        setValue={setEditPosterFailed}
        variant="filled"
        severity="error"
        content="Failed to add/edit a poster."
      />
      <TopCenterSnackBar
        value={deletePosterFailed}
        setValue={setDeletePosterFailed}
        variant="filled"
        severity="error"
        content="Failed to delete a poster."
      />
    </>
  );
};

export default AdminPosters;
