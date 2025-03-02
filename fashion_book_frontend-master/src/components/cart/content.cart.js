import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { QRCodeCanvas } from "qrcode.react";

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
      showQR: false
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.cart !== this.props.cart) {
      console.log("Cart Data:", nextProps.cart);
      // Calculate all prices including discounts
      let subtotal = nextProps.cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.count)), 0);
      let totalDiscount = nextProps.cart.reduce((sum, item) => 
        sum + (Number(item.discount || 0) * Number(item.count)), 0);

      this.setState({ 
        subtotal: subtotal,
        discount: totalDiscount,
        total: subtotal - totalDiscount
      });
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

  handleQRConfirmation = () => {
    const { name, phone, address } = this.state;
    
    // Validate fields
    if (!name || !phone || !address) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (!this.isValidPhone(phone)) {
      alert('Số điện thoại không hợp lệ');
      return;
    }

    // Call payment action (fixed the typo here)
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
                        <p className="original-price">{Number(element.price).toLocaleString()}<sup>đ</sup></p>
                        {element.discount > 0 && (
                          <p className="discounted-price" style={{color: '#FE980F'}}>
                            {(Number(element.price) - Number(element.discount)).toLocaleString()}<sup>đ</sup>
                          </p>
                        )}
                      </td>
                      <td className="cart_quantity">
                        <span onClick={() => this.props.updateProductInCart({
                          ...element, 
                          count: Math.min(element.count + 1, (element.bookItem && element.bookItem.count) || element.count)
                        })}>+</span>
                        <input type="text" value={element.count} readOnly />
                        <span onClick={() => this.props.updateProductInCart({
                          ...element, 
                          count: Math.max(1, element.count - 1)
                        })}>-</span>
                        {element.bookItem && element.bookItem.count && (
                          <small style={{display: 'block', color: '#999'}}>
                            Còn lại: {element.bookItem.count}
                          </small>
                        )}
                      </td>
                      <td className="cart_total">
                        {element.discount > 0 ? (
                          <div>
                            <p style={{ textDecoration: 'line-through', color: '#999' }}>
                              {(element.price * element.count).toLocaleString()}<sup>đ</sup>
                            </p>
                            <p style={{ color: '#FE980F', fontWeight: 'bold' }}>
                              {((element.price - element.discount) * element.count).toLocaleString()}<sup>đ</sup>
                            </p>
                          </div>
                        ) : (
                          <p>{(element.price * element.count).toLocaleString()}<sup>đ</sup></p>
                        )}
                      </td>
                      <td className="cart_delete">
                        <button 
                          onClick={() => this.props.deteleProductInCart(element._id)}
                          style={{
                            backgroundColor: '#FE980F',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '25px',
                            height: '25px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            padding: 0
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
                  <ul style={{ width: '100%', marginBottom: '20px' }}>
                    <li style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', marginBottom: '10px' }}>
                      <span>Tổng tiền hàng</span>
                      <span style={{ minWidth: '120px', textAlign: 'right' }}>
                        {this.state.subtotal.toLocaleString()}<sup>đ</sup>
                      </span>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', marginBottom: '10px' }}>
                      <span>Giảm giá</span>
                      <span style={{ minWidth: '120px', textAlign: 'right', color: '#FE980F' }}>
                        -{this.state.discount.toLocaleString()}<sup>đ</sup>
                      </span>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', marginBottom: '10px' }}>
                      <span>Phí vận chuyển</span>
                      <span style={{ minWidth: '120px', textAlign: 'right' }}>0<sup>đ</sup></span>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                      <span>Tổng thanh toán</span>
                      <span style={{ minWidth: '120px', textAlign: 'right', color: '#FE980F', fontWeight: 'bold' }}>
                        {Math.max(0, this.state.total).toLocaleString()}<sup>đ</sup>
                      </span>
                    </li>
                  </ul>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    gap: '20px',
                    marginTop: '20px',
                  }}>
                    <Button 
                      className="btn btn-default" 
                      onClick={this.handlePayment}
                      style={{ backgroundColor: '#FE980F', color: 'white' }}
                    >
                      Payment
                    </Button>
                    <Link 
                      className="btn btn-default" 
                      to={"/"}
                      style={{ 
                        backgroundColor: '#E6E4DF', 
                        color: '#696763',
                        minWidth: '120px', 
                        textAlign: 'center'
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
        
        <Modal show={this.state.showQR} onHide={() => this.setState({ showQR: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Thông tin thanh toán</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label>Họ tên:</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  placeholder="Nhập họ tên"
                />
              </div>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label>Số điện thoại:</label>
                <input
                  type="tel"
                  className="form-control"
                  value={this.state.phone}
                  onChange={(e) => this.setState({ phone: e.target.value })}
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label>Địa chỉ:</label>
                <textarea
                  className="form-control"
                  value={this.state.address}
                  onChange={(e) => this.setState({ address: e.target.value })}
                  placeholder="Nhập địa chỉ giao hàng"
                />
              </div>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>Vui lòng quét QR để thanh toán</p>
                <img 
                  src="https://res.cloudinary.com/dhzlbonsg/image/upload/v1740711717/mazsv6idr4y4o7xegrmj.jpg"
                  alt="QR Code"
                  style={{ width: '256px', height: '256px' }}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              onClick={() => this.setState({ showQR: false })}
              style={{ backgroundColor: '#E6E4DF', color: '#696763' }}
            >
              Đóng
            </Button>
            <Button 
              onClick={this.handleQRConfirmation}
              style={{ backgroundColor: '#FE980F', color: 'white' }}
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
