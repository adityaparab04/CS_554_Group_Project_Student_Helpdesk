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
import { AuthContext } from 'src/firebase/Auth';
import { userUpdateTicket,userResolveTicket } from 'src/firebase/DataBase';
import { useSnackbar } from 'notistack';
export default function StaffEditTicket({TicketContent, TicketName, TicketID, isResolved}) {
  const [open, setOpen] = React.useState(false);
  const [ticket, setTicket] = React.useState('');
  const { currentUser } = React.useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitReply = async  () => {
    try {
      await userResolveTicket(TicketID);
      enqueueSnackbar("Ticket replied Successfully", {variant: 'success'});
      setTicket('')
    } catch (error) {
      enqueueSnackbar(error.message, {variant: 'error'});
    }
    setOpen(false);
  }
  const handleResolved = async () => {
    try {
      await userUpdateTicket(currentUser,TicketID,ticket,true);
    } catch (error) {
      enqueueSnackbar(error.message, {variant: 'error'});
    }
    setOpen(false);
  }

  return (
    <React.Fragment>
     <Button variant='contained' color='warning' startIcon={<Iconify icon="clarity:note-edit-line" />} onClick={handleClickOpen}>View/Edit</Button>
      <Dialog
        fullWidth
        maxWidth='md'
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{TicketName}</DialogTitle>
        <DialogContent>
          <Box>
            <History content={TicketContent} />
          </Box>
          {!isResolved && <TextField
            required
            id="content"
            name="content"
            value={ticket}
            onChange={(e) => setTicket(e.target.value)}
            label="Enter your reply"
            fullWidth
            multiline
            rows={10}
            variant="filled"
          />}
          
        </DialogContent>
        <DialogActions>
        {!isResolved && <Button onClick={handleSubmitReply}>Submit</Button>}
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
