import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GeneralContext } from "../context/GeneralContext";
import { useContext } from "react";
import { fetchCountryDetails } from "../http/apiService";
const CryptoJS = require("crypto-js");

//
export default function useCart() {
  const dispatch = useDispatch();
  // encrypted Cart Data
  let cartItems = useSelector((state) => state.cart.items);
  // cart items length
  let cartCountItems = useSelector((state) => state.cart.cartCount);
  let Envtoken = JSON.stringify(`${process.env.REACT_APP_SECURE_HASH}`);
  let ExpiryCountDays = 2;
  const { cartCount, setCartCount } = useContext(GeneralContext);
  const navigate = useNavigate();

  //  cart decryption
  function cartDecryption(payload, IsSingle) {
    if (IsSingle) {
      var bytes = CryptoJS.AES.decrypt(payload, Envtoken);
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      // check if cart is not decrypted
      if (!originalText) {
        clearCart();
        return;
      }
      const parsedData = JSON.parse(originalText);
      return parsedData;
      //
    } else {
      const CartData = payload
        .map((item, index) => {
          if (!item) return;
          var bytes = CryptoJS.AES.decrypt(item, Envtoken);
          var originalText = bytes.toString(CryptoJS.enc.Utf8);
          // check if cart is not decrypted
          if (!originalText) {
            clearCart();
            return;
          }
          const parsedData = JSON.parse(originalText);
          return parsedData;
        })
        .filter((item) => item);

      setCartCount(CartData?.length);
      return CartData;
    }
  }

  //  cart encryption
  function cartEncryption(payload, isMulti) {
    if (isMulti) {
      const UpdatedCart = payload?.map((item, index) => {
        var cipherdtext = CryptoJS.AES.encrypt(
          JSON.stringify(item),
          Envtoken
        ).toString();
        return cipherdtext;
      });
      return UpdatedCart;
    } else {
      var cipherdtext = CryptoJS.AES.encrypt(
        JSON.stringify(payload),
        Envtoken
      ).toString();
      return cipherdtext;
    }
  }
  //get All Cart
  function getCart() {
    let cartData = cartDecryption(cartItems);
    return cartData;
  }
  //add to cart
  function addToCart(data, price, qty = 1) {
    const payload = { ...data };
    let ProductPrice = price ? price : payload?.price[0];
    if (!ProductPrice || ProductPrice == undefined) {
      toast.info("This Product's price is not Updated! Try again Later");
      return;
    }
    payload.price = ProductPrice;
    const cartItemsList = getCart();
    const checkItem = cartItemsList.filter((item) => {
      let CheckData =
        item?.price?.id == payload?.price?.id && item?.id == payload?.id;
      if (CheckData) {
        return item;
      }
    });
    if (checkItem.length > 0) {
      toast(
        <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
          <h5
            style={{
              fontSize: "15px",
              color: "#036c5f",
              marginBottom: "0.5rem",
            }}
          >
            Product already added in Cart.
          </h5>
          <h4 style={{ fontSize: "16px", marginBottom: "0.5rem" }}>
            {checkItem[0]?.name}
          </h4>
          <p style={{ fontSize: "14px", marginBottom: "0.5rem" }}>
            Pack of: {checkItem[0]?.price?.pack_of}
          </p>
          <img
            src={`${process.env.REACT_APP_IMAGE_BASE_URL}${checkItem[0]?.featured_img}`}
            height="100px"
            width="100px"
            alt="Product"
          />
          <h4 style={{ fontSize: "15px", margin: "0.5rem 0 1rem 0" }}>
            Quantity: {checkItem[0]?.quantity}
          </h4>
          <button
            style={{
              backgroundColor: "#036c5f",
              color: "#fff",
              padding: "0.3rem 1rem",
              marginRight: "10px",
              border: "0",
              fontSize: "12px",
              borderRadius: "20px",
            }}
            onClick={() => {
              navigate("/cart");
              toast.dismiss();
            }}
          >
            Check Cart
          </button>
          <button
            style={{
              backgroundColor: "#d33",
              color: "#fff",
              padding: "0.3rem 1rem",
              border: "0",
              fontSize: "12px",
              borderRadius: "20px",
            }}
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>,
        {
          theme: "light",
          icon: false,
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
        }
      );
      return;
    }

    payload.quantity = qty;
    payload.currentPrice =
      payload?.price?.sale_price != 0
        ? payload?.price?.sale_price
        : payload?.price?.deal_price != 0
        ? payload?.price?.deal_price
        : payload?.price?.actual_price;

    payload.featured_img = payload.featured_img
      ? payload.featured_img
      : (payload.featured_img = payload.slider_img[0]);

    const expiryTime = new Date().setDate(
      new Date().getDate() + ExpiryCountDays
    );
    payload.expiryTime = expiryTime;
    // cart data encryption
    let CartPromise = new Promise(function (myResolve, myReject) {
      let EncryptetText = cartEncryption(payload);

      if (EncryptetText) {
        myResolve(EncryptetText);
      } else {
        myReject("error");
      }
    });

    CartPromise.then(
      function (value) {
        dispatch({
          type: "cart/addtoCart",
          payload: value,
        });
        toast.success("Product successfully added to Cart!");
        setCartCount(cartCount + 1);
      },
      function (error) {
        toast.error("Opps!, something went wrong.");
      }
    );
  }
  // remove item from cart
  function removeCart(id) {
    const cartItemsList = getCart();
    const UpdatedCart = cartItemsList.filter((item) => item?.price?.id !== id);
    let EncryptetText = cartEncryption(UpdatedCart, true);

    dispatch({
      type: "cart/removeCartItem",
      payload: EncryptetText,
    });
    toast.success("Product successfully removed from Cart!");
    if (cartCount == 0) {
      return;
    }
    setCartCount(cartCount - 1);
  }
  // update cart qty
  function updateCart(id, priceId, qty) {
    const cartItemsList = getCart();
    const updatedItem = cartItemsList?.map((items) => {
      if (items.id == id && items?.price?.id == priceId) {
        let updatedItem = { ...items };
        updatedItem.quantity = qty;
        return updatedItem;
      } else {
        return items;
      }
    });
    let EncryptetText = cartEncryption(updatedItem, true);

    dispatch({
      type: "cart/updateCartItem",
      payload: EncryptetText,
    });
  }
  //clear cart
  function clearCart() {
    dispatch({
      type: "cart/clearCartItems",
    });
    setCartCount(0);
  }
  function TotalItemsSum() {
    const cartItemsList = getCart();
    let total = cartItemsList?.reduce(
      (accumulator, currentValue) =>
        accumulator +
        parseFloat(currentValue?.currentPrice) *
          parseFloat(currentValue?.quantity),
      0
    );
    //prettier-ignore
    return total;
  }

  function removeExpiredItems() {
    const cartItemsList = getCart();

    const today = new Date();
    const CartUpdatedList = cartItemsList?.filter((item, i) => {
      let checkExpiry = today.getTime() > item.expiryTime;
      if (!checkExpiry) return item;
    });

    const EncryptedCart = cartEncryption(CartUpdatedList, true);
    dispatch({
      type: "cart/expiredItemCartUpdate",
      payload: EncryptedCart,
    });
  }

  return {
    getCart,
    addToCart,
    removeCart,
    updateCart,
    clearCart,
    TotalItemsSum,
    removeExpiredItems,
  };
}
