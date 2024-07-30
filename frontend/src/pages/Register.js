import React, { useState,useEffect } from "react";
import "./login.css";
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from "react-router-dom";
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
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const error = useSelector((state) => state.auth?.error);

  useEffect(() => {
      if (error) {
          alert(error);
      }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      alert("Parolalar uyuşmuyor!");
      return;
  }
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
                      type="email"
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
                      type="password"
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
                      type="password"
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
