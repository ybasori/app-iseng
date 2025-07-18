import { notify } from "@src/_states/reducers/notif/notif.action";
import { useDispatch, useSelector } from "@src/components/atoms/GlobalState";
import useForm, { ICallbackSubmit } from "@src/hooks/useForm";
import * as yup from "yup";
import { ITagCreateEdit } from "./TagCreateEdit.type";
import { useCallback, useEffect, useState } from "react";
import {
  fetchBlogTag,
  setPage,
  setSort,
} from "@src/_states/reducers/blogTag/blogTag.action";
import { navigate } from "@src/helper/helper";
import { api } from "../../../../../../../_config/config";

const TagCreateEdit: React.FC<ITagCreateEdit> = ({ isEdit }) => {
  const [oneTime, setOneTime] = useState(isEdit);
  const { blogTag, route } = useSelector();
  const dispatch = useDispatch();

  const validation = () => {
    return yup.object().shape({
      name: yup.string().required("Name is required!"),
    });
  };

  const {
    handleSubmit,
    errors,
    values,
    handleReset,
    isSubmitting,
    isValid,
    handleChange,
    setDefaultForm,
  } = useForm({
    initialValues: {
      name: "",
    },
    validation: validation(),
  });

  const onInitialValue = useCallback(() => {
    fetch(
      `${api.DASHBOARD_BLOG_TAG_LIST}?filter[uid]=${route.params.uid}&show[]=uid&show[]=name`,
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
        const [detail] = data.result.data;
        if (detail) {
          setDefaultForm(detail);
        }
      })
      .catch(() => {
        dispatch(notify("", "Something went wrong!", 5000));
      });
  }, [dispatch, route.params.uid, setDefaultForm]);

  const onSubmit: ICallbackSubmit = (values, { setSubmitting }) => {
    fetch(
      `${isEdit ? `${api.DASHBOARD_BLOG_TAG_UPDATE}/${route.params.uid}` : `${api.DASHBOARD_BLOG_TAG_CREATE}`}`,
      {
        method: `${isEdit ? "PUT" : "POST"}`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSubmitting(false);
        dispatch(notify("", data.message, 5000));
        if (data.statusCode === 200) {
          dispatch(
            setPage({
              ...blogTag.page,
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
            fetchBlogTag(
              blogTag.page,
              blogTag.sort,
              blogTag.filter,
              ["uid", "name", "created_at", "updated_at"]
            )
          );
          navigate("/dashboard/blog/tag");
        }
      })
      .catch(() => {
        setSubmitting(false);
        dispatch(notify("", "Something went wrong!", 5000));
      });
  };

  useEffect(() => {
    if (oneTime) {
      setOneTime(false);
      onInitialValue();
    }
  }, [onInitialValue, oneTime]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label">Name</label>
        <div className={`control ${!!errors.name ? `has-icons-right` : ``}`}>
          <input
            className={`input ${!!errors.name ? `is-danger` : ``}`}
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

      <div className="field is-grouped">
        <div className="control">
          <button
            className="button is-link"
            type={"submit"}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? "Wait..." : true ? "Save Changes" : "Edit"}
          </button>
        </div>
        <div className="control">
          <button
            className="button is-link is-light"
            type={"button"}
            disabled={isSubmitting}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};

export default TagCreateEdit;
