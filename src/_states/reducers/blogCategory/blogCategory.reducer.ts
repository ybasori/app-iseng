import type { IAction } from "../../types";
import type { IBlogCategoryState } from "./blogCategory.type";

const initialState: IBlogCategoryState = {
  loading: false,
  response: null,
  error: null,
  page: {
    of: 1,
    size: 10,
  },
  sort: [
    {by:"created_at", order: "desc"}
  ],
  filter: {}
};
const blogCategory = (state = initialState, action?: IAction) => {
  const name = "blogCategory";
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

export default blogCategory;
