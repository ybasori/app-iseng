import type { AuthState } from "../reducers/auth/auth.type";
import type { CounterState } from "../reducers/counter/counter.type";

export interface IAction {
    type?:string;payload?:any
  }
export  type IDispatch = (action: IAction | Thunk) => void;

export type Middleware = (
    getState: () => any
  ) => (next: IDispatch) => IDispatch;

export type Thunk = (
    dispatch: IDispatch,
    getState: () => any
  ) => void;


export interface AppState {
    counter: CounterState;
    auth: AuthState;
  }
  