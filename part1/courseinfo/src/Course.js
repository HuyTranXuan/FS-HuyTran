import React from "react";

const Header = (props) => <h2>{props.course}</h2>;

const Content = ({ parts }) => (
	<div>
		{parts.map((part) => (
			<Part part={part.name} exercises={part.exercises} />
		))}
	</div>
);
const Part = ({ part, exercises }) => (
	<p>
		{part} {exercises}
	</p>
);

const Total = ({ parts }) => (
	<b>total of {parts.reduce((s, p) => s + p.exercises, 0)} exercises</b>
);

const Course = ({ course }) => (
	<div>
		<Header course={course.name} />
		<Content parts={course.parts} />
		<Total parts={course.parts} />
	</div>
);

export default Course;
