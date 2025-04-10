import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

class ContentCart extends Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      subtotal: 0, // Add subtotal to track original price
      discount: 0, // This will now be the actual amount in VND
      show: false,
      name: "",
      phone: "",
      address: "",
      notiName: "",
      notiPhone: "",
      notiAddress: "",
      notiDetailAddress: "",
      ispay: false,
      showpaymentfail: false,
      showQR: false,
      selectedItems: {},
      selectAll: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cart !== this.props.cart) {
      const selectedItems = {};
      nextProps.cart.forEach((item) => {
        selectedItems[item._id] = this.state.selectedItems[item._id] || false;
      });
      this.setState({ selectedItems }, this.calculateTotals);
    }
  }
  handleCheckboxChange = (index) => {
    this.setState((prevState) => {
      const selectedItems = {
        ...prevState.selectedItems,
        [index]: !prevState.selectedItems[index],
      };
      return {
        selectedItems,
        total: this.calculateTotal(selectedItems),
        selectAll:
          Object.keys(selectedItems).length === this.props.cart.length &&
          Object.values(selectedItems).every(Boolean),
      };
    });
  };

  handleSelectAll = () => {
    this.setState((prevState) => {
      const newSelectAll = !prevState.selectAll;
      const selectedItems = newSelectAll
        ? Object.fromEntries(this.props.cart.map((_, i) => [i, true]))
        : {};
      return {
        selectedItems,
        selectAll: newSelectAll,
        total: this.calculateTotal(selectedItems),
      };
    });
  };

  calculateTotal = (selectedItems) => {
    return this.props.cart.reduce((sum, item, index) => {
      if (selectedItems[index]) {
        return (
          sum +
          (Number(item.price) - Number(item.discount || 0)) * Number(item.count)
        );
      }
      return sum;
    }, 0);
  };

  handlePayment = () => {
    if (!this.props.islogin) {
      this.setState({ show: true });
      return;
    }
    this.setState({ showQR: true });
  };

  isValidPhone = (phone) => {
    return /^\d{10,11}$/.test(phone);
  };

  handleQRConfirmation = () => {
    const { name, phone, address } = this.state;

    // Validate fields
    if (!name || !phone || !address) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    } // Thêm dấu đóng ngoặc nhọn này

    if (!this.isValidPhone(phone)) {
      alert("Số điện thoại không hợp lệ");
      return;
    }

    // Call payment action
    this.props.payment(address, phone, name, this.state.total);
    this.setState({ showQR: false });
  };

  render() {
    return (
      <div>
        <section id="cart_items">
          <div className="container">
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="checkbox-content">
                      <input
                        type="checkbox"
                        checked={this.state.selectAll}
                        onChange={this.handleSelectAll}
                      />
                    </td>
                    <td className="image">Item</td>
                    <td className="description" />
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
                    <td />
                  </tr>
                </thead>
                <tbody>
                  {this.props.cart.map((element, index) => (
                    <tr key={index}>
                      <td className="checkbox-content">
                        <input
                          type="checkbox"
                          checked={!!this.state.selectedItems[index]}
                          onChange={() => this.handleCheckboxChange(index)}
                        />
                      </td>
                      <td className="cart_product">
                        <img src={element.img} alt="" />
                      </td>
                      <td className="cart_description">
                        <h4>{element.name}</h4>
                      </td>
                      <td className="cart_price">
                        <p className="original-price">
                          {Number(element.price).toLocaleString()}
                          <sup>đ</sup>
                        </p>
                        {element.discount > 0 && (
                          <p
                            className="discounted-price"
                            style={{ color: "#FE980F" }}
                          >
                            {(
                              Number(element.price) - Number(element.discount)
                            ).toLocaleString()}
                            <sup>đ</sup>
                          </p>
                        )}
                      </td>
                      <td className="cart_quantity">
                        <button
                          onClick={() =>
                            this.props.updateProductInCart({
                              ...element,
                              count: element.count + 1, // Tăng số lượng
                            })
                          }
                          disabled={
                            element.bookItem &&
                            element.count >= element.bookItem.count
                          }
                          style={{
                            backgroundColor: "#FE980F",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "25px",
                            height: "25px",
                            fontSize: "14px",
                            cursor: "pointer",
                          }}
                        >
                          +
                        </button>

                        <input
                          type="number"
                          value={element.count}
                          min="1"
                          max={element.bookItem ? element.bookItem.count : ""}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            if (/^\d*$/.test(newValue)) {
                              // Chỉ cho phép số nguyên dương
                              this.props.updateProductInCart({
                                ...element,
                                count:
                                  newValue === "" ? "" : parseInt(newValue, 10),
                              });
                            }
                          }}
                          onBlur={(e) => {
                            let newCount = parseInt(e.target.value, 10);
                            if (isNaN(newCount) || newCount < 1) {
                              newCount = 1;
                            } else if (element.bookItem) {
                              newCount = Math.min(
                                newCount,
                                element.bookItem.count
                              );
                            }
                            this.props.updateProductInCart({
                              ...element,
                              count: newCount,
                            });
                          }}
                          style={{ width: "60px", textAlign: "center" }}
                        />

                        <button
                          onClick={() =>
                            this.props.updateProductInCart({
                              ...element,
                              count: Math.max(1, element.count - 1), // Giảm số lượng, tối thiểu là 1
                            })
                          }
                          disabled={element.count <= 1}
                          style={{
                            backgroundColor: "#FE980F",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "25px",
                            height: "25px",
                            fontSize: "14px",
                            cursor: "pointer",
                          }}
                        >
                          -
                        </button>
                      </td>

                      <td className="cart_total">
                        {element.discount > 0 ? (
                          <div>
                            <p
                              style={{
                                textDecoration: "line-through",
                                color: "#999",
                              }}
                            >
                              {(element.price * element.count).toLocaleString()}
                              <sup>đ</sup>
                            </p>
                            <p style={{ color: "#FE980F", fontWeight: "bold" }}>
                              {(
                                (element.price - element.discount) *
                                element.count
                              ).toLocaleString()}
                              <sup>đ</sup>
                            </p>
                          </div>
                        ) : (
                          <p>
                            {(element.price * element.count).toLocaleString()}
                            <sup>đ</sup>
                          </p>
                        )}
                      </td>
                      <td className="cart_delete">
                        <button
                          onClick={() =>
                            this.props.deteleProductInCart(element._id)
                          }
                          style={{
                            backgroundColor: "#FE980F",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "25px",
                            height: "25px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: 0,
                          }}
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="do_action">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="total_area">
                  <ul style={{ width: "100%", marginBottom: "20px" }}>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "20px",
                        marginBottom: "10px",
                      }}
                    >
                      <span>Tổng tiền hàng</span>
                      <span style={{ minWidth: "120px", textAlign: "right" }}>
                        {Math.max(0, this.state.total).toLocaleString()}
                        <sup>đ</sup>
                      </span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "20px",
                        marginBottom: "10px",
                      }}
                    >
                      <span>Giảm giá</span>
                      <span
                        style={{
                          minWidth: "120px",
                          textAlign: "right",
                          color: "#FE980F",
                        }}
                      >
                        -{this.state.discount.toLocaleString()}
                        <sup>đ</sup>
                      </span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "20px",
                        marginBottom: "10px",
                      }}
                    >
                      <span>Phí vận chuyển</span>
                      <span style={{ minWidth: "120px", textAlign: "right" }}>
                        0<sup>đ</sup>
                      </span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "20px",
                      }}
                    >
                      <span>Tổng thanh toán</span>
                      <span
                        style={{
                          minWidth: "120px",
                          textAlign: "right",
                          color: "#FE980F",
                          fontWeight: "bold",
                        }}
                      >
                        {Math.max(0, this.state.total).toLocaleString()}
                        <sup>đ</sup>
                      </span>
                    </li>
                  </ul>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "20px",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      className="btn payment"
                      onClick={this.handlePayment}
                      style={{ backgroundColor: "#FE980F", color: "white" }}
                    >
                      Payment
                    </Button>
                    <Link
                      className="btn payment"
                      to={"/"}
                      style={{
                        backgroundColor: "#E6E4DF",
                        color: "#696763",
                        minWidth: "120px",
                        textAlign: "center",
                      }}
                    >
                      Continue shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Modal
          show={this.state.showQR}
          onHide={() => this.setState({ showQR: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Thông tin thanh toán</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label>Họ tên:</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  placeholder="Nhập họ tên"
                />
              </div>
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label>Số điện thoại:</label>
                <input
                  type="tel"
                  className="form-control"
                  value={this.state.phone}
                  onChange={(e) => this.setState({ phone: e.target.value })}
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label>Địa chỉ:</label>
                <textarea
                  className="form-control"
                  value={this.state.address}
                  onChange={(e) => this.setState({ address: e.target.value })}
                  placeholder="Nhập địa chỉ giao hàng"
                />
              </div>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <p>Vui lòng quét QR để thanh toán</p>
                <img
                  src="https://res.cloudinary.com/dhzlbonsg/image/upload/v1740711717/mazsv6idr4y4o7xegrmj.jpg"
                  alt="QR Code"
                  style={{ width: "256px", height: "256px" }}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              onClick={() => this.setState({ showQR: false })}
              style={{ backgroundColor: "#E6E4DF", color: "#696763" }}
            >
              Đóng
            </Button>
            <Button
              onClick={this.handleQRConfirmation}
              style={{ backgroundColor: "#FE980F", color: "white" }}
            >
              Xác nhận thanh toán
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ContentCart;
