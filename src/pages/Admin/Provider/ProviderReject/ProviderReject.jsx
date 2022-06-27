// /* eslint-disable*/
import { SatusConstant } from "assets/constants/StatusConstant";
import Pagination from "components/Pagination/Pagination";
import Search from "components/Search/Search";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import useFetchProviderByStatus from "hook/useFetchProviderByStatus";
import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect, useState } from "react";
import { Table } from "reactstrap";
import "./ProviderReject.scss";
import Recover from "assets/images/recover.png";

function ProviderReject() {
  const [search, setSearch] = useState("");

  const [data, getProvider] = useFetchProviderByStatus();

  const handleSearch = (isNext, isSearch) => {
    if (isSearch) {
      getProvider(SatusConstant.REFUSE, 0, search);
    } else {
      if (isNext) {
        getProvider(SatusConstant.REFUSE, data?.page + 1, search);
      } else {
        getProvider(SatusConstant.REFUSE, data?.page - 1, search);
      }
    }
  };

  const handleStatus = async (status, id) => {
    await http
      .post(`/admin/provider/${status}/${id}`)
      .then(() => {
        getProvider(SatusConstant.REFUSE, data?.page, search);
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };

  useEffect(() => {
    getProvider(SatusConstant.REFUSE, 0, search);
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
        <td style={{ width: "100px" }}>
          <button
            className="btn-recover"
            onClick={() => handleStatus(SatusConstant.ACCEPT, provider.id)}
          >
            <img className="detail" src={Recover} />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <MainLayout>
      <div className="overview-category">
        <div className="header-ctn">
          <h2>Nhà cung cấp bị từ chối</h2>
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
                <th>Tên công ty</th>
                <th>Chủ sở hữu</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
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

export default ProviderReject;
