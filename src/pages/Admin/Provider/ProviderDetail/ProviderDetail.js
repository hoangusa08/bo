import MainLayout from "layout/MainLayout/MainLayout";
import React, { useEffect } from "react";
import "./ProviderDetail.scss";
import Back from "assets/images/back.png";
import { useHistory, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Avatar from "assets/images/avatar-default.png";
import http from "core/services/httpService";
import { pushToast } from "components/Toast";
import { useAlert } from "react-alert";
import useGetProviderDetail from "hook/useGetProviderDetail";
import { SatusConstant } from "assets/constants/StatusConstant";

export default function ProviderDetail() {
  const history = useHistory();
  const [data, getProviderDetail] = useGetProviderDetail();
  const { id } = useParams();
  const alert = useAlert();

  useEffect(() => {
    getProviderDetail(id);
  }, []);

  const handlDeleteCus = async (status, id) => {
    await http
      .post(`/admin/provider/${status}/${id}`)
      .then(() => {
        history.push("/admin/provider-accept");
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };

  return (
    <MainLayout>
      <div className="detail-customer">
        <div className="detail-customer-top">
          <div style={{ display: "flex" }}>
            <button
              className="back"
              onClick={() => history.push("/admin/provider-accept")}
            >
              <img src={Back} />
            </button>
            <h3>Chi tiết nhà cung cấp</h3>
          </div>

          <button
            className="btn btn-primary save"
            onClick={() => {
              alert.show(
                `Bạn có muốn xóa khách hàng ${data?.nameCompany.toUpperCase()}!`,
                {
                  title: "Xóa khách hàng",
                  actions: [
                    {
                      copy: "Xóa",
                      onClick: () =>
                        handlDeleteCus(SatusConstant.REFUSE, data.id)
                    }
                  ],
                  closeCopy: "Đóng"
                }
              );
            }}
          >
            Xóa
          </button>
        </div>
        <Row>
          <Col xl={3} xs={4}>
            <img
              className="avatar-cus"
              src={data?.avatar ? data?.avatar : Avatar}
            />
          </Col>
          <Col>
            <div className="info-item">
              <h4>Tên công ty</h4>
              <div>{data?.nameCompany}</div>
            </div>
            <div className="info-item">
              <h4>Email</h4>
              <div>{data?.email}</div>
            </div>
            <div className="info-item">
              <h4>Số điện thoại</h4>
              <div>{data?.phoneNumber}</div>
            </div>
            <div className="info-item">
              <h4>Tên tài khoản </h4>
              <div>{data?.username}</div>
            </div>
            <div className="info-item">
              <h4>Địa chỉ</h4>
              <div>{data?.address}</div>
            </div>
            <div className="info-item">
              <h4>Chủ sở hữu</h4>
              <div>{data?.owner}</div>
            </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}
