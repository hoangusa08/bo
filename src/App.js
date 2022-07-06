import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./assets/scss/index.scss";
import { getToken, getLanguage, getUser } from "core/localStore";
import { useTranslation } from "react-i18next";
import "plugins/react-i18n.js";
import Toast from "components/Toast";
import { routeConfig, RouteWithSubRoutes } from "router/config";
import Error from "pages/Error/Error";
import Login from "pages/Authentication/Login/Login";
import Dashboard from "pages/Admin/Dashboard/Dashboard";
import DashboardPro from "pages/Provider/Dashboard/DashboardPro";
import { positions, Provider } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";

const options = {
  position: positions.MIDDLE
};

function App() {
  const { i18n } = useTranslation();
  const user = getUser();

  useEffect(() => {
    i18n.changeLanguage(getLanguage());
    const token = getToken();
    if (!token) {
      return;
    }
  }, []);
  return (
    <Provider template={AlertMUITemplate} {...options}>
      <div className="content-wrapper">
        <BrowserRouter>
          <Switch>
            <Route exact path="/not-found" component={Error} />
            <Route
              exact
              path="/"
              component={
                user
                  ? user?.role === "ROLE_ADMIN"
                    ? Dashboard
                    : DashboardPro
                  : Login
              }
            />
            {routeConfig.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </BrowserRouter>
        <Toast />
      </div>
    </Provider>
  );
}

export default App;
