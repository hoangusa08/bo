// /* eslint-disable*/
import MyCkeditor from "components/CkEditor/Editor";
import { pushToast } from "components/Toast";
import { getUser } from "core/localStore";
import http from "core/services/httpService";
import useFetchCategories from "hook/useFetchCategories";
import useFetchProvince from "hook/useFetchProvince";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "./CreateTour.scss";
import { storage } from "core/FireBase";

const format = "DD-MM-YYYY";

export default function CreateTour() {
  const [cates] = useFetchCategories();
  const [provinces] = useFetchProvince();
  const [dataSubmit, setDataSubmit] = useState({
    name: "",
    adultPrice: "",
    childPrice: "",
    description: "",
    categoryTd: 1,
    providerId: 1,
    provinceId: 1,
    numberDate: 1,
    subDescription: "",
    tourImage: ["", "", "", ""],
    schedules: []
  });
  const provider = getUser();
  const [images, setImages] = useState([]);
  const [dates, setDates] = useState([]);

  const handleSubmit = () => {
    if (dataSubmit.name === "") {
      return;
    }
    http
      .post("/provider/createTour", {
        ...dataSubmit,
        schedules: dates.map((date) => date.format()),
        providerId: provider?.id,
        tourImage: images
      })
      .then((response) => {
        pushToast("success", response.message);
        // history.push("/manage-tour");
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };

  const handleEditor = (value) => {
    setDataSubmit({ ...dataSubmit, description: value });
  };

  const handleChange = (e) => {
    let temp = [];
    setImages([]);
    if (e.target.files.length < 4) {
      pushToast("error", "Chọn ít nhất 4 ảnh");
      return;
    }
    const promises = [];
    for (let i = 0; i < 4; i++) {
      temp.push(e.target.files[i]);
    }
    temp.map((img) => {
      const uploadTask = storage.ref(`images/${img.name}`).put(img);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref("images")
            .child(img.name)
            .getDownloadURL()
            .then((urls) => {
              setImages((prevState) => [...prevState, urls]);
            });
        }
      );
    });
  };

  return (
    <MainLayout>
      <div className="create-tour">
        <div className="create-tour-top">
          <h3>Tạo Tour</h3>
          <button
            className="btn btn-primary save"
            onClick={() => handleSubmit()}
          >
            Lưu
          </button>
        </div>
        <div className="create-tour-body">
          <Row>
            <Col>
              <div className="create-tour-body-item">
                <h6 style={{ marginLeft: "5px" }}>Tên tour</h6>
                <input
                  placeholder="Tên tour"
                  value={dataSubmit.name}
                  onChange={(e) =>
                    setDataSubmit({ ...dataSubmit, name: e.target.value })
                  }
                ></input>
                <span style={{ color: "red" }}>
                  {dataSubmit.name === "" && "Quang trọng!"}
                </span>
              </div>
            </Col>
            <Col>
              <div className="create-tour-body-item">
                <h6 style={{ marginLeft: "5px" }}>Giá cho người lớn</h6>
                <input
                  placeholder="Giá cho người lớn"
                  value={dataSubmit.adultPrice}
                  onChange={(e) =>
                    setDataSubmit({ ...dataSubmit, adultPrice: e.target.value })
                  }
                ></input>
                <span style={{ color: "red" }}>
                  {dataSubmit.adultPrice === "" && "Quang trọng!"}
                </span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="create-tour-body-item">
                <h6 style={{ marginLeft: "5px" }}>Giá Cho trẻ em</h6>
                <input
                  placeholder="Giá Cho trẻ em"
                  value={dataSubmit.childPrice}
                  onChange={(e) =>
                    setDataSubmit({ ...dataSubmit, childPrice: e.target.value })
                  }
                ></input>
                <span style={{ color: "red" }}>
                  {dataSubmit.childPrice === "" && "Quang trọng!"}
                </span>
              </div>
            </Col>
            <Col>
              <div className="create-tour-body-item">
                <h6 style={{ marginLeft: "5px" }}>Thời gan bắt đầu</h6>
                <DatePicker
                  value={dates}
                  style={{
                    borderRadius: "0px"
                  }}
                  onChange={setDates}
                  multiple
                  sort
                  className="date-tour"
                  format={format}
                  calendarPosition="bottom-center"
                  plugins={[<DatePanel key={"1"} />]}
                  placeholder="Thời gian"
                />
                <span style={{ color: "red" }}>
                  {dates.length === 0 && "Quang trọng!"}
                </span>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="create-tour-body-item">
                <h6 style={{ marginLeft: "5px" }} className="abc">
                  Ảnh tour
                </h6>
                <input
                  type="file"
                  multiple
                  className="form-control"
                  onChange={handleChange}
                ></input>
                <span style={{ color: "red" }}>
                  {images.length === 0 && "Quang trọng!"}
                </span>
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
              <div className="create-tour-body">
                <div className="select-ctn">
                  <span style={{ marginLeft: "5px", marginBottom: "3px" }}>
                    Thể loại
                  </span>
                  <select
                    value={dataSubmit.categoryTd}
                    className="custom-select"
                    onChange={(e) =>
                      setDataSubmit({
                        ...dataSubmit,
                        categoryTd: e.target.value
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
              <div className="create-tour-body">
                <div className="select-ctn">
                  <span style={{ marginLeft: "5px", marginBottom: "3px" }}>
                    Địa điểm khỏi hành
                  </span>
                  <select
                    value={dataSubmit.provinceId}
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
                  onChange={(e) =>
                    setDataSubmit({
                      ...dataSubmit,
                      subDescription: e.target.value
                    })
                  }
                ></input>
                <span style={{ color: "red" }}>
                  {dataSubmit.subDescription === "" && "Quang trọng!"}
                </span>
              </div>
            </Col>
            <Col>
              <div className="create-tour-body-item">
                <h6 style={{ marginLeft: "5px" }}>Số ngày</h6>
                <input
                  placeholder={"Enter tour Number Date"}
                  value={dataSubmit.numberDate}
                  onChange={(e) =>
                    setDataSubmit({
                      ...dataSubmit,
                      numberDate: e.target.value
                    })
                  }
                ></input>
                <span style={{ color: "red" }}>
                  {dataSubmit.numberDate === "" &&
                    " Sub Description is requied"}
                </span>
              </div>
            </Col>
          </Row>
          <MyCkeditor handleEditor={handleEditor} />
        </div>
      </div>
    </MainLayout>
  );
}
