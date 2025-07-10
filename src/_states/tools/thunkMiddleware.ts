import type { Middleware, Thunk } from "../types";

export const thunkMiddleware: Middleware =
  (getState) => (next) => (action) => {
    if (typeof action === "function") {
      // Thunk receives dispatch + getState
      return (action as Thunk)(next, getState);
    }
    return next(action);
  };