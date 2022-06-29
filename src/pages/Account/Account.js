import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import "./Account.scss";
import * as Yup from "yup";
import MainLayout from "layout/MainLayout/MainLayout";
import useGetProviderDetail from "hook/useGetProviderDetail";
import { getUser } from "core/localStore";
import useFetchBank from "hook/useFetchBank";
import { Col, Row } from "react-bootstrap";
import http from "core/services/httpService";
import { pushToast } from "components/Toast";
import { useHistory } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Quan trọng!").min(3, "Minimum length is 3"),
  email: Yup.string().email("Invalid email format").required("Quan trọng!"),
  nameCompany: Yup.string().required("Quan trọng!"),
  address: Yup.string().required("Quan trọng!"),
  phoneNumber: Yup.number("Enter isn't number").required("Quan trọng!"),
  bankId: Yup.number().required("Quan trọng!"),
  bankNumber: Yup.number("Enter isn't number").required("Quan trọng!"),
  password: Yup.string()
    .required("Quan trọng!")
    .min(8, "Minimum length is 8")
    .max(20, "Maximum length is 20"),
  owner: Yup.string()
    .required("Quan trọng!")
    .min(3, "Minimum length is 3")
    .max(20, "Maximum length is 20")
});

export default function Account() {
  const [data, getProviderDetail] = useGetProviderDetail();
  const user = getUser();
  const [banks] = useFetchBank();
  const history = useHistory();

  useEffect(() => {
    getProviderDetail(user?.id);
  }, []);
  return (
    <MainLayout>
      <div style={{ width: "100%", minHeight: "90vh" }}>
        <Formik
          initialValues={data || {}}
          validationSchema={SignupSchema}
          enableReinitialize={true}
          onSubmit={(values) => {
            http
              .put("/provider/edit-detail", { ...values, id: user?.id })
              .then((res) => {
                pushToast("success", res?.message);
                history.push("/dashboard");
              })
              .catch((e) => {
                pushToast("error", e.message);
              });
          }}
        >
          {(formikProps) => {
            const { values, errors } = formikProps;
            return (
              <Form>
                <div className="account-formik">
                  <div className="item-ctn">
                    <Row>
                      <Col>
                        <div className="item">
                          <h4>Tên tài khoản</h4>
                          <Field
                            name="username"
                            className="form-input"
                            placeholder="Tên tài khoản"
                          />
                          {errors.username ? (
                            <div className="rig-error">{errors.username}</div>
                          ) : null}
                        </div>
                      </Col>
                      <Col>
                        <div className="item">
                          <h4>Email</h4>
                          <Field
                            name="email"
                            className="form-input"
                            placeholder="Email"
                          />
                          {errors.email ? (
                            <div className="rig-error">{errors.email}</div>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="item">
                          <h4>Tên công ty</h4>
                          <Field
                            name="nameCompany"
                            className="form-input"
                            placeholder="Tên công ty"
                          />
                          {errors.nameCompany ? (
                            <div className="rig-error">
                              {errors.nameCompany}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                      <Col>
                        <div className="item">
                          <h4>Địa chỉ</h4>
                          <Field
                            name="address"
                            className="form-input"
                            placeholder="Địa chỉ"
                          />
                          {errors.address ? (
                            <div className="rig-error">{errors.address}</div>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="item">
                          <h4>Sô điện thoại</h4>
                          <Field
                            name="phoneNumber"
                            className="form-input"
                            placeholder="Sô điện thoại"
                          />
                          {errors.phoneNumber ? (
                            <div className="rig-error">
                              {errors.phoneNumber}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                      <Col>
                        <div className="item">
                          <h4>Ngân hàng</h4>

                          <select
                            name="bankId"
                            id="cars"
                            className="form-input"
                          >
                            {banks?.map((bank) => (
                              <option value={bank?.id} key={bank?.id}>
                                {bank?.name}
                              </option>
                            ))}
                          </select>
                          {errors.bankId && (
                            <p className="errors">{errors.bankId}</p>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="item">
                          <h4>Số tài khoản</h4>
                          <Field
                            className="form-input"
                            name="bankNumber"
                            value={values.bankNumber}
                          />
                          {errors.bankNumber && (
                            <p className="rig-error">{errors.bankNumber}</p>
                          )}
                        </div>
                      </Col>
                      <Col>
                        <div className="item">
                          <h4>Chủ sở hữu</h4>
                          <input
                            type="text"
                            className="form-input"
                            name="owner"
                            value={values.owner}
                          />
                          {errors.owner && (
                            <p className="rig-error">{errors.owner}</p>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <div className="item">
                      <h4>Mật khẩu</h4>
                      <Field
                        type="password"
                        className="form-input"
                        name="password"
                        value={values.password}
                      />
                      {errors.password && (
                        <p className="rig-error">{errors.password}</p>
                      )}
                    </div>
                    <button className="edit-account">{"Lưu"}</button>
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
