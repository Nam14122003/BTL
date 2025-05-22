import React, { Component } from "react";
import ProductItem from "./product.item";
import { Link } from "react-router-dom";
class ContentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: [],
      check_1: true,
      check_2: false,
      check_3: false,
      check_4: false,
      check_5: false,
    };
  }
  componentWillMount() {
    let tmp = [];
    for (let i = 1; i <= this.props.totalpage; i++) {
      tmp.push(i);
    }
    this.setState({ pagination: tmp });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.totalpage !== this.props.totalpage) {
      let tmp = [];
      for (let i = 1; i <= nextProps.totalpage; i++) {
        tmp.push(i);
      }
      this.setState({ pagination: tmp });
    }
  }
  renderPagination() {
    const { pagination } = this.state;
    const { page, setPage, backPage, nextPage } = this.props;
    const total = pagination.length;

    if (total === 0) return null;

    const createPage = (p) => (
      <li
        key={p}
        className={p === page ? "active" : ""}
        onClick={() => setPage(p)}
      >
        <Link to="#">{p}</Link>
      </li>
    );

    const pages = [];

    if (total <= 5) {
      // Nếu tổng trang nhỏ hơn hoặc bằng 5 thì hiển thị hết
      for (let i = 1; i <= total; i++) {
        pages.push(createPage(i));
      }
    } else {
      // Luôn hiển thị 2 trang cuối
      const lastTwo = [total - 1, total];

      // Xác định 3 trang đầu hiển thị dựa trên page hiện tại
      let startPage = page - 1;
      if (startPage < 1) startPage = 1;
      if (startPage + 2 > total - 2) startPage = total - 4; // tránh vượt qua phần 2 trang cuối

      // Thêm 3 trang đầu (gần với page)
      for (let i = startPage; i < startPage + 3; i++) {
        pages.push(createPage(i));
      }
      if (startPage + 2 < total - 2) {
        pages.push(
          <li key="ellipsis" className="disabled">
            <span>...</span>
          </li>
        );
      }

      lastTwo.forEach((p) => {
        pages.push(createPage(p));
      });
    }

    return (
      <ul className="pagination pagination-custom">
        <li onClick={backPage}>
          <Link to="#">&laquo;</Link>
        </li>
        {pages}
        <li onClick={nextPage}>
          <Link to="#">&raquo;</Link>
        </li>
      </ul>
    );
  }

  resetCheck = () => {
    this.setState({
      check_1: false,
      check_2: false,
      check_3: false,
      check_4: false,
      check_5: false,
    });
  };
  render() {
    return (
      <section>
        <div className="container">
          <div className="row content-home">
            <div className="col-sm-3">
              <div className="left-sidebar">
                <h2>Thể Loại</h2>
                <div className="panel-group category-products" id="accordian">
                  {this.props.category.map((element, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          this.resetCheck();
                          this.props.setTitle(element.name);
                          this.props.setBranch("category");
                          this.props.setIDBranch(element._id);
                          this.props.branchClick("category", element._id);
                        }}
                        className="panel panel-default"
                      >
                        <div className="panel-heading">
                          <h4 className="panel-title item-custom">
                            <a key={index}>{element.name}</a>
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="price-range">
                  <h2>Giá tiền</h2>
                  <div className="well">
                    {/* Các tùy chọn giá có sẵn */}
                    <div className="radio">
                      <label
                        onClick={() => {
                          this.props.setRangeType(null);
                          this.resetCheck();
                          this.setState({ check_1: true });
                        }}
                      >
                        <input
                          type="radio"
                          name="optradio"
                          checked={this.state.check_1}
                        />{" "}
                        Tất cả
                      </label>
                    </div>
                    <div className="radio">
                      <label
                        onClick={() => {
                          this.props.setRangeType({ low: 0, high: 50000 });
                          this.resetCheck();
                          this.setState({ check_2: true });
                        }}
                      >
                        <input
                          type="radio"
                          name="optradio"
                          checked={this.state.check_2}
                        />{" "}
                        Dưới 50.000đ
                      </label>
                    </div>
                    <div className="radio">
                      <label
                        onClick={() => {
                          this.props.setRangeType({ low: 50000, high: 100000 });
                          this.resetCheck();
                          this.setState({ check_3: true });
                        }}
                      >
                        <input
                          type="radio"
                          name="optradio"
                          checked={this.state.check_3}
                        />{" "}
                        50.000đ - 100.000đ
                      </label>
                    </div>
                    <div className="radio">
                      <label
                        onClick={() => {
                          this.resetCheck();
                          this.setState({ check_4: true });
                          this.props.setRangeType({
                            low: 100000,
                            high: 150000,
                          });
                        }}
                      >
                        <input
                          type="radio"
                          name="optradio"
                          checked={this.state.check_4}
                        />{" "}
                        100.000đ - 150.000đ
                      </label>
                    </div>
                    <div className="radio">
                      <label
                        onClick={() => {
                          this.props.setRangeType({
                            low: 150000,
                            high: 1500000,
                          });
                          this.resetCheck();
                          this.setState({ check_5: true });
                        }}
                      >
                        <input
                          type="radio"
                          name="optradio"
                          checked={this.state.check_5}
                        />{" "}
                        Trên 150.000
                      </label>
                    </div>

                    <div className="custom-price-range">
                      <h3>Nhập khoảng giá</h3>
                      <input
                        type="number"
                        placeholder="Giá thấp nhất"
                        value={this.state.minPrice}
                        onChange={(e) =>
                          this.setState({ minPrice: e.target.value })
                        }
                        className="input-price"
                      />
                      <input
                        type="number"
                        placeholder="Giá cao nhất"
                        value={this.state.maxPrice}
                        onChange={(e) =>
                          this.setState({ maxPrice: e.target.value })
                        }
                        className="input-price"
                      />
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          const min = parseInt(this.state.minPrice) || 0;
                          const max = parseInt(this.state.maxPrice) || Infinity;
                          this.props.setRangeType({ low: min, high: max });
                        }}
                      >
                        Áp dụng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-9 padding-right">
              <div className="features_items">
                <h2 className="title text-center">{this.props.title}</h2>
                {this.props.book.map((element, index) => {
                  return (
                    <ProductItem
                      book={element}
                      urlImg={element.img}
                      price={element.price}
                      discountPrice={element.discount_price}
                      describe={element.describe}
                      id={element._id}
                      name={element.name}
                      addToCart={(product) => this.props.addToCart(product)}
                    />
                  );
                })}
              </div>
              <div className="Pagination-flex">{this.renderPagination()}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default ContentHome;
