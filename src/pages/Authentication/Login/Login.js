import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import Provider from "assets/images/provider.jpg";

import FormLogin from "./FormLogin/FormLogin";
import { pushToast } from "components/Toast";
import "./Login.scss";

const Login = () => {
  const location = useLocation();
  useEffect(() => {
    pushToast("success", location.state?.successful);
  }, [location]);
  return (
    <AuthLayout>
      <div className="login-wrapper">
        <div className="login-title">
          <div>
            <h2 className="title">Đăng nhập</h2>
            <p>Xin chào và chào mừng !</p>
          </div>
          <div style={{ marginTop: "15px" }}>
            <Link className="register-login" to="/register">
              <img className="register-img" src={Provider} alt="" />
              Đăng kí làm nhà cung cấp
            </Link>
          </div>
        </div>
        <div className="login-form">
          <FormLogin />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
