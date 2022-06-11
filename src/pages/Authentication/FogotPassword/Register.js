// /*eslint-disable*/
import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import "./Register.scss";
import useFetchBank from "hook/useFetchBank";
import http from "core/services/httpService";
import { pushToast } from "components/Toast";

function Register() {
  const history = useHistory();
  const [banks] = useFetchBank();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      nameCompany: "",
      address: "",
      phoneNumber: "",
      bankId: 1,
      bankNumber: "",
      password: "",
      owner: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(3, "Minimum length is 3")
        .max(20, "Maximum length is 20"),
      email: Yup.string().email("Invalid email format").required("Required!"),
      nameCompany: Yup.string().required("Name Company is required"),
      address: Yup.string().required("Address is required"),
      phoneNumber: Yup.number("Enter isn't number").required(
        "Phone Number is required"
      ),
      bankId: Yup.number().required("Bank is required"),
      bankNumber: Yup.number("Enter isn't number").required(
        "Bank Number is required"
      ),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Minimum length is 8")
        .max(20, "Maximum length is 20"),
      owner: Yup.string()
        .required("owner is required")
        .min(3, "Minimum length is 3")
        .max(20, "Maximum length is 20")
    }),
    onSubmit: async (values) => {
      await http
        .post(`/authen/register/provider`, { ...values })
        .then((response) => {
          pushToast("success", response.message);
          history.push("/login");
        })
        .catch((error) => {
          pushToast("error", error.message);
        });
    }
  });
  const { values, errors } = formik;
  const backToLogin = () => {
    history.push("/");
  };
  return (
    <AuthLayout>
      <div className="register-password-wrapper">
        <div onClick={backToLogin} className="register-back-btn"></div>
        <div className="register-main">
          <div className="register-reset-title">Register To Provider</div>
          <form className="register-form-email" onSubmit={formik.handleSubmit}>
            <div className="register-form-group">
              <div className="register-text-form-register">Username</div>
              <input
                type="text"
                className="register-email-register"
                name="username"
                value={values.username}
                onChange={formik.handleChange}
              />
              {errors.username && <p className="errors">{errors.username}</p>}
              <div className="register-text-form-register">Email</div>
              <input
                type="text"
                className="register-email-register"
                name="email"
                value={values.email}
                onChange={formik.handleChange}
              />
              {errors.email && <p className="errors">{errors.email}</p>}
              <div className="register-text-form-register">Name Company</div>
              <input
                type="text"
                className="register-email-register"
                name="nameCompany"
                value={values.nameCompany}
                onChange={formik.handleChange}
              />
              {errors.nameCompany && (
                <p className="errors">{errors.nameCompany}</p>
              )}
              <div className="register-text-form-register">Address</div>
              <input
                type="text"
                className="register-email-register"
                name="address"
                value={values.address}
                onChange={formik.handleChange}
              />
              {errors.address && <p className="errors">{errors.address}</p>}
              <div className="register-text-form-register">Phone Number </div>
              <input
                type="text"
                className="register-email-register"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={formik.handleChange}
              />
              {errors.phoneNumber && (
                <p className="errors">{errors.phoneNumber}</p>
              )}
              <div
                className="register-text-form-register"
                name="bankNumber"
                value={values.bank}
              >
                Bank
              </div>
              <select
                name="bankId"
                id="cars"
                className="bank"
                onChange={formik.handleChange}
              >
                {banks?.map((bank) => (
                  <option value={bank?.id} key={bank?.id}>
                    {bank?.name}
                  </option>
                ))}
              </select>
              {errors.bankId && <p className="errors">{errors.bankId}</p>}
              <div className="register-text-form-register">Bank Number </div>
              <input
                type="text"
                className="register-email-register"
                name="bankNumber"
                value={values.bankNumber}
                onChange={formik.handleChange}
              />
              {errors.bankNumber && (
                <p className="errors">{errors.bankNumber}</p>
              )}
              <div className="register-text-form-register">Owner </div>
              <input
                type="text"
                className="register-email-register"
                name="owner"
                value={values.owner}
                onChange={formik.handleChange}
              />
              {errors.owner && <p className="errors">{errors.owner}</p>}
              <input
                type="password"
                className="register-email-register"
                name="password"
                value={values.password}
                onChange={formik.handleChange}
              />
              {errors.password && <p className="errors">{errors.password}</p>}
            </div>
            <button type="submit" className="register-btn-submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Register;
