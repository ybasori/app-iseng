import { createContext, useContext, useReducer, useRef } from "react";
import { applyMiddleware } from "@src/_states/tools/applyMiddleware";
import { rootReducer } from "@src/_states/store";
import type { IDispatch } from "@src/_states/types";
import { thunkMiddleware } from "@src/_states/tools/thunkMiddleware";


export const StateManagement = createContext<any>(undefined);
export const ActionManagement = createContext<IDispatch>(()=>{});

export const useSelector = ()=> useContext(StateManagement);
export const useDispatch = ()=> useContext(ActionManagement);

const GlobalState:React.FC<{children:React.ReactNode}> = ({children}) => {
    
    const getInitialState = () => {
        if (typeof window !== "undefined" && (window as unknown as (Window & {__PRELOADED_STATE__: any})).__PRELOADED_STATE__) {
          return {...rootReducer(), ...(window as unknown as (Window & {__PRELOADED_STATE__: any})).__PRELOADED_STATE__, };
        }
        return rootReducer();
      };
      
    const [state, dispatch] = useReducer(rootReducer, getInitialState());
  
const enhancedDispatch = useRef<IDispatch>(undefined);

if (!enhancedDispatch.current) {
  enhancedDispatch.current = applyMiddleware(dispatch, ()=> state, [
    thunkMiddleware,
    // add more middleware here
  ]);
}
  
    return (
        <StateManagement.Provider value={state}>
      <ActionManagement.Provider value={enhancedDispatch.current}>
      {children}
      </ActionManagement.Provider>
      </StateManagement.Provider>
    )
}

export default GlobalState