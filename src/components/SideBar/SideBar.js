import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "store/user";
import { useSelector } from "react-redux";
import { USER_ROLE } from "core/constants";

import "./SideBar.scss";

const menu_provider = [
  {
    label: "Trang chủ",
    path: "/dashboard",
    icon: ""
  },
  {
    label: "Tạo Tour",
    path: "/create-tour",
    icon: ""
  },
  {
    label: "Tours đang chờ xác nhận",
    path: "/tour-await",
    icon: ""
  },
  {
    label: "Tours Đã xác nhận",
    path: "/tour-accept",
    icon: ""
  },
  {
    label: "Tours đã xóa",
    path: "/tour-delete",
    icon: ""
  },
  {
    label: "Tours được đặt",
    path: "/new-tour-booked",
    icon: ""
  },
  {
    label: "Tours đặt được xác nhận",
    path: "/tour-booked-accept",
    icon: ""
  },
  {
    label: "Tours đặt đã hoàn thành",
    path: "/tour-booked-complete",
    icon: ""
  },
  {
    label: "Tours đặt đã từ chối",
    path: "/tour-booked-delete",
    icon: ""
  }
];

const menu_admin = [
  {
    label: "Trang chủ",
    path: "/admin/dashboard",
    icon: ""
  },
  {
    label: "Nhà cung cấp mới",
    path: "/admin/new-provider",
    icon: ""
  },
  {
    label: "Nhà cũng cấp đã chấp nhận",
    path: "/admin/provider-accept",
    icon: ""
  },
  {
    label: "Nhà cũng cấp đã từ chối",
    path: "/admin/provider-reject",
    icon: ""
  },
  {
    label: "Tours mới",
    path: "/admin/new-tours",
    icon: ""
  },
  {
    label: "Tour đã chấp nhận",
    path: "/admin/tours-accept",
    icon: ""
  },
  {
    label: "Tours đã từ chối",
    path: "/admin/tours-reject",
    icon: ""
  },
  {
    label: "Khách hàng",
    path: "/admin/customer",
    icon: ""
  },
  {
    label: "Loại tour",
    path: "/admin/categories",
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
    if (user?.role == USER_ROLE.ADMIN) {
      setMenu(menu_admin);
    } else {
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
            <h1>Du Lich Viet</h1>
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
            <span className="mr-2 user-name">
              {user?.nameCompany ? user?.nameCompany?.toUpperCase() : "Admin"}
            </span>
            <i className="fas fa-sign-out-alt" onClick={() => onLogOut()}></i>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
