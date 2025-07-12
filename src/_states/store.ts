import { combineReducers } from "./tools/combineReducers";
import type { IAction } from "./types";
import counter from "./reducers/counter/counter.reducer";
import auth from "./reducers/auth/auth.reducer";
import route from "./reducers/route/route.reducer";
import notif from "./reducers/notif/notif.reducer";
import blogContent from "./reducers/blogContent/blogContent.reducer";
import blogCategory from "./reducers/blogCategory/blogCategory.reducer";
import blogTag from "./reducers/blogTag/blogTag.reducer";





export const rootReducer = combineReducers<IAction>({
  counter,
  auth,
  route,
  notif,
  blogContent,
  blogCategory,
  blogTag
});