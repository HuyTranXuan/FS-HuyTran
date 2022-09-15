import React from 'react';
import axios from 'axios';
import { Typography, Button, ButtonGroup } from '@material-ui/core';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { useParams } from 'react-router';
import { apiBaseUrl } from '../constants';

import { EntryDetails } from './EntryDetails';
import { Entry, Patient } from '../types';
import { HealthCheckFormValues } from '../AddEntryModal/HealthCheckModal/AddHealthCheckEntryForm';
import { useStateValue, addEntryList, setPatient } from '../state';
import AddHealthCheckEntryModal from '../AddEntryModal/HealthCheckModal';
import AddHospitalEntryModal from '../AddEntryModal/HospitalModal';
import { HospitalFormValues } from '../AddEntryModal/HospitalModal/AddHospitalEntryForm';

const IndividualPatient = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const [healthCheckModalOpen, setHealthCheckModalOpen] =
    React.useState<boolean>(false);
  const [hospitalModalOpen, setHospitalModalOpen] =
    React.useState<boolean>(false);

  const [error, setError] = React.useState<string>();
  const openHealthCheckModal = (): void => setHealthCheckModalOpen(true);
  const openHospitalModal = (): void => setHospitalModalOpen(true);
  const closeHealthCheckModal = (): void => {
    setHealthCheckModalOpen(false);
    setError(undefined);
  };
  const closeHospitalModal = (): void => {
    setHospitalModalOpen(false);
    setError(undefined);
  };
  const padding = { padding: '1rem' };

  const { id } = useParams();
  if (!id) return null;
  else {
    // const patient = patients[id];

    const Gender: React.FC<{
      gender: string;
    }> = ({ gender }) => {
      let result = null;
      if (gender === 'male') result = <MaleIcon />;
      if (gender === 'female') result = <FemaleIcon />;
      return result;
    };

    const submitHealthCheck = async (values: HealthCheckFormValues) => {
      try {
        if (id) {
          const { data: newEntry } = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          dispatch(addEntryList(newEntry, id));
          closeHealthCheckModal();
        }
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || 'Unrecognized axios error');
          setError(
            String(e?.response?.data?.error) || 'Unrecognized axios error'
          );
        } else {
          console.error('Unknown error', e);
          setError('Unknown error');
        }
      }
    };
    const submitHospital = async (values: HospitalFormValues) => {
      try {
        if (id) {
          const { data: newEntry } = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          dispatch(addEntryList(newEntry, id));
          closeHospitalModal();
        }
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || 'Unrecognized axios error');
          setError(
            String(e?.response?.data?.error) || 'Unrecognized axios error'
          );
        } else {
          console.error('Unknown error', e);
          setError('Unknown error');
        }
      }
    };
    React.useEffect(() => {
      const fetchPatientById = async () => {
        try {
          const { data: patient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setPatient(patient));
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || 'Unrecognized axios error');
            setError(
              String(e?.response?.data?.error) || 'Unrecognized axios error'
            );
          } else {
            console.error('Unknown error', e);
            setError('Unknown error');
          }
        }
      };

      void fetchPatientById();
    }, [dispatch, patient]);
    if (patient === undefined) return null;
    else
      return (
        <div className="App">
          <div className="InfoAndEntries">
            <Typography style={padding} variant="h6">
              <b>{patient.name} </b>
              <Gender gender={patient.gender} />
              <br />
              ssn: {patient.ssn}
              <br />
              occupation: {patient.occupation}
              <br />
              <b>entries</b>
            </Typography>
            {patient.entries.map((entry) => (
              <EntryDetails
                key={entry.id}
                entry={entry}
                diagnoses={diagnoses}
              />
            ))}
          </div>
          <AddHealthCheckEntryModal
            modalOpen={healthCheckModalOpen}
            onSubmit={submitHealthCheck}
            error={error}
            onClose={closeHealthCheckModal}
          />
          <AddHospitalEntryModal
            modalOpen={hospitalModalOpen}
            onSubmit={submitHospital}
            error={error}
            onClose={closeHospitalModal}
          />
          <ButtonGroup
            variant="outlined"
            aria-label="outlined primary button group"
            color="primary"
          >
            <Button onClick={() => openHealthCheckModal()}>
              Add Health Check Entry
            </Button>
            <Button onClick={() => openHospitalModal()}>
              Add Hospital Entry
            </Button>
            <Button onClick={() => openHealthCheckModal()}>
              Add Occupational Healthcare Entry
            </Button>
          </ButtonGroup>
        </div>
      );
  }
};

export default IndividualPatient;
