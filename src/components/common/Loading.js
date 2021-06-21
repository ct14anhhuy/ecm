const Loading = () => {
  return (
    <div>
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
          cursor: "pointer",
          opacity: "0.6",
          backgroundColor: "rgb(207, 207, 207)"
        }}
      />
      <div
        className="blockUI blockMsg blockPage"
        style={{
          margin: 0,
          padding: 0,
          width: "30%",
          textAlign: "center",
          transform: "translate(calc(50vw - 30%), calc(50vh - 30%))",
          color: "rgb(0, 0, 0)",
          position: "absolute",
          zIndex: 1012,
          cursor: "wait",
          backgroundColor: "rgb(255, 255, 255)"
        }}
      >
        <div
          className="loading_confirm"
          style={{
            border: "0px currentColor",
            visibility: "visible",
            position: "absolute",
            cursor: "default"
          }}
        >
          <p>
            <img
              width={32}
              height={32}
              alt="waiting"
              src={require("assets/img/common/custom_progress.gif").default}
            />
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
