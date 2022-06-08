import React from "react";
import "./MainLayout.scss";
import SideBar from "components/SideBar/SideBar";
import Header from "components/Header/Header";

const MainLayout = (props) => {
  return (
    <>
      <div className="main-layout">
        <Header />
        <div className="d-flex">
          <SideBar />
          <div className="main-layout-body">{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
