import {
  fetchBlogContent,
  setFilter,
  setPage,
  setSort,
} from "@src/_states/reducers/blogContent/blogContent.action";
import { notify } from "@src/_states/reducers/notif/notif.action";
import { useDispatch, useSelector } from "@src/components/atoms/GlobalState";
import Link from "@src/components/atoms/Link/Link";
import Modal from "@src/components/atoms/Modal/Modal";
import Table from "@src/components/atoms/Table/Table";
import { api } from "../../../../../../_config/config";
import React, { useEffect, useState } from "react";

const Content = () => {
  const [oneTime, setOneTime] = useState(true);
  const [loadContent, setLoadContent] = useState(false);
  const [deleteMoreModal, setDeleteMoreModal] = useState(false);
  const [dataChecked, setDataChecked] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const { blogContent } = useSelector();
  const dispatch = useDispatch();

  const onDeleteMore = (index: number = 0) => {
    setSubmitting(true);
    fetch(
      `${api.DASHBOARD_BLOG_CONTENT_DELETE}/${
        blogContent.response.result.data[dataChecked[index]].uid
      }`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (index + 1 < dataChecked.length) {
          onDeleteMore(index + 1);
        } else {
          setSubmitting(false);
          dispatch(notify("", data.message, 5000));
          setDeleteMoreModal(false);
          setDataChecked([]);
          dispatch(
            setPage({
              ...blogContent.page,
              of: 1,
            })
          );
          dispatch(
            setSort([
              {
                by: "created_at",
                order: "desc",
              },
            ])
          );
          dispatch(
            fetchBlogContent(
              blogContent.page,
              blogContent.sort,
              blogContent.filter,
              [
                "uid",
                "title",
                "created_at",
                "updated_at",
                "leftJoin_category_name",
              ]
            )
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setSubmitting(false);
        dispatch(notify("", "Something went wrong!", 5000));
      });
  };

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
      dispatch(
        fetchBlogContent(
          blogContent.page,
          blogContent.sort,
          blogContent.filter,
          ["uid", "title", "created_at", "updated_at", "leftJoin_category_name"]
        )
      );
    }
  }, [
    blogContent.filter,
    blogContent.page,
    blogContent.sort,
    dispatch,
    loadContent,
  ]);

  return (
    <>
      <div className="buttons">
        <button
          className="button is-info is-small"
          type={"button"}
          onClick={() => setLoadContent(true)}
          disabled={submitting}
        >
          Reload
        </button>
        <Link
          className="button is-success is-small"
          to="/dashboard/blog/content/create"
        >
          Add
        </Link>
        {dataChecked.length > 0 ? (
          <button
            className="button is-danger is-small"
            type="button"
            onClick={() => setDeleteMoreModal(true)}
            disabled={submitting}
          >
            Delete
          </button>
        ) : null}
      </div>

      <Table
        sort={blogContent.sort}
        onSort={(s) => {
          dispatch(setSort([...s]));
          setLoadContent(true);
        }}
        page={blogContent.page}
        totalPage={
          Math.ceil(
            blogContent.response?.result.total / blogContent.page.size
          ) ?? 1
        }
        onPage={(page) => {
          dispatch(setPage(page));
          setLoadContent(true);
        }}
        filter={blogContent.filter}
        onFilter={(f) => {
          dispatch(setFilter(f));
          setLoadContent(true);
        }}
        check={dataChecked}
        onCheckChange={(keys) => {
          setDataChecked(keys);
        }}
        data={!!blogContent.response ? blogContent.response.result.data : []}
        columns={[
          { name: "Title", field: "title", sortable: true, searchable: true },
          {
            name: "Category",
            field: "leftJoin_category_name",
            sortable: true,
            searchable: true,
          },
          {
            name: "Tags",
            render: (_cell, row) => {
              return (
                <>
                  {row?.content_tag.data.map(
                    (
                      item: { tag: { name: string } },
                      i: number,
                      self: any[]
                    ) => (
                      <React.Fragment key={i}>
                        <a>{item.tag.name}</a>
                        {self.length-1 !== i ? ", ":""}
                      </React.Fragment>
                    )
                  ) ?? ""}
                </>
              );
            },
          },
          { name: "Author", field: "created_by.name" },
          {
            name: "Created At",
            field: "created_at",
            sortable: true,
            searchable: true,
          },
          {
            name: "Updated At",
            field: "updated_at",
            sortable: true,
            searchable: true,
          },
          {
            name: "Action",
            render: (_cell, row) => {
              return (
                <>
                  <Link
                    className="button is-info is-small"
                    to={`/dashboard/blog/content/edit/${row.uid}`}
                  >
                    Edit
                  </Link>
                </>
              );
            },
          },
        ]}
        loading={blogContent.loading}
      />

      {!!deleteMoreModal ? (
        <Modal
          title={`Delete ${dataChecked.length} contents`}
          onClose={() => setDeleteMoreModal(false)}
        >
          <div className="buttons">
            <button
              className="button is-success"
              type="button"
              onClick={() => onDeleteMore()}
              disabled={submitting}
            >
              Sure
            </button>
            <button className="button" type="button" disabled={submitting}>
              Cancel
            </button>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Content;
