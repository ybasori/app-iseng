import type { IAction } from "../../types";
import type { AuthState } from "./auth.type";


const initialState:AuthState = { userData: null, }
const auth = (state=initialState, action?:IAction) => {
  const name = "auth";
    switch (action?.type) {
      case `${name}/LOGIN`:
        return { ...state, userData: action.payload };
      case `${name}/LOGOUT`:
        return { ...state, userData: null };
      default:
        return state;
    }
  };

  export default auth;