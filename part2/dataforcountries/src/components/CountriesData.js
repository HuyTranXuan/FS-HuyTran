import {
  Typography,
  Button,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Card,
  CardContent,
} from '@material-ui/core'

export const CountriesData = ({
  handleShowCountry,
  countryData,
  showState,
}) => {
  if (!showState) {
    return (
      <Typography variant="h4">
        Too many matches, specify another filter
      </Typography>
    )
  }
  if (showState && countryData.length > 1) {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Table>
            <TableBody>
              {countryData.map((c) => (
                <TableRow key={c.name.common}>
                  <TableCell>
                    <Typography variant="body2">{c.name.common}</Typography>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleShowCountry(c)} text="show">
                      show
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
  return null
}
