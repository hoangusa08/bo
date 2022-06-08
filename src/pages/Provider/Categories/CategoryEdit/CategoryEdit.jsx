import { pushToast } from "components/Toast";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useState } from "react";
import http from "core/services/httpService";
import "./CategoryEdit.scss";
import Loading from "components/Loading/Loading";
import { useHistory } from "react-router-dom";
import useFetchCateDetail from "hook/useFetchCateDetail";

function CategoryEdit() {
  const [cate, setCate] = useState({
    name: "",
    description: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [data, getCates] = useFetchCateDetail();
  const id = window.location.href.split("/");

  React.useEffect(() => {
    if (data === null) {
      getCates(id[id.length - 1]);
    }
    setCate({ name: data?.name || "", description: data?.description || "" });
  }, [data]);

  const onSubmit = () => {
    console.log(id);
    if (cate.name === "" || cate.description === "") {
      return;
    } else {
      try {
        setIsLoading(true);
        http
          .put(`/api/category/${id[id.length - 1]}`, { ...cate })
          .then((response) => {
            console.log(response);
            pushToast("success", response.message);
            setIsLoading(false);
            history.push("/manage-categories");
          });
      } catch (error) {
        pushToast("error", error.message);
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <MainLayout>
      <h2 className="category-title bold mb-5 mt-5">Edit Categories</h2>
      <form className="form-container">
        <div className="form-group login-form-group">
          <label className="name-field">Categories name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Category Name"
            name="category"
            disabled
            value={cate?.name}
            onChange={(e) =>
              setCate({
                ...cate,
                name: e.target.value
              })
            }
          />
          <span style={{ color: "red" }}>
            {cate.name === "" && "name is requied"}
          </span>
        </div>
        <div className="form-group login-form-group">
          <label className="name-field">Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Description"
            name="description"
            value={cate?.description}
            onChange={(e) =>
              setCate({
                ...cate,
                description: e.target.value
              })
            }
          />
          <span style={{ color: "red" }}>
            {cate.description === "" && "description is requied"}
          </span>
        </div>
      </form>
      <div className="form-btn-submit">
        <button className="btn btn-info btn-sm" onClick={() => onSubmit()}>
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          style={{ marginLeft: "10px" }}
          onClick={() => history.push("/manage-categories")}
        >
          Cancel
        </button>
      </div>
    </MainLayout>
  );
}

export default CategoryEdit;
