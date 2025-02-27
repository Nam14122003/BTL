import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { QRCodeCanvas } from "qrcode.react";

class ContentCart extends Component {
  constructor() {
    super();
    this.state = {
      total: 0,
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
      showQR: false
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.cart !== this.props.cart) {
      let total = nextProps.cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.count)), 0);
      this.setState({ total });
    }
    if (nextProps.ispay !== this.props.ispay && nextProps.ispay === true) {
      this.setState({ ispay: true });
    }
    if (nextProps.ispay !== this.props.ispay && nextProps.ispay === false) {
      this.setState({ showpaymentfail: true });
    }
  }
  
  handlePayment = () => {
    if (!this.props.islogin) {
      this.setState({ show: true });
      return;
    } 
    this.setState({ showQR: true });
  };
  
  isValidPhone = phone => {
    return /^\d{10,11}$/.test(phone);
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
                      <td className="cart_product">
                        <img src={element.img} alt="" />
                      </td>
                      <td className="cart_description">
                        <h4>{element.name}</h4>
                      </td>
                      <td className="cart_price">
                        <p>{element.price}</p>
                      </td>
                      <td className="cart_quantity">
                        <span onClick={() => this.props.updateProductInCart({...element, count: element.count + 1})}>+</span>
                        <input type="text" value={element.count} readOnly />
                        <span onClick={() => this.props.updateProductInCart({...element, count: Math.max(1, element.count - 1)})}>-</span>
                      </td>
                      <td className="cart_total">
                        <p>{(element.price * element.count).toLocaleString()}<sup>đ</sup></p>
                      </td>
                      <td className="cart_delete">
                        <button onClick={() => this.props.deteleProductInCart(element._id)}>X</button>
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
                  <ul>
                    <li>Phí Vận Chuyển <span>0<sup>đ</sup></span></li>
                    <li>Tổng Tiền <span>{this.state.total.toLocaleString()}<sup>đ</sup></span></li>
                  </ul>
                  <div className="button_container">
                    <Button className="payment_button" onClick={this.handlePayment}>Payment</Button>
                    <Link className="btn btn-default check_out" to={"/"}>Continue shopping</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Modal show={this.state.showQR} onHide={() => this.setState({ showQR: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Scan to Pay</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: 'center' }}>
            <p>Vui lòng quét QR để thanh toán</p>
            <QRCodeCanvas value={`Payment for ${this.state.total} VND`} size={256} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ showQR: false })}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ContentCart;
