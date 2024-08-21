import React from "react";
import DataLoader from "./DataLoader";

const PagesLoader = ({ isLoading, children }) => {
  return isLoading ? <DataLoader /> : children;
};

export default PagesLoader;
