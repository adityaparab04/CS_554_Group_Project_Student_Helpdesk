// material
import { Box, Grid, Container, Typography } from '@mui/material';
import * as React from 'react';
import ListofTickets from 'src/components/ListofTickets';
import Mytickets from 'src/components/Mytickets';
import NewRequest from 'src/components/Newrequest';
// components
import Page from '../components/Page';
import { AuthContext } from '../firebase/Auth';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../sections/@dashboard/app';
import { listTicketsByClientID,listAllTickets } from 'src/firebase/DataBase';

// ----------------------------------------------------------------------

export default function Client() {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    listAllTickets(setData);
  },[]);
  return (
    <Page title="Client">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>


          <Grid item lg={10}>
            <Mytickets data={data}/>
            
          </Grid>
          <Grid item lg={10}>
            <NewRequest />
            
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
