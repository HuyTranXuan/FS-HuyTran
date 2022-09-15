import React from 'react';
import { Dialog, DialogTitle, DialogContent, Divider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AddOccupationalEntryForm, {
  OccupationalFormValues,
} from './AddOccupationalEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OccupationalFormValues) => void;
  error?: string;
}

const AddOccupationalEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new Occupational Healthcare entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddOccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddOccupationalEntryModal;
