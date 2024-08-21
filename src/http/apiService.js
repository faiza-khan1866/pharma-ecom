import axios from "axios";

const api = axios.create({
  baseURL: "https://prismcloudhosting.com/MediExpress_APIs/public/v1/api",
});

// Pages API
export const fetchHomeData = () => {
  return api.get("/home");
};

export const fetchHeaderSearchData = (formData) => {
  return api.post("/global-search", formData);
};

export const fetchTopBrandsData = () => {
  return api.get("/top-brands");
};

export const createMostPurchasedProductsData = (formData) => {
  return api.post("/most-purchased-products", formData);
};

export const fetchAboutData = () => {
  return api.get("/about");
};

export const fetchClientsData = () => {
  return api.get("/client-review");
};

export const fetchDealsData = (country) => {
  return api.get(`/deals/${country}`);
};

export const createSubscribeData = (formData) => {
  return api.post("/subscribers", formData);
};

export const createContactData = (formData) => {
  return api.post("/contact-us-form", formData);
};

export const fetchBlogData = () => {
  return api.get("/blog-listing");
};

export const fetchRecentBlogData = () => {
  return api.get("/recent-blog");
};

export const createBlogSearchData = (formData) => {
  return api.post("/blog-search", formData);
};

export const fetchBlogDeatilsData = (id) => {
  return api.get(`/blog-detail/${id}`);
};

export const createBlogCommentsData = (formData) => {
  return api.post("/comments", formData);
};

export const fetchFaqData = () => {
  return api.get("/faq");
};

export const fetchPrivacyPolicyData = () => {
  return api.get("/privacy-policy");
};

export const fetchTermsConditionsData = () => {
  return api.get("/terms-condition");
};

export const fetchSalesData = () => {
  return api.get("/sale-disc");
};

export const fetchDeliveryInformationData = () => {
  return api.get("/delivery");
};

// Products API
export const fetchCategoryData = () => {
  return api.get("/all-categories");
};

export const fetchShopProductData = (formData) => {
  return api.post("/shop", formData);
};

export const fetchProductData = (formData) => {
  return api.post("/product-list", formData);
};

export const fetchPromotionsData = (formData) => {
  return api.post("/promotions", formData);
};

export const fetchProductCategoryFilterData = (formData) => {
  return api.post("/shop-category-filter", formData);
};

export const fetchProductFilterData = (formData) => {
  return api.post("/product-filter", formData);
};

export const createProductPriceFilterData = (formData) => {
  return api.post("/price-filter", formData);
};

export const fetchProductPopUpData = (id, country) => {
  return api.get(`/pop-up-product-detail/${id}/${country}`);
};

export const fetchProductDetailData = (formData) => {
  return api.post("/product-detail", formData);
};

export const createProductReviewData = (formData) => {
  return api.post("/reviews", formData);
};

// Account API's
export const createRegisterData = (formData) => {
  return api.post("/auth/register", formData);
};

export const createVerificationData = (formData) => {
  return api.post("/auth/email-verification", formData);
};

export const createLoginData = (formData) => {
  return api.post("/auth/login", formData);
};

export const createForgetPaswordData = (formData) => {
  return api.post("/forget-password", formData);
};

export const fetchUserData = (header) => {
  return api.get("/auth/me", header);
};

export const createUpdateProfileData = (formData, header) => {
  return api.post("/auth/update-profile", formData, header);
};

export const createChangePasswordData = (formData, header) => {
  return api.post("/auth/change-password", formData, header);
};

export const createAddAddressData = (formData, header) => {
  return api.post("/auth/add-address", formData, header);
};

export const updateAddressData = (formData, header) => {
  return api.post("/auth/update-addresses", formData, header);
};

export const fetchAddressesData = (userId, header) => {
  return api.get(`/auth/user-addresses/${userId}`, header);
};

export const fetchSingleAddressData = (id, header) => {
  return api.get(`/auth/view-addresses/${id}`, header);
};

export const deleteAddressData = (id, header) => {
  return api.delete(`/auth/delete-addresses/${id}`, header);
};

export const setDefaultAddressData = (id, formData, header) => {
  return api.put(`/auth/set-default/${id}`, formData, header);
};

export const makeOrder = (formData, header) => {
  return api.post(`/auth/make-order`, formData, header);
};

export const fetchCountryDetails = (formData, header) => {
  return api.get(`/country/${formData}`, header);
};

export const fetchUserOrders = (userId, header) => {
  return api.get(`/auth/orders/${userId}`, header);
};

export const fetchUserOrderDetails = (orderId, header) => {
  return api.get(`/auth/order-detail/${orderId}`, header);
};

// get IP Address
export const fetchIPAddress = () => {
  return axios.get(
    // "https://ipgeolocation.abstractapi.com/v1/?api_key=ddf8565d65a3460480fb2e9971588a79&ip_address=83.110.250.231&fields=ip_address,country,city,currency,country_code"
    "https://api.ipgeolocation.io/ipgeo?apiKey=6228ce59c8c242a9bd0fc99ef9e0c5db&fields=country_name,country_code2,city,currency"
  );
};
