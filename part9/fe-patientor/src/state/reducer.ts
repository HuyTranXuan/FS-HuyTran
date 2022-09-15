import { State } from './state';
import { Patient, Diagnose, Entry } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'SET_PATIENT';
      payload: Patient;
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSES_LIST';
      payload: Diagnose[];
    }
  | {
      type: 'ADD_ENTRY';
      id: string;
      payload: Entry;
    };

export const setDiagnosesList = (diagnosesListFromApi: Diagnose[]): Action => ({
  type: 'SET_DIAGNOSES_LIST',
  payload: diagnosesListFromApi,
});

export const setPatientList = (patientListFromApi: Patient[]): Action => ({
  type: 'SET_PATIENT_LIST',
  payload: patientListFromApi,
});
export const setPatient = (patient: Patient): Action => ({
  type: 'SET_PATIENT',
  payload: patient,
});

export const addPatientList = (newPatient: Patient): Action => ({
  type: 'ADD_PATIENT',
  payload: newPatient,
});

export const addEntryList = (entry: Entry, id: string): Action => {
  return {
    type: 'ADD_ENTRY',
    id,
    payload: entry,
  };
};

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
    case 'SET_PATIENT':
      return {
        ...state,
        patient: {
          ...action.payload,
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
            (memo, diagnose) =>
              <Diagnose[]>{ ...memo, [diagnose.code]: diagnose },
            {}
          ),
          ...state.diagnoses,
        },
      };
    case 'ADD_ENTRY': {
      const patient = state.patients[action.id];
      const updatedPatient: Patient = { ...patient };
      if (patient.entries) {
        updatedPatient.entries.concat(action.payload);
      } else {
        updatedPatient.entries = [action.payload];
      }
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.id]: updatedPatient,
        },
      };
    }
    default:
      return state;
  }
};
