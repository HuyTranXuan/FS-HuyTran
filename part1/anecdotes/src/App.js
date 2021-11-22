import React, { useState } from "react";

const Button = (props) => (
	<button onClick={props.handleClick}>{props.text}</button>
);

const Anecdote = ({ title, text, vote }) => (
	<div>
		<h1>{title}</h1>
		<h3>{text}</h3>
		<h3>has {vote} votes</h3>
	</div>
);

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
	];

	const points = Array(anecdotes.length).fill(0);
	const [selected, setSelected] = useState(0);
	const [allVotes, setVotes] = useState(points);
	const [bestJoke, setBestJoke] = useState(0);

	const setRandom = () => {
		const r = Math.floor(Math.random() * anecdotes.length);
		setSelected(r);
	};
	const setVote = () => {
		const copy = [...allVotes];
		copy[selected] += 1;
		setVotes(copy);
		setBestJoke(copy.indexOf(Math.max(...copy)));
	};

	return (
		<div>
			<Anecdote
				title="Anecdote of the day"
				text={anecdotes[selected]}
				vote={allVotes[selected]}
			/>
			<Button handleClick={() => setVote()} text="vote" />
			<Button handleClick={() => setRandom()} text="next anecdote" />
			<br></br>
			<Anecdote
				title="Anecdote with most votes"
				text={anecdotes[bestJoke]}
				vote={allVotes[bestJoke]}
			/>
		</div>
	);
};

export default App;
