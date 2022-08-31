import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Grid } from '@material-ui/core'

import { ShowCountry } from './components/ShowCountry'
import { CountriesData } from './components/CountriesData'
import { SearchBar } from './components/SearchBar'

const App = () => {
  const [countriesData, setCountriesData] = useState([])
  const [searchQuerry, setSearchQuerry] = useState('')
  const [country, setCountry] = useState('')
  const [showState, setShowState] = useState('')
  const [countryData, setCountryData] = useState([])
  const [weatherData, setWeatherData] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountriesData(response.data)
    })
  }, [])
  const processWeather = (capital) => {
    const key = process.env.REACT_APP_API_KEY
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${key}`
    const getAll = () => {
      const request = axios.get(url)
      return request.then((r) => r.data)
    }
    if (capital) getAll().then((r) => setWeatherData(r))
  }
  const handleShowCountry = (c) => {
    const capital = c.capital[0]
    processWeather(capital)
    setCountry(c)
  }

  const handlesearchQuerry = (event) => {
    const searchValue = event.target.value
    setSearchQuerry(searchValue)
    const cData = countriesData.filter((c) =>
      c.name.common.toLowerCase().includes(searchValue.toLowerCase())
    )
    setShowState(cData.length <= 10 ? true : false)
    setCountryData(cData)
    setCountry(cData.length === 1 ? cData[0] : '')
    let capital = cData.length === 1 ? cData[0].capital[0] : ''
    processWeather(capital)
  }
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SearchBar
            setSearchQuerry={searchQuerry}
            handlesearchQuerry={handlesearchQuerry}
          />
        </Grid>
        <Grid item xs={8}>
          <CountriesData
            setCountry={setCountry}
            showState={showState}
            countryData={countryData}
            handleShowCountry={handleShowCountry}
          />
        </Grid>
        <Grid item xs={4} direction="column">
          <ShowCountry country={country} weatherData={weatherData} />
        </Grid>
      </Grid>
    </div>
  )
}

export default App
