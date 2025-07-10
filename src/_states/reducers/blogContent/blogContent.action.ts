import { Thunk } from "@src/_states/types";
import { expandJSON } from "@src/helper/helper";

const name = "blogContent";

export const fetchBlogContent = (pagination:{page:{of:number;size:number}}, sort:{by:string; order: "asc"|"desc"}[]): Thunk => {
  return async (dispatch) => {

    const query = expandJSON({...pagination, sort}).map((item)=>`${item.label}=${item.value}`).join("&")
    dispatch({
      type: `${name}/LOADING`,
    });
    fetch(`/api/blog/content?${query}`, {
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
