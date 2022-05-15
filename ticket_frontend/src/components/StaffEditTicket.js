import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Iconify from './Iconify';
import { TextField } from '@mui/material';
import History from './History';
import { AuthContext } from 'src/firebase/Auth';
import { staffUpdateTicket } from 'src/firebase/DataBase';
import { useSnackbar } from 'notistack';
export default function StaffEditTicket({TicketContent, TicketName, TicketID, isResolved, urls}) {
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
      if ( ticket === '') {
        enqueueSnackbar('text should not be empty', { variant: 'error' });
        return;
      }
      await staffUpdateTicket(currentUser,TicketID, ticket);
      enqueueSnackbar("Ticket replied Successfully", {variant: 'success'});
      setTicket('')
    } catch (error) {
      enqueueSnackbar(error.message, {variant: 'error'});
    }
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
            <History content={TicketContent} photourls={urls} />
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
            rows={8}
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
