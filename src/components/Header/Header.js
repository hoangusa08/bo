import React from "react";
import avatar from "assets/images/avatar-default.png";
import "./Header.scss";
import { useHistory } from "react-router-dom";

export default function Header() {
  const history = useHistory();
  return (
    <div className="header">
      <div className="account" onClick={() => history.push("/account")}>
        <img src={avatar} />
        <span>name</span>
      </div>
    </div>
  );
}
