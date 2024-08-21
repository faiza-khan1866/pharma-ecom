import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
// import { Slider } from "antd";
import { Rate } from "antd";
import { fetchCategoryData } from "../../../http/apiService";
import "./ProductSidebar.scss";
import { useLocation, useParams } from "react-router-dom";

const ratingData = [
  {
    id: 1,
    rating: 5,
  },
  {
    id: 2,
    rating: 4.5,
  },
  {
    id: 3,
    rating: 4,
  },
  {
    id: 4,
    rating: 3.5,
  },
  {
    id: 5,
    rating: 3,
  },
  {
    id: 6,
    rating: 2.5,
  },
  {
    id: 7,
    rating: 2,
  },
  {
    id: 8,
    rating: 1,
  },
];

const ProductSidebar = ({
  filterPriceData,
  handleFilterByRating,
  currency_code,
  categoriesList,
  filterCategoryData,
  filterProductData,
}) => {
  const { pathname } = useLocation();
  const { cat } = useParams();
  const [subCategoriesList, setSubCategoriesList] = useState([]);

  useEffect(() => {
    const fetchSubCatListData = async () => {
      try {
        const response = await fetchCategoryData();
        setSubCategoriesList(
          response?.data?.find((val) => val.route === cat)?.sub_category
        );
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchSubCatListData();
  }, [cat]);

  // category checkbox
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (e) => {
    const categoryRoute = e.target.value;
    setSelectedCategory((prevSelectedCategory) => {
      // If the clicked checkbox was already selected, unselect it
      if (prevSelectedCategory === categoryRoute) {
        filterCategoryData(null); // Set filterCategoryData to null or an appropriate value
        return null;
      }
      // Otherwise, select the clicked checkbox
      filterCategoryData(categoryRoute); // Set filterCategoryData to the selected brandRoute
      return categoryRoute;
    });
  };

  // Sub-Cat checkbox
  const [selectedFilterValue, setSelectedFilterValue] = useState(null);

  const handleFilterChange = (e, paramVal) => {
    const itemRoute = e.target.value;
    setSelectedFilterValue((prevSelectedValue) => {
      // If the clicked checkbox was already selected, unselect it
      if (prevSelectedValue === itemRoute) {
        filterProductData(null); // Set filterProductData to null or an appropriate value
        return null;
      }
      // Otherwise, select the clicked checkbox
      filterProductData(itemRoute, paramVal); // Set filterProductData to the selected brandRoute
      return itemRoute;
    });
  };

  // const [min, setMin] = useState(10);
  // const [max, setMax] = useState(1000);

  // const handleChangeRange = (value) => {
  //   setMin(value[0]);
  //   setMax(value[1]);
  //   filterPriceData(value[0], value[1]);
  // };

  // price fileds

  const [rangeValues, setRangeValues] = useState([10, 50000]);
  const [israngeValues, setIsRangeValues] = useState(false);

  const handleRangeCustomChange = (e) => {
    setIsRangeValues(true);
    let currentRange = [...rangeValues];
    currentRange[`${e.target.name}`] = e.target.value;
    if (/^[0-9]*$/.test(e.target.value)) {
      setRangeValues(currentRange);
    }
  };

  const handleRangeFilter = () => {
    filterPriceData(rangeValues[0], rangeValues[1]);
    // navigate(`/shop/${cat}?price=AED${rangeValues[0]}-AED${rangeValues[1]}`);
  };

  // Rating checkbox

  const [selectedRating, setSelectedRating] = useState(null);

  const handleRatingChange = (e) => {
    const RatingCount = Number(e.target.value);
    setSelectedRating((prevSelectedBrand) => {
      // If the clicked checkbox was already selected, unselect it
      if (prevSelectedBrand === RatingCount) {
        handleFilterByRating(null); // Set filterBrandData to null or an appropriate value
        return null;
      }
      // Otherwise, select the clicked checkbox
      handleFilterByRating(RatingCount); // Set filterBrandData to the selected RatingCount
      return RatingCount;
    });
  };

  return (
    <div className="product_sidebar_wrape">
      {pathname === "/shop"
        ? categoriesList?.length > 0 && (
            <div className="brand_wrape">
              <h3 data-aos="fade-down" data-aos-once="true">
                By Category
              </h3>
              <Form className="brand_list">
                {categoriesList?.map((x) => (
                  <Form.Check
                    key={x?.id}
                    type="checkbox"
                    label={x?.name}
                    value={x?.route}
                    checked={selectedCategory === x?.route}
                    onChange={handleCategoryChange}
                    data-aos="fade-down"
                    data-aos-once="true"
                  />
                ))}
              </Form>
            </div>
          )
        : subCategoriesList?.length > 0 && (
            <div className="brand_wrape">
              <h3 data-aos="fade-down" data-aos-once="true">
                By Sub-Category
              </h3>
              <Form className="brand_list">
                {subCategoriesList?.map((subcat) => (
                  <>
                    <Form.Check
                      key={subcat?.id}
                      type="checkbox"
                      label={subcat?.name}
                      value={subcat?.route}
                      checked={selectedFilterValue === subcat?.route}
                      onChange={(e) => handleFilterChange(e, "sub_category")}
                      data-aos="fade-down"
                      data-aos-once="true"
                    />
                    {subcat?.child_category?.length > 0 &&
                      subcat?.child_category?.map((childcat) => (
                        <Form.Check
                          key={childcat?.id}
                          type="checkbox"
                          label={childcat?.name}
                          value={childcat?.route}
                          checked={selectedFilterValue === childcat?.route}
                          onChange={(e) =>
                            handleFilterChange(e, "child_category")
                          }
                          data-aos="fade-down"
                          data-aos-once="true"
                          className="child_cat_list"
                        />
                      ))}
                  </>
                ))}
              </Form>
            </div>
          )}
      <div className="price_wrape">
        <h3 data-aos="fade-down" data-aos-once="true">
          By Price
        </h3>
        <div className="price_range" data-aos="fade-down" data-aos-once="true">
          <div className="input_range">
            <input
              text
              value={rangeValues[0]}
              className="form-control"
              name="0"
              onChange={(e) => handleRangeCustomChange(e)}
            />{" "}
            —{" "}
            <input
              text
              value={rangeValues[1]}
              className="form-control"
              name="1"
              onChange={(e) => handleRangeCustomChange(e)}
            />
          </div>
          {currency_code ? (
            <p>
              Price: {currency_code} {rangeValues[0]} — {currency_code}{" "}
              {rangeValues[1]}
            </p>
          ) : (
            <p>
              Price: $ {rangeValues[0]} — $ {rangeValues[1]}
            </p>
          )}
          {israngeValues ? (
            <Button className="filter_button" onClick={handleRangeFilter}>
              Filter
            </Button>
          ) : null}
          {/* <Slider
            range
            defaultValue={[10, 1000]}
            max={1000}
            onAfterChange={(e) => handleChangeRange(e)}
          />
          {currency_code ? (
            <p>
              Price: {currency_code} {min} - {currency_code} {max}
            </p>
          ) : (
            <p>
              Price: $ {min} - $ {max}
            </p>
          )} */}
        </div>
      </div>
      <div className="rating_wrape">
        <h3 data-aos="fade-down" data-aos-once="true">
          By Rating
        </h3>
        {ratingData?.map((x, i) => (
          <div
            className="rating_list"
            data-aos="fade-down"
            data-aos-once="true"
          >
            <Form.Check
              key={i}
              type="checkbox"
              value={x?.rating}
              checked={selectedRating === x?.rating}
              onChange={handleRatingChange}
            />
            <Rate
              allowHalf
              disabled
              defaultValue={x?.rating}
              className="rat_icon"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSidebar;
