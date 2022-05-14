import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Card, Button, Divider, Typography, CardHeader, Stack,Link } from '@mui/material';
import History from './History';
export default function TicketDetails({TicketTitle, TicketContent, urls}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link sx={{'&:hover': {
          cursor: 'pointer',
      },}} to="#" color="inherit" underline="hover" onClick={handleClickOpen}>
          <Typography variant="subtitle2" noWrap>
            {TicketTitle}
          </Typography>
        </Link>
      <Dialog fullWidth maxWidth='md' open={open} onClose={handleClose}>
        <DialogTitle>{TicketTitle}</DialogTitle>
        <DialogContent>
            <History content={TicketContent} photourls={urls}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
