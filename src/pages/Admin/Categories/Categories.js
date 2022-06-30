import Pagination from "components/Pagination/Pagination";
import Search from "components/Search/Search";
import useGetCateAdmin from "hook/useGetCateAdmin";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import http from "core/services/httpService";
import { pushToast } from "components/Toast";
import "./Categories.scss";
import Edit from "assets/images/icons/edit.png";

export default function Categories() {
  const [search, setSearch] = useState("");
  const [data, getCategories] = useGetCateAdmin();
  const [modalShow, setModalShow] = React.useState(false);
  const [value, setvalue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [id, setid] = useState(0);

  const handleSearch = (isNext, isSearch) => {
    if (isSearch) {
      getCategories(0, search);
    } else {
      if (isNext) {
        getCategories(data?.page + 1, search);
      } else {
        getCategories(data?.page - 1, search);
      }
    }
  };
  useEffect(() => {
    getCategories(0, search);
  }, []);

  const handleEdit = (name, id, isEdit) => {
    setIsEdit(isEdit);
    setvalue(name);
    setid(id);
    setModalShow(true);
  };

  const tableTour = data?.categories?.map((cate, index) => {
    return (
      <tr key={index}>
        <th scope="row" style={{ textAlign: "center" }}>
          {++index}
        </th>
        <td>{cate?.name}</td>
        <td>
          <button
            className="btn-accept"
            onClick={() => handleEdit(cate?.name, cate?.id, true)}
          >
            <img src={Edit} alt="" />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <MainLayout>
      <div className="overview-cate-admin">
        <div className="header-ctn">
          <h2> Loại tour</h2>
          <Search
            setSearch={setSearch}
            search={search}
            handleSearch={handleSearch}
          />
        </div>
        <Button variant="primary" onClick={() => handleEdit("", 0, false)}>
          Tạo mới
        </Button>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          value={value}
          isEdit={isEdit}
          id={id}
          getCategories={() => getCategories(data?.page, search)}
        />
        <div className="main">
          <Table bordered>
            <thead>
              <tr
                style={{
                  backgroundColor: "#0B79C1",
                  color: "#fff",
                  width: "100px"
                }}
              >
                <th style={{ width: "100px" }}>No</th>
                <th>Tên</th>
                <th style={{ width: "100px" }}>Hành động</th>
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

function MyVerticallyCenteredModal(props) {
  const [value, setValue] = useState("");
  useEffect(() => {
    if (props?.value) {
      setValue(props?.value);
    }
  }, [props?.value]);

  const handleSubmit = () => {
    if (props?.isEdit) {
      http
        .put(`/category/admin/${props?.id}/${value}`)
        .then((res) => {
          pushToast("success", res.message);
          props.getCategories();
          props.onHide();
        })
        .catch((e) => {
          pushToast("error", e.message);
        });
    } else {
      http
        .post(`/category/admin/${value}`)
        .then((res) => {
          pushToast("success", res.message);
          props.getCategories();
          props.onHide();
        })
        .catch((e) => {
          pushToast("error", e.message);
        });
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props?.isEdit ? "Chỉnh sửa" : "Tạo mới"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Tên thể loại</h4>
        <input
          style={{
            width: "100%",
            height: "40px",
            paddingLeft: "10px",
            fontSize: "18px"
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleSubmit()}>Lưu</Button>
        <Button onClick={props.onHide} variant="danger">
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
