import MainLayout from "layout/MainLayout/MainLayout";
import React, { useEffect } from "react";
import "./CustomerDetail.scss";
import Back from "assets/images/back.png";
import { useHistory, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Avatar from "assets/images/avatar-default.png";
import useGetCustomerDetail from "hook/useGetCustomerDetail";
import http from "core/services/httpService";
import { pushToast } from "components/Toast";
import { useAlert } from "react-alert";

export default function CustomerDetail() {
  const history = useHistory();
  const [data, getCustomerDetail] = useGetCustomerDetail();
  const { id } = useParams();
  const alert = useAlert();

  useEffect(() => {
    getCustomerDetail(id);
  }, []);

  const handlDeleteCus = async (id) => {
    await http
      .put(`/admin/customer/${id}`)
      .then(() => {
        history.push("/admin/customer");
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
              onClick={() => history.push("/admin/customer")}
            >
              <img src={Back} />
            </button>
            <h3>Chi tiết khách hàng</h3>
          </div>

          <button
            className="btn btn-primary save"
            onClick={() => {
              alert.show(
                `Bạn có muốn xóa khách hàng ${data?.fullName.toUpperCase()}!`,
                {
                  title: "Xóa khách hàng",
                  actions: [
                    {
                      copy: "Xóa",
                      onClick: () => handlDeleteCus(data.id)
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
              <h4>Tên</h4>
              <div>{data?.fullName}</div>
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
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}
