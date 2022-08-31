import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core'
import { Weather } from './Weather'

export const ShowCountry = ({ country, weatherData }) => {
  const padding = { paddingTop: '.35rem' }
  if (country) {
    const languages = Object.values(country.languages)
    const flags = country.flags.png
    const capital = country.capital[0]
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div" style={padding}>
            {country.name.common}
          </Typography>
          <Typography
            sx={{ fontSize: 14 }}
            gutterBottom
            key={capital}
            style={padding}
          >
            Capital: {capital}
          </Typography>
          <Typography
            key={country.population}
            sx={{ fontSize: 14 }}
            style={padding}
          >
            Population: {country.population}
          </Typography>
          <Typography variant="h6" style={padding}>
            Languages:
          </Typography>
          {languages.map((l) => (
            <Typography variant="body2" key={l} style={padding}>
              {l}
            </Typography>
          ))}
          <img
            src={flags}
            alt=""
            width="200"
            height="100"
            style={padding}
          ></img>
          <Weather weatherData={weatherData} country={country} />
        </CardContent>
        <CardActions>
          <Button size="small">Add to wishlist</Button>
        </CardActions>
      </Card>
    )
  } else {
    return null
  }
}
