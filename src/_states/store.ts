import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth/auth.slice";
import { AuthState } from "./reducers/auth/auth.type";
import blogCategory from "./reducers/blogCategory/blogCategory.slice";
import { IBlogCategoryState } from "./reducers/blogCategory/blogCategory.type";
import { IBlogCommentState } from "./reducers/blogComment/blogComment.type";
import { IBlogContentState } from "./reducers/blogContent/blogContent.type";
import { IBlogTagState } from "./reducers/blogTag/blogTag.type";
import { NotifState } from "./reducers/notif/notif.type";
import { IPublicBlogContentState } from "./reducers/publicBlogContent/publicBlogContent.type";
import { IPublicBlogContentDetailState } from "./reducers/publicBlogContentDetail/publicBlogContentDetail.type";
import { RouteState } from "./reducers/route/route.type";
import blogComment from "./reducers/blogComment/blogComment.slice";
import blogContent from "./reducers/blogContent/blogContent.slice";
import blogTag from "./reducers/blogTag/blogTag.slice";
import notif from "./reducers/notif/notif.slice";
import publicBlogContent from "./reducers/publicBlogContent/publicBlogContent.slice";
import publicBlogContentDetail from "./reducers/publicBlogContentDetail/publicBlogContentDetail.slice";
import route from "./reducers/route/route.slice";

export interface RootState {
  auth: AuthState;
  blogCategory: IBlogCategoryState;
  blogComment: IBlogCommentState;
  blogContent: IBlogContentState;
  blogTag: IBlogTagState;
  notif: NotifState;
  publicBlogContent: IPublicBlogContentState;
  publicBlogContentDetail: IPublicBlogContentDetailState;
  route: RouteState;
}

export const store = configureStore({
  reducer: {
    auth,
    blogCategory,
    blogComment,
    blogContent,
    blogTag,
    notif,
    publicBlogContent,
    publicBlogContentDetail,
    route,
  },
  preloadedState: (
    window as unknown as Window & { __PRELOADED_STATE__: RootState }
  ).__PRELOADED_STATE__,
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
