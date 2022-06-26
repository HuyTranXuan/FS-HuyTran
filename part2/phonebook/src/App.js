import React, { useState, useEffect } from "react";
import backEndServices from "./backEndServices.js";

const Persons = ({ persons, searchQuerry, setPersons }) => (
	<div>
		{persons
			.filter((p) => p.name.toLowerCase().includes(searchQuerry.toLowerCase()))
			.map((p) => (
				<li key={p.id}>
					{p.name} {p.number}{" "}
					<Button
						handleClick={() => {
							if (window.confirm(`Delete ${p.name} ?`)) {
								backEndServices.remove(p.id);
								setPersons(persons.filter((person) => person.id !== p.id));
							}
						}}
						text="Delete"
					/>
				</li>
			))}
	</div>
);
const Button = (props) => (
	<button onClick={props.handleClick}>{props.text}</button>
);
const Filter = ({ searchQuerry, handlesearchQuerry }) => (
	<div>
		filter shown with:
		<input value={searchQuerry} onChange={handlesearchQuerry} />
	</div>
);
const PersonForm = ({
	newName,
	handleNameChange,
	newNum,
	handleNumChange,
	addPerson,
}) => (
	<form onSubmit={addPerson}>
		<div>
			name: <input value={newName} onChange={handleNameChange} />
		</div>
		<div>
			number: <input value={newNum} onChange={handleNumChange} />
		</div>
		<div>
			<button type="submit">add</button>
		</div>
	</form>
);
const Notification = ({ message }) => {
	const notification = {
		color: "#042301",
		fontStyle: "bold",
		fontSize: 26,
		backgroundColor: "#88fa7e",
		borderRadius: 5,
		padding: 5,
		margin: 5,
		marginLeft: 0,
	};
	const warning = { ...notification, backgroundColor: "#ff0036" };
	if (message === null) {
		return null;
	}
	if (message.includes("already") || message.includes("failed"))
		return <div style={warning}>{message}</div>;
	else return <div style={notification}>{message}</div>;
};
const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNum, setNewNum] = useState("");
	const [searchQuerry, setSearchQuerry] = useState("");
	const [message, setMessage] = useState(null);

	useEffect(() => {
		backEndServices.getAll().then((p) => {
			setPersons(p);
		});
	}, []);

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};
	const handleNumChange = (event) => {
		setNewNum(event.target.value);
	};
	const handlesearchQuerry = (event) => {
		setSearchQuerry(event.target.value);
	};

	const addPerson = (event) => {
		event.preventDefault();
		const foundTarget = persons.find((p) => p.name === newName);
		if (!foundTarget) {
			const newPerson = {
				name: newName,
				number: newNum,
			};
			backEndServices
				.create(newPerson)
				.then((p) => {
					setPersons(persons.concat(p));
					setMessage(`Added ${p.name}`);
					setTimeout(() => {
						setMessage(null);
					}, 4000);
				})
				.catch((error) => {setMessage(error.response.data);});
		} else {
			if (foundTarget.number === newNum)
				window.alert(`${newName} is already added to phonebook`);
			else {
				const newPerson = {
					name: newName,
					number: newNum,
				};
				if (
					window.confirm(
						`${newPerson.name} is already added to phonebook, replace the old number with a new one?`
					)
				) {
					backEndServices
						.update(foundTarget.id, newPerson)
						.then((r) =>
							setPersons(
								persons.map((p) => {
									console.log(newPerson.name);
									setMessage(
										`Phone number for ${newPerson.name} updated complete`
									);
									setTimeout(() => {
										setMessage(null);
									}, 4000);
									return p.id === foundTarget.id ? r : p;
								})
							)
						)
						.catch((error) => {
							let message = "some error happended";
							if (error) {
								message = `${error.response.data}`
							  }
							else{
								message=`Information of ${newPerson.name} has already been removed from server`
							}
							setMessage(message);
							setTimeout(() => {
								setMessage(null);
							}, 8000);
							setPersons(
								persons.filter((person) => person.name !== newPerson.name)
							);
						});
				}
			}
		}
		setNewName("");
		setNewNum("");
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />
			<Filter
				setSearchQuerry={searchQuerry}
				handlesearchQuerry={handlesearchQuerry}
			/>
			<h2>add a new</h2>
			<PersonForm
				newName={newName}
				handleNameChange={handleNameChange}
				newNum={newNum}
				handleNumChange={handleNumChange}
				addPerson={addPerson}
			/>
			<h3>Numbers</h3>
			<Persons
				persons={persons}
				searchQuerry={searchQuerry}
				setPersons={setPersons}
			/>
		</div>
	);
};

export default App;
