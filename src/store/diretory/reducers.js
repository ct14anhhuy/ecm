import * as types from './types'
import { directory } from "../../mock/directory";

const directoryReducers = (state = directory, action)=>{
    switch (action.type) {
        case types.GET_ALL:
            return state;
        default:
            return state
    }
}

export default directoryReducers;