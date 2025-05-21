import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function ContentLoginRegister({
  setEmailogin,
  setPasswordlogin,
  setEmail,
  setFirstname,
  setLastname,
  setAddress,
  setPhone,
  setPassword,
  setConfirm,
  notificationRegister,
  notificationLogin,
  registerSubmit,
  loginSubmit,
  setCaptcha,
  setCaptchaLogin,
}) {
  const [Login, setLogin] = useState(true);
  const [Register, setRegister] = useState(false);
  const [captchaImage, setCaptchaImage] = useState("");
  

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    try {
      const response = await axios("http://localhost:8080/api/captcha", {
        method: "GET",
        withCredentials: true,
        headers: {
          "Accept": "image/svg+xml"
        }
      });
      setCaptchaImage(response.data);
    } catch (e) {
      setCaptchaImage("");
    }
  };

  function handleLogin() {
    setLogin(true);
    setRegister(false);
  }
  function handleRegister() {
    setRegister(true);
    setLogin(false);
  }
  let xhtmlLogin = "";
  let xhtmlRegister = "";
  if (Login) {
    xhtmlLogin = (
      <div className="login-form">
        <div className="login-content col-sm-6">
          <h2>Đăng Nhập</h2>
          <div className="noti">{notificationLogin}</div>
          <div className="user-input">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) => {
                setEmailogin(e.target.value);
              }}
              class="user"
            />{" "}
          </div>
          <div className="user-input">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPasswordlogin(e.target.value);
              }}
              class="user"
            />
          </div>
          {/* Thêm captcha vào form login */}
          <div>
            <label htmlFor="captcha-login">Xác nhận tôi không phải là robot</label>
            <div style={{ marginBottom: 8 }}>
              {captchaImage ? (
                <span dangerouslySetInnerHTML={{ __html: captchaImage }} />
              ) : (
                <span>Đang tải mã xác nhận...</span>
              )}
              <button type="button" onClick={fetchCaptcha} style={{ marginLeft: 8 }}>
                Làm mới
              </button>
            </div>
            <input
              type="text"
              id="captcha-login"
              placeholder="Nhập mã xác nhận"
              onChange={(e) => setCaptchaLogin(e.target.value)}
            />
          </div>
          <button className="btn btn-default" onClick={() => loginSubmit()}>
            Login
          </button>
          <div className="forgotpassword">
            <Link to="/forgotpass/">Quên mật khẩu?</Link>
          </div>
        </div>
      </div>
    );
  }

  if (Register) {
    xhtmlRegister = (
      <div className="signup-form">
        <div className="login-content col-sm-6">
          <h2>Đăng ký!</h2>
          <div className="noti">{notificationRegister}</div>

          <input
            type="email"
            placeholder="Email address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="First name"
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Last name"
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Phone number"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm"
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
          />
          <div>
            <label htmlFor="captcha">Xác nhận tôi không phải là robot</label>
            <div style={{ marginBottom: 8 }}>
              {captchaImage ? (
                <span dangerouslySetInnerHTML={{ __html: captchaImage }} />
              ) : (
                <span>Đang tải mã xác nhận...</span>
              )}
              <button type="button" onClick={fetchCaptcha} style={{ marginLeft: 8 }}>
                Làm mới
              </button>
            </div>
            <input
              type="text"
              id="captcha"
              placeholder="Nhập mã xác nhận"
              onChange={(e) => setCaptcha(e.target.value)}
            />
          </div>
          <button className="btn btn-default" onClick={() => registerSubmit()}>
            Signup
          </button>
        </div>
      </div>
    );
  }
  return (
    <section className="homePage">
      <div className="container login-register">
        <div className="menu-profile">
          <ul>
            <li>
              <button onClick={handleLogin} className="menu-custom ">
                Đăng Nhập
              </button>
            </li>
            <li>
              {" "}
              <button onClick={handleRegister} className="menu-custom  ">
                Đăng Ký
              </button>
            </li>
          </ul>
          <hr></hr>
        </div>
        <div>
          {xhtmlRegister}
          {xhtmlLogin}
        </div>
      </div>
    </section>
  );
}
export default ContentLoginRegister;
