import { fetchBlogContent } from "@src/_states/reducers/blogContent/blogContent.action";
import { useDispatch, useSelector } from "@src/components/atoms/GlobalState";
import Link from "@src/components/atoms/Link/Link";
import Table from "@src/components/atoms/Table/Table";
import { useEffect, useState } from "react";

const Content = () => {
  const [oneTime, setOneTime] = useState(true);
  const [loadContent, setLoadContent] = useState(false);
  const { blogContent } = useSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    if (oneTime) {
      setOneTime(false);
      if(!!!blogContent.response){
      setLoadContent(true);
      }
    }
  }, [blogContent.response, oneTime]);

  useEffect(() => {
    if (loadContent) {
      setLoadContent(false);
        dispatch(fetchBlogContent());
    }
  }, [dispatch, loadContent]);

  return (
    <>
      <div className="buttons">
        <button className="button is-info is-small" type={"button"} onClick={()=>setLoadContent(true)}>Reload</button>
        <Link
          className="button is-success is-small"
          to="/dashboard/blog/content/create"
        >
          Add
        </Link>
        <button className="button is-danger is-small">Delete</button>
        <div className="select is-small">
          <select>
            <option>With options</option>
            <option>Select dropdown</option>
          </select>
        </div>
      </div>

      <Table
        data={!!blogContent.response ? blogContent.response.result.data : []}
        columns={[
          { name: "Title", field: "title" },
          {
            name: "Action",
            render: () => {
              return (
                <>
                  <button className="button is-info is-small" type="button">Edit</button>
                </>
              );
            },
          },
        ]}
        loading={blogContent.loading}
      />

      <nav
        className="pagination is-centered is-small"
        role="navigation"
        aria-label="pagination"
      >
        <a href="#" className="pagination-previous">
          Previous
        </a>
        <a href="#" className="pagination-next">
          Next page
        </a>
        <ul className="pagination-list">
          <li>
            <a href="#" className="pagination-link" aria-label="Goto page 1">
              1
            </a>
          </li>
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li>
            <a href="#" className="pagination-link" aria-label="Goto page 45">
              45
            </a>
          </li>
          <li>
            <a
              className="pagination-link is-current"
              aria-label="Page 46"
              aria-current="page"
            >
              46
            </a>
          </li>
          <li>
            <a href="#" className="pagination-link" aria-label="Goto page 47">
              47
            </a>
          </li>
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li>
            <a href="#" className="pagination-link" aria-label="Goto page 86">
              86
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Content;
