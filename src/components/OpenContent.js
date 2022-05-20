import { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getFileUrlAction } from "store/fileUrl/actions";
import { changeShowOpenContentAction } from "store/systemParams/actions";

import styles from "assets/css/modules/OpenContent.module.css";

const OpenContent = props => {
  const { editUrl, viewUrl } = props.fileUrl;
  const { getFileUrl } = props;
  const { selectedItem } = props.systemParams;

  const actions = {
    EDIT: "Edit",
    VIEW: "View",
  };

  useEffect(() => {
    getFileUrl(selectedItem.id);
  }, [getFileUrl, selectedItem.id]);

  const handleLinkClick = e => {
    const action = e.target.innerText;
    const link = document.createElement("a");
    switch (action) {
      case actions.EDIT:
        link.href = `ECMProtocol: ${editUrl}`;
        break;
      case actions.VIEW:
        link.href = `ECMProtocol: ${viewUrl}`;
        break;
      default:
        return;
    }
    link.click();
    link.remove();
    props.changeShowOpenContent();
  };

  return (
    <Fragment>
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
          opacity: 0.6,
          backgroundColor: "rgb(85, 85, 85)",
        }}></div>
      <div
        className="blockUI blockMsg blockPage"
        style={{
          margin: 0,
          padding: 0,
          width: 600,
          height: 165,
          color: "rgb(0, 0, 0)",
          position: "fixed",
          zIndex: 1012,
          cursor: "wait",
          backgroundColor: "rgb(255, 255, 255)",
        }}>
        <div
          className="popup_layer_typeB"
          style={{ display: "block", cursor: "default" }}>
          <div className={styles.popLayerWrap}>
            <div className={styles.header}>
              <h1 className={styles.tit}>Open Content</h1>
              <Link to="#" className={styles.close} onClick={props.changeShowOpenContent}>
                <img
                  alt=""
                  src={require("assets/img/contents/ecmMain/img_close.gif").default}
                />
              </Link>
            </div>
            <div className={styles.contents}>
              <div className={styles.columnBoxs} style={{ marginBottom: 10 }}>
                <table className={styles.normalPopTb}>
                  <colgroup>
                    <col width={150} />
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th style={{ width: 150 }}>File Name</th>
                      <td style={{ msWordBreak: "break-all" }}>
                        <div className={styles.conText}>
                          <span>{selectedItem.name}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className={styles.btnBox}>
                {editUrl ? (
                  <span onClick={handleLinkClick}>{actions.EDIT}</span>
                ) : (
                  <span className={styles.grayB}>{actions.EDIT}</span>
                )}
                <span onClick={handleLinkClick}>{actions.VIEW}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    fileUrl: state.fileUrlReducers,
    systemParams: state.systemParamsReducers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFileUrl: id => dispatch(getFileUrlAction(id)),
    changeShowOpenContent: () => dispatch(changeShowOpenContentAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenContent);
