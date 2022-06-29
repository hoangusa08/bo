import React from "react";
import avatar from "assets/images/avatar-default.png";
import "./Header.scss";
import { useHistory } from "react-router-dom";
import { getUser } from "core/localStore";

export default function Header() {
  const history = useHistory();
  const user = getUser();
  return (
    <div className="header">
      <div className="account" onClick={() => history.push("/account")}>
        <img src={avatar} />
        <span>{user?.nameCompany ? user?.nameCompany : "Admin"}</span>
      </div>
    </div>
  );
}
