import React, { Component } from "react";

const FooterMiddle = () => (
  <div className="footer-widget">
    <div className="container">
      <div className="row">
        <div className="col-sm-3">
          <div className="single-widget">
            <h2>Thông Tin Về Chúng Tôi</h2>
            <ul className="nav nav-pills nav-stacked ">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <a href="#">Bắc Ninh City</a>
              </li>
              <li>
                <i className="far fa-envelope"></i>
                <a href="#">cao0suy@gmail.com</a>
              </li>
              <li>
                <i className="fas fa-phone-volume"></i>
                <a href="#">+84 888 866 66</a>
              </li>
              <li>
                <i class="fab fa-facebook-f"></i>
                <a href="#">cao0suy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="single-widget">
            <h2>Sách Về Kỹ Năng</h2>
            <ul className="nav nav-pills nav-stacked">
              <li>
                <i className="fas fa-book"></i>
                <a href="#">Facebook marketing</a>
              </li>
              <li>
                <i className="fas fa-book"></i>
                <a href="#">Đắc Nhân Tâm</a>
              </li>
              <li>
                <i className="fas fa-book"></i>
                <a href="#">Nhà Giả Kim</a>
              </li>
              <li>
                <i className="fas fa-book"></i>
                <a href="#">1000 Câu Hỏi Vì Sao</a>
              </li>
              <li>
                <i className="fas fa-book"></i>
                <a href="#">Cuộc Sống An Nhàn</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="single-widget">
            <h2>Sách Giáo Khoa</h2>
            <ul className="nav nav-pills nav-stacked">
              <li>
                <i className="fas fa-book"></i>
                <a href="#">Tiếng Anh</a>
              </li>
              <li>
                <i className="fas fa-book"></i>
                <a href="#">Toán</a>
              </li>
              <li>
                <i className="fas fa-book"></i>
                <a href="#">Hóa Học</a>
              </li>
              <li>
                <i className="fas fa-book"></i>
                <a href="#">Tiếng Em</a>
              </li>
              <li>
                <i className="fas fa-book"></i>
                <a href="#">Vật Lý</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="single-widget">
            <h2>Truyện tranh</h2>
            <ul className="nav nav-pills nav-stacked">
              <li>
                <i className="fas fa-book"></i>
                <a href="#">Doraemon</a>
              </li>
              <li>
                <i className="fas fa-book"></i>
                <a href="#">Conan</a>
              </li>
              <li>
                <i className="fas fa-book"></i>
                <a href="#">Cuộc Phiêu Lưu Của Dế Mèn</a>
              </li>
              <li>
                <i className="fas fa-book"></i>
                <a href="#">Bảy viên ngọc rồng</a>
              </li>
              <li>
                <i className="fas fa-book"></i>
                <a href="#">Attack on titan</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="single-widget">
            <h2>About Shopper</h2>
            <form action="#" className="form-footer container">
              <div className="row">
                <input
                  type="text"
                  placeholder="Your email address"
                  className="col-sm-4"
                />
                <button type="submit" className="">
                  <i className="fa fa-arrow-circle-o-right col-sm-2"></i>Submit
                </button>
              </div>
            </form>
            <p>
              Đăng Ký Gmail để nhận
              <br />
              những thống báo mới nhất về chúng tôi...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default FooterMiddle;
