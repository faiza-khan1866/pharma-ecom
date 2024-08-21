import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Loader = () => {
  return (
    <>
      <div
        className={`d-flex align-items-center justify-content-center`}
        style={{
          position: "absolute",
          zIndex: 99999,
          height: "100%",
          width: "100%",
          background: "rgba(7, 104, 92, 1)",
        }}
      >
        <PulseLoader color={"#b97748"} size={20} />
      </div>
    </>
  );
};
export default Loader;
