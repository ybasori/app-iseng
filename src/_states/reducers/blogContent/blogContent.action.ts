import { Thunk } from "@src/_states/types";
import { expandJSON } from "@src/helper/helper";

const name = "blogContent";

export const fetchBlogContent = (page:{of:number;size:number}, sort:{by:string; order: "asc"|"desc"}[]): Thunk => {
  return async (dispatch) => {

    const query = expandJSON({page, sort}).map((item)=>`${item.label}=${item.value}`).join("&")
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

export const setPage = (page:{of:number;size:number}):Thunk => (dispatch)=> {
        dispatch({
          type: `${name}/SET_PAGE`,
          payload: page
        })
}

export const setSort = (sort:{by:string;order:"asc"|"desc"}[]):Thunk => (dispatch)=> {
        dispatch({
          type: `${name}/SET_SORT`,
          payload: sort
        })
}
