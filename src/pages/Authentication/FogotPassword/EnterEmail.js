// /*eslint-disable*/
import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import "./EnterEmail.scss";
import { useDispatch } from "react-redux";
import { requestResetPassword } from "store/user";

function EnterEmail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required!")
    }),
    onSubmit: (values) => {
      dispatch(requestResetPassword(values));
    }
  });
  const { values, errors } = formik;
  const backToLogin = () => {
    history.push("/");
  };
  return (
    <AuthLayout>
      <div className="fogot-password-wrapper">
        <div onClick={backToLogin} className="fogot-back-btn"></div>
        <div className="fogot-main">
          <div className="fogot-reset-title">Reset your Password</div>
          <form className="fogot-form-email" onSubmit={formik.handleSubmit}>
            <div className="fogot-form-group">
              <div className="fogot-text-form-fogot">
                Please enter your email address, we will send you an email to
                reset your password
              </div>
              <input
                type="text"
                className="fogot-email-fogot"
                name="email"
                value={values.email}
                onChange={formik.handleChange}
              />
              {errors.email && <p className="errors">{errors.email}</p>}
            </div>
            <button type="submit" className="fogot-btn-submit">
              SEND CODE
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}

export default EnterEmail;
