import { State } from './state';
import { Patient, Diagnose } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSES_LIST';
      payload: Diagnose[];
    };
export const setDiagnosesList = (diagnosesListFromApi: Diagnose[]): Action => ({
  type: 'SET_DIAGNOSES_LIST',
  payload: diagnosesListFromApi,
});

export const setPatientList = (patientListFromApi: Patient[]): Action => ({
  type: 'SET_PATIENT_LIST',
  payload: patientListFromApi,
});

export const addPatientList = (newPatient: Patient): Action => ({
  type: 'ADD_PATIENT',
  payload: newPatient,
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_DIAGNOSES_LIST':
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    default:
      return state;
  }
};
