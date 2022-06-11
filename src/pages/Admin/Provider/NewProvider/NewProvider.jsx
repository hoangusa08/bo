import Pagination from "components/Pagination/Pagination";
import Search from "components/Search/Search";
import useFetchProviderByStatus from "hook/useFetchProviderByStatus";
import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect, useState } from "react";
import { Table } from "reactstrap";
import "./NewProvider.scss";
import { SatusConstant } from "assets/constants/StatusConstant";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";

function NewProvider() {
  const [search, setSearch] = useState("");

  const [data, getProvider] = useFetchProviderByStatus();

  const handleSearch = (isNext, isSearch) => {
    if (isSearch) {
      getProvider(SatusConstant.WAITING, 0, search);
    } else {
      if (isNext) {
        getProvider(SatusConstant.WAITING, data?.page + 1, search);
      } else {
        getProvider(SatusConstant.WAITING, data?.page - 1, search);
      }
    }
  };

  const handleStatus = async (status, id) => {
    await http
      .post(`/admin/provider/${status}/${id}`)
      .then(() => {
        getProvider(SatusConstant.WAITING, data?.page, search);
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };

  useEffect(() => {
    getProvider(SatusConstant.WAITING, 0, search);
  }, []);

  const tableProvider = data?.providers?.map((provider, index) => {
    return (
      <tr key={index}>
        <th scope="row" style={{ textAlign: "center" }}>
          {++index}
        </th>
        <td>{provider?.nameConpany}</td>
        <td>{provider?.owner}</td>
        <td>{provider?.email}</td>
        <td>{provider?.phoneNumber}</td>
        <td>{provider?.address}</td>
        <td style={{ width: "250px" }}>
          <button
            className="btn btn-success"
            onClick={() => handleStatus(SatusConstant.ACCEPT, provider.id)}
          >
            Approve
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-danger"
            onClick={() => handleStatus(SatusConstant.REFUSE, provider.id)}
          >
            Reject
          </button>
        </td>
      </tr>
    );
  });

  return (
    <MainLayout>
      <div className="overview-category">
        <div className="header-ctn">
          <h2>New Providers</h2>
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
                <th>Company Name</th>
                <th>Owner</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{tableProvider}</tbody>
          </Table>
        </div>
        <Pagination data={data} handleSearch={handleSearch} />
      </div>
    </MainLayout>
  );
}

export default NewProvider;
