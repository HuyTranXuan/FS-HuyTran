import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Total } from "./components/Total";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CourseDescriptivePart {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptivePart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseDescriptivePart extends CoursePartBase {
  description: string;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

const App = () => {
  const courseName = "Half Stack application development";
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    }
  ]

  return (
    <div>
      <Header name={courseName} />
      {courseParts.map(course=><Content key={course.name} course={course}/>)}

      {/* <Content course={courseParts[0]} />
      <Content course={courseParts[1]} />
      <Content course={courseParts[2]} /> */}

      <Total courseParts={courseParts}/>

    </div>
  );
};

export default App;