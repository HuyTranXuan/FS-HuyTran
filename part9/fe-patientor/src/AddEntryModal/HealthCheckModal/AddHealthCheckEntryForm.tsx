import React from 'react';
// import { Grid, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { DiagnosisSelection, SelectField, RatingOption } from './FormField';
import { HealthCheckEntry, HealthCheckRating } from '../../types';
import { useStateValue } from '../../state';
import BaseForm from '../BaseForm';
import BaseButtons from '../BaseButtons';

export type HealthCheckFormValues = Omit<HealthCheckEntry, 'id'>;
interface Props {
  onSubmit: (values: HealthCheckFormValues) => void;
  onCancel: () => void;
}
const ratingOptions: RatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'Low risk' },
  { value: HealthCheckRating.HighRisk, label: 'High risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical risk' },
];
export const AddHealthCheckEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: '',
        specialist: '',
        date: '',
        type: 'HealthCheck',
        healthCheckRating: 0,
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
            <SelectField
              label="Health Check Rating"
              name="healthCheckRating"
              options={ratingOptions}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <BaseButtons onCancel={onCancel} isValid={isValid} dirty={dirty} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHealthCheckEntryForm;
