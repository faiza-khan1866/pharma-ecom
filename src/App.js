import React, { useState, useEffect, Suspense } from "react";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { fetchIPAddress } from "./http/apiService";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { GeneralContext } from "./context/GeneralContext";
import Layout from "./layouts/Layout";
import AppRoutes from "./navigator/AppRoutes";
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [UserData, setUserData] = useState({});
  const [countryData, setCountryData] = useState({});

  const fetchIPData = async () => {
    try {
      const response = await fetchIPAddress();
      setCountryData(response?.data);
    } catch (error) {
      console.error("Error fetching IP Address:", error);
    }
  };

  useEffect(() => {
    fetchIPData();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <GeneralContext.Provider
        value={{
          cartCount,
          setCartCount,
          wishCount,
          setWishCount,
          UserData,
          setUserData,
          countryData,
          setCountryData,
        }}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ToastContainer theme="colored" />
            <ScrollToTop />
            <Layout>
              <AppRoutes />
            </Layout>
          </PersistGate>
        </Provider>
      </GeneralContext.Provider>
    </Suspense>
  );
};

export default App;
