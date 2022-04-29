import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Iconify from './Iconify';
import { TextField } from '@mui/material';

export default function StaffEditTicket() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment>
     <Button variant='contained' color='warning' startIcon={<Iconify icon="clarity:note-edit-line" />} onClick={handleClickOpen}>Reply</Button>
     {/* <Button variant='contained' startIcon={<Iconify icon="akar-icons:check-box" />}>Resolve</Button> */}
      <Dialog
        fullWidth={fullWidth}
        maxWidth='xl'
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Ticket name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            message history........ asdasdasd asdasdasdasd
          </DialogContentText>
          <DialogContentText>
            message history........ asdasdasd asdasdasdasd
          </DialogContentText>
          <DialogContentText>
            message history........ asdasdasd asdasdasdasd
          </DialogContentText>
          <DialogContentText>
            message history........ asdasdasd asdasdasdasd
          </DialogContentText>
          <DialogContentText>
            message history........ asdasdasd asdasdasdasd
          </DialogContentText>
          <TextField
            required
            id="content"
            name="content"
            label="Enter your response"
            fullWidth
            multiline
            rows={10}
            variant="filled"
          />
          
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Submit</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
