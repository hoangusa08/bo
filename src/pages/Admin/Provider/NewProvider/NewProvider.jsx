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
import Delete from "assets/images/delete.png";
import Accept from "assets/images/accept.png";
import { useAlert } from "react-alert";
import Detail from "assets/images/detail1.png";
import { useHistory } from "react-router-dom";

function NewProvider() {
  const [search, setSearch] = useState("");
  const alert = useAlert();
  const [data, getProvider] = useFetchProviderByStatus();
  const history = useHistory();

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
        <td>{provider?.nameCompany}</td>
        <td>{provider?.owner}</td>
        <td>{provider?.email}</td>
        <td>{provider?.phoneNumber}</td>
        <td>{provider?.address}</td>
        <td style={{ width: "200px" }}>
          <button
            className="btn-accept"
            onClick={() => {
              alert.show(
                `Bạn có muốn chấp nhận nhà cung cấp ${provider?.nameCompany.toUpperCase()}!`,
                {
                  title: "Chấp nhận cung cấp",
                  actions: [
                    {
                      copy: "Chấp nhận",
                      onClick: () =>
                        handleStatus(SatusConstant.ACCEPT, provider.id)
                    }
                  ],
                  closeCopy: "Đóng"
                }
              );
            }}
          >
            <img className="delete" src={Accept} />
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            className="btn-delete"
            onClick={() => {
              alert.show(
                `Bạn có muốn xóa nhà cung cấp ${provider?.nameCompany.toUpperCase()}!`,
                {
                  title: "Xóa nhà cung cấp",
                  actions: [
                    {
                      copy: "Xóa",
                      onClick: () =>
                        handleStatus(SatusConstant.REFUSE, provider.id)
                    }
                  ],
                  closeCopy: "Đóng"
                }
              );
            }}
          >
            <img className="delete" src={Delete} />
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            className="btn-detail"
            onClick={() =>
              history.push(`/admin/provider-detail/${provider?.id}`)
            }
          >
            <img className="detail" src={Detail} />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <MainLayout>
      <div className="overview-category">
        <div className="header-ctn">
          <h2>Nhà cung cấp mới</h2>
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
                <th>Chủ sở hứu</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Hành động</th>
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
