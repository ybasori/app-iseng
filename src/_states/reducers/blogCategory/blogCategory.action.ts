import { Thunk } from "@src/_states/types";
import { expandJSON } from "@src/helper/helper";

const name = "blogCategory";

export const fetchBlogCategory = (page:{of:number;size:number}, sort:{by:string; order: "asc"|"desc"}[], filter:{[x:string]:any}, show:any[]): Thunk => {
  return async (dispatch) => {
    let newFilter = {};
    Object.keys(filter).forEach((item)=>{
      newFilter = {...newFilter, [item]: encodeURI(`%${filter[item]}%`)}
    })

    const query = expandJSON({page, sort, filter: newFilter, show}).map((item)=>`${item.label}=${item.value}`).join("&")
    dispatch({
      type: `${name}/LOADING`,
    });
    fetch(`/api/blog/category?${query}`, {
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

export const addBlogCategory = (data:{title:string;content:string}):Thunk=>{
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
export const setFilter = (filter:{[x:string]:any}):Thunk => (dispatch)=> {
        dispatch({
          type: `${name}/SET_FILTER`,
          payload: filter
        })
}
