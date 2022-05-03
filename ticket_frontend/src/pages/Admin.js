// material
import { Box, Grid, Container, Typography } from '@mui/material';
import ListofTickets from 'src/components/ListofTickets';
// components
import Page from '../components/Page';
import * as React from 'react';
import { listAllTickets } from 'src/firebase/DataBase';
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

// ----------------------------------------------------------------------

export default function Admin() {
  const [data, setData] = React.useState(null);
  const fetchTickets = async () => {
    try {
      const tickets = await listAllTickets();
      setData(tickets)
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {

    fetchTickets();
    
  },[]);
  return (
    <Page title="Admin">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>


          <Grid item lg={10}>
            <ListofTickets data={data}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
