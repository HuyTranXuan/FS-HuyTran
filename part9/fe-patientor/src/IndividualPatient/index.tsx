import React from 'react';
// import axios from 'axios';
import { Box, Typography } from '@material-ui/core';

// import { PatientFormValues } from '../AddPatientModal/AddPatientForm';
// import { State } from '../types';
// import { apiBaseUrl } from '../constants';
// import HealthRatingBar from '../components/HealthRatingBar';
import { useStateValue } from '../state';
import { useParams } from 'react-router';

// import { Link } from 'react-router-dom';
//Routes, Route,

const IndividualPatient = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams();
  if (!id) return null;
  else {
    const patient = patients[id];
    console.log(patient, dispatch);

    //   const [error, setError] = React.useState<string>();

    return (
      <div className="App">
        <Box>
          <Typography align="center" variant="h6">
            Individual Patient Informations
            {id}
          </Typography>
        </Box>
      </div>
    );
  }
};

export {};
export default IndividualPatient;
