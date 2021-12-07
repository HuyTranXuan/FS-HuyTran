import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ searchQuerry, handlesearchQuerry }) => (
	<div>
		<p>find countries </p>
		<input value={searchQuerry} onChange={handlesearchQuerry} />
	</div>
);
const Button = (props) => (
	<button onClick={props.handleClick}>{props.text}</button>
);
const Weather = ({ weatherData, country }) => {
	if (weatherData && country) {
		const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
		return (
			<div>
				<br></br>
				<h3>Weather in {weatherData.name}</h3>
				<br></br>
				<b>{weatherData.weather[0].description}</b>
				<br></br>
				<img src={icon} alt="" width="100" height="100"></img>
				<br></br>
				<b>temperature: {weatherData.main.temp} Kelvin</b>
				<br></br>
				<b>wind: {weatherData.wind.speed} meter/sec</b>
			</div>
		);
	} else return <div></div>;
};
const ShowCountry = ({ country }) => {
	if (country) {
		const languages = Object.values(country.languages);
		const flags = country.flags.png;
		const capital = country.capital[0];
		return (
			<div>
				<h2>{country.name.common}</h2>
				<p key={capital}>{capital}</p>
				<p key={country.population}>{country.population}</p>
				<h3>languages</h3>
				{languages.map((l) => (
					<li key={l}>{l}</li>
				))}
				<br></br>
				<img src={flags} alt="" width="200" height="100"></img>
			</div>
		);
	} else {
		return <div></div>;
	}
};

const CountriesData = ({ handleShowCountry, countryData, showState }) => {
	if (!showState) {
		return <div> Too many matches, specify another filter</div>;
	}
	if (showState && countryData.length > 1) {
		return (
			<div>
				{countryData.map((c) => (
					<div key={c.name.common}>
						{c.name.common}{" "}
						<Button handleClick={() => handleShowCountry(c)} text="show" />
						<br></br>
					</div>
				))}
			</div>
		);
	}
	return <div></div>;
};

const App = () => {
	const [countriesData, setCountriesData] = useState([]);
	const [searchQuerry, setSearchQuerry] = useState("");
	const [country, setCountry] = useState("");
	const [showState, setShowState] = useState("");
	const [countryData, setCountryData] = useState([]);
	const [weatherData, setWeatherData] = useState("");

	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			setCountriesData(response.data);
		});
	}, []);
	const processWeather = (capital) => {
		const key = process.env.REACT_APP_API_KEY;
		let url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${key}`;
		const getAll = () => {
			const request = axios.get(url);
			return request.then((r) => r.data);
		};
		if (capital) getAll().then((r) => setWeatherData(r));
	};
	const handleShowCountry = (c) => {
		const capital = c.capital[0];
		processWeather(capital);
		setCountry(c);
	};

	const handlesearchQuerry = (event) => {
		const searchValue = event.target.value;
		setSearchQuerry(searchValue);
		const cData = countriesData.filter((c) =>
			c.name.common.toLowerCase().includes(searchValue.toLowerCase())
		);
		setShowState(cData.length <= 10 ? true : false);
		setCountryData(cData);
		setCountry(cData.length === 1 ? cData[0] : "");
		let capital = cData.length === 1 ? cData[0].capital[0] : "";
		processWeather(capital);
	};
	return (
		<div>
			<p>{searchQuerry}</p>
			<Filter
				setSearchQuerry={searchQuerry}
				handlesearchQuerry={handlesearchQuerry}
			/>
			<CountriesData
				setCountry={setCountry}
				showState={showState}
				countryData={countryData}
				handleShowCountry={handleShowCountry}
			/>
			<ShowCountry country={country} />
			<Weather weatherData={weatherData} country={country} />
		</div>
	);
};

export default App;
