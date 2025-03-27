import React from "react";
import { Link } from "react-router-dom";

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
          <Link to={"/product/" + id}>
            <img src={urlImg} alt="" className="img_hover" />
          </Link>
          <h4 className="name-product">{name}</h4>

          <StarRating rating={book.rating} />

          <div className="product-content">
            <h2>Giá:</h2>
            <Link to={"/product/" + id}>
              <h2>
                {new Intl.NumberFormat("de-DE", { currency: "EUR" }).format(
                  price
                )}
                <sup>đ</sup>
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductItem;
