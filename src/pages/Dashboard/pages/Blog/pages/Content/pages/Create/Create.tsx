import { addBlogContent } from "@src/_states/reducers/blogContent/blogContent.action";
import { notify } from "@src/_states/reducers/notif/notif.action";
import { navigate } from "@src/_states/reducers/route/route.action";
import { useDispatch } from "@src/components/atoms/GlobalState";
import useForm, { ICallbackSubmit } from "@src/hooks/useForm";
import * as yup from "yup";

const Create = () => {

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
  } = useForm({
    initialValues: {
      title: "",
      content: "",
    },
    validation: validation(),
  });

  const onSubmit:ICallbackSubmit = (values, {setSubmitting}) => {
    
    fetch("/api/blog/content/create",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            setSubmitting(false);
            dispatch(notify("", data.message, 5000))
            if(data.statusCode === 200){
                dispatch(addBlogContent(data.result))
                dispatch(navigate("/dashboard/blog/content"));
            }
        })
        .catch(() => {
            setSubmitting(false);
            dispatch(notify("", "Something went wrong!", 5000))
        });
  };

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

export default Create;
