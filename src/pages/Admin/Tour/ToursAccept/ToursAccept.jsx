// /* eslint-disable*/
import Pagination from "components/Pagination/Pagination";
import Search from "components/Search/Search";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import useFetchTourAdmin from "hook/useFetchTourAdmin";
import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect, useState } from "react";
import { Table } from "reactstrap";
import "./ToursAccept.scss";
import Delete from "assets/images/delete.png";
import Cmt from "assets/images/cmt.jpg";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

function ToursAccept() {
  const [search, setSearch] = useState("");
  const history = useHistory();
  const alert = useAlert();
  const [data, getTour] = useFetchTourAdmin();

  const handleSearch = (isNext, isSearch) => {
    if (isSearch) {
      getTour("Accept", 0, search);
    } else {
      if (isNext) {
        getTour("Accept", data?.page + 1, search);
      } else {
        getTour("Accept", data?.page - 1, search);
      }
    }
  };

  const handleStatus = async (status, id) => {
    await http
      .post(`/admin/${status}-tour/${id}`)
      .then(() => {
        getTour("Accept", data?.page, search);
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };

  useEffect(() => {
    getTour("Accept", 0, search);
  }, []);

  const tableTour = data?.tours?.map((tour, index) => {
    return (
      <tr key={index}>
        <th scope="row">{++index}</th>
        <td>{tour?.name}</td>
        <td style={{ textAlign: "center" }}>
          <img className="image-tour" src={tour?.tourImage} />
        </td>
        <td>{tour?.category}</td>
        <td>{tour?.provider}</td>
        <td>{tour?.subDescription}</td>
        <td>
          <button
            className="btn-delete"
            onClick={() => {
              alert.show(`Bạn có muốn xóa tour ${tour?.name.toUpperCase()}!`, {
                title: "Xóa tour",
                actions: [
                  {
                    copy: "Xóa",
                    onClick: () => handleStatus("refuse", tour.id)
                  }
                ],
                closeCopy: "Đóng"
              });
            }}
          >
            <img className="delete" src={Delete} />
          </button>
          <button
            className="btn-cmt"
            disabled={tour?.isDelete === "true"}
            onClick={() => history.push(`/view/view-rate/${tour.id}-admin`)}
          >
            <img className="detail" src={Cmt} />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <MainLayout>
      <div className="overview-category">
        <div className="header-ctn">
          <h2>Tours được chấp nhận</h2>
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
                <th>Hình ảnh</th>
                <th>Thể loại</th>
                <th>Nhà cũng cấp</th>
                <th>Mô tả</th>
                <th style={{ width: "140px" }}>Hành động</th>
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

export default ToursAccept;
