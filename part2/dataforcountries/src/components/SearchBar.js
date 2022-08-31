import { Typography, TextField } from '@material-ui/core'

const margin = { marginBottom: '0.5em' }

export const SearchBar = ({ searchQuerry, handlesearchQuerry }) => (
  <div>
    <Typography variant="h4" style={margin}>
      Find countries
    </Typography>
    <TextField
      value={searchQuerry}
      onChange={handlesearchQuerry}
      helperText="Please type in country name"
      style={margin}
    />
  </div>
)
