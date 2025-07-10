import type { IAction } from "../../types";
import type { RouteState } from "./route.type";


const initialState: RouteState = {
  current: "",
  name: "",
  isProtected: false,
  Template: null,
  component: null
}
const route = (state = initialState, action?: IAction) => {
  const name = "route";
  switch (action?.type) {
    case `${name}/NAVIGATE`:
      return {
        ...state,
        current: "",
        name: "",
        isProtected: false,
        Template: null,
        component: null, ...action.payload
      };
    case `${name}/UPDATE_NAME`:
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

export default route;