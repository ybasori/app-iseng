import {
  fetchPublicBlogContentDetail,
  setFilter,
} from "@src/_states/reducers/publicBlogContentDetail/publicBlogContentDetail.action";
import FacebookComment from "@src/components/atoms/FacebookComment/FacebookComment";
import { useDispatch, useSelector } from "@src/components/atoms/GlobalState";
import Link from "@src/components/atoms/Link/Link";
import useForm from "@src/hooks/useForm";
// import useWindowWidth from "@src/hooks/useWindowWidth";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

const PublicBlogContent = () => {
  const [oneTime, setOneTime] = useState(true);
  const [loadContent, setLoadContent] = useState(false);
  const { publicBlogContentDetail, route } = useSelector();
  // const width = useWindowWidth();

  const validation = () => {
    return yup.object().shape({
      name: yup.string().required("Name is required!"),
      comment: yup.string().required("Comment is required!"),
    });
  };

  const {
    handleSubmit,
    errors,
    values,
    isSubmitting,
    isValid,
    handleChange,
  } = useForm({
    initialValues: {
      title: "",
      content: "",
    },
    validation: validation(),
  });

  const onSubmit = () => {};

  const dispatch = useDispatch();

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
    }
  }, [
    dispatch,
    loadContent,
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
                        <div
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                        <p className="has-text-grey-lighter is-size-6">{item.created_at}</p>

                        <h3 className="title is-3">Comments</h3>

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
                              <p className="help is-danger">{errors.name}</p>
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
                              <p className="help is-danger">{errors.comment}</p>
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
