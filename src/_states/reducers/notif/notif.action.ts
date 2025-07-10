import { Thunk } from "../../types";


const name = "notif"

export const notify = (
    title: string,
    text: string,
    timer: number,
  ): Thunk => {
    return async (dispatch) => {

        const newData = {
        id: new Date().getTime().toString(),
        title,
        text,
        hide: false
      }

      dispatch({ type: `${name}/CREATE`, payload: newData });

      
    await new Promise((resolve) => setTimeout(resolve, timer));
  
      dispatch({ type: `${name}/UPDATE`, payload: {...newData, hide: true} });
  
    };
  };
  
export const updateNotif = (
    payload: {id:string; title:string; text: string; hide: boolean}
): Thunk => {
    return async (dispatch) => {

      dispatch({ type: `${name}/UPDATE`, payload });
  
    };
  };