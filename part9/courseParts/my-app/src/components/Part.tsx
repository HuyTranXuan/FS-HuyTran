/* eslint-disable @typescript-eslint/no-explicit-any */
import { CoursePart } from '../App';

export const Part = ({ course }: { course: CoursePart }): JSX.Element => {
  let result = <></>;
  const padding = { paddingTop: '.5rem' };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (course.type) {
    case 'normal':
      result = (
        <div style={padding}>
          <b>
            {course.name} {course.exerciseCount}{' '}
          </b>
          <p>{course.description}</p>
        </div>
      );
      break;
    case 'groupProject':
      result = (
        <div style={padding}>
          <b>
            {course.name} {course.exerciseCount}{' '}
          </b>
          <p>project exercises {course.groupProjectCount}</p>
        </div>
      );
      break;
    case 'submission':
      result = (
        <div style={padding}>
          <b>
            {course.name} {course.exerciseCount}{' '}
          </b>
          <p>{course.description} </p>
          <p>submit to {course.exerciseSubmissionLink}</p>
        </div>
      );
      break;
    case 'special':
      result = (
        <div style={padding}>
          <b>
            {course.name} {course.exerciseCount}{' '}
          </b>
          <p>{course.description} </p>
          <p>required skills: {course.requirements.join(', ')}</p>
        </div>
      );
      break;
    default:
      assertNever(course);
      break;
  }

  return result;
};
