import { Grid, Button } from '@material-ui/core';

const BaseButtons: React.FC<{
  onCancel: () => void;
  dirty: boolean;
  isValid: boolean;
}> = ({ onCancel, dirty, isValid }) => {
  return (
    <Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          style={{ float: 'left' }}
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button
          style={{
            float: 'right',
          }}
          type="submit"
          variant="contained"
          disabled={!dirty || !isValid}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
};
export default BaseButtons;
