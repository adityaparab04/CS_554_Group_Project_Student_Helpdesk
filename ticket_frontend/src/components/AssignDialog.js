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
import { useSnackbar } from 'notistack';
import {getAllStaff,adminAssignTicket,adminUnassignTicket} from '../firebase/DataBase';
export default function AssignDialog({TicketTitle, TicketID, isAssigned, isResolved}) {
  const [open, setOpen] = React.useState(false);
  const [selectedstaff, setSelectedstaff] = React.useState(``);
  const [staff, setStaff] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {

    const getStaff = async () => {
      try {
        let objs = await getAllStaff();
        setStaff(objs);
      } catch (error) {
        console.log(error);
      }
    }
    getStaff();
  }, []);
  const handleSelectStaff = (event) => {
    setSelectedstaff(event.target.value);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAssign = async () => {
      if (selectedstaff === ``) {
        enqueueSnackbar("Please select a staff", {variant: 'error'});
        return;
      }
      try {
        await adminAssignTicket(TicketID, selectedstaff);
        enqueueSnackbar("Ticket Assigned", { variant: "success" });
        setOpen(false);
      } catch (error) {
        console.log(error)
        enqueueSnackbar(error.message, {variant: 'error'});
      }
  }
  const handleUnassign = async () => {
    try {
      await adminUnassignTicket(TicketID);
      enqueueSnackbar("Ticket Unassigned", { variant: "success" });
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error.message, {variant: 'error'});
    }
  }
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
      <Button sx={{width:150}} variant='contained' color='warning' startIcon={<Iconify icon="mdi:account-cancel-outline" />} onClick={handleUnassign}>Unassign</Button>
      </>
    )
  }
  return (
    <React.Fragment>
     <Button sx={{width:150}} variant='contained' startIcon={<Iconify icon="mdi:account-arrow-right" />} onClick={handleClickOpen}>Assign</Button>
      <Dialog
        fullWidth
        maxWidth='md'
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
                value={selectedstaff}
                onChange={handleSelectStaff}
                label="select staff"
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
              >
                {staff.map((employee,index) => (
              <MenuItem key={index} value={employee.uid}>{employee.firstName} {employee.lastName}</MenuItem>
            ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleAssign}>Apply</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      
    </React.Fragment>
  );
}
