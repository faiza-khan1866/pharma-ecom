import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import PromoBanner from "../../../components/PromoBanner/PromoBanner";
import Table from "react-bootstrap/Table";
import { MdOutlineClose } from "react-icons/md";
import { FaShoppingBasket } from "react-icons/fa";
import useWishlist from "../../../hooks/useWishlist";
import WishlistEmpty from "../WishlistEmpty/WishlistEmpty";
import { GeneralContext } from "../../../context/GeneralContext";
import "./WishlistMain.scss";

function WishlistMain() {
  const naviagte = useNavigate();
  const { clearWishList, getWishList, removeWishList, wishAddtocart } =
    useWishlist();
  const wishtListItems = getWishList();

  return (
    <>
      {wishtListItems.length !== 0 ? (
        <>
          <div className="wishlist_wrape">
            <Container>
              <h2
                className="main_title"
                data-aos="fade-down"
                data-aos-once="true"
              >
                Wishlist
              </h2>
              <Table responsive data-aos="fade-down" data-aos-once="true">
                <thead>
                  <tr>
                    <th>Products</th>
                    <th>Price/Unit</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Cart</th>
                  </tr>
                </thead>
                <tbody>
                  {wishtListItems?.map((x, index) => (
                    <tr key={index}>
                      <td>
                        <div className="Product">
                          <MdOutlineClose
                            className="closIcon"
                            onClick={() => removeWishList(x?.price.id)}
                          />
                          <div className="product-image">
                            <img
                              src={
                                process.env.REACT_APP_IMAGE_BASE_URL +
                                x?.featured_img
                              }
                              alt="thumbnail"
                            />
                          </div>
                          <h5 onClick={() => naviagte(`/product/${x?.route}`)}>
                            {x?.name} <br /> Pack of {x?.price?.pack_of}
                          </h5>
                        </div>
                      </td>
                      <td>
                        {x?.price?.country?.currency} {x?.currentPrice}
                      </td>
                      <td>
                        <p className="discount">
                          {x?.price?.deal_price != 0 ||
                          x?.price?.sale_price != 0 ? (
                            <>
                              {Math.round(
                                ((parseFloat(x?.price?.actual_price) -
                                  (parseFloat(x?.price?.deal_price) ||
                                    parseFloat(x?.price?.sale_price))) /
                                  parseFloat(x?.price?.actual_price)) *
                                  100
                              )}
                              %
                            </>
                          ) : null}
                          {x?.price?.deal_price != 0 ||
                          x?.price?.sale_price != 0 ? (
                            <del>
                              {x?.price?.country?.currency}{" "}
                              {x?.price?.actual_price}
                            </del>
                          ) : (
                            <>
                              {x?.price?.country?.currency}{" "}
                              {x?.price?.actual_price}
                            </>
                          )}
                        </p>
                      </td>
                      <td>
                        <p className="stockStatus">
                          <span
                            className={
                              x?.stock === "0" ? "out_stock" : "in_stock"
                            }
                          >
                            {x?.stock === "0" ? "Out of Stock" : "In Stock"}
                          </span>
                        </p>
                      </td>
                      <td>
                        <Button
                          className="cart_btn"
                          disabled={x?.stock === "0" ? true : false}
                          onClick={() => wishAddtocart(x, x?.price.id)}
                        >
                          <FaShoppingBasket fontSize={"18px"} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div
                className="clear_wishlist_wrape mt-3"
                data-aos="fade-up"
                data-aos-once="true"
              >
                <Button
                  className="clear_wishlist"
                  onClick={() => clearWishList()}
                >
                  Clear Cart <MdOutlineClose />
                </Button>
              </div>
              <PromoBanner />
            </Container>
          </div>
        </>
      ) : (
        <WishlistEmpty />
      )}
    </>
  );
}

export default WishlistMain;
