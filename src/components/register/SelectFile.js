import { useState } from "react";
import { Link } from "react-router-dom";
import { GetBackgroundIconFromExtension } from "components/common/GetBackgroundIconFromExtension";

const SelectFile = props => {
  const styles = props.styles;
  const key = props.file.key;

  const [fileName, setFileName] = useState(props.file.fileName);
  const [editFileName, setEditFileName] = useState(false);

  const handleChangeFileName = () => {
    const result = props.handleChangeFileName(key, fileName);
    if (result) setEditFileName(!editFileName);
  };

  const handleDeleteFile = () => {
    props.handleDeleteFile(key);
  };

  return (
    <li>
      <span
        className={styles.contentsNameView}
        style={editFileName ? { display: "none" } : { display: "block" }}>
        <Link
          to="#"
          className={styles.title}
          style={{
            width: "93%",
            overflow: "hidden",
            display: "block",
            whiteSpace: "nowrap",
            msTextOverflow: "ellipsis",
          }}>
          <span className={styles.contentsExtImage}>
            <img
              alt=""
              style={{ width: 16, height: 16 }}
              src={GetBackgroundIconFromExtension(fileName)}
            />
          </span>
          <span
            className={`${styles.contentsNameViewTitle} ${
              props.file.isValid ? null : styles.file_invalid
            }`}>
            {fileName}
          </span>
        </Link>
        <span className={styles.floatR}>
          <Link
            to="#"
            className={styles.btnChk}
            onClick={() => setEditFileName(!editFileName)}>
            <img
              alt=""
              src={require("assets/img/popup/ico/ico_contentList_edit.png").default}
            />
          </Link>
          {props.showDeleteButton ? (
            <Link to="#" className={styles.btnDel} onClick={handleDeleteFile}>
              <img
                alt=""
                src={require("assets/img/popup/ico/ico_contentList_del.png").default}
              />
            </Link>
          ) : null}
        </span>
      </span>
      <span
        className={styles.contentsNameEdit}
        style={editFileName ? { display: "block" } : { display: "none" }}>
        <span className={`${styles.title} ${styles.floatL}`}>
          <span className={styles.contentsExtImageEdit}>
            <img
              alt=""
              style={{ width: 16, height: 16 }}
              src={GetBackgroundIconFromExtension(fileName)}
            />
          </span>
          <input
            className={styles.contentsNameEditTitle}
            style={{ msImeMode: "active" }}
            type="text"
            size={100}
            defaultValue={fileName.substring(0, fileName.lastIndexOf("."))}
            onChange={e => setFileName(`${e.target.value}.${fileName.split(".").pop()}`)}
          />
        </span>
        <span className={styles.floatR}>
          <Link to="#" className={styles.btnChk} onClick={handleChangeFileName}>
            <img alt="" src={require("assets/img/popup/ico/ico_check.png").default} />
          </Link>
          {props.showDeleteButton ? (
            <Link to="#" className={styles.btnDel} onClick={handleDeleteFile}>
              <img
                alt=""
                src={require("assets/img/popup/ico/ico_contentList_del.png").default}
              />
            </Link>
          ) : null}
        </span>
      </span>
    </li>
  );
};

export default SelectFile;
