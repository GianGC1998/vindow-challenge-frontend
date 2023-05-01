import { useFormik } from "formik";
import { FC, useMemo } from "react";
import { validateForm } from "./misc";
import "./styles.css";
import { FormikValues, SearchbarProps } from "./types";

export const Searchbar: FC<SearchbarProps> = ({ disabled, onSearch }) => {
  const formik = useFormik<FormikValues>({
    initialValues: {
      query: "",
    },
    validateOnBlur: false,
    validate: validateForm,
    onSubmit: (values) => {
      onSearch(values.query);
    },
  });

  const hasErrorInput = useMemo(
    () => Boolean(formik.errors.query),
    [formik.errors.query]
  );

  return (
    <form className="row mt-4 g-2" onSubmit={formik.handleSubmit}>
      <div className="col-12 col-md-10">
        <input
          className={`form-control has-validation w-100 h-100 input-search ${
            hasErrorInput ? "input-has-error" : ""
          }`}
          id="query"
          name="query"
          type="text"
          disabled={disabled}
          onChange={formik.handleChange}
          value={formik.values.query}
        />
        <div
          className={`input-error-feedback ${hasErrorInput ? "active" : ""}`}
        >
          {formik.errors.query}
        </div>
      </div>
      <div className="col-12 col-md-2">
        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={disabled}
        >
          Search
        </button>
      </div>
    </form>
  );
};
