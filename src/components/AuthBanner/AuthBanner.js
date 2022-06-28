import React from "react";
import "./AuthBanner.scss";

const AuthBanner = () => {
  return (
    <div className="auth-banner">
      <div className="labelWrapper">
        <div className="label">
          <img src="" alt="" className="logo" />
        </div>
      </div>
      <div className="slogan">
        <p>DU LỊCH VIỆT</p>
        <p>Trải nghiệm theo cách riếng của bạn</p>
      </div>
    </div>
  );
};

export default AuthBanner;
