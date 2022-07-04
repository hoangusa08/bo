import React from "react";
import "./AuthBanner.scss";
import logo from "assets/images/logo.svg";

const AuthBanner = () => {
  return (
    <div className="auth-banner">
      <div className="labelWrapper">
        <div className="label">
          <img src="" alt="" className="logo" />
        </div>
      </div>
      <div className="slogan">
        <img src={logo} />
        {/* <p>DU LỊCH VIỆT</p> */}
        <p>Trải nghiệm theo cách riếng của bạn</p>
      </div>
    </div>
  );
};

export default AuthBanner;
