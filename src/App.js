import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./assets/scss/index.scss";
import { getToken, getLanguage } from "core/localStore";
import { useTranslation } from "react-i18next";
import "plugins/react-i18n.js";
import Toast from "components/Toast";
import { routeConfig, RouteWithSubRoutes } from "router/config";

import Error from "pages/Error/Error";
import Login from "pages/Authentication/Login/Login";

import { positions, Provider } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";

const options = {
  position: positions.MIDDLE
};

function App() {
  const { i18n } = useTranslation();
  // const { user } = useSelector((state) => state.user);
  // const [authLoading, setAuthLoading] = useState(true);

  // const getUserMe = async () => {
  //   try {
  //     // const response = await await api.get(`/userme`);
  //     // if (response) {
  //     // }
  //     let fakeResponse = { result: true };
  //     if (fakeResponse.result) {
  //       setUserLocal(getToken(), user);
  //     } else {
  //       removeUserLocal();
  //     }
  //     setAuthLoading(false);
  //   } catch (e) {
  //     removeUserLocal();
  //     setAuthLoading(false);
  //   }
  // };

  useEffect(() => {
    i18n.changeLanguage(getLanguage());
    const token = getToken();
    if (!token) {
      return;
    }

    // getUserMe();
  }, []);
  return (
    <Provider template={AlertMUITemplate} {...options}>
      <div className="content-wrapper">
        <BrowserRouter>
          <Switch>
            <Route exact path="/not-found" component={Error} />
            <Route exact path="/" component={Login} />
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
