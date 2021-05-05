const GetBackgroundIconFromExtension = ({ fileName }) => {
  let extension = fileName.split(".").pop();
  if (extension === "doc" || extension === "docx") {
    return (
      <img
        alt=""
        style={{ width: 16, height: 16 }}
        src={require("../../assets/img/main/ico/ico_doc_on.png").default}
      />
    );
  } else if (
    extension === "xls" ||
    extension === "xlsx" ||
    extension === "xlsm" ||
    extension === "csv"
  ) {
    return (
      <img
        alt=""
        style={{ width: 16, height: 16 }}
        src={require("../../assets/img/main/ico/ico_xlsx_on.png").default}
      />
    );
  } else if (extension === "ppt" || extension === "pptx") {
    return (
      <img
        alt=""
        style={{ width: 16, height: 16 }}
        src={require("../../assets/img/main/ico/ico_ppt_on.png").default}
      />
    );
  } else if (
    extension === "jpg" ||
    extension === "gif" ||
    extension === "png" ||
    extension === "jpeg"
  ) {
    return (
      <img
        alt=""
        style={{ width: 16, height: 16 }}
        src={require("../../assets/img/main/ico/ico_img_on.png").default}
      />
    );
  } else if (extension === "pdf") {
    return (
      <img
        alt=""
        style={{ width: 16, height: 16 }}
        src={require("../../assets/img/main/ico/ico_pdf_on.png").default}
      />
    );
  }
  return (
    <img
      alt=""
      style={{ width: 16, height: 16 }}
      src={require("../../assets/img/main/ico/ico_all_on.png").default}
    />
  );
};

export default GetBackgroundIconFromExtension;
