import useFetchCate from "hook/useFetchCate";
import MainLayout from "layout/MainLayout/MainLayout";
import { React } from "react";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";
import "./CategoryManagement.scss";

function CategoryManagement() {
  const history = useHistory();
  const [data] = useFetchCate();

  const newCategory = () => {
    history.push("/manage-categories-new");
  };

  return (
    <MainLayout>
      <div className="overview-category">
        <h2>Manager Categories</h2>
        <span className="btn-add" onClick={newCategory}>
          <button className="btn btn-info ">New</button>
        </span>
        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>No</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Sub Category</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((cate, index) => (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td>{cate.name}</td>
                  <td>{cate.description}</td>
                  <td style={{ color: "blue", fontWeight: "bold" }}>
                    {cate.subcategories}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary "
                      onClick={() =>
                        history.push(`/manage-categories-edit/${cate._id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-warning "
                      onClick={() =>
                        history.push(`/manage-sub-categories/${cate._id}`)
                      }
                    >
                      Manage Sub Category
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

export default CategoryManagement;
