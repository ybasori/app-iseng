import { Thunk } from "@src/_states/types";
import { api } from "../../../_config/config";
import { expandJSON } from "@src/helper/helper";

const name = "blogContent";

export const fetchBlogContent = (page:{of:number;size:number}, sort:{by:string; order: "asc"|"desc"}[], filter:{[x:string]:any}, show:any[]): Thunk => {
  return async (dispatch) => {
    let newFilter = {};
    Object.keys(filter).forEach((item)=>{
      newFilter = {...newFilter, [item]: encodeURI(`%${filter[item]}%`)}
    })

    const query = expandJSON({page, sort, filter: newFilter, show}).map((item)=>`${item.label}=${item.value}`).join("&")
    dispatch({
      type: `${name}/LOADING`,
    });
    fetch(`${api.DASHBOARD_BLOG_CONTENT_LIST}?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if(data.statusCode < 400){
          dispatch({
            type: `${name}/SUCCESS`,
            payload: data,
          });
        }
        else{
          dispatch({
            type: `${name}/ERROR`,
            payload: data,
          });
        }
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
export const setFilter = (filter:{[x:string]:any}):Thunk => (dispatch)=> {
        dispatch({
          type: `${name}/SET_FILTER`,
          payload: filter
        })
}
