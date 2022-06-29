import useGetTotal from "hook/useGetTotal";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import ChartSales from "./ChartSales/ChartSales";
import ChartUser from "./ChartUser/ChartUser";
import "./Dashboard.scss";

export default function Dashboard() {
  const [total, getTotal] = useGetTotal();

  useEffect(() => {
    getTotal();
  }, []);

  return (
    <MainLayout>
      <div className="dashboard">
        <Row>
          <Col>
            <div className="board b1">
              <div>Tổng số khách hàng</div>
              <div>{total?.totalCustomer} người</div>
            </div>
          </Col>
          <Col>
            <div className="board b2">
              <div>Tổng số nhà cung cấp</div>
              <div>{total?.totalProvider} người</div>
            </div>
          </Col>
          <Col>
            <div className="board b3">
              <div>Tổng số tour</div>
              <div>{total?.totalTour} tour</div>
            </div>
          </Col>
          <Col>
            <div className="board b4">
              <div>Tổng doanh thu</div>
              <div>{total?.totalSale} VND</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl={12} lg={24}>
            <ChartSales />
          </Col>
          <Col xl={12} lg={24}>
            <ChartUser />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}
