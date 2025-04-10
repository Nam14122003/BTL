import { Link } from "react-router-dom";

import React, { Fragment } from "react";
const StarRating = ({ rating }) => {
  const totalStars = 5;

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          className="star"
          style={{ color: "gold", fontSize: "22px", marginRight: "4px" }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ProductItem = ({ urlImg, price, name, id, book }) => (
  <div className="col-sm-4">
    <div className="product-image-wrapper">
      <div className="single-products">
        <div className="productinfo text-center">
          <div className="sale">
            <span className="discount-badge">
              -{Math.round(((price - book.discount) / price) * 100)}%
            </span>
          </div>
          <Link to={"/product/" + id}>
            <img src={urlImg} alt="" className="img_hover" />
          </Link>
          <h4 className="name-product">{name}</h4>

          <div className="product-content">
            {book.discount > 0 && book.discount !== price ? (
              <Fragment>
                <div className="price-wrapper">
                  <span className="original-price">
                    Giá gốc:{" "}
                    <span className="strikethrough">
                      {new Intl.NumberFormat("de-DE").format(price)}
                      <sup>đ</sup>
                    </span>
                  </span>
                  <span className="discounted-price">
                    Giá bán:{" "}
                    {new Intl.NumberFormat("de-DE").format(book.discount)}
                    <sup>đ</sup>
                  </span>
                </div>
              </Fragment>
            ) : (
              <Link to={"/product/" + id}>
                <h2>
                  Giá: {new Intl.NumberFormat("de-DE").format(price)}
                  <sup>đ</sup>
                </h2>
              </Link>
            )}
          </div>
          <StarRating rating={book.rating} />
        </div>
      </div>
    </div>
  </div>
);

export default ProductItem;
