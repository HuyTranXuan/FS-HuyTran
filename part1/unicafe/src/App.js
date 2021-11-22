import React, { useState } from "react";

const Button = (props) => (
	<button onClick={props.handleClick}>{props.text}</button>
);

const StatisticLine = ({ text, value }) => (
	<tbody>
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	</tbody>
);

const Statistics = ({ good, neutral, bad }) => {
	const all = good + bad + neutral;
	if (all === 0)
		return (
			<div>
				<p>No feedback given</p>
			</div>
		);
	else
		return (
			<table>
				<StatisticLine text="good" value={good} />
				<StatisticLine text="neutral" value={neutral} />
				<StatisticLine text="bad" value={bad} />

				<StatisticLine text="all" value={all} />
				<StatisticLine text="average" value={(good - bad) / all} />
				<StatisticLine text="positive" value={`${(good * 100) / all} %`} />
			</table>
		);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<h1>give feedback</h1>
			<Button handleClick={() => setGood(good + 1)} text="good" />
			<Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
			<Button handleClick={() => setBad(bad + 1)} text="bad" />
			<h1>statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
