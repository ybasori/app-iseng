import {
  fetchBlogCategory,
  setFilter,
  setPage,
  setSort,
} from "@src/_states/reducers/blogCategory/blogCategory.action";
import { notify } from "@src/_states/reducers/notif/notif.action";
import { useDispatch, useSelector } from "@src/components/atoms/GlobalState";
import Link from "@src/components/atoms/Link/Link";
import Modal from "@src/components/atoms/Modal/Modal";
import Table from "@src/components/atoms/Table/Table";
import { useEffect, useState } from "react";

const Category = () => {
  const [oneTime, setOneTime] = useState(true);
  const [loadContent, setLoadContent] = useState(false);
  const [deleteMoreModal, setDeleteMoreModal] = useState(false);
  const [dataChecked, setDataChecked] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const { blogCategory } = useSelector();
  const dispatch = useDispatch();

  const onDeleteMore = (index: number = 0) => {
    setSubmitting(true);
    fetch(
      `/api/blog/category/delete/${
        blogCategory.response.result.data[dataChecked[index]].uid
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
              ...blogCategory.page,
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
            fetchBlogCategory(
              blogCategory.page,
              blogCategory.sort,
              blogCategory.filter,
              ["uid", "name", "created_at", "updated_at"]
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
      if (!!!blogCategory.response) {
        setLoadContent(true);
      }
    }
  }, [blogCategory.response, oneTime]);

  useEffect(() => {
    if (loadContent) {
      setLoadContent(false);
      dispatch(
        fetchBlogCategory(
          blogCategory.page,
          blogCategory.sort,
          blogCategory.filter,
          ["uid", "name", "created_at", "updated_at"]
        )
      );
    }
  }, [
    blogCategory.filter,
    blogCategory.page,
    blogCategory.sort,
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
          to="/dashboard/blog/category/create"
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
        sort={blogCategory.sort}
        onSort={(s) => {
          dispatch(setSort([...s]));
          setLoadContent(true);
        }}
        page={blogCategory.page}
        totalPage={
          Math.ceil(
            blogCategory.response?.result.total / blogCategory.page.size
          ) ?? 1
        }
        onPage={(page) => {
          dispatch(setPage(page));
          setLoadContent(true);
        }}
        filter={blogCategory.filter}
        onFilter={(f) => {
          dispatch(setFilter(f));
          setLoadContent(true);
        }}
        check={dataChecked}
        onCheckChange={(keys) => {
          setDataChecked(keys);
        }}
        data={!!blogCategory.response ? blogCategory.response.result.data : []}
        columns={[
          { name: "Name", field: "name", sortable: true, searchable: true },
          { name: "Author", field: "created_by.name", sortable: false },
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
                    to={`/dashboard/blog/category/edit/${row.uid}`}
                  >
                    Edit
                  </Link>
                </>
              );
            },
          },
        ]}
        loading={blogCategory.loading}
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

export default Category;
