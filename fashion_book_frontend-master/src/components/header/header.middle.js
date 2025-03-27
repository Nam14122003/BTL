import React, { Component } from "react";
import { Link } from "react-router-dom";
import storeConfig from "../../config/storage.config";
import { TbBackground } from "react-icons/tb";
import { sortTypes } from "../../constants/action.types";
import _ from "lodash";
class HeaderMiddle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "Account",
      titleSort: "Sort",
      listActionSort: [],
    };
  }
  componentWillMount() {
    if (storeConfig.getUser() !== null) {
      this.setState({
        email: storeConfig.getUser().email,
      });
    }
    const { sortType } = this.props;
    if (sortType === sortTypes.SORT_DAY_DECREASED) {
      this.setState({ titleSort: "Sort by day decrease" });
    } else if (sortType === sortTypes.SORT_DAY_INCREASED) {
      this.setState({ titleSort: "Sort by day increase" });
    } else if (sortType === sortTypes.SORT_PRICE_DECREASED) {
      this.setState({ titleSort: "Sort by price decrease" });
    } else if (sortType === sortTypes.SORT_PRICE_INCREASED) {
      this.setState({ titleSort: "Sort by price increase" });
    } else if (sortType === sortTypes.SORT_SALES_DECREASED) {
      this.setState({ titleSort: "Sort by sales decrease" });
    } else if (sortType === sortTypes.SORT_SALES_INCREASED) {
      this.setState({ titleSort: "Sort by sales increase" });
    } else if (sortType === sortTypes.SORT_VIEWS_DECREASED) {
      this.setState({ titleSort: "Sort by views decrease" });
    } else if (sortType === sortTypes.SORT_VIEWS_INCREASED) {
      this.setState({ titleSort: "Sort By views increase" });
    }
    this.setState({
      listActionSort: {
        SORT_DAY_DECREASED: "Sort by day decrease",
        SORT_DAY_INCREASED: "Sort by day increase",
        SORT_PRICE_DECREASED: "Sort by price decrease",
        SORT_PRICE_INCREASED: "Sort by price increase",
        SORT_SALES_DECREASED: "Sort by sales decrease",
        SORT_SALES_INCREASED: "Sort by sales increase",
        SORT_VIEWS_DECREASED: "Sort by views decrease",
        SORT_VIEWS_INCREASED: "Sort By views increase",
      },
    });
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.islogin) {
      this.setState({
        email: "Account",
      });
    } else {
      this.setState({
        email: storeConfig.getUser().email,
      });
    }
    if (
      nextProps.sortType != this.props.sortType &&
      nextProps.sortType !== undefined
    ) {
      this.setState({
        titleSort: this.state.listActionSort[nextProps.sortType],
      });
    }
  }
  handelSearch = (e) => {
    if (e === 13) {
      this.props.searchTextSubmit();
    }
  };
  handlelogin = () => {
    if (this.props.islogin) {
      return (
        <li
          className="btn-custom test"
          onClick={() => {
            window.location.reload();
            this.props.logout();
            this.props.history.push("/");
          }}
        >
          <a>
            <i className="fa fa-sign-in-alt" />
            Đăng Xuất
          </a>
        </li>
      );
    } else {
      return (
        <li className="test">
          <Link to="/login_register">
            <i className="fa fa-sign-out-alt" />
            Đăng Nhập
          </Link>
        </li>
      );
    }
  };
  handleProfile = () => {
    if (this.state.email === "Account") {
      return;
    } else {
      this.props.history.push("/profile/" + this.state.email);
    }
  };
  hoverlogin = () => {
    if (this.props.islogin) {
      return (
        <ul className="sub-menu">
          <li onClick={() => this.handleProfile()}>
            <Link to={"/"}>
              <a>
                <i className="fa fa-user-circle" /> Profile{" "}
              </a>
            </Link>
          </li>

          <li>
            <Link to="/purchase_history">
              <a>
                <i className="fa fa-box" />
                Đơn Hàng{" "}
              </a>
            </Link>
          </li>
        </ul>
      );
    }
  };
  render() {
    return (
      <div className="header-middle">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="logo pull-left">
                <a href="/">
                  <img src="/assets/images/home/logo1.gif" alt="" />
                </a>
              </div>
              <a href="/">
                <h2>PTITBOOK</h2>
              </a>
              <div className=""></div>
            </div>
            <div className="col-sm-8 s">
              <div
                className="search_box "
                style={{
                  position: "relative",
                  width: "45%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: " flex-end",
                }}
              >
                <input
                  type="text"
                  placeholder="Search......."
                  onChange={(e) => this.props.setSearchText(e.target.value)}
                  onKeyUp={(e) => this.handelSearch(e.keyCode)}
                  style={{ flex: 1 }}
                />
                <button
                  onClick={() => this.props.searchTextSubmit()}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 55,
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 22,
                  }}
                >
                  <i className="fa fa-search" />
                </button>
              </div>

              <div className="shop-menu pull-right">
                <ul className="nav navbar-nav collapse navbar-collapse">
                  <li className="test">
                    <Link to={"/cart"}>
                      <i className="fa fa-shopping-cart" />
                      Giỏ Hàng
                    </Link>
                  </li>
                  <li className="dropdown test">
                    <a className="Setting-item">
                      <i className="fa fa-user dropbtn"></i>
                      Tài khoản
                    </a>
                    {this.hoverlogin()}
                  </li>
                  {this.handlelogin()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderMiddle;
