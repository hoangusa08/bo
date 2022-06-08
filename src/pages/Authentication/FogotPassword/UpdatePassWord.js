import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import "./UpdatePassWord.scss";
import { resetPassword } from "store/user";
import { useDispatch } from "react-redux";

function UpdatePassWord() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useParams();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(5, "Minimum 5 characters")
        .required("Required!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!")
    }),
    onSubmit: async (values) => {
      dispatch(resetPassword(values.password, token));
    }
  });
  const { values, errors } = formik;
  const goBack = () => {
    history.goBack();
  };
  return (
    <AuthLayout>
      <div className="update-password-wrapper">
        <div onClick={goBack} className="update-back-btn"></div>
        <div className="update-main">
          <div className="update-reset-title">Reset your Password</div>
          <form onSubmit={formik.handleSubmit} className="update-form">
            <div className="update-pass-form-group">
              <label>New password</label>
              <input
                type={isShowPassword ? "text" : "password"}
                className="update-newpass"
                name="password"
                value={values.password}
                onChange={formik.handleChange}
              />
              <div
                className="show-password"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? (
                  <i className="far fa-eye" />
                ) : (
                  <i className="far fa-eye-slash" />
                )}
              </div>
              {errors.password && <p className="errors">{errors.password}</p>}
            </div>
            <div className="update-pass-form-group confirm-pass-group">
              <label>Confirm password</label>
              <input
                type={isShowConfirmPassword ? "text" : "password"}
                className="update-newpass confirm-newpass"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={formik.handleChange}
              />
              <div
                className="show-password"
                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              >
                {isShowConfirmPassword ? (
                  <i className="far fa-eye" />
                ) : (
                  <i className="far fa-eye-slash" />
                )}
              </div>
              {errors.confirmPassword && (
                <p className="errors">{errors.confirmPassword}</p>
              )}
            </div>
            <button type="submit" className="update-btn-submit">
              UPDATE PASSWORD
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}

export default UpdatePassWord;
