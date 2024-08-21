import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import { fetchHeaderSearchData } from "../../http/apiService";
import DataLoader from "../../components/Loader/DataLoader";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [queryList, setQueryList] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputQuerySearch = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const getQueryData = async () => {
    let formData = {
      query: query,
    };
    try {
      setIsLoading(true); // Show the loader
      const { data } = await fetchHeaderSearchData(formData);
      setQueryList(data);
    } catch (error) {
      console.error("Error fetching Data:", error);
    } finally {
      setIsLoading(false); // Hide the loader
    }
  };

  useEffect(() => {
    if (query.length > 3) {
      getQueryData();
    }
  }, [query]);

  return (
    <div className="search-content">
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            type="text"
            placeholder={"Search ..."}
            onChange={inputQuerySearch}
            value={query}
          />
          <button type="button" className="button-search">
            <IoIosSearch fontSize="24px" />
          </button>
        </div>
        {isLoading ? (
          <DataLoader />
        ) : (
          query !== "" &&
          query?.length >= 3 && (
            <Container fluid className="mt-3 search_container">
              <Row className="gy-2 gy-lg-0">
                <Col sm={6}>
                  <h3>Products</h3>
                  {queryList?.products?.length > 0 ? (
                    queryList?.products?.map((x, i) => (
                      <p key={i}>
                        <Link to={`/product/${x?.route}`}>{x?.name}</Link>
                      </p>
                    ))
                  ) : (
                    <p className="note_style">No Product Found !!!</p>
                  )}
                </Col>
                <Col sm={6}>
                  <h3>Category</h3>
                  {queryList?.category ? (
                    <p>
                      <Link to={`/shop/${queryList?.category?.route}`}>
                        {queryList?.category?.name}
                      </Link>
                    </p>
                  ) : (
                    <p className="note_style">No Category Found !!!</p>
                  )}
                </Col>
              </Row>
            </Container>
          )
        )}
      </form>
    </div>
  );
};

export default SearchBar;
