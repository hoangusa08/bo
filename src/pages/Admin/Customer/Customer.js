import Pagination from "components/Pagination/Pagination";
import Search from "components/Search/Search";
import useGetCustomers from "hook/useGetCustomers";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Delete from "assets/images/delete.png";
import Detail from "assets/images/detail1.png";
import http from "core/services/httpService";
import "./Customer.scss";
import Default from "assets/images/avatar-default.png";

export default function Customer() {
  const [data, getCustomers] = useGetCustomers();
  const [search, setSearch] = useState("");
  const history = useHistory();
  useEffect(() => {
    getCustomers(0, search);
  }, []);

  const handlDeleteCus = async (id) => {
    await http
      .post(`/provider/deteleTour/${id}/true`)
      .then(() => {
        getCustomers(data?.page, search);
      })
      .catch((error) => {
        getCustomers("error", error.message);
      });
  };

  const handleSearch = (isNext, isSearch) => {
    if (isSearch) {
      getCustomers(0, search);
    } else {
      if (isNext) {
        getCustomers(data?.page + 1, search);
      } else {
        getCustomers(data?.page - 1, search);
      }
    }
  };

  const tableTour = data?.customers?.map((cus, index) => {
    return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>
          <img className="avatar" src={cus?.avvatar || Default} />
          {cus?.fullName}
        </td>
        <td>{cus?.email}</td>
        <td>{cus?.address}</td>
        <td>{cus?.phoneNumber}</td>
        <td>
          {cus?.delete ? (
            <span
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "5px",
                borderRadius: "5px"
              }}
            >
              Đã khóa
            </span>
          ) : (
            <span
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "5px",
                borderRadius: "5px"
              }}
            >
              Chưa khóa
            </span>
          )}
        </td>
        <td>
          <button
            className="btn-delete"
            disabled={cus?.delete === true}
            onClick={() => handlDeleteCus(cus.id)}
          >
            <img className="delete" src={Delete} />
          </button>
          <button
            className="btn-detail"
            onClick={() => history.push(`/detail-tour/${cus?.id}`)}
          >
            <img className="detail" src={Detail} />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <MainLayout>
      <div className="overview-category">
        <div className="header-ctn">
          <h2>Danh sách khách hàng</h2>
          <Search
            setSearch={setSearch}
            search={search}
            handleSearch={handleSearch}
          />
        </div>
        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>No</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Bị khóa</th>
                <th style={{ width: "150px" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>{tableTour}</tbody>
          </Table>
        </div>
        <Pagination data={data} handleSearch={handleSearch} />
      </div>
    </MainLayout>
  );
}
