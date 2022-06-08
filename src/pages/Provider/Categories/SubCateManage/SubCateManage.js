import useFetchSubCateById from "hook/useFetchSubCateById";
import MainLayout from "layout/MainLayout/MainLayout";
import React from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./SubCateManage.scss";

export default function SubCateManage() {
  const id = window.location.href.split("/");
  const history = useHistory();
  const [data, getCates] = useFetchSubCateById();

  React.useEffect(() => {
    getCates(id[id.length - 1]);
  }, []);

  const newCategory = () => {
    history.push(`/create-sub-categories/${id[id.length - 1]}`);
  };
  return (
    <MainLayout>
      <div className="overview-category">
        <h2>Manager Sub Categories</h2>
        <span className="btn-add" onClick={newCategory}>
          <button className="btn btn-info ">New Sub Category</button>
        </span>
        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>Stt</th>
                <th>Sub Category Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((cate, index) => (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td>{cate.name}</td>
                  <td>{cate.description}</td>

                  <td>
                    <button
                      className="btn btn-primary "
                      onClick={() =>
                        history.push(`/edit-sub-categories/${cate._id}`)
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
