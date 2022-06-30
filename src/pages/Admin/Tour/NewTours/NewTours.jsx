// /* eslint-disable*/
import Pagination from "components/Pagination/Pagination";
import Search from "components/Search/Search";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import useFetchTourAdmin from "hook/useFetchTourAdmin";
import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect, useState } from "react";
import { Table } from "reactstrap";
import "./NewTours.scss";
import Delete from "assets/images/delete.png";
import Accept from "assets/images/accept.png";
import { useAlert } from "react-alert";

function NewTours() {
  const [search, setSearch] = useState("");
  const alert = useAlert();
  const [data, getTour] = useFetchTourAdmin();

  const handleSearch = (isNext, isSearch) => {
    if (isSearch) {
      getTour("Await", 0, search);
    } else {
      if (isNext) {
        getTour("Await", data?.page + 1, search);
      } else {
        getTour("Await", data?.page - 1, search);
      }
    }
  };

  const handleStatus = async (status, id) => {
    await http
      .post(`/admin/${status}-tour/${id}`)
      .then(() => {
        getTour("Await", data?.page, search);
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };

  useEffect(() => {
    getTour("Await", 0, search);
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
            className="btn-accept"
            onClick={() => {
              alert.show(`Bạn có muốn chấp nhận ${tour?.name.toUpperCase()}!`, {
                title: "Chấp nhận tour",
                actions: [
                  {
                    copy: "Chấp nhận",
                    onClick: () => handleStatus("accept", tour.id)
                  }
                ],
                closeCopy: "Đóng"
              });
            }}
          >
            <img className="delete" src={Accept} />
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            className="btn-delete"
            onClick={() => {
              alert.show(`Bạn có muốn xóa ${tour?.name.toUpperCase()}!`, {
                title: "Chấp nhận tour",
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
        </td>
      </tr>
    );
  });

  return (
    <MainLayout>
      <div className="overview-tour-admin">
        <div className="header-ctn">
          <h2>Tour mới</h2>
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
                <th>Name</th>
                <th>Image</th>
                <th>Category</th>
                <th>Provider</th>
                <th>Descripttion</th>
                <th style={{ width: "150px" }}>Action</th>
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

export default NewTours;
