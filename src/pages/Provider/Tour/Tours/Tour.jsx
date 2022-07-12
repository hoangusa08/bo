import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect, useState } from "react";
import { Table } from "reactstrap";
import "./Tour.scss";
import Search from "components/Search/Search";
import useFetchTourProvider from "hook/useFetchTourProvider";
import { SatusConstant } from "assets/constants/StatusConstant";
import { useHistory } from "react-router-dom";
import http from "core/services/httpService";
import { pushToast } from "components/Toast";
import Pagination from "components/Pagination/Pagination";
import Delete from "assets/images/delete.png";
import Detail from "assets/images/detail1.png";
import Cmt from "assets/images/cmt.jpg";
import { useAlert } from "react-alert";

function Tour() {
  const [data, getTour] = useFetchTourProvider();
  const [search, setSearch] = useState("");
  const history = useHistory();
  const alert = useAlert();
  useEffect(() => {
    getTour(SatusConstant.ACCEPT, 0, search);
  }, []);

  const tableTour = data?.tours?.map((tour, index) => {
    return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{tour?.name}</td>
        <td style={{ textAlign: "center" }}>
          <img className="image-tour" src={tour?.tourImage} />
        </td>
        <td>{tour?.category}</td>
        <td>{tour?.subDescription}</td>
        <td>{tour?.province}</td>
        <td>
          <button
            className="btn-delete"
            disabled={tour?.isDelete === "true"}
            onClick={() => {
              alert.show(`Bạn có muốn xóa tour ${tour?.name.toUpperCase()}!`, {
                title: "Xóa tour",
                actions: [
                  {
                    copy: "Xóa",
                    onClick: () => handlDeleteTour(tour.id)
                  }
                ],
                closeCopy: "Đóng"
              });
            }}
          >
            <img className="delete" src={Delete} />
          </button>
          <button
            className="btn-detail"
            disabled={tour?.isDelete === "true"}
            onClick={() => history.push(`/detail-tour/${tour.id}`)}
          >
            <img className="detail" src={Detail} />
          </button>
          <button
            className="btn-cmt"
            disabled={tour?.isDelete === "true"}
            onClick={() => history.push(`/view/view-rate/${tour.id}`)}
          >
            <img className="detail" src={Cmt} />
          </button>
        </td>
      </tr>
    );
  });

  const handleSearch = (isNext, isSearch) => {
    if (isSearch) {
      getTour(SatusConstant.ACCEPT, 0, search);
    } else {
      if (isNext) {
        getTour(SatusConstant.ACCEPT, data?.page + 1, search);
      } else {
        getTour(SatusConstant.ACCEPT, data?.page - 1, search);
      }
    }
  };

  const handlDeleteTour = async (id) => {
    await http
      .post(`/provider/deteleTour/${id}/true`)
      .then(() => {
        getTour(SatusConstant.ACCEPT, data?.page, search);
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };

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
                <th style={{ width: "200px" }}>Ảnh</th>
                <th>Thể loại</th>
                <th>Mô tả</th>
                <th>Địa điểm bắt đầu</th>
                <th style={{ width: "170px" }}>Hành động</th>
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

export default Tour;
