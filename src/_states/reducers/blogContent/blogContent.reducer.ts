import type { IAction } from "../../types";
import type { IBlogContentState } from "./blogContent.type";

const initialState: IBlogContentState = {
  loading: false,
  response: null,
  error: null,
};
const blogContent = (state = initialState, action?: IAction) => {
  const name = "blogContent";
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
    default:
      return state;
  }
};

export default blogContent;
