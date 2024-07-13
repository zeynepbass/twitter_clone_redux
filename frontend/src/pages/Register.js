import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FetchAuthData } from "../actions/auth";

const Register = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.taget.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(FetchAuthData(data));
  };
  return (
    <>
      <div className="container-fluid p-0 m-0">
        <div className="row">
          <div className="col-md-7" style={{ width: "50%", height: "100vh" }}>
            <img
              src="./assets/cover-img.png"
              alt=""
              style={{ height: "100%" }}
            />
          </div>
          <div
            className="col-md-5"
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <div className="logo">
              <img src="./assets/logo.png" alt="Logo do Twitter" />
              <main className="" style={{ width: "600px" }}>
                <h1>Twitter Üye Ol</h1>
                <div className="container">
                  <form
                    className=""
                    onSubmit={handleSubmit}
                    style={{ textAlign: "center" }}
                  >
                    <input
                      type="text"
                      id="usuario"
                      className="mb-1"
                      placeholder="ad"
                      name="firstName" value={data.firstName} onChange={handleChange}
                      style={{
                        backgroundColor: "white",
                        width: "70%",
                        height: "40px",
                        borderRadius: "10PX",
                      }}
                    />

                    <input
                      type="text"
                      name="lastName" value={data.lastName} onChange={handleChange}
                      id="usuario"
                      placeholder="soyad"
                      className="mb-1"
                      style={{
                        backgroundColor: "white",
                        width: "70%",
                        height: "40px",
                        borderRadius: "10PX",
                      }}
                    />

                    <input
                      type="text"
                      id="usuario"
                      placeholder="email"
                      name="email" value={data.email} onChange={handleChange}
                      className="mb-1"
                      style={{
                        backgroundColor: "white",
                        width: "70%",
                        height: "40px",
                        borderRadius: "10PX",
                      }}
                    />
                    <input
                      type="text"
                      id="usuario"
                      name="password" value={data.password} onChange={handleChange}
                      placeholder="parola"
                      className="mb-1"
                      style={{
                        backgroundColor: "white",
                        width: "70%",
                        height: "40px",
                        borderRadius: "10PX",
                      }}
                    />
                    <input
                      type="text"
                      id="usuario"
                      placeholder="parola tekrar"
                      name="confirmPassword" value={data.confirmPassword} onChange={handleChange} 
                      className="mb-1"
                      style={{
                        backgroundColor: "white",
                        width: "70%",
                        height: "40px",
                        borderRadius: "10PX",
                      }}
                    />

                    <button className="button" type="submit">
                      Gönder
                    </button>
                  </form>
                  <div className="links container">
                    <a
                      target="_blank"
                      href="https://twitter.com/Register?lang=pt"
                    >
                      üye değilsen,
                    </a>
                    <span className="ponto"></span>
                    <Link to="/giris-yap">Giriş Yap</Link>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
