import MainLayout from "layout/MainLayout/MainLayout";
import React, { useEffect } from "react";
import Back from "assets/images/back.png";
import "./ViewRateTour.scss";
import useFetchTOurDetail from "hook/useFetchTOurDetail";
import StarRatings from "react-star-ratings";
import AvatarDefaul from "assets/images/avatar-default.png";
import Delete from "assets/images/delete.png";
import { useHistory } from "react-router-dom";
import http from "core/services/httpService";
import { pushToast } from "components/Toast";

export default function ViewRateTour() {
  const [tour, getTour] = useFetchTOurDetail();
  const id = window.location.href.split("/");
  const check = id[id.length - 1].split("-");
  const history = useHistory();

  useEffect(() => {
    if (check.length === 1) {
      getTour(id[id.length - 1]);
    } else {
      getTour(check[0]);
    }
  }, []);

  useEffect(() => {
    console.log(tour);
  }, [tour]);

  const handleDelete = async (id) => {
    await http
      .post(`admin/delete/rate-tour/${id}`)
      .then(() => {
        getTour(getTour(check[0]));
      })
      .catch((error) => {
        pushToast("error", error.message);
      });
  };

  return (
    <MainLayout>
      <div className="rate-tour">
        <div className="header-ctn">
          <div style={{ display: "flex" }}>
            <button
              className="back"
              onClick={() => history.push("/tour-accept")}
            >
              <img src={Back} />
            </button>
            <h3>{tour?.name.toUpperCase()}</h3>
          </div>
        </div>
        {tour?.rateTours?.map((rate) => (
          <div key={rate.id} className="rate-ctn">
            <div className="rate-header">
              <img src={rate.avatar_source || AvatarDefaul} />
            </div>
            <div className="body">
              <div>{rate.user_full_name.toUpperCase()}</div>
              <StarRatings
                rating={rate.star}
                starRatedColor="yellow"
                numberOfStars={5}
                name="rating"
                starDimension="15px"
              />
              <div className="comment">{rate.comment}</div>
            </div>
            {check.length === 2 ? (
              <div className="rate-bottom">
                <button className="btn-delete" onClick={() => handleDelete()}>
                  <img className="delete" src={Delete} />
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
        <div className="main"></div>
      </div>
    </MainLayout>
  );
}
