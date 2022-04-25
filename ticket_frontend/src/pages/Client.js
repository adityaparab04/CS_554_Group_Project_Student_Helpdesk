// material
import { Box, Grid, Container, Typography } from '@mui/material';
import ListofTickets from 'src/components/ListofTickets';
import Mytickets from 'src/components/Mytickets';
import NewRequest from 'src/components/Newrequest';
// components
import Page from '../components/Page';
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

export default function Client() {
  return (
    <Page title="Admin">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>


          <Grid item lg={10}>
            <Mytickets />
            
          </Grid>
          <Grid item lg={10}>
            <NewRequest />
            
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
