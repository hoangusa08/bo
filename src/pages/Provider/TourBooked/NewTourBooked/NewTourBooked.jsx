// /* eslint-disable*/
import { pushToast } from "components/Toast";
import { PAYMENT_STATUS } from "core/constants";
import http from "core/services/httpService";
import useGetTourByStatus from "hook/useGetTourByStatus";
import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect } from "react";
import { Table } from "reactstrap";
import "./NewTourBooked.scss";

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
            className="btn btn-success"
            onClick={() => handleStatus(book.id, PAYMENT_STATUS.APPROVE)}
          >
            Approve
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-danger"
            onClick={() => handleStatus(book.id, PAYMENT_STATUS.CANCEL)}
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
        <h2>New Tour Booked</h2>
        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>No</th>
                <th>Customer</th>
                <th>Tour</th>
                <th>Adult Number</th>
                <th>Children Number</th>
                <th>Total</th>
                <th>Schedule</th>
                <th style={{ width: "200px" }}>Action</th>
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
