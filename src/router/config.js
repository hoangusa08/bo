import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "pages/Authentication/Login/Login";
import Error from "pages/Error/Error.js";
import EnterEmail from "pages/Authentication/FogotPassword/EnterEmail";
import UpdatePassWord from "pages/Authentication/FogotPassword/UpdatePassWord";
import CategoryManagement from "pages/Provider/Categories/CategoryManagement/CategoryManagement";
import Tour from "pages/Provider/Tour/Tours/Tour";
import TourAwait from "pages/Provider/Tour/TourAwait/TourAwait";
import CreateTour from "pages/Provider/Tour/CreateTour/CreateTour";
import CategoryEdit from "pages/Provider/Categories/CategoryEdit/CategoryEdit";
import SubCateManage from "pages/Provider/Categories/SubCateManage/SubCateManage";
import NewSubCate from "pages/Provider/Categories/NewSubCate/NewSubCate";
import EditSubCate from "pages/Provider/Categories/EditSubCate/EditSubCate";
import Account from "pages/Account/Account";

export const routeConfig = [
  {
    path: "/login",
    isPrivate: false,
    exact: true,
    component: Login
  },
  {
    path: "/account",
    isPrivate: false,
    exact: true,
    component: Account
  },
  {
    path: "/forgot-password-enter-email",
    isPrivate: false,
    exact: true,
    component: EnterEmail
  },
  {
    path: "/forgot-password-update-password/:token",
    isPrivate: false,
    exact: true,
    component: UpdatePassWord
  },
  {
    path: "/tour-await",
    isPrivate: false,
    exact: true,
    component: TourAwait
  },
  {
    path: "/manage-categories",
    isPrivate: false,
    exact: true,
    component: CategoryManagement
  },
  {
    path: "/manage-tour",
    isPrivate: false,
    exact: true,
    component: Tour
  },

  {
    path: "/manage-tour-create",
    isPrivate: false,
    exact: true,
    component: CreateTour
  },
  {
    path: "/manage-categories-edit/:id",
    isPrivate: false,
    exact: true,
    component: CategoryEdit
  },
  {
    path: "/manage-sub-categories/:id",
    isPrivate: false,
    exact: true,
    component: SubCateManage
  },
  {
    path: "/create-sub-categories/:id",
    isPrivate: false,
    exact: true,
    component: NewSubCate
  },
  {
    path: "/edit-sub-categories/:id",
    isPrivate: false,
    exact: true,
    component: EditSubCate
  },
  { path: "*", component: Error }
];

const PrivateRoute = (privateProps) => {
  const { user } = useSelector((state) => state.user);
  if (user) {
    return <privateProps.component {...privateProps} />;
  }

  return <Redirect to="/login" />;
};

export const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) =>
        route.isPrivate ? (
          <PrivateRoute {...route} />
        ) : (
          <route.component {...props} />
        )
      }
    />
  );
};
