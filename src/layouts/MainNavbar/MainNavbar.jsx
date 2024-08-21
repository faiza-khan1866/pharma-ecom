import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, NavDropdown, Offcanvas, Badge } from "react-bootstrap";
import logo from "./../../assets/images/logo/logo.png";
import { IoIosSearch } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
// import TopHeader from "../TopHeader/TopHeader";
import { fetchCategoryData } from "../../http/apiService";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { GeneralContext } from "../../context/GeneralContext";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";
import SearchBar from "./SearchBar";
// import CategoryList from "./CategoryList";
// import { DropDownMenu } from "./DropDownMenu";
// import { DropDownSubMenu } from "./DropDownSubMenu";
import "./MainNavbar.scss";

const MainNavbar = (props) => {
  const { pathname } = useLocation();
  const [search, setSearch] = useState(false);
  const searchRef = useRef(null);

  let isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // ********category drop down ********
  const [categoryData, setCategoryData] = useState([]);
  const { cartCount, setCartCount, wishCount, setWishCount, setUserData } =
    useContext(GeneralContext);
  const { removeExpiredItems } = useCart();
  const { removeWishlistExpiredItems } = useWishlist();

  useEffect(() => {
    const fetchCategoryListData = async () => {
      try {
        const response = await fetchCategoryData();
        setCategoryData(response?.data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchCategoryListData();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  // local states from local storage
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("persist:root"));
    const items2 = JSON.parse(items.cart);
    const wishList = JSON.parse(items.wishlist);
    const NewUserData = JSON.parse(items.user);

    if (items2) {
      setCartCount(items2.cartCount);
    }
    if (wishList) {
      setWishCount(wishList.wishCount);
    }
    if (NewUserData) {
      setUserData(NewUserData);
    }
    removeExpiredItems();
    removeWishlistExpiredItems();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearch(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* <TopHeader /> */}
      <div className="navbar-wrap sticky-top">
        <Navbar expand="lg">
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="MediExpress-logo" className="MidiLogo" />
          </Navbar.Brand>
          {/* ***********mobile view icon start *****************/}
          <div className="d-flex">
            <Navbar className="mbl_view_serach_icons">
              <Nav className="navbar-icons">
                <Nav.Link className="searchbar-icon" ref={searchRef}>
                  <IoIosSearch
                    fontSize="24px"
                    onClick={() => setSearch(!search)}
                  />
                  {search && <SearchBar />}
                </Nav.Link>
                {isAuthenticated == true ? (
                  <Nav.Link
                    as={Link}
                    to="/account"
                    className={pathname === "/account" && "active"}
                  >
                    <AiOutlineUser fontSize="26px" />
                  </Nav.Link>
                ) : (
                  <NavDropdown title={<AiOutlineUser fontSize="26px" />}>
                    <NavDropdown.Item
                      as={Link}
                      to="/login"
                      className={pathname === "/login" && "active"}
                    >
                      Login
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/register"
                      className={pathname === "/register" && "active"}
                    >
                      Register
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar>
            <Navbar className="mbl_view_icons">
              <Nav className="navbar-icons">
                <Nav.Link className="searchbar-icon" ref={searchRef}>
                  <IoIosSearch
                    fontSize="24px"
                    onClick={() => setSearch(!search)}
                  />
                  {search && <SearchBar />}
                </Nav.Link>
                {isAuthenticated == true ? (
                  <Nav.Link
                    as={Link}
                    to="/account"
                    className={pathname === "/account" && "active"}
                  >
                    <AiOutlineUser fontSize="26px" />
                  </Nav.Link>
                ) : (
                  <NavDropdown title={<AiOutlineUser fontSize="26px" />}>
                    <NavDropdown.Item
                      as={Link}
                      to="/login"
                      className={pathname === "/login" && "active"}
                    >
                      Login
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/register"
                      className={pathname === "/register" && "active"}
                    >
                      Register
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                <Nav.Link
                  as={Link}
                  to="/order-tracking"
                  className={pathname === "/order-tracking" && "active"}
                >
                  <TbTruckDelivery fontSize="26px" />
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/wishlist"
                  className={`badge_icon_wrape ${
                    pathname === "/wishlist" && "active"
                  }`}
                >
                  <AiOutlineHeart fontSize="26px" />
                  <Badge className="badge_wrape">{wishCount}</Badge>
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/cart"
                  className={`badge_icon_wrape ${
                    pathname === "/cart" && "active"
                  }`}
                >
                  <BsCart2 fontSize="26px" />
                  <Badge className="badge_wrape">{cartCount}</Badge>
                </Nav.Link>
              </Nav>
            </Navbar>
            {/* ***********mobile view icon end*****************/}

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          </div>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                <img src={logo} alt="mediExpress-logo" width="90px" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="mx-auto navbar_link_list">
                <Nav.Link
                  as={Link}
                  to="/"
                  className={pathname === "/" && "active"}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/shop"
                  className={pathname === "/shop" && "active"}
                >
                  Shop
                </Nav.Link>
                {/* <Nav.Link
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={handleMouseEnter}
                  className="cat_drop_down_wrape"
                >
                  All Categories
                  {isOpen && (
                    <CategoryList
                      categorieslist={categoryData}
                      leaveEvent={handleMouseLeave}
                    />
                  )}
                </Nav.Link> */}
                <NavDropdown
                  title={"All Categories"}
                  className="cat_dropdown_wrap"
                >
                  {categoryData?.map((cat) => (
                    <NavDropdown.Item
                      key={cat?.id}
                      as={Link}
                      to={`/shop/${cat?.route}`}
                      className={pathname === `/shop/${cat?.route}` && "active"}
                    >
                      {cat?.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                {/* <DropDownMenu
                  title="All Categories"
                  id="collasible-nav-dropdown"
                  alignRight
                  className="mobile_cat_dropdown"
                >
                  {categoryData?.map((parentCat) =>
                    parentCat?.sub_category?.length > 0 ? (
                      <DropDownSubMenu
                        key={parentCat?.id}
                        href={`/shop/category=${parentCat?.route}`}
                        title={parentCat?.name}
                        className={
                          pathname === `/shop/category=${parentCat?.route}` &&
                          "active"
                        }
                      >
                        {parentCat?.sub_category?.map((subCat) =>
                          subCat?.child_category?.length > 0 ? (
                            <DropDownSubMenu
                              key={subCat?.id}
                              href={`/shop/sub_category=${subCat?.route}`}
                              title={subCat?.name}
                              className={
                                pathname ===
                                  `/shop/sub_category=${subCat?.route}` &&
                                "active"
                              }
                            >
                              {subCat?.child_category?.map((childCat) => (
                                <NavDropdown.Item
                                  key={childCat?.id}
                                  as={Link}
                                  to={`/shop/child_category=${childCat?.route}`}
                                  className={
                                    pathname ===
                                      `/shop/child_category=${childCat?.route}` &&
                                    "active"
                                  }
                                >
                                  {childCat?.name}
                                </NavDropdown.Item>
                              ))}
                            </DropDownSubMenu>
                          ) : (
                            <NavDropdown.Item
                              as={Link}
                              to={`/shop/sub_category=${subCat?.route}`}
                              className={
                                pathname ===
                                  `/shop/sub_category=${subCat?.route}` &&
                                "active"
                              }
                            >
                              {subCat?.name}
                            </NavDropdown.Item>
                          )
                        )}
                      </DropDownSubMenu>
                    ) : (
                      <NavDropdown.Item
                        as={Link}
                        to={`/shop/category=${parentCat?.route}`}
                        className={
                          pathname === `/shop/category=${parentCat?.route}` &&
                          "active"
                        }
                      >
                        {parentCat?.name}
                      </NavDropdown.Item>
                    )
                  )}
                </DropDownMenu> */}
                <Nav.Link
                  as={Link}
                  to="/promotions"
                  className={pathname === "/promotions" && "active"}
                >
                  Promotions
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/about"
                  className={pathname === "/about" && "active"}
                >
                  About Us
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/blog"
                  className={pathname === "/blog" && "active"}
                >
                  Blog
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/contact"
                  className={pathname === "/contact" && "active"}
                >
                  Contact Us
                </Nav.Link>
              </Nav>
              <Nav className="navbar-icons">
                <Nav.Link className="searchbar-icon" ref={searchRef}>
                  <IoIosSearch
                    fontSize="24px"
                    onClick={() => setSearch(!search)}
                  />
                  {search && <SearchBar />}
                </Nav.Link>
                {isAuthenticated == true ? (
                  <Nav.Link
                    as={Link}
                    to="/account"
                    className={pathname === "/account" && "active"}
                  >
                    <AiOutlineUser fontSize="26px" />
                  </Nav.Link>
                ) : (
                  <NavDropdown title={<AiOutlineUser fontSize="26px" />}>
                    <NavDropdown.Item
                      as={Link}
                      to="/login"
                      className={pathname === "/login" && "active"}
                    >
                      Login
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/register"
                      className={pathname === "/register" && "active"}
                    >
                      Register
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                <Nav.Link
                  as={Link}
                  to="/order-tracking"
                  className={pathname === "/order-tracking" && "active"}
                >
                  <TbTruckDelivery fontSize="26px" />
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/wishlist"
                  className={`badge_icon_wrape ${
                    pathname === "/wishlist" && "active"
                  }`}
                >
                  <AiOutlineHeart fontSize="26px" />
                  <Badge className="badge_wrape">{wishCount}</Badge>
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/cart"
                  className={`badge_icon_wrape ${
                    pathname === "/cart" && "active"
                  }`}
                >
                  <BsCart2 fontSize="26px" />
                  <Badge className="badge_wrape">{cartCount}</Badge>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
      </div>
    </>
  );
};
export default MainNavbar;
