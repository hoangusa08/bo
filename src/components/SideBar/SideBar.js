import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "store/user";
import { useSelector } from "react-redux";
import { USER_ROLE } from "core/constants";

import "./SideBar.scss";

const menu_provider = [
  {
    label: "Tours Await",
    path: "/manage-merchants",
    icon: ""
  },
  {
    label: "Tours Accept",
    path: "/manage-merchants-request",
    icon: ""
  },
  {
    label: "Tours Delete",
    path: "/manage-merchants-request",
    icon: ""
  },
  {
    label: "New Tours Booked",
    path: "/manage-categories",
    icon: ""
  },
  {
    label: "Tours Booked Accept",
    path: "/manage-categories",
    icon: ""
  },
  {
    label: "Tours Booked complete",
    path: "/manage-categories",
    icon: ""
  },
  {
    label: "Tours Booked Delete",
    path: "/manage-categories",
    icon: ""
  },
  {
    label: "Tours Booked Delete",
    path: "/manage-categories",
    icon: ""
  }
];

const menu_admin = [
  {
    label: "New Provider",
    path: "/manage-merchants",
    icon: ""
  },
  {
    label: "Provider Accept",
    path: "/manage-merchants-request",
    icon: ""
  },
  {
    label: "Provider Reject",
    path: "/manage-merchants-request",
    icon: ""
  },
  {
    label: "New Project",
    path: "/manage-merchants-request",
    icon: ""
  },
  {
    label: "Project Accept",
    path: "/manage-merchants-request",
    icon: ""
  },
  {
    label: "Project Reject",
    path: "/manage-merchants-request",
    icon: ""
  }
];

const SideBar = () => {
  const history = useHistory();
  const [curentPath, setCurentPath] = useState("");
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const onLogOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    let path = history?.location?.pathname;
    setCurentPath(path);
    console.log(user?.role);
    if (user?.role == USER_ROLE.ADMIN) {
      console.log("a");
      setMenu(menu_admin);
    } else {
      console.log("b");
      setMenu(menu_provider);
    }
  }, []);

  return (
    <div className="sidebar-wrapper">
      <p
        className={show ? "ic-menu-show" : "ic-menu"}
        onClick={() => {
          setShow(!show);
        }}
      >
        <i className="fas fa-bars"></i>
      </p>
      <nav className={show ? "showSidebar sidebar" : "sidebar"}>
        <div>
          <div className="sidebar-header">
            <img src="" alt="logo" />
          </div>
          <ul className="sidebar-list list-unstyled components">
            {menu?.map((item, key) => {
              return (
                <li
                  className={
                    curentPath == item.path
                      ? "sidebar-list-item active"
                      : "sidebar-list-item "
                  }
                  key={key}
                >
                  <Link to={item.path}>
                    <i className={item?.icon ? item.icon : ""} />
                    <span>{item?.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="sidebar-footer">
          <div className="d-flex align-items-center justify-content-between">
            <span className="mr-2 user-name">{user?.name?.toUpperCase()}</span>
            <i className="fas fa-sign-out-alt" onClick={() => onLogOut()}></i>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
