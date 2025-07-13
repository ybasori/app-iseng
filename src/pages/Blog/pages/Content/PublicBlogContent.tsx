import { api } from "@src/_config/config";
import { notify } from "@src/_states/reducers/notif/notif.action";
import {
  fetchPublicBlogContentDetail,
  setFilter,
} from "@src/_states/reducers/publicBlogContentDetail/publicBlogContentDetail.action";
import FacebookComment from "@src/components/atoms/FacebookComment/FacebookComment";
import { useDispatch, useSelector } from "@src/components/atoms/GlobalState";
import Link from "@src/components/atoms/Link/Link";
import useForm, { ICallbackSubmit } from "@src/hooks/useForm";
// import useWindowWidth from "@src/hooks/useWindowWidth";
import React, { useCallback, useEffect, useState } from "react";
import * as yup from "yup";

const PublicBlogContent = () => {
  const [oneTime, setOneTime] = useState(true);
  const [loadContent, setLoadContent] = useState(false);
  const [loadComment, setLoadComment] = useState(false);
  const [commentList, setCommentList] = useState<any[]>([]);
  const [totalComment, setTotalComment] = useState<number>(0);
  const { publicBlogContentDetail, route } = useSelector();

  const [page, setPage] = useState({
    of: 1,
    size: 10,
  });

  const dispatch = useDispatch();
  // const width = useWindowWidth();

  const listPage = (total: number) => {
    let list: number[] = [];
    for (let i = 1; i <= total; i++) {
      list = [...list, i];
    }
    return list;
  };

  const validation = () => {
    return yup.object().shape({
      name: yup.string().required("Name is required!"),
      email: yup
        .string()
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i, "Invalid email")
        .required("E-mail is required!"),
      comment: yup.string().required("Comment is required!"),
    });
  };

  const { handleSubmit, errors, values, isSubmitting, isValid, handleChange, handleReset } =
    useForm({
      initialValues: {
        name: "",
        email: "",
        comment: "",
      },
      validation: validation(),
    });

  const onGetComment = useCallback(() => {
    fetch(
      `${api.PUBLIC_BLOG_COMMENT_LIST}?show[]=uid&show[]=name&show[]=comment&filter[leftJoin_content_uid]=${route.params.uid}&sort[0][by]=created_at&sort[0][order]=desc&page[of]=${page.of}&page[size]=${page.size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCommentList([...data.result.data]);
        setTotalComment(data.result.total);
      })
      .catch(() => {
        dispatch(notify("", "Something went wrong!", 5000));
      });
  }, [dispatch, page.of, page.size, route.params.uid]);

  const onSubmit: ICallbackSubmit = (values, { setSubmitting }) => {
    fetch(`${api.PUBLIC_BLOG_COMMENT_STORE}`, {
      method: `${"POST"}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        content_uid: route.params.uid,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSubmitting(false);
        dispatch(notify("", data.message, 5000));
        handleReset();
        onGetComment();
      })
      .catch(() => {
        setSubmitting(false);
        dispatch(notify("", "Something went wrong!", 5000));
      });
  };

  useEffect(() => {
    if (oneTime) {
      setOneTime(false);
      dispatch(
        setFilter({
          uid: route.params.uid,
        })
      );
      setLoadContent(true);
    }
  }, [publicBlogContentDetail.response, oneTime, dispatch, route.params.uid]);

  useEffect(() => {
    if (loadContent) {
      setLoadContent(false);
      dispatch(
        fetchPublicBlogContentDetail(
          publicBlogContentDetail.page,
          publicBlogContentDetail.sort,
          publicBlogContentDetail.filter,
          ["uid", "title", "content", "created_at", "updated_at"]
        )
      );
      setLoadComment(true);
      onGetComment();
    }
  }, [
    dispatch,
    loadContent,
    onGetComment,
    publicBlogContentDetail.filter,
    publicBlogContentDetail.page,
    publicBlogContentDetail.sort,
  ]);

  useEffect(() => {
    if (loadComment) {
      setLoadComment(false);
      onGetComment();
    }
  }, [
    dispatch,
    loadComment,
    loadContent,
    onGetComment,
    publicBlogContentDetail.filter,
    publicBlogContentDetail.page,
    publicBlogContentDetail.sort,
  ]);
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              {publicBlogContentDetail.loading ? (
                "Loading..."
              ) : (
                <>
                  {(!!publicBlogContentDetail.response
                    ? publicBlogContentDetail.response.result.data
                    : []
                  ).map(
                    (
                      item: {
                        title: string;
                        content: string;
                        created_at: string;
                        uid: string;
                      },
                      key: number
                    ) => (
                      <React.Fragment key={key}>
                        <h1 className="title">
                          <Link to={`/blog/content/${item.uid}`}>
                            {item.title}
                          </Link>
                        </h1>
                        <p className="subtitle">
                          My first website with <strong>Bulma</strong>!
                        </p>

                        <p className="has-text-grey-lighter is-size-6">
                          {item.created_at}
                        </p>
                        <div
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />

                        <h3 className="title is-3">Comments</h3>

                        <article className="media">
                          <div className="media-content">
                            <form onSubmit={handleSubmit(onSubmit)}>
                              <div className="field">
                                <label className="label">Name</label>
                                <div
                                  className={`control ${
                                    !!errors.name ? `has-icons-right` : ``
                                  }`}
                                >
                                  <input
                                    className={`input ${
                                      !!errors.name ? `is-danger` : ``
                                    }`}
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    value={values.name}
                                  />
                                  {!!errors.name ? (
                                    <span className="icon is-small is-right">
                                      <i className="fas fa-exclamation-triangle"></i>
                                    </span>
                                  ) : null}
                                </div>
                                {!!errors.name ? (
                                  <p className="help is-danger">
                                    {errors.name}
                                  </p>
                                ) : null}
                              </div>

                              <div className="field">
                                <label className="label">E-mail</label>
                                <div
                                  className={`control ${
                                    !!errors.email ? `has-icons-right` : ``
                                  }`}
                                >
                                  <input
                                    className={`input ${
                                      !!errors.email ? `is-danger` : ``
                                    }`}
                                    type="text"
                                    placeholder="E-mail"
                                    name="email"
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    value={values.email}
                                  />
                                  {!!errors.email ? (
                                    <span className="icon is-small is-right">
                                      <i className="fas fa-exclamation-triangle"></i>
                                    </span>
                                  ) : null}
                                </div>
                                {!!errors.email ? (
                                  <p className="help is-danger">
                                    {errors.email}
                                  </p>
                                ) : null}
                              </div>

                              <div className="field">
                                <label className="label">Comment</label>
                                <div
                                  className={`control ${
                                    !!errors.comment ? `has-icons-right` : ``
                                  }`}
                                >
                                  <textarea
                                    className={`textarea ${
                                      !!errors.comment ? `is-danger` : ``
                                    }`}
                                    placeholder="Comment"
                                    name="comment"
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    value={values.comment}
                                  ></textarea>
                                </div>
                                {!!errors.comment ? (
                                  <p className="help is-danger">
                                    {errors.comment}
                                  </p>
                                ) : null}
                              </div>

                              <div className="field is-grouped">
                                <div className="control">
                                  <button
                                    className="button is-link"
                                    type={"submit"}
                                    disabled={isSubmitting || !isValid}
                                  >
                                    {isSubmitting
                                      ? "Wait..."
                                      : true
                                      ? "Save Changes"
                                      : "Edit"}
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </article>
                        {(commentList ?? []).map((comment, index) => (
                          <div className="box" key={index}>
                            <article className="media" key={index}>
                              <figure className="media-left">
                                <p className="image is-64x64">
                                  <img src="https://bulma.io/assets/images/placeholders/128x128.png" />
                                </p>
                              </figure>
                              <div className="media-content">
                                <div className="content">
                                  <p>
                                    <strong>{comment.name}</strong>
                                    <br />
                                    {comment.comment}
                                    <br />
                                  </p>
                                </div>
                              </div>
                            </article>
                          </div>
                        ))}

                        <nav
                          className="pagination is-small"
                          role="navigation"
                          aria-label="pagination"
                        >
                          <a
                            className={`pagination-previous ${
                              page.of === 1 ? `is-disabled` : ``
                            }`}
                            onClick={(e) => {
                              e.preventDefault();

                              if (page.of > 1) {
                                setPage({ ...page, of: page.of - 1 });
                                setLoadComment(true);
                              }
                            }}
                          >
                            Previous
                          </a>
                          <a
                            className={`pagination-next ${
                              page.of === Math.ceil(totalComment / page.size)
                                ? `is-disabled`
                                : ``
                            }`}
                            onClick={(e) => {
                              e.preventDefault();

                              if (
                                page.of < Math.ceil(totalComment / page.size)
                              ) {
                                setPage({ ...page, of: page.of + 1 });
                                setLoadComment(true);
                              }
                            }}
                          >
                            Next page
                          </a>
                          <ul className="pagination-list m-0">
                            {/* <li>
            <a href="#" className="pagination-link" aria-label="Goto page 1">
              1
            </a>
          </li>
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li> */}

                            {listPage(Math.ceil(totalComment / page.size))
                              .filter(
                                (item) =>
                                  page.of -
                                    (Math.ceil(totalComment / page.size) -
                                      page.of <=
                                    2
                                      ? 5 -
                                        (Math.ceil(totalComment / page.size) -
                                          page.of)
                                      : 3) <
                                    item &&
                                  item <=
                                    page.of + (page.of <= 2 ? 5 - page.of : 2)
                              )
                              .map((item, key) => (
                                <li key={key}>
                                  <a
                                    className={`pagination-link  ${
                                      item === page.of ? `is-current` : ``
                                    }`}
                                    aria-label={`Goto page ${item}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setPage({ ...page, of: item });
                                      setLoadComment(true);
                                    }}
                                  >
                                    {item}
                                  </a>
                                </li>
                              ))}

                            {/* <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li>
            <a href="#" className="pagination-link" aria-label="Goto page 86">
              86
            </a>
          </li> */}
                          </ul>
                        </nav>

                        {/* <FacebookComment url="https://developers.facebook.com/docs/plugins/comments#configurator" width={(Math.floor(width-(width*(24/100)))).toString()} /> */}
                        <FacebookComment
                          url={`https://localhost:3000/blog/content/${route.params.uid}`}
                        />
                      </React.Fragment>
                    )
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PublicBlogContent;
