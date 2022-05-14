import { faker } from '@faker-js/faker';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import * as React from 'react';
// material
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader, Input } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
// utils
import Iconify from './Iconify';
import AssignDialog from './AssignDialog';
import { AuthContext } from 'src/firebase/Auth';
import { useSnackbar } from 'notistack';
import { uploadImage } from 'src/firebase/Storage';
// ----------------------------------------------------------------------

import { userAddTicket } from 'src/firebase/DataBase';


export default function NewRequest() {
  const [selectImage, setSelectedImage] = React.useState(null);
  const { currentUser } = React.useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = React.useState('');
  const [tickettext, setTickettext] = React.useState('');
  const handleSelectImage = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  }
  const handleSubmitTicket = async () => {
    try {
      let url = "";
      if(selectImage){
        url = await uploadImage(selectImage);
      }
      if (title === '' || tickettext === '') {
        enqueueSnackbar('text or title should not be empty', { variant: 'error' });
        return;
      }
      userAddTicket(currentUser, title, tickettext, url);
      enqueueSnackbar("Ticket submitted Successfully", { variant: 'success' });
      setSelectedImage(null)
      setTitle('');
      setTickettext('');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }
  const handleClearText = () => {
    setTitle('');
    setTickettext('');
    enqueueSnackbar("Text cleared", { variant: 'success' });
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
        <Grid item xs={10} sx={{ position: 'relative' }}>
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

          <Box  sx={{ position: 'absolute', bottom: 8, left: 32 }}>
            <label htmlFor="contained-button-file">
              <Input sx={{display: 'none'}} fullWidth accept="image/*" id="contained-button-file" multiple type="file" onChange={handleSelectImage}></Input>
              <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
              </IconButton>
            </label>
            
          </Box>
        </Grid>
      </Grid>

    </Card>
  );
}
