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
import Grid from '@mui/material/Grid';
import { TextField,Input } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
import History from './History';
import { AuthContext } from 'src/firebase/Auth';
import { userUpdateTicket, userResolveTicket } from 'src/firebase/DataBase';
import { useSnackbar } from 'notistack';
import { uploadImage } from 'src/firebase/Storage';

export default function EditTicket({ TicketContent, TicketName, TicketID, isResolved, photoURL }) {
  const [open, setOpen] = React.useState(false);
  const [selectImage, setSelectedImage] = React.useState(null);
  const [ticket, setTicket] = React.useState('');
  const { currentUser } = React.useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const handleSelectImage = (e) => {
    console.log('e.target.files[0]')
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleResolveTicket = async () => {
    try {
      await userResolveTicket(TicketID);
      enqueueSnackbar("Ticket resolved Successfully", { variant: 'success' });
      setTicket('');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
    setOpen(false);
  }
  const handleSubmitReply = async () => {
    try {
      let url = "";
      if(selectImage){
        url = await uploadImage(selectImage);
      }
      if ( ticket === '') {
        enqueueSnackbar('text should not be empty', { variant: 'error' });
        return;
      }
      await userUpdateTicket(currentUser, TicketID, ticket, url);
      enqueueSnackbar("Ticket replied Successfully", { variant: 'success' });
      setTicket('');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
    // setOpen(false);
  }

  return (
    <React.Fragment>
      <Box sx={{display: 'flex', gap: '1rem'}}>
        <Button variant='contained' color='warning' startIcon={<Iconify icon="clarity:note-edit-line" />} onClick={handleClickOpen}>View/Edit</Button>
        <Button variant='contained' startIcon={<Iconify icon="akar-icons:check-box" />} disabled={isResolved} onClick={handleResolveTicket}>Resolve</Button>
      </Box>

      <Dialog
        fullWidth
        maxWidth='md'
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{TicketName}</DialogTitle>
        <DialogContent>
          <Box>
            <History content={TicketContent} photourls={photoURL} />
          </Box>
          {!isResolved &&<Box sx={{ position: 'relative' }}>
           <TextField
            required
            id="content"
            name="content"
            value={ticket}
            onChange={(e) => setTicket(e.target.value)}
            label="Enter you problem"
            fullWidth
            multiline
            rows={8}
            variant="filled"
          />
          <Box sx={{ position: 'absolute', bottom: 8, left: 16 }}>
          <label  htmlFor={"contained-button-file" + TicketID}>
              <Input sx={{display: 'none'}} fullWidth accept="image/*" id={"contained-button-file" + TicketID} multiple type="file" onChange={handleSelectImage}></Input>
              <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
              </IconButton>
            </label>
            </Box>
          </Box>}
        </DialogContent>
        <DialogActions>
          {!isResolved && <Button onClick={handleSubmitReply}>Submit</Button>}
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
        
      </Dialog>
    </React.Fragment>
  );
}
