// /* eslint-disable*/
import Pagination from "components/Pagination/Pagination";
import Search from "components/Search/Search";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import useFetchTourAdmin from "hook/useFetchTourAdmin";
import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect, useState } from "react";
import { Table } from "reactstrap";
import "./ToursReject.scss";

function ToursReject() {
  const [search, setSearch] = useState("");

  const [data, getTour] = useFetchTourAdmin();

  const handleSearch = (isNext, isSearch) => {
    if (isSearch) {
      getTour("Refuse", 0, search);
    } else {
      if (isNext) {
        getTour("Refuse", data?.page + 1, search);
      } else {
        getTour("Refuse", data?.page - 1, search);
      }
    }
  };

  const handleStatus = async (status, id) => {
    await http
      .post(`/admin/${status}-tour/${id}`)
      .then(() => {
        getTour("Refuse", data?.page, search);
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };

  useEffect(() => {
    getTour("Refuse", 0, search);
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
            className="btn btn-success"
            onClick={() => handleStatus("accept", tour.id)}
          >
            Approve
          </button>
        </td>
      </tr>
    );
  });

  return (
    <MainLayout>
      <div className="overview-category">
        <div className="header-ctn">
          <h2>Tour Reject</h2>
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
                <th style={{ width: "200px" }}>Action</th>
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

export default ToursReject;
