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
  const [pagination, setPagination] = useState({
    page: {
      of: 1,
      size: 10,
    },
  });
  const [sort, setSort] = useState<{by:string; order:"asc"|"desc"}[]>([]);

  useEffect(() => {
    if (oneTime) {
      setOneTime(false);
      if (!!!blogContent.response) {
        setLoadContent(true);
      }
    }
  }, [blogContent.response, oneTime]);

  useEffect(() => {
    if (loadContent) {
      setLoadContent(false);
      dispatch(fetchBlogContent(pagination, sort));
    }
  }, [dispatch, loadContent, pagination, sort]);

  return (
    <>
      <div className="buttons">
        <button
          className="button is-info is-small"
          type={"button"}
          onClick={() => setLoadContent(true)}
        >
          Reload
        </button>
        <Link
          className="button is-success is-small"
          to="/dashboard/blog/content/create"
        >
          Add
        </Link>
        <button className="button is-danger is-small">Delete</button>
      </div>

      <Table
        sort={sort}
        onSort={(s)=>{
          setSort([...s]);
          setLoadContent(true);
        }}
        page={pagination.page}
        totalPage={Math.ceil(blogContent.response?.result.total/pagination.page.size) ?? 1}
        onPage={(page)=>{
            setPagination({
              ...pagination,
              page
            });
            setLoadContent(true);
        }}
        data={!!blogContent.response ? blogContent.response.result.data : []}
        columns={[
          { name: "Title", field: "title", sortable:true },
          { name: "Author", field: "created_by.name", sortable:true },
          { name: "Created At", field: "created_at", sortable:true },
          { name: "Updated At", field: "updated_at", sortable:true },
          {
            name: "Action",
            render: () => {
              return (
                <>
                  <button className="button is-info is-small" type="button">
                    Edit
                  </button>
                </>
              );
            },
          },
        ]}
        loading={blogContent.loading}
      />

    </>
  );
};

export default Content;
