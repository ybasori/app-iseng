import { router } from "@src/config/config";
import { Thunk } from "../../types";
import { match } from 'path-to-regexp';


const name = "route"

export const navigate = (
    path: string
  ): Thunk => {
    return async (dispatch) => {
      window.history.pushState({}, '', path);

      
      
          let matchPath= "/404";
          let matchRoute= null;
      
          for(let i=0; i<Object.keys(router).length; i++){
            const matcher = match(Object.keys(router)[i]);
            const result = matcher(path);
      
            if (!!result) {
              matchPath = Object.keys(router)[i];
              i = Object.keys(router).length;
              matchRoute = {...result};
            }
          }
      
          const nice=router[matchPath as keyof typeof router];
      
      
      dispatch({ type: `${name}/NAVIGATE`, payload: {current: path, ...nice} });
  
  
    };
  };