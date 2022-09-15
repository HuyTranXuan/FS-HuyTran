import { Diagnose, Entry } from '../types';

export const EntryDetails: React.FC<{
  entry: Entry;
  diagnoses: { [id: string]: Diagnose };
}> = ({ entry, diagnoses }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  let entryPart = <></>;
  const myStyle = {
    padding: '1rem',
    margin: '1rem',
    borderWidth: '.5rem',
    border: 'solid',
  };
  // console.log(entry.type, '<<<=======E N T R Y   T Y P E======');

  switch (entry.type) {
    case 'Hospital':
      if (
        entry.discharge.date.length === 10 &&
        entry.discharge.criteria.length > 0
      ) {
        entryPart = (
          <div>
            <br />
            discharge information:
            <p>date: {entry.discharge.date}</p>
            <p>criteria: {entry.discharge.criteria}</p>
          </div>
        );
      }
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
