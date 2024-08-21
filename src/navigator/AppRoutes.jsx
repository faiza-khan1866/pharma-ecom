import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Error from "../pages/Error";
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Shop = lazy(() => import("../pages/Shop"));
const ProductInner = lazy(() => import("../pages/ProductInner"));
const Promotions = lazy(() => import("../pages/Promotions"));
const Blog = lazy(() => import("../pages/Blog"));
const BlogInner = lazy(() => import("../pages/BlogInnerPage"));
const Contact = lazy(() => import("../pages/Contact"));
const Faq = lazy(() => import("../pages/Faq"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const TermsCondition = lazy(() => import("../pages/TermsCondition"));
const Sales = lazy(() => import("../pages/Sales"));
const DeliveryInformation = lazy(() => import("../pages/DeliveryInformation"));
//cart
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Wishlist = lazy(() => import("../pages/Wishlist/Wishlist"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
// account
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Verification = lazy(() => import("../pages/Verification"));
const MyAccount = lazy(() => import("../pages/Account/MyAccount"));
const AccountDetails = lazy(() => import("../pages/Account/AccountDetails"));
const ChangePassword = lazy(() => import("../pages/Account/ChangePassword"));
const Address = lazy(() => import("../pages/Account/Address"));
const AddAddress = lazy(() => import("../pages/Account/AddAddress"));
const Orders = lazy(() => import("../pages/Account/Order"));
const OrderView = lazy(() => import("../pages/Account/OrderView"));
const OrderTracking = lazy(() => import("../pages/Account/OrderTracking"));
const TrackOrder = lazy(() => import("../pages/TrackOrder"));
const OrderCompleted = lazy(() => import("../pages/OrderCompleted"));

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:cat" element={<Shop />} />
      <Route path="/product/:id" element={<ProductInner />} />
      <Route path="/promotions" element={<Promotions />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogInner />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-condition" element={<TermsCondition />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/delivery-information" element={<DeliveryInformation />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/order-tracking" element={<TrackOrder />} />
      {/* Protected routes */}
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/account-details"
        element={
          <ProtectedRoute>
            <AccountDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/change-password"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/address"
        element={
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/add-address"
        element={
          <ProtectedRoute>
            <AddAddress />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/add-address/:id"
        element={
          <ProtectedRoute>
            <AddAddress />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/order/:id"
        element={
          <ProtectedRoute>
            <OrderView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/track-order/:id"
        element={
          <ProtectedRoute>
            <OrderTracking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-completed"
        element={
          <ProtectedRoute>
            <OrderCompleted />
          </ProtectedRoute>
        }
      />
      {/* Fallback for 404 */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRoutes;
