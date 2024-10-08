import s from "./FilterMovies.module.css";
import { Formik, Form, Field } from "formik";

const FilterMovies = ({ handleChangeQuery }) => {
  const initialValues = {
    query: "",
  };
  const handleSubmit = (values) => {
    handleChangeQuery(values.query);
  };

  return (
    <div>
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className={s.searchForm}>
            <Field name="query" className={s.input} />
            <button type="submit" className={s.button}>
              Search
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default FilterMovies;
