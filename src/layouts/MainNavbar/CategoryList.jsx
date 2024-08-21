import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// const CategoryList = ({ categorieslist, leaveEvent }) => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState(0);

//   const openCatTab = (catName) => {
//     setActiveTab(catName);
//   };

//   useEffect(() => {
//     AOS.init();
//   }, [activeTab]);

//   return (
//     <div
//       className="category_list_wraper"
//       onMouseLeave={leaveEvent}
//       data-aos="zoom-in-up"
//       data-aos-once="true"
//     >
//       <div className="category_tabs">
//         {categorieslist?.map((parentCat, i) => (
//           <button
//             key={i}
//             // className={`tablinks ${activeTab === i ? "active" : ""}`}
//             className={`tablinks ${
//               pathname === `/shop/category=${parentCat?.route}` && "active"
//             }`}
//             onMouseOver={() => openCatTab(i)}
//             onClick={() => {
//               navigate(`/shop/category=${parentCat?.route}`);
//               leaveEvent();
//             }}
//           >
//             {parentCat?.name}
//           </button>
//         ))}
//       </div>
//       {categorieslist?.map((parentCat, i) => (
//         <div
//           key={i}
//           id={i}
//           className={`category_tab_content ${activeTab === i ? "active" : ""}`}
//           data-aos="fade-up"
//           data-aos-once="true"
//         >
//           <Container fluid>
//             <Row className="subCat_list">
//               {parentCat?.sub_category?.map((subCat, i) => (
//                 <Col sm={4} key={i}>
//                   <h3
//                     onClick={() => {
//                       navigate(`/shop/sub_category=${subCat?.route}`);
//                       leaveEvent();
//                     }}
//                     className={`subcat_title ${
//                       pathname === `/shop/sub_category=${subCat?.route}` &&
//                       "active"
//                     }`}
//                   >
//                     {subCat?.name}
//                   </h3>
//                   <ul className="childCat_list">
//                     {subCat?.child_category?.map((childCat, i) => (
//                       <li
//                         key={i}
//                         onClick={() => {
//                           navigate(`/shop/child_category=${childCat?.route}`);
//                           leaveEvent();
//                         }}
//                         className={
//                           pathname ===
//                             `/shop/child_category=${childCat?.route}` &&
//                           "active"
//                         }
//                       >
//                         {childCat?.name}
//                       </li>
//                     ))}
//                   </ul>
//                 </Col>
//               ))}
//             </Row>
//           </Container>
//         </div>
//       ))}
//     </div>
//   );
// };

const CategoryList = ({ categorieslist, leaveEvent }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  const handleCategoryHover = (index) => {
    setActiveCategory(index);
    setActiveSubCategory(null); // Reset subcategory when category changes
  };

  const handleSubCategoryHover = (index) => {
    setActiveSubCategory(index);
  };

  const handleSubCategoryLeave = () => {
    setActiveSubCategory(null);
  };

  const [activeTab, setActiveTab] = useState(0);

  const openCatTab = (catName) => {
    setActiveTab(catName);
  };

  useEffect(() => {
    AOS.init();
  }, [activeTab]);

  return (
    <div
      className="new_cat_comp"
      onMouseLeave={leaveEvent}
      data-aos="zoom-in-up"
      data-aos-once="true"
    >
      {categorieslist?.map((parentCat, i) => (
        <Container fluid key={i}>
          <Row>
            <Col sm={12}>
              <h2
                onClick={() => {
                  navigate(`/shop/category=${parentCat?.route}`);
                  leaveEvent();
                }}
                onMouseEnter={() => handleCategoryHover(i)}
                className={`${
                  pathname === `/shop/category=${parentCat?.route}` && "active"
                }`}
              >
                {parentCat?.name}{" "}
                {parentCat?.sub_category?.length !== 0 && (
                  <MdOutlineKeyboardArrowDown />
                )}
              </h2>
            </Col>
            {activeCategory === i &&
              parentCat?.sub_category?.map((subCat, j) => (
                <Col
                  sm={12}
                  key={j}
                  onMouseEnter={() => handleSubCategoryHover(j)}
                  onMouseLeave={() => handleSubCategoryLeave(j)}
                >
                  <h3
                    onClick={() => {
                      navigate(`/shop/sub_category=${subCat?.route}`);
                      leaveEvent();
                    }}
                    className={`${
                      pathname === `/shop/sub_category=${subCat?.route}` &&
                      "active"
                    }`}
                  >
                    {subCat?.name}{" "}
                    {subCat?.child_category?.length !== 0 && (
                      <MdOutlineKeyboardArrowDown />
                    )}
                  </h3>
                  {activeSubCategory === j && (
                    <ul className="childCat_list">
                      {subCat?.child_category?.map((childCat, i) => (
                        <li
                          key={i}
                          onClick={() => {
                            navigate(`/shop/child_category=${childCat?.route}`);
                            leaveEvent();
                          }}
                          className={
                            pathname ===
                              `/shop/child_category=${childCat?.route}` &&
                            "active"
                          }
                        >
                          {childCat?.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </Col>
              ))}
          </Row>
        </Container>
      ))}
    </div>
  );
};

export default CategoryList;
