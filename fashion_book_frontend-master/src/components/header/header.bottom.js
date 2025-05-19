import React, { Component } from "react";
import { Link } from "react-router-dom";
import { sortTypes } from "../../constants/action.types";
import _ from "lodash";
import anh1 from "./anh1.webp";
import anh2 from "./anh2.jpg";
import anh3 from "./anh3.jpg";
import anh4 from "./anh4.jpg";
import anh5 from "./anh5.jpg";
import anh6 from "./anh6.png";
import anh7 from "./anh7.png";
import anh8 from "./anh8.jpeg";
class HeaderBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleSort: "Sort",
      listActionSort: [],
    };
  }
  componentWillMount() {
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
  render() {
    return (
      <div className="header-bottom">
        <div className="under-container">
          <div className="container1">
            <span style={{ "--i": 1 }}>
              <img src={anh1} alt="" />
            </span>
            <span style={{ "--i": 2 }}>
              <img src={anh2} alt="" />
            </span>
            <span style={{ "--i": 3 }}>
              <img src={anh3} alt="" />
            </span>
            <span style={{ "--i": 4 }}>
              <img src={anh4} alt="" />
            </span>
            <span style={{ "--i": 5 }}>
              <img src={anh5} alt="" />
            </span>
            <span style={{ "--i": 6 }}>
              <img src={anh6} alt="" />
            </span>
            <span style={{ "--i": 7 }}>
              <img src={anh7} alt="" />
            </span>
            <span style={{ "--i": 8 }}>
              <img src={anh8} alt="" />
            </span>
          </div>
        </div>
      </div>
    );
  }
}
export default HeaderBottom;
