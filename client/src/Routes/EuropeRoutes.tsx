import React from "react";
import Landing from "pages/common/Landing/Landing";
import EuropeRegistration from "pages/europe/EuropeRegistration/EuropeRegistration";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import ResetPassword from "pages/common/User/ResetPassword/ResetPassword";
import ForgotPassword from "pages/common/User/ForgotPassword/ForgotPassword";
import AdminRoute from "components/Route/AdminRoute";
import Programs from "pages/common/Programs/Programs";
import Speakers from "pages/common/Speakers/Speakers";
import LectureHall from "pages/common/LectureHall/LectureHall";
import SpeakerDetail from "pages/common/SpeakerDetail/SpeakerDetail";

export default [
  {
    path: "/eu",
    element: <Landing key="eu-landing-section" />,
  },
  {
    path: "/eu/registration",
    element: <EuropeRegistration />,
  },
  {
    path: "/eu/program",
    element: (
      <AdminRoute key="/eu/program">
        <Programs />
      </AdminRoute>
    ),
  },
  {
    path: "/eu/speakers",
    element: (
      <AdminRoute key="/eu/speakers">
        <Speakers />
      </AdminRoute>
    ),
  },
  {
    path: "/eu/speakers/:id",
    element: (
      <AdminRoute key="/eu/speakers">
        <SpeakerDetail />
      </AdminRoute>
    ),
  },

  {
    path: "/eu/lecture-hall",
    element: <LectureHall />,
    isPrivate: true,
  },
  {
    path: "/eu/exhibit/parksystems",
    element: <ExhibitParkSystems />,
  },
  {
    path: "/eu/exhibit/nanoscientific",
    element: <ExhibitNanoScientific />,
  },
  {
    path: "/eu/user/reset-password",
    element: <ResetPassword />,
    isPrivate: true,
  },
  {
    path: "/eu/user/forgot-password",
    element: <ForgotPassword />,
  },
];
