import { faker } from '@faker-js/faker';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
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


// ----------------------------------------------------------------------


export default function NewRequest() {
  return (
    <Card>
      <CardHeader title="Create new ticket" />
      <Grid container spacing={3} padding={3}>
        <Grid item xs={8}>
          <TextField
            required
            id="title"
            name="title"
            label="Breifly summarize the issue"
            fullWidth
            variant="filled"
          />
        </Grid>
        <Grid item xs={2}>
            <Stack spacing={1}>
            <Button variant='contained' startIcon={<Iconify icon="mdi:weather-cloudy-arrow-right" />} >Submit</Button>
            <Button variant='contained' color='warning' startIcon={<Iconify icon="mdi:backspace" />} >Clear</Button>
            </Stack>
            </Grid>
        <Grid item xs={10}>
          <TextField
            required
            id="content"
            name="content"
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
