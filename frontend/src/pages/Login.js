import React, { useState, } from "react";
import "./login.css";
import {useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FetchLogin } from "../actions/auth";
const Login = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(FetchLogin(data));
      console.log('Response in handleSubmit:', response); // Yanıtı kontrol etmek için ekleyin
      if (response?.token) {
 localStorage.setItem("user", JSON.stringify(response));
        alert("Hoş geldin");
        navigate("/")
  
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Bir hata oluştu');
    }
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
                <h1>Twitter Giriş Yap</h1>
                <div className="container">
                  <form
                    className=""
                    style={{ textAlign: "center" }}
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      value={data.email}
                      onChange={handleChange}
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
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                      placeholder="parola"
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
                    <a target="_blank" href="https://twitter.com/login?lang=pt">
                      üye değilsen,
                    </a>
                    <span className="ponto"></span>
                    <Link to="/üye-ol">Üye Ol</Link>
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

export default Login;
