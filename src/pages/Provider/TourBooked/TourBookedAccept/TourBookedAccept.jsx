// /* eslint-disable*/
import { pushToast } from "components/Toast";
import { PAYMENT_STATUS } from "core/constants";
import http from "core/services/httpService";
import useGetTourByStatus from "hook/useGetTourByStatus";
import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect } from "react";
import { useAlert } from "react-alert";
import { Table } from "reactstrap";
import "./TourBookedAccept.scss";

function TourBookedAccept() {
  const [data, getBooked] = useGetTourByStatus();
  const alert = useAlert();
  useEffect(() => {
    getBooked(PAYMENT_STATUS.APPROVE);
  }, []);

  const handleStatus = (id, status) => {
    http
      .post(`/provider/book-tour/${id}/${status}`)
      .then((res) => {
        pushToast("success", res.message);
        getBooked(PAYMENT_STATUS.APPROVE);
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
            className="btn btn-success"
            onClick={() => {
              alert.show(`Tour này đã tổ chức xong!`, {
                title: "Hoàn thành tour",
                actions: [
                  {
                    copy: "ok",
                    onClick: () =>
                      handleStatus(book.id, PAYMENT_STATUS.COMPLETE)
                  }
                ],
                closeCopy: "Đóng"
              });
            }}
          >
            Complete
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-danger"
            onClick={() => {
              alert.show(`Bạn muốn hủy tour!`, {
                title: "hủy tour",
                actions: [
                  {
                    copy: "Xóa",
                    onClick: () => handleStatus(book.id, PAYMENT_STATUS.CANCEL)
                  }
                ],
                closeCopy: "Đóng"
              });
            }}
          >
            Cancel
          </button>
        </td>
      </tr>
    );
  });
  return (
    <MainLayout>
      <div className="overview-category">
        <h2>Tour Booked Accept</h2>
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
                <th style={{ width: "250px" }}>Action</th>
              </tr>
            </thead>
            <tbody>{tableRequest}</tbody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}

export default TourBookedAccept;
