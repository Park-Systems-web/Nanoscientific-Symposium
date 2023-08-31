import React from "react";
import AdminRoute from "components/Route/AdminRoute";
import Admin from "pages/admin/Admin";
import AdminPrograms from "pages/admin/AdminPrograms/AdminPrograms";
import AdminSpeakers from "pages/admin/AdminSpeakers/AdminSpeakers";
import AdminMenus from "pages/admin/AdminMenus/AdminMenus";
import AdminPosters from "pages/admin/AdminPosters/AdminPosters";
import AdminConfig from "pages/admin/AdminConfig/AdminConfig";
import useCurrentURL from "hooks/useCurrentURL";
import AdminUsers from "../pages/admin/AdminUsers/AdminUsers";

// 어드민이어야 접근가능한 element 들을 모아둔 라우츠 입니다.
// App.tsx 에서 이것을 호출합니다
// components 폴더에 있는 AdminRoute 와 PrivateRoute 와는 다른것입니다.

const currentURL = useCurrentURL();
let nationList;

if (currentURL === "china") {
  nationList = ["china"];
} else nationList = ["asia", "eu", "jp", "kr", "americas"];

const yearList = ["", "2022", "2023"];
const routes = [];

nationList.forEach((n) =>
  yearList.forEach((y) => {
    const nationYearString = `/${n}${y === "" ? "" : `/${y}`}/admin`;
    routes.push(
      ...[
        {
          path: `${nationYearString}`,
          element: (
            <AdminRoute key={`${nationYearString}`}>
              <Admin />
            </AdminRoute>
          ),
        },
        {
          path: `${nationYearString}/program`,
          element: (
            <AdminRoute key={`${nationYearString}/program`}>
              <AdminPrograms concurrent={n === "asia"} />
            </AdminRoute>
          ),
        },
        {
          path: `${nationYearString}/speakers`,
          element: (
            <AdminRoute key={`${nationYearString}/speakers`}>
              <AdminSpeakers />
            </AdminRoute>
          ),
        },
        {
          path: `${nationYearString}/users`,
          element: (
            <AdminRoute key={`${nationYearString}/users`}>
              <AdminUsers />
            </AdminRoute>
          ),
        },
        {
          path: `${nationYearString}/menus`,
          element: (
            <AdminRoute key={`${nationYearString}/menus`}>
              <AdminMenus />
            </AdminRoute>
          ),
        },
        {
          path: `${nationYearString}/poster`,
          element: (
            <AdminRoute key={`${nationYearString}/poster`}>
              <AdminPosters />
            </AdminRoute>
          ),
        },
        {
          path: `${nationYearString}/config`,
          element: (
            <AdminRoute key={`${nationYearString}/config`}>
              <AdminConfig />
            </AdminRoute>
          ),
        },
      ],
    );
  }),
);

export default routes;
