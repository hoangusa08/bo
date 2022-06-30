import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "pages/Authentication/Login/Login";
import Error from "pages/Error/Error.js";
import Register from "pages/Authentication/Register/Register";
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
import TourDetail from "pages/Provider/Tour/TourDetail/TourDetail";
import ViewRateTour from "pages/Provider/Tour/ViewRateTour/ViewRateTour";
import Dashboard from "pages/Admin/Dashboard/Dashboard";
import Categories from "pages/Admin/Categories/Categories";
import Customer from "pages/Admin/Customer/Customer";
import DashboardPro from "pages/Provider/Dashboard/DashboardPro";
import CustomerDetail from "pages/Admin/Customer/CustomerDetail/CustomerDetail";
import ProviderDetail from "pages/Admin/Provider/ProviderDetail/ProviderDetail";

export const routeConfig = [
  {
    path: "/login",
    isPrivate: false,
    exact: true,
    component: Login
  },
  {
    path: "/account",
    isPrivate: true,
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
    path: "/view/view-rate/:id",
    isPrivate: false,
    exact: true,
    component: ViewRateTour
  },
  {
    path: "/tour-await",
    isPrivate: true,
    exact: true,
    component: TourAwait
  },
  {
    path: "/create-tour",
    isPrivate: true,
    exact: true,
    component: CreateTour
  },
  {
    path: "/tour-delete",
    isPrivate: true,
    exact: true,
    component: TourDelete
  },
  {
    path: "/manage-tour-create",
    isPrivate: true,
    exact: true,
    component: CreateTour
  },
  {
    path: "/dashboard",
    isPrivate: true,
    exact: true,
    component: DashboardPro
  },
  {
    path: "/tour-accept",
    isPrivate: true,
    exact: true,
    component: Tour
  },
  {
    path: "/detail-tour/:id",
    isPrivate: true,
    exact: true,
    component: TourDetail
  },
  {
    path: "/new-tour-booked",
    isPrivate: true,
    exact: true,
    component: NewTourBooked
  },
  {
    path: "/tour-booked-accept",
    isPrivate: true,
    exact: true,
    component: TourBookedAccept
  },
  {
    path: "/tour-booked-complete",
    isPrivate: true,
    exact: true,
    component: TourBookedComplete
  },
  {
    path: "/tour-booked-delete",
    isPrivate: true,
    exact: true,
    component: TourBookedDelete
  },
  {
    path: "/admin/new-provider",
    isPrivate: true,
    exact: true,
    component: NewProvider
  },
  {
    path: "/admin/categories",
    isPrivate: true,
    exact: true,
    component: Categories
  },
  {
    path: "/admin/customer",
    isPrivate: true,
    exact: true,
    component: Customer
  },
  {
    path: "/admin/customer/:id",
    isPrivate: true,
    exact: true,
    component: CustomerDetail
  },
  {
    path: "/admin/dashboard",
    isPrivate: true,
    exact: true,
    component: Dashboard
  },
  {
    path: "/admin/provider-reject",
    isPrivate: true,
    exact: true,
    component: ProviderReject
  },
  {
    path: "/admin/provider-detail/:id",
    isPrivate: true,
    exact: true,
    component: ProviderDetail
  },
  {
    path: "/admin/provider-accept",
    isPrivate: true,
    exact: true,
    component: ProviderAccept
  },
  {
    path: "/admin/new-tours",
    isPrivate: true,
    exact: true,
    component: NewTours
  },
  {
    path: "/admin/tours-reject",
    isPrivate: true,
    exact: true,
    component: ToursReject
  },
  {
    path: "/admin/tours-accept",
    isPrivate: true,
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
