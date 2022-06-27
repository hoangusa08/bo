// /* eslint-disable*/
import { pushToast } from "components/Toast";
import { PAYMENT_STATUS } from "core/constants";
import http from "core/services/httpService";
import useGetTourByStatus from "hook/useGetTourByStatus";
import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect } from "react";
import { Table } from "reactstrap";
import "./NewTourBooked.scss";
import Accept from "assets/images/accept.png";
import Reject from "assets/images/reject.png";

function NewTourBooked() {
  const [data, getBooked] = useGetTourByStatus();

  useEffect(() => {
    getBooked(PAYMENT_STATUS.WAITNG);
  }, []);

  const handleStatus = (id, status) => {
    http
      .post(`/provider/book-tour/${id}/${status}`)
      .then((res) => {
        pushToast("success", res.message);
        getBooked(PAYMENT_STATUS.WAITNG);
      })
      .catch((e) => {
        pushToast("error", e?.message);
      });
  };

  const tableRequest = data?.map((book, index) => {
    return (
      <tr key={index}>
        <th scope="row" style={{ textAlign: "center" }}>
          {book.id}
        </th>
        <td>{book.customerName}</td>
        <td>{book.tourName}</td>
        <td>{book.adultNumber}</td>
        <td>{book.childrenNumber}</td>
        <td>{book.total}</td>
        <td>{book.schedule}</td>
        <td>
          <button
            className="btn-accept"
            onClick={() => handleStatus(book.id, PAYMENT_STATUS.APPROVE)}
          >
            <img src={Accept} />
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            className="btn-reject"
            onClick={() => handleStatus(book.id, PAYMENT_STATUS.CANCEL)}
          >
            <img className="reject" src={Reject} />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <MainLayout>
      <div className="overview-category">
        <h2>Tour mới được đặt</h2>
        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>No</th>
                <th>Tên khách hàng</th>
                <th>Tên tour</th>
                <th>Người lớn</th>
                <th>Trẻ em</th>
                <th>Tổng tiền</th>
                <th>Thời gian</th>
                <th style={{ width: "150px" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>{tableRequest}</tbody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}

export default NewTourBooked;
