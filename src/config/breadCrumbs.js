export const breadCrumbs = {
  product: (categoryName, cat, productName, id) => {
    return [
      {
        text: "MEDIEXPRESS",
        link: "/",
        active: false,
      },
      {
        text: `${categoryName}`,
        link: `/shop/${cat}`,
        active: false,
      },
      {
        text: `${productName}`,
        link: `/product/${id}`,
        active: true,
      },
    ];
  },
  shopcat: (categoryName, cat) => {
    return [
      {
        text: "MEDIEXPRESS",
        link: "/",
        active: false,
      },
      {
        text: `${categoryName}`,
        link: `/shop/${cat}`,
        active: true,
      },
    ];
  },
  shop: [
    {
      text: "MEDIEXPRESS",
      link: "/",
      active: false,
    },
    {
      text: "Shop",
      link: "/shop",
      active: true,
    },
  ],
  promotions: [
    {
      text: "MEDIEXPRESS",
      link: "/",
      active: false,
    },
    {
      text: "Promotions",
      link: "/promotions",
      active: true,
    },
  ],
  blog: [
    {
      text: "MEDIEXPRESS",
      link: "/",
      active: false,
    },
    {
      text: "Blog",
      link: "/blog",
      active: true,
    },
  ],
  blogInner: (blogName, blogRoute) => {
    return [
      {
        text: "MEDIEXPRESS",
        link: "/",
        active: false,
      },
      {
        text: "Blog",
        link: "/blog",
        active: false,
      },
      {
        text: `${blogName}`,
        link: `/blog/${blogRoute}`,
        active: true,
      },
    ];
  },
  deliveryInfo: [
    {
      text: "MEDIEXPRESS",
      link: "/",
      active: false,
    },
    {
      text: "Delivery Information",
      link: "/delivery-information",
      active: true,
    },
  ],
  privacyPolicy: [
    {
      text: "MEDIEXPRESS",
      link: "/",
      active: false,
    },
    {
      text: "Privacy Policy",
      link: "/privacy-policy",
      active: true,
    },
  ],
  sales: [
    {
      text: "MEDIEXPRESS",
      link: "/",
      active: false,
    },
    {
      text: "Sales",
      link: "/sales",
      active: true,
    },
  ],
  termsConditions: [
    {
      text: "MEDIEXPRESS",
      link: "/",
      active: false,
    },
    {
      text: "Terms & Conditions",
      link: "/terms-condition",
      active: true,
    },
  ],
  faq: [
    {
      text: "MEDIEXPRESS",
      link: "/",
      active: false,
    },
    {
      text: "FAQ's",
      link: "/faq",
      active: true,
    },
  ],
  orderCompleted: [
    {
      text: "MEDIEXPRESS",
      link: "/",
      active: false,
    },
    {
      text: "Order Completed",
      link: "/order-completed",
      active: true,
    },
  ],
  trackOrder: [
    {
      text: "MEDIEXPRESS",
      link: "/",
      active: false,
    },
    {
      text: "Order Tracking",
      link: "/order-tracking",
      active: true,
    },
  ],
  myAccount: [
    {
      text: "MEDIEXPRESS",
      link: "/",
      active: false,
    },
    {
      text: "My Account",
      link: "/account",
      active: true,
    },
  ],
  orders: [
    {
      text: "MEDIEXPRESS",
      link: "/",
      active: false,
    },
    {
      text: "My Account",
      link: "/account",
      active: false,
    },
    {
      text: "Orders",
      link: "/account/orders",
      active: true,
    },
  ],
  orderView: [
    {
      text: "MEDIEXPRESS",
      link: "/",
      active: false,
    },
    {
      text: "My Account",
      link: "/account",
      active: false,
    },
    {
      text: "Orders",
      link: "/account/orders",
      active: false,
    },
    {
      text: "OR327571313919514100",
      link: "/account/order/any",
      active: true,
    },
  ],
  orderTrack: [
    {
      text: "MEDIEXPRESS",
      link: "/",
      active: false,
    },
    {
      text: "My Account",
      link: "/account",
      active: false,
    },
    {
      text: "Orders",
      link: "/account/orders",
      active: false,
    },
    {
      text: "OR327571313919514100",
      link: "/account/track-order/any",
      active: true,
    },
  ],
  addAddress: [
    {
      text: "MEDIEXPRESS",
      link: "/",
      active: false,
    },
    {
      text: "My Account",
      link: "/account",
      active: false,
    },
    {
      text: "Addresses",
      link: "/account/address",
      active: false,
    },
    {
      text: "Add Address",
      link: "/account/add-address",
      active: true,
    },
  ],
  address: [
    {
      text: "MEDIEXPRESS",
      link: "/",
      active: false,
    },
    {
      text: "Addresses",
      link: "/account/address",
      active: true,
    },
  ],
  accountDetails: [
    {
      text: "MEDIEXPRESS",
      link: "/",
      active: false,
    },
    {
      text: "My Account",
      link: "/account",
      active: false,
    },
    {
      text: "Account Details",
      link: "/account/account-details",
      active: true,
    },
  ],
  changePassword: [
    {
      text: "MEDIEXPRESS",
      link: "/",
      active: false,
    },
    {
      text: "My Account",
      link: "/account",
      active: false,
    },
    {
      text: "Change Password",
      link: "/account/change-password",
      active: true,
    },
  ],
  cart: [
    {
      text: "Home",
      link: "/",
      active: false,
    },
    {
      text: "Shop",
      link: "/shop",
      active: false,
    },
    {
      text: "Cart",
      link: "/cart",
      active: true,
    },
  ],
  checkout: [
    {
      text: "Home",
      link: "/",
      active: false,
    },
    {
      text: "Shop",
      link: "/shop",
      active: false,
    },
    {
      text: "Checkout",
      link: "/checkout",
      active: true,
    },
  ],
  wishlist: [
    {
      text: "Home",
      link: "/",
      active: false,
    },
    {
      text: "Shop",
      link: "/shop",
      active: false,
    },
    {
      text: "WishList",
      link: "/wishlist",
      active: true,
    },
  ],
};
