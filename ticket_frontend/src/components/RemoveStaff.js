import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TableCell from '@mui/material/TableCell';
import { removeStaffById } from 'src/firebase/DataBase';
import { useSnackbar } from 'notistack';
export default function RemoveStaff({staffID, staffName}) {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleYes = () => {
      try
        {
            removeStaffById(staffID);
            setOpen(false);
            enqueueSnackbar("Successfully deleted " + staffName, { variant: 'success' });
        }
        catch(error)
        {
            enqueueSnackbar("Error deleting " + staffName, { variant: 'error' });
        }
    
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <TableCell align="right">
      <Button sx={{boderColor: 'none', "&:hover": {
      borderColor: 'none'
    } }} variant="outlined" onClick={handleClickOpen} color='error'>
      Remove
      </Button>
      </TableCell>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Removing {staffName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{color: '#FF4842'}} id="alert-dialog-description">
            Are you sure you want to remove {staffName}? Click yes to remove, click no to cancel.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleYes} autoFocus>Yes</Button>
          <Button onClick={handleClose} >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
