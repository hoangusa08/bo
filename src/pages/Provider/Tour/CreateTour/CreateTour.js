import MyCkeditor from "components/CkEditor/Editor";
// import Loading from "components/Loading/Loading";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import useFetchCategories from "hook/useFetchCategories";
import useFetchProvince from "hook/useFetchProvince";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { useHistory } from "react-router-dom";
import "./CreateTour.scss";

const format = "DD-MM-YYYY";

export default function CreateTour() {
  const [cates] = useFetchCategories();
  const [provinces] = useFetchProvince();
  const history = useHistory();
  const [dataSubmit, setDataSubmit] = useState({
    name: "",
    adultPrice: "",
    childPrice: "",
    description: "",
    categoryTd: 1,
    providerId: 1,
    provinceId: 1,
    tourImage: ["", "", "", ""],
    schedules: []
  });

  const [dates, setDates] = useState([]);
  // const [isLoading, setIsLoading] = React.useState(false);

  const handleImages = (e, index) => {
    const temp = [...dataSubmit.tourImage];
    temp[index] = e.target.value;
    setDataSubmit({ ...dataSubmit, tourImage: temp });
  };

  const handleSubmit = () => {
    if (dataSubmit.name === "") {
      return;
    }
    console.log({
      ...dataSubmit,
      schedules: dates.map((date) => date.format())
    });
    // setIsLoading(true);
    http
      .post("/provider/createTour", {
        ...dataSubmit,
        schedules: dates.map((date) => date.format())
      })
      .then((response) => {
        pushToast("success", response.message);
        console.log(response);
        // setIsLoading(false);
        history.push("/manage-tour");
      })
      .catch((error) => {
        pushToast("error", error.message);
        // setIsLoading(false);
      });
  };

  const handleEditor = (value) => {
    setDataSubmit({ ...dataSubmit, description: value });
  };
  // if (isLoading) {
  //   return <Loading />;
  // }

  React.useEffect(() => {
    console.log(dataSubmit);
  }, [dataSubmit]);

  return (
    <MainLayout>
      <div className="create-tour">
        <div className="create-tour-top">
          <h3>Create Tour</h3>
          <button
            className="btn btn-primary save"
            onClick={() => handleSubmit()}
          >
            Save
          </button>
        </div>
        <div className="create-tour-body">
          <Row>
            <Col>
              <div className="create-tour-body-item">
                <h6 style={{ marginLeft: "5px" }}>Name</h6>
                <input
                  placeholder={"Enter name tour"}
                  value={dataSubmit.name}
                  onChange={(e) =>
                    setDataSubmit({ ...dataSubmit, name: e.target.value })
                  }
                ></input>
                <span style={{ color: "red" }}>
                  {dataSubmit.name === "" && "name is requied"}
                </span>
              </div>
            </Col>
            <Col>
              <div className="create-tour-body-item">
                <h6 style={{ marginLeft: "5px" }}>Adult Price</h6>
                <input
                  placeholder={"Enter Adult Price"}
                  value={dataSubmit.adultPrice}
                  onChange={(e) =>
                    setDataSubmit({ ...dataSubmit, adultPrice: e.target.value })
                  }
                ></input>
                <span style={{ color: "red" }}>
                  {dataSubmit.adultPrice === "" && "Adult Price is requied"}
                </span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="create-tour-body-item">
                <h6 style={{ marginLeft: "5px" }}>Children Price</h6>
                <input
                  placeholder={"Enter Children Price"}
                  value={dataSubmit.childPrice}
                  onChange={(e) =>
                    setDataSubmit({ ...dataSubmit, childPrice: e.target.value })
                  }
                ></input>
                <span style={{ color: "red" }}>
                  {dataSubmit.childPrice === "" && "Child Price is requied"}
                </span>
              </div>
            </Col>
            <Col>
              <div className="create-tour-body-item">
                <h6 style={{ marginLeft: "5px" }}>Schedules</h6>

                <DatePicker
                  value={dates}
                  style={{
                    width: "100%",
                    minWidth: "750px"
                  }}
                  onChange={setDates}
                  multiple
                  sort
                  className="date-tour"
                  format={format}
                  calendarPosition="bottom-center"
                  plugins={[<DatePanel key={"1"} />]}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="create-tour-body-item">
                <h6 style={{ marginLeft: "5px" }} className="abc">
                  Tour Image 1
                </h6>
                <input
                  placeholder={"Enter tour image"}
                  value={dataSubmit.tourImage[1]}
                  onChange={(e) => handleImages(e, 1)}
                ></input>
                <span style={{ color: "red" }}>
                  {dataSubmit.tourImage[1] === "" && "tour image is requied"}
                </span>
              </div>
            </Col>
            <Col>
              <div className="create-tour-body-item">
                <h6 style={{ marginLeft: "5px" }} className="abc">
                  Tour Image
                </h6>
                <input
                  placeholder={"Enter tour image"}
                  value={dataSubmit.tourImage[2]}
                  onChange={(e) => handleImages(e, 2)}
                ></input>
                <span style={{ color: "red" }}>
                  {dataSubmit.tourImage[2] === "" && "tour image is requied"}
                </span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="create-tour-body-item">
                <h6 style={{ marginLeft: "5px" }} className="abc">
                  Tour Image
                </h6>
                <input
                  placeholder={"Enter tour image"}
                  value={dataSubmit.tourImage[3]}
                  onChange={(e) => handleImages(e, 3)}
                ></input>
                <span style={{ color: "red" }}>
                  {dataSubmit.tourImage[3] === "" && "tour image is requied"}
                </span>
              </div>
            </Col>
            <Col>
              <div className="create-tour-body-item">
                <h6 style={{ marginLeft: "5px" }}>Tour Image 1</h6>
                <input
                  placeholder={"Enter tour image"}
                  value={dataSubmit.tourImage[0]}
                  onChange={(e) => handleImages(e, 0)}
                ></input>
                <span style={{ color: "red" }}>
                  {dataSubmit.tourImage[0] === "" && "tour image is requied"}
                </span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="create-tour-body">
                <div className="select-ctn">
                  <span style={{ marginLeft: "5px", marginBottom: "3px" }}>
                    Category
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
                    Location Start
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
          <MyCkeditor handleEditor={handleEditor} />
        </div>
      </div>
    </MainLayout>
  );
}
