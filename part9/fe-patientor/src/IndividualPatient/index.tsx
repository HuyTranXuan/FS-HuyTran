import { Typography } from '@material-ui/core';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Diagnose, Entry } from '../types';

import { useStateValue } from '../state';
import { useParams } from 'react-router';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{
  entry: Entry;
  diagnoses: { [id: string]: Diagnose };
}> = ({ entry, diagnoses }) => {
  let entryPart = <></>;
  const myStyle = {
    padding: '1rem',
    margin: '1rem',
    borderWidth: '.5rem',
    border: 'solid',
  };
  switch (entry.type) {
    case 'Hospital':
      entryPart = (
        <div>
          <br />
          discharge information:
          <p>date: {entry.discharge.date}</p>
          <p>criteria: {entry.discharge.criteria}</p>
        </div>
      );
      break;
    case 'HealthCheck':
      entryPart = <div>health Check Rating {entry.healthCheckRating}</div>;
      break;
    case 'OccupationalHealthcare':
      entryPart = <div>employer name {entry.employerName}</div>;
      break;
    default:
      assertNever(entry);
      break;
  }
  return (
    <div key={entry.id} style={myStyle}>
      {entry.date} {entry.description}
      {entry.diagnosisCodes === undefined ? null : (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code}
              {diagnoses[code].name}
            </li>
          ))}
        </ul>
      )}
      diagnose by {entry.specialist}
      {entryPart}
    </div>
  );
};

const IndividualPatient = () => {
  const [{ patients, diagnoses }] = useStateValue();
  const padding = { padding: '1rem' };
  // const [error, setError] = React.useState<string>();
  // console.log(diagnoses);

  const { id } = useParams();
  // if (error)
  if (!id) return null;
  else {
    const patient = patients[id];
    // const individualDiagnoses =

    return (
      <div className="App">
        <div>
          <Typography style={padding} variant="h6">
            <b>{patient.name} </b>
            {patient.gender === 'male' ? (
              <MaleIcon></MaleIcon>
            ) : (
              <FemaleIcon></FemaleIcon>
            )}
            <br />
            ssn: {patient.ssn}
            <br />
            occupation: {patient.occupation}
            <br />
            <b>entries</b>
          </Typography>
          {patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
          ))}
        </div>
      </div>
    );
  }
};

export {};
export default IndividualPatient;
