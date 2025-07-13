import type { IAction } from "../../types";
import type { IPublicBlogContentState } from "./publicBlogContent.type";

const initialState: IPublicBlogContentState = {
  loading: false,
  response: null,
  error: null,
  page: {
    of: 1,
    size: 5,
  },
  sort: [
    {by:"created_at", order: "desc"}
  ],
  filter: {}
};
const publicBlogContent = (state = initialState, action?: IAction) => {
  const name = "publicBlogContent";
  switch (action?.type) {
    case `${name}/LOADING`:
      return {
        ...state,
        loading: true,
      };
    case `${name}/SUCCESS`:
      return { ...state, loading: false, response: action.payload };
    case `${name}/ERROR`:
      return { ...state, loading: false, error: action.payload };
    case `${name}/ADD`:
      return {
        ...state,
        loading: false,
        response: {
          ...state.response,
          ...(!!state.response
            ? {
                result: {
                  ...state.response.result,
                  data: [...state.response.result.data, action.payload],
                },
              }
            : {}),
        },
      };
    case `${name}/SET_PAGE`:
      return { ...state, page: action.payload };
    case `${name}/SET_SORT`:
      return { ...state, sort: action.payload };
    case `${name}/SET_FILTER`:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

export default publicBlogContent;
