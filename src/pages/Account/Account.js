import { Field, Form, Formik } from "formik";
import React from "react";
import "./Account.scss";
import * as Yup from "yup";
import MainLayout from "layout/MainLayout/MainLayout";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  address: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

const dataBasic = {
  email: "",
  fullName: "",
  address: "",
  phoneNumber: "",
  username: ""
};

export default function Account() {
  const [isEdit, setisEdit] = React.useState(false);

  return (
    <MainLayout>
      <div style={{ width: "100%", minHeight: "90vh" }}>
        <Formik
          initialValues={dataBasic}
          validationSchema={SignupSchema}
          enableReinitialize={true}
          onSubmit={(values) => {
            console.log("---hoang---", values);
            if (isEdit) {
              setisEdit(false);
            } else {
              setisEdit(true);
            }
          }}
        >
          {(formikProps) => {
            const { errors, touched } = formikProps;
            return (
              <Form>
                <div className="account-formik">
                  <div className="item-ctn">
                    <div className="item">
                      <h4>Email</h4>
                      <Field
                        name="email"
                        className="form-input"
                        placeholder="Email"
                        disabled={!isEdit}
                      />
                      {errors.email && touched.email ? (
                        <div className="rig-error">{errors.email}</div>
                      ) : null}
                    </div>
                    <div className="item">
                      <h4>Full Name</h4>
                      <Field
                        name="fullName"
                        className="form-input"
                        placeholder="fullName"
                        disabled={!isEdit}
                      />
                      {errors.fullName && touched.fullName ? (
                        <div className="rig-error">{errors.fullName}</div>
                      ) : null}
                    </div>
                    <div className="item">
                      <h4>Address</h4>
                      <Field
                        name="address"
                        className="form-input"
                        placeholder="Address"
                        disabled={!isEdit}
                      />
                      {errors.address && touched.address ? (
                        <div className="rig-error">{errors.address}</div>
                      ) : null}
                    </div>
                    <div className="item">
                      <h4>Phone Number</h4>
                      <Field
                        name="phoneNumber"
                        className="form-input"
                        placeholder="Phone Number"
                        disabled={!isEdit}
                      />
                      {errors.phoneNumber && touched.phoneNumber ? (
                        <div className="rig-error">{errors.phoneNumber}</div>
                      ) : null}
                    </div>
                    <div className="item">
                      <h4>Username</h4>
                      <Field
                        name="username"
                        className="form-input"
                        placeholder="Username"
                        disabled={!isEdit}
                      />
                      {errors.username && touched.username ? (
                        <div className="rig-error">{errors.username}</div>
                      ) : null}
                    </div>
                    <button className="edit-account">
                      {isEdit ? "Submit" : "Edit"}{" "}
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </MainLayout>
  );
}
