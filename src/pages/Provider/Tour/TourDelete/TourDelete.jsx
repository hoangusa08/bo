// /* eslint-disable*/
import Pagination from "components/Pagination/Pagination";
import Search from "components/Search/Search";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import useFetchTourDelete from "hook/useFetchTourDelete";
import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect, useState } from "react";
import { Table } from "reactstrap";
import "./TourDelete.scss";

function TourDelete() {
  const [data, getTour] = useFetchTourDelete();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getTour(0, search);
  }, []);

  const handleSearch = (isNext, isSearch) => {
    if (isSearch) {
      getTour(0, search);
    } else {
      if (isNext) {
        getTour(data?.page + 1, search);
      } else {
        getTour(data?.page - 1, search);
      }
    }
  };

  const handlDeleteTour = async (id) => {
    await http
      .post(`/provider/deteleTour/${id}/false`)
      .then(() => {
        getTour(data?.page, search);
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };

  const tableTour = data?.tours?.map((tour, index) => {
    return (
      <tr key={index}>
        <th scope="row" style={{ textAlign: "center" }}>
          {++index}
        </th>
        <td>{tour?.name}</td>
        <td>{tour?.category}</td>
        <td>{tour?.subDescription}</td>
        <td>{tour?.province}</td>
        <td>{tour?.status}</td>
        <td>
          <button
            className="btn btn-success"
            onClick={() => handlDeleteTour(tour.id)}
          >
            recover
          </button>
        </td>
      </tr>
    );
  });

  return (
    <MainLayout>
      <div className="overview-category">
        <div className="header-ctn">
          <h2>Tour Delete</h2>
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
                <th>Category</th>
                <th>Sub Description</th>
                <th>Location Start</th>
                <th>Status</th>
                <th>Action</th>
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

export default TourDelete;
