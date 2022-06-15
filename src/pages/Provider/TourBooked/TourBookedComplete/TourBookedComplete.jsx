// /* eslint-disable*/
import { PAYMENT_STATUS } from "core/constants";
import useGetTourByStatus from "hook/useGetTourByStatus";
import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect } from "react";
import { Table } from "reactstrap";
import "./TourBookedComplete.scss";

function TourBookedComplete() {
  const [data, getBooked] = useGetTourByStatus();

  useEffect(() => {
    getBooked(PAYMENT_STATUS.COMPLETE);
  }, []);

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
                <th>Customer</th>
                <th>Tour</th>
                <th>Adult Number</th>
                <th>Children Number</th>
                <th>Total</th>
                <th>Schedule</th>
              </tr>
            </thead>
            <tbody>{tableRequest}</tbody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}

export default TourBookedComplete;
