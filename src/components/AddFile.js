import React from "react";
import AddFileFrame from "./subs/AddFile/AddFileFrame";

const AddFile = () => {
  return (
    <React.Fragment>
      <div
        className="blockUI blockOverlay"
        style={{
          margin: 0,
          padding: 0,
          border: "currentColor",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          position: "fixed",
          zIndex: 1001,
          cursor: "default",
          opacity: "0.6",
          backgroundColor: "rgb(85, 85, 85)",
        }}
      />
      <div
        className="blockUI blockMsg blockPage"
        style={{
          margin: "-317px 0px 0px -432.5px",
          padding: 0,
          left: "50%",
          top: "50%",
          width: 865,
          height: 635,
          color: "rgb(0, 0, 0)",
          position: "absolute",
          zIndex: 1012,
          backgroundColor: "rgb(255, 255, 255)",
        }}
      >
        <div
          className="popup_layer_typeB"
          style={{ display: "block" }}
        >
          <AddFileFrame />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddFile;
