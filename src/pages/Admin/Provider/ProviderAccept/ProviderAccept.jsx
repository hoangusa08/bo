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
import "./ProviderAccept.scss";
import Delete from "assets/images/delete.png";
import { useAlert } from "react-alert";
import Detail from "assets/images/detail1.png";
import { useHistory } from "react-router-dom";

function ProviderAccept() {
  const [search, setSearch] = useState("");
  const alert = useAlert();
  const [data, getProvider] = useFetchProviderByStatus();
  const history = useHistory();

  const handleSearch = (isNext, isSearch) => {
    if (isSearch) {
      getProvider(SatusConstant.ACCEPT, 0, search);
    } else {
      if (isNext) {
        getProvider(SatusConstant.ACCEPT, data?.page + 1, search);
      } else {
        getProvider(SatusConstant.ACCEPT, data?.page - 1, search);
      }
    }
  };

  const handleStatus = async (status, id) => {
    await http
      .post(`/admin/provider/${status}/${id}`)
      .then(() => {
        getProvider(SatusConstant.ACCEPT, data?.page, search);
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };

  useEffect(() => {
    getProvider(SatusConstant.ACCEPT, 0, search);
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
        <td style={{ width: "150px" }}>
          <button
            className="btn-delete"
            onClick={() => {
              alert.show(
                `B???n c?? mu???n x??a nh?? cung c???p ${provider?.nameCompany.toUpperCase()}!`,
                {
                  title: "X??a nh?? cung c???p",
                  actions: [
                    {
                      copy: "X??a",
                      onClick: () =>
                        handleStatus(SatusConstant.REFUSE, provider.id)
                    }
                  ],
                  closeCopy: "????ng"
                }
              );
            }}
          >
            <img className="delete" src={Delete} />
          </button>
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
          <h2>Providers Accept</h2>
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
                <th>T??n c??ng ty</th>
                <th>Ch??? s??? h???u</th>
                <th>Email</th>
                <th>S??? ??i???n tho???i</th>
                <th>?????a ch???</th>
                <th>H??nh ?????ng</th>
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

export default ProviderAccept;
