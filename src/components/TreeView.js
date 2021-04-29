import React, { useState, useEffect } from "react";
import { Tree, Row, Col } from "antd";
import { connect } from "react-redux";

const TreeView = (props) => {
  const [state, setState] = useState({
    flatTree: props.directories.map((node) => ({
      id: node.Id,
      key: node.Id,
      name: node.Name,
      title: node.Name,
      parentId: node.ParentId,
      children: [],
    })),
    hirarchicalTree: [],
    newNodeName: "",
    selectedId: 0,
  });

  const flatToHierarchy = (flat) => {
    var roots = [];
    var all = {};
    [...flat].forEach((item) => {
      all[item.id] = { ...item };
    });

    Object.keys(all).forEach((id) => {
      var item = all[id];
      if (item.parentId === null) {
        roots.push(item);
      } else if (item.parentId in all) {
        var p = all[item.parentId];
        if (!("children" in p)) {
          p.children = [];
        }
        p.children.push(item);
      }
    });
    return roots;
  };

  useEffect(() => {
    const hirarchicalTree = flatToHierarchy(state.flatTree);
    setState({ ...state, hirarchicalTree });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPath = (tree, nodesProp, prop, value) => {
    const path = [];
    const dfs = (tree, nodesProp, prop, value) => {
      let i,
        f = null;
      if (Array.isArray(tree)) {
        for (i = 0; i < tree.length; i++) {
          f = dfs(tree[i], nodesProp, prop, value);
          if (f) {
            path.unshift(tree[i].name);
            return f;
          }
        }
      } else if (typeof tree === "object") {
        if (tree[prop] !== undefined && tree[prop] === value) {
          return tree;
        }
      }
      if (tree[nodesProp] !== undefined && tree[nodesProp].length > 0) {
        return dfs(tree[nodesProp], nodesProp, prop, value);
      } else {
        return null;
      }
    };
    dfs(tree, nodesProp, prop, value);
    return path.join(" > ");
  };

  const handleOnSelect = (selectedKey, e) => {
    const selectedId = e.node.id;
    setState({ ...state, selectedId });
    const path = getPath(state.hirarchicalTree, "children", "id", e.node.id);
    if (props.handleOnSelect) {
      props.handleOnSelect(path);
    }
  };

  const handleOnDoubleClick = () => {
    const selectedId = state.selectedId;
    const path = getPath(state.hirarchicalTree, "children", "id", selectedId);
    if (props.handleOnDoubleClick && selectedId !== 0) {
      props.handleOnDoubleClick(selectedId, path);
    }
  };

  return (
    <React.Fragment>
      <Row style={{ width: "100%" }}>
        <Col style={{ width: "100%" }}>
          <Tree.DirectoryTree
            treeData={state.hirarchicalTree}
            onSelect={handleOnSelect}
            onDoubleClick={handleOnDoubleClick}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    directories: state.directoryReducers,
  };
};

export default connect(mapStateToProps, null)(TreeView);
