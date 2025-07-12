// import { router } from "@src/config/config";
import { Thunk } from "../../types";
// import { match } from 'path-to-regexp';


// const name = "route"

export const navigate = (
    path: string
  ): Thunk => {
    return async () => {
      window.history.pushState({}, '', path);
    };
  };