import { Field } from 'formik';
import { TextField } from './FormField';

const BaseForm = () => {
  return (
    <>
      <Field
        label="Description"
        placeholder="Description"
        name="description"
        component={TextField}
      />
      <Field
        label="Specialist"
        placeholder="Specialist name"
        name="specialist"
        component={TextField}
      />
      <Field
        label="Date"
        placeholder="YYYY-MM-DD"
        name="date"
        component={TextField}
      />
    </>
  );
};
export default BaseForm;
