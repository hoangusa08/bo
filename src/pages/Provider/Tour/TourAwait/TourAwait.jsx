// /* eslint-disable*/
import Pagination from "components/Pagination/Pagination";
import Search from "components/Search/Search";
import useFetchTourProvider from "hook/useFetchTourProvider";
import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect, useState } from "react";
import { Table } from "reactstrap";
import "./TourAwait.scss";
import { SatusConstant } from "assets/constants/StatusConstant";

function TourAwait() {
  const [data, getTour] = useFetchTourProvider();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getTour(SatusConstant.WAITING, 0, search);
  }, []);

  const tableTour = data?.tours?.map((tour, index) => {
    return (
      <tr key={index}>
        <th scope="row">{index}</th>
        <td>{tour?.name}</td>
        <td>{tour?.category}</td>
        <td>{tour?.subDescription}</td>
        <td>{tour?.province}</td>
        <td>
          <button className="btn btn-danger" disabled={tour?.isDelete}>
            Delete
          </button>
        </td>
      </tr>
    );
  });

  const handleSearch = (isNext, isSearch) => {
    if (isSearch) {
      getTour(SatusConstant.WAITING, 0, search);
    } else {
      if (isNext) {
        getTour(SatusConstant.WAITING, data?.page + 1, search);
      } else {
        getTour(SatusConstant.WAITING, data?.page - 1, search);
      }
    }
  };

  return (
    <MainLayout>
      <div className="overview-category">
        <div className="header-ctn">
          <h2>Tours Await</h2>
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
                <th style={{ width: "100px" }}>Action</th>
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

export default TourAwait;
