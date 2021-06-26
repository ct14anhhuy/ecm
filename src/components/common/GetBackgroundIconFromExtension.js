const GetBackgroundIconFromExtension = ({ fileName }) => {
  let extension = fileName.split(".").pop().toLowerCase();
  let img = (
    <img
      alt=""
      style={{ width: 16, height: 16 }}
      src={require("assets/img/main/ico/ico_all_on.png").default}
    />
  );
  if (extension === "doc" || extension === "docx") {
    img = (
      <img
        alt=""
        style={{ width: 16, height: 16 }}
        src={require("assets/img/main/ico/ico_doc_on.png").default}
      />
    );
  } else if (
    extension === "xls" ||
    extension === "xlt" ||
    extension === "xlsx" ||
    extension === "xlsm" ||
    extension === "xlsb" ||
    extension === "xltx" ||
    extension === "xltm" ||
    extension === "csv"
  ) {
    img = (
      <img
        alt=""
        style={{ width: 16, height: 16 }}
        src={require("assets/img/main/ico/ico_xlsx_on.png").default}
      />
    );
  } else if (extension === "ppt" || extension === "pptx") {
    img = (
      <img
        alt=""
        style={{ width: 16, height: 16 }}
        src={require("assets/img/main/ico/ico_ppt_on.png").default}
      />
    );
  } else if (
    extension === "jpg" ||
    extension === "gif" ||
    extension === "png" ||
    extension === "jpeg"
  ) {
    img = (
      <img
        alt=""
        style={{ width: 16, height: 16 }}
        src={require("assets/img/main/ico/ico_img_on.png").default}
      />
    );
  } else if (extension === "pdf") {
    img = (
      <img
        alt=""
        style={{ width: 16, height: 16 }}
        src={require("assets/img/main/ico/ico_pdf_on.png").default}
      />
    );
  }
  return img;
};

export default GetBackgroundIconFromExtension;
