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
import History from './History';

export default function EditTicket() {
  const [open, setOpen] = React.useState(false);
  const [ticket, setTicket] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitReply = () => {
    let obj = {
      
    }
    setOpen(false);
  }

  return (
    <React.Fragment>
     <Button variant='contained' color='warning' startIcon={<Iconify icon="clarity:note-edit-line" />} onClick={handleClickOpen}>Edit</Button>
     <Button variant='contained' startIcon={<Iconify icon="akar-icons:check-box" />}>Resolve</Button>
      <Dialog
        fullWidth
        maxWidth='md'
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Ticket name</DialogTitle>
        <DialogContent>
          <Box>
            <History />
          </Box>
          <TextField
            required
            id="content"
            name="content"
            value={ticket}
            oncChange={(e) => setTicket(e.target.value)}
            label="Enter you problem"
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
