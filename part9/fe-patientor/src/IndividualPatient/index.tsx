import React from 'react';
// import axios from 'axios';
import { Typography } from '@material-ui/core';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

// import { PatientFormValues } from '../AddPatientModal/AddPatientForm';
// import { State } from '../types';
// import { apiBaseUrl } from '../constants';
// import HealthRatingBar from '../components/HealthRatingBar';
import { useStateValue } from '../state';
import { useParams } from 'react-router';

// import { Link } from 'react-router-dom';
//Routes, Route,

const IndividualPatient = () => {
  const [{ patients }] = useStateValue();
  // const [error, setError] = React.useState<string>();

  const { id } = useParams();
  // if (error)
  if (!id) return null;
  else {
    const patient = patients[id];

    return (
      <div className="App">
        <div>
          <Typography align="center" variant="h6">
            <b>{patient.name} </b>
            {patient.gender === 'male' ? (
              <MaleIcon></MaleIcon>
            ) : (
              <FemaleIcon></FemaleIcon>
            )}
          </Typography>

          <Typography align="center" variant="h6">
            ssn: {patient.ssn}
          </Typography>
          <Typography align="center" variant="h6">
            occupation: {patient.occupation}
          </Typography>
        </div>
      </div>
    );
  }
};

export {};
export default IndividualPatient;
