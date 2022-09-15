import React from 'react';
import { Formik, Form, Field } from 'formik';
import { DiagnosisSelection, TextField } from './FormField';
import { HospitalEntry } from '../../types';
import { useStateValue } from '../../state';
import BaseForm from '../BaseForm';
import BaseButtons from '../BaseButtons';

export type HospitalFormValues = Omit<HospitalEntry, 'id'>;
interface Props {
  onSubmit: (values: HospitalFormValues) => void;
  onCancel: () => void;
}
export const AddHospitalEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: '',
        discharge: { date: '', criteria: '' },
        specialist: '',
        date: '',
        type: 'Hospital',
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Values are missing or formatted incorrectly';
        const errors: { [field: string]: string } = {};
        if (!values.date || values.date.length < 10) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist || values.specialist.length < 2) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <BaseForm />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <BaseButtons onCancel={onCancel} isValid={isValid} dirty={dirty} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHospitalEntryForm;
