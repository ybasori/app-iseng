import type { IAction, IDispatch, Middleware } from "../types";

export function applyMiddleware(
    dispatch: (action:IAction)=>void,
    getState: () => any,
    middlewares: Middleware[]
  ) {
    return middlewares
      .map((mw) => mw(getState))
      .reduceRight((next, mw) => mw(next as IDispatch), dispatch as IDispatch);
  }