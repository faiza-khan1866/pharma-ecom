import { useContext } from "react";
import { GeneralContext } from "../context/GeneralContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useCart from "./useCart";
import { fetchProductDetailData } from "../http/apiService";
const CryptoJS = require("crypto-js");

function useWishlist() {
  let EnvtokenWishList = JSON.stringify(
    `${process.env.REACT_APP_SECURE_HASH_WISHLIST}`
  );
  const dispatch = useDispatch();
  const wishListItems = useSelector((state) => state.wishlist.items);
  const { wishCount, setWishCount, countryData } = useContext(GeneralContext);

  const { addToCart } = useCart();
  const navigate = useNavigate();
  let ExpiryCountDays = 2;

  //  wishlist decryption
  function WishlistDecryption(payload, IsSingle) {
    if (IsSingle) {
      var bytes = CryptoJS.AES.decrypt(payload, EnvtokenWishList);
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      // check if wishlist is not decrypted
      if (!originalText) {
        clearWishList();
        return;
      }
      const parsedData = JSON.parse(originalText);
      return parsedData;
      //
    } else {
      const WishData = payload
        .map((item, index) => {
          if (!item) return;
          var bytes = CryptoJS.AES.decrypt(item, EnvtokenWishList);
          var originalText = bytes.toString(CryptoJS.enc.Utf8);
          // check if wishlist is not decrypted
          if (!originalText) {
            clearWishList();
            return;
          }
          const parsedData = JSON.parse(originalText);
          return parsedData;
        })
        .filter((item) => item);

      setWishCount(WishData?.length);
      return WishData;
    }
  }

  //  wishlist encryption
  function WishlistEncryption(payload, isMulti) {
    if (isMulti) {
      const UpdatedWish = payload?.map((item, index) => {
        var cipherdtext = CryptoJS.AES.encrypt(
          JSON.stringify(item),
          EnvtokenWishList
        ).toString();
        return cipherdtext;
      });
      return UpdatedWish;
    } else {
      var cipherdtext = CryptoJS.AES.encrypt(
        JSON.stringify(payload),
        EnvtokenWishList
      ).toString();
      return cipherdtext;
    }
  }
  function getWishList() {
    let wishData = WishlistDecryption(wishListItems);
    return wishData;
  }
  function addtoWishList(data, price) {
    const payload = { ...data };
    let ProductPrice = price ? price : payload?.price[0];
    if (!ProductPrice || ProductPrice == undefined) {
      toast.info("This Product's price is not Updated! Try again Later.");
      return;
    }
    payload.price = ProductPrice;
    const wishItemsList = getWishList();
    const checkItem = wishItemsList.filter((item) => {
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
            Product already added in Wishlist.
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
              navigate("/wishlist");
              toast.dismiss();
            }}
          >
            Check Wishlist
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
    //? return when item is present in list
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

    //? wishList data encryption
    let WishPromise = new Promise(function (myResolve, myReject) {
      let EncryptetText = WishlistEncryption(payload);

      if (EncryptetText) {
        myResolve(EncryptetText);
      } else {
        myReject("error");
      }
    });

    WishPromise.then(
      function (value) {
        dispatch({
          type: "wishlist/addtoWishlist",
          payload: value,
        });
        toast.success("Product successfully added to Wishlist!");
        setWishCount(wishCount + 1);
      },
      function (error) {
        toast.error("Opps!, something went wrong.");
      }
    );
  }
  function removeWishList(id) {
    const wishItemsList = getWishList();
    const UpdatedWishLIst = wishItemsList.filter(
      (item) => item?.price?.id !== id
    );
    let EncryptetText = WishlistEncryption(UpdatedWishLIst, true);

    dispatch({
      type: "wishlist/removeWishlistItem",
      payload: EncryptetText,
    });
    toast.success("Product successfully removed from Wishlist!");
    if (wishCount == 0) {
      return;
    }
    setWishCount(wishCount - 1);
  }
  async function wishAddtocart(item, id) {
    const wishItemsList = getWishList();
    const checkItem = wishItemsList.filter((WishItem) => {
      let CheckData = WishItem?.price?.id == id && WishItem?.id == item?.id;
      if (CheckData) {
        return WishItem;
      }
    });
    let formData = {
      route: checkItem[0].route,
      country: countryData?.country_name,
    };
    const ProductData = await fetchProductDetailData(formData);
    if (!ProductData?.data) {
      toast.info("This Product doesn't exist anymore!");
      removeWishList(id);
      return;
    }

    await addToCart(ProductData?.data);
    removeWishList(id);
  }
  function clearWishList() {
    dispatch({
      type: "wishlist/clearWishListItems",
    });
    setWishCount(0);
  }
  function removeWishlistExpiredItems() {
    const WishListItemsList = getWishList();
    const today = new Date();
    const WishUpdatedList = WishListItemsList?.filter((item, i) => {
      let checkExpiry = today.getTime() > item.expiryTime;
      if (!checkExpiry) return item;
    });

    const EncryptedCart = WishlistEncryption(WishUpdatedList, true);
    dispatch({
      type: "wishlist/expiredWishlistItemUpdate",
      payload: EncryptedCart,
    });
  }
  return {
    getWishList,
    addtoWishList,
    removeWishList,
    clearWishList,
    wishAddtocart,
    removeWishlistExpiredItems,
  };
}

export default useWishlist;
