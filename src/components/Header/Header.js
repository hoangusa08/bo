import React from "react";
import avatar from "assets/images/avatar-default.png";
import "./Header.scss";

export default function Header() {
  return (
    <div className="header">
      <div className="account">
        <img src={avatar} />
        <span>name</span>
      </div>
    </div>
  );
}
