import React from 'react';
import { Formik, Form, Field } from 'formik';
import { DiagnosisSelection, TextField } from '../FormField';
import { OccupationalHealthcare } from '../../types';
import { useStateValue } from '../../state';
import BaseForm from '../BaseForm';
import BaseButtons from '../BaseButtons';

export type OccupationalFormValues = Omit<OccupationalHealthcare, 'id'>;
interface Props {
  onSubmit: (values: OccupationalFormValues) => void;
  onCancel: () => void;
}
export const AddOccupationalEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: '',
        specialist: '',
        date: '',
        employerName: '',
        sickLeave: { startDate: '', endDate: '' },
        type: 'OccupationalHealthcare',
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Values are missing or formatted incorrectly';
        const requiredBothError = 'Need both start date and end date info';
        const errors: { [field: string]: string } = {};
        if (!values.date || values.date.length != 10) {
          errors.date = requiredError;
        }
        if (
          values.sickLeave?.startDate.length != values.sickLeave?.endDate.length
        ) {
          errors.sickLeave = requiredBothError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
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
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <BaseButtons onCancel={onCancel} isValid={isValid} dirty={dirty} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOccupationalEntryForm;
