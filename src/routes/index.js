import { store } from "store/configureStore";
import {
  ROUTE_DEPARTMENT_CONTENTS,
  ROUTE_DIRECTORY_PATH,
  ROUTE_FAVORITE_CONTENTS,
  ROUTE_IMPORTANT_CONTENTS,
  ROUTE_MY_CONTENTS,
  ROUTE_SHARED_CONTENTS,
  ROUTE_TRASH_CONTENTS,
} from "constants/routePaths";
import {
  getMyContentsAction,
  getImportantContentsAction,
  getFavoriteContentsAction,
  getSharedContentsAction,
  getDepartmentContentsAction,
  getTrashContentsAction,
  getContentsFromPathAction,
} from "store/fileInfo/actions";

export const route = (path, dirId, page, directories) => {
  switch (path) {
    case ROUTE_MY_CONTENTS:
      store.dispatch(getMyContentsAction(page));
      break;
    case ROUTE_IMPORTANT_CONTENTS:
      store.dispatch(getImportantContentsAction(page));
      break;
    case ROUTE_FAVORITE_CONTENTS:
      store.dispatch(getFavoriteContentsAction(page));
      break;
    case ROUTE_SHARED_CONTENTS:
      store.dispatch(getSharedContentsAction(page));
      break;
    case ROUTE_DEPARTMENT_CONTENTS:
      store.dispatch(getDepartmentContentsAction(page));
      break;
    case ROUTE_TRASH_CONTENTS:
      store.dispatch(getTrashContentsAction(page));
      break;
    case ROUTE_DIRECTORY_PATH:
      const validId = directories.filter(x => dirId.includes(x.id));
      if (validId.length > 0) {
        store.dispatch(getContentsFromPathAction(dirId, page));
      }
      break;
    default:
      break;
  }
};
