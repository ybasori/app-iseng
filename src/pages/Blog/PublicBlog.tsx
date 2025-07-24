import { fetchPublicBlogCategory } from "@src/_states/reducers/publicBlogCategory/publicBlogCategory.thunk";
import { AppDispatch } from "@src/_states/store";
import { RootState } from "@src/_states/types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@src/components/molecules/Navbar/Navbar";
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";
import PublicBlogMain from "./pages/PublicBlogMain/PublicBlogMain";
import PublicBlogContentDetail from "./pages/Content/PublicBlogContentDetail";

function PublicBlog() {
  const match = useRouteMatch();
  const [oneTime, setOneTime] = useState(true);
  const [loadContent, setLoadContent] = useState(false);

  const publicBlogCategory = useSelector(
    (state: RootState) => state.publicBlogCategory
  );
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    if (oneTime) {
      setOneTime(false);
      if (!!!publicBlogCategory.response) {
        setLoadContent(true);
      }
    }
  }, [publicBlogCategory.response, oneTime]);

  useEffect(() => {
    if (loadContent) {
      setLoadContent(false);
      dispatch(
        fetchPublicBlogCategory({
          page: publicBlogCategory.page,
          sort: publicBlogCategory.sort,
          filter: publicBlogCategory.filter,
          show: ["uid", "name", "content", "created_at", "updated_at"],
        })
      );
    }
  }, [
    publicBlogCategory.filter,
    publicBlogCategory.page,
    publicBlogCategory.sort,
    dispatch,
    loadContent,
  ]);
  return (
    <>
      <Navbar />

      <section className="section">
        <div className="container pt-5">
          <div className="columns">
            <div className="column">
              <Switch>
                <Route path={`${match.path}/content/:uid`}>
                  <PublicBlogContentDetail />
                </Route>
                <Route path={`${match.path}/category/:uid`}>
                  <PublicBlogMain />
                </Route>
                <Route path={match.path}>
                  <PublicBlogMain />
                </Route>
              </Switch>
            </div>
            <div className="column is-one-third">
              <article className="panel is-primary">
                <p className="panel-heading">Categories</p>
                <div className="panel-block">
                  <p className="control has-icons-left">
                    <input
                      className="input is-primary"
                      type="text"
                      placeholder="Search"
                    />
                    <span className="icon is-left">
                      <i className="fas fa-search" aria-hidden="true"></i>
                    </span>
                  </p>
                </div>
                {publicBlogCategory.loading ? (
                  "Loading..."
                ) : (
                  <>
                    {(!!publicBlogCategory.response
                      ? publicBlogCategory.response.result.data
                      : []
                    ).map((item, key: number) => (
                      <React.Fragment key={key}>
                        <NavLink
                          className={()=>"panel-block is-active"}
                          to={`/blog/category/${item.uid}`}
                        >
                          <span className="panel-icon">
                            <i className="fas fa-book" aria-hidden="true"></i>
                          </span>
                          {item.name} ({item.content.total})
                        </NavLink>
                      </React.Fragment>
                    ))}
                  </>
                )}
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PublicBlog;
