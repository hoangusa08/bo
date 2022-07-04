// /*eslint-disable*/
import useFetchCategories from "hook/useFetchCategories";
import useFetchProvince from "hook/useFetchProvince";
import useFetchTOurDetail from "hook/useFetchTOurDetail";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useLayoutEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Back from "assets/images/back.png";
import "./TourDetail.scss";
import { useHistory } from "react-router-dom";

export default function TourDetailAdmin() {
  const [cates] = useFetchCategories();
  const [provinces] = useFetchProvince();
  const [tourDetail, getTourDetail] = useFetchTOurDetail();
  const [dataSubmit, setDataSubmit] = useState({
    id: 1,
    name: "",
    adultPrice: "",
    childPrice: "",
    description: "",
    categoryId: 1,
    providerId: 1,
    provinceId: 1,
    tourImage: ["", "", "", ""],
    schedules: [],
    numberPeople: ""
  });
  const history = useHistory();
  const [description, setdescription] = useState("");
  const id = window.location.href.split("/");
  const [images, setImages] = useState([]);
  const [dates, setDates] = useState([]);
  const [isEdit] = useState(true);

  React.useEffect(() => {
    getTourDetail(id[id.length - 1]);
  }, []);

  useLayoutEffect(() => {
    if (tourDetail) {
      setDataSubmit({
        name: tourDetail?.name,
        adultPrice: tourDetail?.adultPrice,
        childPrice: tourDetail?.childPrice,
        categoryId: tourDetail?.category?.id,
        provinceId: tourDetail?.locationStart?.id,
        tourImage: tourDetail?.tourImage,
        subDescription: tourDetail?.subDescription,
        dateNumber: tourDetail?.dateNumber,
        numberPeople: tourDetail?.numberPeople
      });
      setdescription(tourDetail?.description);
      setDates(tourDetail?.schedules?.map((sche) => sche.date));
      setImages(tourDetail?.tourImage);
    }
    console.log("tourDetail", tourDetail);
  }, [tourDetail]);
  return (
    <MainLayout>
      <div className="detail-admin">
        <div className="detail-admin-top">
          <div style={{ display: "flex" }}>
            <button
              className="back"
              onClick={() => history.push("/admin/tours-accept")}
            >
              <img src={Back} />
            </button>
            <h3>Chi tiết tour</h3>
          </div>
        </div>
        <div className="detail-admin-body">
          <Row>
            <Col>
              <div className="detail-admin-body-item">
                <h6 style={{ marginLeft: "5px" }}>Tên</h6>
                <input
                  placeholder="Tên"
                  value={dataSubmit?.name}
                  disabled={isEdit}
                  onChange={(e) =>
                    setDataSubmit({ ...dataSubmit, name: e.target.value })
                  }
                ></input>
              </div>
            </Col>
            <Col>
              <div className="detail-admin-body-item">
                <h6 style={{ marginLeft: "5px" }}>Giá cho người lớn</h6>
                <input
                  placeholder="Giá cho người lớn"
                  value={dataSubmit?.adultPrice}
                  disabled={isEdit}
                  onChange={(e) =>
                    setDataSubmit({ ...dataSubmit, adultPrice: e.target.value })
                  }
                ></input>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="detail-admin-body-item">
                <h6 style={{ marginLeft: "5px" }}>Giá cho trẻ em</h6>
                <input
                  placeholder="Giá cho trẻ em"
                  value={dataSubmit?.childPrice}
                  disabled={isEdit}
                  onChange={(e) =>
                    setDataSubmit({ ...dataSubmit, childPrice: e.target.value })
                  }
                ></input>
              </div>
            </Col>
            <Col>
              <div className="detail-admin-body-item">
                <h6 style={{ marginLeft: "5px" }}>Số người tối đa</h6>
                <input
                  placeholder="Số người tối đa"
                  value={dataSubmit?.numberPeople}
                  disabled={isEdit}
                  onChange={(e) =>
                    setDataSubmit({
                      ...dataSubmit,
                      numberPeople: e.target.value
                    })
                  }
                ></input>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="detail-admin-body-item">
                <h6 style={{ marginLeft: "5px" }}>Thời gian khởi hành</h6>

                <DatePicker
                  value={dates}
                  style={{
                    borderRadius: "0px"
                  }}
                  dis
                  onChange={setDates}
                  multiple
                  sort
                  className="date-tour"
                  // format={format}
                  calendarPosition="bottom-center"
                  plugins={[<DatePanel key={"1"} />]}
                />
              </div>
            </Col>
          </Row>
          <Row>
            {images?.map((img, index) => (
              <Col key={index}>
                <img className="image" src={img} />
              </Col>
            ))}
          </Row>
          <Row>
            <Col>
              <div className="detail-admin-body">
                <div className="select-ctn">
                  <span style={{ marginLeft: "5px", marginBottom: "3px" }}>
                    Thể loại
                  </span>
                  <select
                    value={dataSubmit?.categoryId}
                    className="custom-select"
                    disabled={isEdit}
                    onChange={(e) =>
                      setDataSubmit({
                        ...dataSubmit,
                        categoryId: e.target.value
                      })
                    }
                  >
                    {cates?.map((cate, index) => (
                      <option value={cate.id} key={index}>
                        {cate.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Col>
            <Col>
              <div className="detail-admin-body">
                <div className="select-ctn">
                  <span style={{ marginLeft: "5px", marginBottom: "3px" }}>
                    Địa điểm bắt đầu
                  </span>
                  <select
                    value={dataSubmit?.provinceId}
                    disabled={isEdit}
                    className="custom-select"
                    onChange={(e) =>
                      setDataSubmit({
                        ...dataSubmit,
                        provinceId: e.target.value
                      })
                    }
                  >
                    {provinces?.map((province, index) => (
                      <option value={province.id} key={index}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="create-tour-body-item">
                <h6 style={{ marginLeft: "5px" }} className="abc">
                  Mô tả
                </h6>
                <input
                  placeholder="Mô tả"
                  value={dataSubmit.subDescription}
                  disabled={isEdit}
                  onChange={(e) =>
                    setDataSubmit({
                      ...dataSubmit,
                      subDescription: e.target.value
                    })
                  }
                ></input>
              </div>
            </Col>
            <Col>
              <div className="create-tour-body-item">
                <h6 style={{ marginLeft: "5px" }}>Số ngày</h6>
                <input
                  placeholder={"Enter tour Number Date"}
                  value={dataSubmit.dateNumber}
                  disabled={isEdit}
                  onChange={(e) =>
                    setDataSubmit({
                      ...dataSubmit,
                      dateNumber: e.target.value
                    })
                  }
                ></input>
              </div>
            </Col>
          </Row>
          <h6 style={{ marginLeft: "5px" }}>Lich trinh</h6>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      </div>
    </MainLayout>
  );
}
