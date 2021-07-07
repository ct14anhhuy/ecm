import * as exts from "utils/extTypes";

export const GetBackgroundIconFromExtension = fileName => {
  const extension = fileName.split(".").pop().toLowerCase();
  if (exts.WORD.includes(extension)) {
    return require("assets/img/main/ico/ico_doc_on.png").default;
  } else if (exts.EXCEL.includes(extension)) {
    return require("assets/img/main/ico/ico_xlsx_on.png").default;
  } else if (exts.POWERPOINT.includes(extension)) {
    return require("assets/img/main/ico/ico_ppt_on.png").default;
  } else if (exts.IMAGE.includes(extension)) {
    return require("assets/img/main/ico/ico_img_on.png").default;
  } else if (exts.PDF.includes(extension)) {
    return require("assets/img/main/ico/ico_pdf_on.png").default;
  } else if (exts.CAD.includes(extension)) {
    return require("assets/img/main/ico/ico_cad_on.png").default;
  } else {
    return require("assets/img/main/ico/ico_all_on.png").default;
  }
};
