import {
  fetchBlogContent,
  setPage,
  setSort,
} from "@src/_states/reducers/blogContent/blogContent.action";
import { notify } from "@src/_states/reducers/notif/notif.action";
import { useDispatch, useSelector } from "@src/components/atoms/GlobalState";
import useForm, { ICallbackSubmit } from "@src/hooks/useForm";
import * as yup from "yup";
import { ICreateEdit } from "./CreateEdit.type";
import { useCallback, useEffect, useState } from "react";
import { navigate } from "@src/helper/helper";

const CreateEdit: React.FC<ICreateEdit> = ({ isEdit }) => {
  const [oneTime, setOneTime] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const { blogContent, route } = useSelector();
  const dispatch = useDispatch();

  const validation = () => {
    return yup.object().shape({
      title: yup.string().required("Title is required!"),
      content: yup.string().required("Content is required!"),
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
      title: "",
      content: "",
    },
    validation: validation(),
  });

  const onGetCategory = useCallback(() => {
    fetch(`/api/blog/category?show[]=uid&show[]=name`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories([...data.result.data]);
      })
      .catch(() => {
        dispatch(notify("", "Something went wrong!", 5000));
      });
  }, [dispatch]);

  const onInitialValue = useCallback(() => {
    fetch(
      `/api/blog/content?filter[uid]=${route.params.uid}&show[]=uid&show[]=title&show[]=content&show[]=leftJoin_category_uid`,
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
          setDefaultForm({...detail, category_uid: detail.leftJoin_category_uid});
        }
      })
      .catch(() => {
        dispatch(notify("", "Something went wrong!", 5000));
      });
  }, [dispatch, route.params.uid, setDefaultForm]);

  const onSubmit: ICallbackSubmit = (values, { setSubmitting }) => {
    fetch(
      `/api/blog/content/${isEdit ? `edit/${route.params.uid}` : "create"}`,
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
              ["uid", "title", "created_at", "updated_at","leftJoin_category_name"]
            )
          );
          navigate("/dashboard/blog/content");
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
      if (isEdit) {
        onInitialValue();
      }
      onGetCategory();
    }
  }, [onInitialValue, oneTime, route.params, isEdit, onGetCategory]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label">Title</label>
        <div className={`control ${!!errors.title ? `has-icons-right` : ``}`}>
          <input
            className={`input ${!!errors.title ? `is-danger` : ``}`}
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            disabled={isSubmitting}
            value={values.title}
          />
          {!!errors.title ? (
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          ) : null}
        </div>
        {!!errors.content ? (
          <p className="help is-danger">{errors.title}</p>
        ) : null}
      </div>

      <div className="field">
        <label className="label">Category</label>
        <div className="select">
          <select name="category_uid" onChange={handleChange} value={values.category_uid}>
            <option hidden>Choose:</option>
            <option value="">--empty--</option>
            {categories.map((item, key) => (
              <option key={key} value={item.uid}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label className="label">Content</label>
        <div className={`control ${!!errors.content ? `has-icons-right` : ``}`}>
          <textarea
            className={`textarea ${!!errors.content ? `is-danger` : ``}`}
            placeholder="Content"
            name="content"
            onChange={handleChange}
            disabled={isSubmitting}
            value={values.content}
          ></textarea>
        </div>
        {!!errors.content ? (
          <p className="help is-danger">{errors.content}</p>
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

export default CreateEdit;
