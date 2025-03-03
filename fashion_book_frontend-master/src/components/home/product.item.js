import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/product.item.css'

const ProductItem = ({ urlImg, price, name, id, book }) => (
    <div className="col-sm-4">
        <div className="product-image-wrapper">
            <div className="single-products">
                <div className="productinfo text-center">
                    <Link to={'/product/' + id}><img src={urlImg} alt="" className="product-image" /></Link>
                    <h4 className="name-product">{name}</h4>
                    <div className="product-content">
                        {book.discount > 0 ? (
                            <Fragment>
                                <div className="price-wrapper">
                                    <span className="original-price">
                                        Giá gốc: <span className="strikethrough">
                                            {new Intl.NumberFormat('de-DE').format(price)}<sup>đ</sup>
                                        </span>
                                    </span>
                                    <span className="discounted-price">
                                        Giá bán: {new Intl.NumberFormat('de-DE').format(book.discount)}<sup>đ</sup>
                                    </span>
                                    <span className="discount-badge">
                                        -{Math.round(((price - book.discount) / price) * 100)}%
                                    </span>
                                </div>
                            </Fragment>
                        ) : (
                            <Link to={'/product/' + id}>
                                <h2>Giá: {new Intl.NumberFormat('de-DE').format(price)}<sup>đ</sup></h2>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default ProductItem
