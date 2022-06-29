import { getUser } from "core/localStore";
import useGetTotalPro from "hook/useGetTotalPro";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import ChartSales from "./ChartSales/ChartSales";
import "./DashboardPro.scss";

export default function DashboardPro() {
  const [total, getTotal] = useGetTotalPro();
  const user = getUser();
  useEffect(() => {
    getTotal(user?.id);
  }, []);

  return (
    <MainLayout>
      <div className="dashboard-pro">
        <Row>
          <Col>
            <div className="board b1">
              <div>Tổng số tour</div>
              <div>{total?.totalTour} tour</div>
            </div>
          </Col>
          <Col>
            <div className="board b2">
              <div>Tổng doanh thu</div>
              <div>{total?.totalSale} VND</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl={12} lg={24}>
            <ChartSales />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}
