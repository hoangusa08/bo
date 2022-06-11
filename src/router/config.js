import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "pages/Authentication/Login/Login";
import Error from "pages/Error/Error.js";
import Register from "pages/Authentication/FogotPassword/Register";
import TourAwait from "pages/Provider/Tour/TourAwait/TourAwait";
import TourDelete from "pages/Provider/Tour/TourDelete/TourDelete";

import CreateTour from "pages/Provider/Tour/CreateTour/CreateTour";
import Account from "pages/Account/Account";
import Tour from "pages/Provider/Tour/Tours/Tour";
import NewTourBooked from "pages/Provider/TourBooked/NewTourBooked/NewTourBooked";
import TourBookedAccept from "pages/Provider/TourBooked/TourBookedAccept/TourBookedAccept";
import TourBookedComplete from "pages/Provider/TourBooked/TourBookedComplete/TourBookedComplete";
import TourBookedDelete from "pages/Provider/TourBooked/TourBookedDelete/TourBookedDelete";
import NewProvider from "pages/Admin/Provider/NewProvider/NewProvider";
import ProviderReject from "pages/Admin/Provider/ProviderReject/ProviderReject";
import ProviderAccept from "pages/Admin/Provider/ProviderAccept/ProviderAccept";
import NewTours from "pages/Admin/Tour/NewTours/NewTours";
import ToursReject from "pages/Admin/Tour/ToursReject/ToursReject";
import ToursAccept from "pages/Admin/Tour/ToursAccept/ToursAccept";

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
    path: "/register",
    isPrivate: false,
    exact: true,
    component: Register
  },
  {
    path: "/tour-await",
    isPrivate: false,
    exact: true,
    component: TourAwait
  },
  {
    path: "/create-tour",
    isPrivate: false,
    exact: true,
    component: CreateTour
  },
  {
    path: "/tour-delete",
    isPrivate: false,
    exact: true,
    component: TourDelete
  },

  {
    path: "/manage-tour-create",
    isPrivate: false,
    exact: true,
    component: CreateTour
  },
  {
    path: "/tour-accept",
    isPrivate: false,
    exact: true,
    component: Tour
  },
  {
    path: "/new-tour-booked",
    isPrivate: false,
    exact: true,
    component: NewTourBooked
  },
  {
    path: "/tour-booked-accept",
    isPrivate: false,
    exact: true,
    component: TourBookedAccept
  },
  {
    path: "/tour-booked-complete",
    isPrivate: false,
    exact: true,
    component: TourBookedComplete
  },
  {
    path: "/tour-booked-delete",
    isPrivate: false,
    exact: true,
    component: TourBookedDelete
  },
  {
    path: "/admin/new-provider",
    isPrivate: false,
    exact: true,
    component: NewProvider
  },
  {
    path: "/admin/provider-reject",
    isPrivate: false,
    exact: true,
    component: ProviderReject
  },
  {
    path: "/admin/provider-accept",
    isPrivate: false,
    exact: true,
    component: ProviderAccept
  },
  {
    path: "/admin/new-tours",
    isPrivate: false,
    exact: true,
    component: NewTours
  },
  {
    path: "/admin/tours-reject",
    isPrivate: false,
    exact: true,
    component: ToursReject
  },
  {
    path: "/admin/tours-accept",
    isPrivate: false,
    exact: true,
    component: ToursAccept
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
