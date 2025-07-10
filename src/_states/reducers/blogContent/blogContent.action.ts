import { Thunk } from "@src/_states/types";

const name = "blogContent";

export const fetchBlogContent = (): Thunk => {
  return async (dispatch) => {
    dispatch({
      type: `${name}/LOADING`,
    });
    fetch("/api/blog/content", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({
          type: `${name}/SUCCESS`,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: `${name}/ERROR`,
          payload: err,
        });
      });
  };
};

export const addBlogContent = (data:{title:string;content:string}):Thunk=>{
    return (dispatch)=>{
        dispatch({
          type: `${name}/ADD`,
          payload: data
        })
    }
}
