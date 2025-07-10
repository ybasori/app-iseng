import type { IAction } from "../../types";
import type { NotifState } from "./notif.type";


const initialState:NotifState = { notifications: [], }
const notif = (state=initialState, action?:IAction) => {
  const name = "notif";
    switch (action?.type) {
      case `${name}/CREATE`:
        return { ...state, notifications: [...state.notifications, action.payload] };
      case `${name}/UPDATE`:
        return { ...state, notifications: state.notifications.map((item)=>action.payload.id === item.id?({...item, ...action.payload}): item) };
      case `${name}/DELETE`:
        return { ...state, notifications: state.notifications.filter((item)=>action.payload.id !== item.id) };
      default:
        return state;
    }
  };

  export default notif;
