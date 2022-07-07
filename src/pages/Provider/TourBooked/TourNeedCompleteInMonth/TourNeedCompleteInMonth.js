// /* eslint-disable*/
import { getUser } from "core/localStore";
import useGetTourNeedCompleteInMonth from "hook/useGetTourNeedCompleteInMonth";
import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Table } from "reactstrap";

function TourNeedCompleteInMonth() {
  const [data, getTourNeedCompleteInMonth] = useGetTourNeedCompleteInMonth();
  const user = getUser();
  const [show, setShow] = useState(false);
  const [customers, setCustomers] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (customerInTourNeeds) => {
    setCustomers(customerInTourNeeds);
    setShow(true);
  };

  useEffect(() => {
    getTourNeedCompleteInMonth(user?.id);
  }, []);

  const tableRequest = data?.map((book, index) => {
    return (
      <tr key={index} onClick={() => handleShow(book?.customerInTourNeeds)}>
        <th scope="row" style={{ textAlign: "center" }}>
          {book.id}
        </th>
        <td>{book.name}</td>
        <td>{book.adultNumber}</td>
        <td>{book.childNumber}</td>
        <td>{book.schedule}</td>
      </tr>
    );
  });
  return (
    <MainLayout>
      <div className="overview-category">
        <h2>Tour cần tổ chức trong tháng</h2>
        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>No</th>
                <th>Tên tour</th>
                <th>Người lớn</th>
                <th>Trẻ em</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>{tableRequest}</tbody>
          </Table>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Danh sách khách hàng </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table bordered>
              <thead>
                <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                  <th>No</th>
                  <th>Tên khách hàng</th>
                  <th>Người lớn</th>
                  <th>Trẻ em</th>
                </tr>
              </thead>
              <tbody>
                {customers?.map((book, index) => (
                  <tr key={index}>
                    <th scope="row" style={{ textAlign: "center" }}>
                      {index}
                    </th>
                    <td>{book.name}</td>
                    <td>{book.adultNumber}</td>
                    <td>{book.childrenNumber}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </MainLayout>
  );
}

export default TourNeedCompleteInMonth;
