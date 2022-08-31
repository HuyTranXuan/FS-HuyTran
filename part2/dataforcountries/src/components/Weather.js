import { Typography } from '@material-ui/core'

export const Weather = ({ weatherData, country }) => {
  if (weatherData && country) {
    const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    return (
      <div>
        <br></br>
        <Typography variant="h6" component="div">
          Weather in {weatherData.name}
        </Typography>
        <br></br>
        <Typography variant="body2">
          Description: {weatherData.weather[0].description}
        </Typography>
        <br></br>
        <img src={icon} alt="" width="100" height="100"></img>
        <br></br>
        <Typography variant="body2">
          Temperature: {weatherData.main.temp} Kelvin
        </Typography>
        <br></br>
        <Typography variant="body2">
          Wind: {weatherData.wind.speed} meter/sec
        </Typography>
      </div>
    )
  } else return null
}
