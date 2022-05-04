import { faker } from '@faker-js/faker';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import * as React from 'react';
// material
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { mockImgCover } from '../utils/mockImages';
//
import Scrollbar from './Scrollbar';
import Iconify from './Iconify';
import AssignDialog from './AssignDialog';
import { AuthContext } from 'src/firebase/Auth';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

import { userAddTicket } from 'src/firebase/DataBase';


export default function NewRequest() {
  const { currentUser } = React.useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = React.useState('');
  const [tickettext, setTickettext] = React.useState('');
  const handleSubmitTicket = async () => {
    try {
      userAddTicket(currentUser, title, tickettext);
      enqueueSnackbar("Ticket submitted Successfully", { variant: 'success' });
      setTitle('');
      setTickettext('');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }
  const handleClearText = () => {
    setTitle('');
    setTickettext('');
    enqueueSnackbar("Text clared", { variant: 'success' });
  }
  return (
    <Card>
      <CardHeader title="Create new ticket" />
      <Grid container spacing={3} padding={3}>
        <Grid item xs={8}>
          <TextField
            required
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Breifly summarize the issue"
            fullWidth
            variant="filled"
          />
        </Grid>
        <Grid item xs={2}>
          <Stack spacing={1}>
            <Button variant='contained' onClick={handleSubmitTicket} startIcon={<Iconify icon="mdi:weather-cloudy-arrow-right" />} >Submit</Button>
            <Button variant='contained' color='warning' startIcon={<Iconify icon="mdi:backspace" />} onClick={handleClearText}>Clear</Button>
          </Stack>
        </Grid>
        <Grid item xs={10}>
          <TextField
            required
            id="content"
            name="content"
            value={tickettext}
            onChange={(e) => setTickettext(e.target.value)}
            label="Enter you problem"
            fullWidth
            multiline
            rows={10}
            variant="filled"
          />
        </Grid>
      </Grid>

    </Card>
  );
}
