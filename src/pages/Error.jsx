import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../sections/Error/error.scss";

export default function Error() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404 Not Found</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="The page you are looking for was moved, removed, renamed, or might never have existed."
        />
        <meta httpEquiv="status" content="404" />
      </Helmet>
      <div className="error-wrapper mtb-60">
        <div className="txt-wrapper">
          <h1>
            <span className="four">4</span>
            <span className="zero">0</span>
            <span className="four">4</span>
          </h1>
          <h2>Oops, something went wrong!</h2>
          <p>
            The page you are looking for was moved, removed, renamed or might
            never have existed.
          </p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Home
          </Button>
        </div>
      </div>
    </>
  );
}
