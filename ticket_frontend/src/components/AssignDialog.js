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

export default function AssignDialog({TicketTitle, TicketID, isAssigned, isResolved}) {
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
  if (isResolved) {
    return(
      <>
      <Button sx={{width:150}} variant='outlined' color='warning' disabled startIcon={<Iconify icon="ic:baseline-done" />}>Resolved</Button>
      </>
    )
  }
  if (isAssigned) {
    return(
      <>
      <Button sx={{width:150}} variant='contained' color='warning' startIcon={<Iconify icon="mdi:account-cancel-outline" />}>Unassign</Button>
      </>
    )
  }
  return (
    <React.Fragment>
     <Button sx={{width:150}} variant='contained' startIcon={<Iconify icon="mdi:account-arrow-right" />} onClick={handleClickOpen}>Assign</Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Choose an employee for the Ticket:</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ticket Title: {TicketTitle}
          </DialogContentText>
          <DialogContentText>
            Ticket ID: {TicketID}
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <FormControl sx={{ mt: 2, width: 220 }}>
              <InputLabel htmlFor="max-width">Staff</InputLabel>
              <Select
                autoFocus
                value={maxWidth}
                onChange={handleMaxWidthChange}
                label="maxWidth"
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
              >
                <MenuItem value={false}>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      
    </React.Fragment>
  );
}
