import { Extensions } from "constants/extTypes";

export const GetBackgroundIconFromExtension = fileName => {
  const extension = fileName.split(".").pop().toLowerCase();
  if (Extensions.WORD_EXTS.includes(extension)) {
    return require("assets/img/main/ico/ico_doc_on.png").default;
  } else if (Extensions.EXCEL_EXTS.includes(extension)) {
    return require("assets/img/main/ico/ico_xlsx_on.png").default;
  } else if (Extensions.POWERPOINT_EXTS.includes(extension)) {
    return require("assets/img/main/ico/ico_ppt_on.png").default;
  } else if (Extensions.IMAGE_EXTS.includes(extension)) {
    return require("assets/img/main/ico/ico_img_on.png").default;
  } else if (Extensions.PDF_EXTS.includes(extension)) {
    return require("assets/img/main/ico/ico_pdf_on.png").default;
  } else if (Extensions.CAD_EXTS.includes(extension)) {
    return require("assets/img/main/ico/ico_cad_on.png").default;
  } else if (Extensions.VIDEO_EXTS.includes(extension)) {
    return require("assets/img/main/ico/ico_tv_on.png").default;
  } else {
    return require("assets/img/main/ico/ico_all_on.png").default;
  }
};
