import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const DataLoader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center ptb-60">
      <ClipLoader color={"#b97748"} size={40} />
    </div>
  );
};
export default DataLoader;
