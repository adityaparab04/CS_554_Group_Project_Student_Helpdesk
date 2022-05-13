// material
import { Box, Grid, Container, Typography } from '@mui/material';
import ListofTickets from 'src/components/ListofTickets';
// components
import Page from '../components/Page';
import * as React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore } from 'firebase/firestore';
import firebaseApp from '../firebase/Firebase'; 
import CircularProgress from '@mui/material/CircularProgress';
import {  query,collection} from "firebase/firestore"; 
import ListofStaff from 'src/components/ListofStaff';
import NumofUser from 'src/components/NumofUser';
import NumofTicket from 'src/components/NumofTicket';
import NumberofStaff from 'src/components/NumberofStaff';
// ----------------------------------------------------------------------

export default function Admin() {
  const db = getFirestore(firebaseApp);
  const q = query(collection(db, "Tickets"));
  const [snapshot, loading] = useCollection(q);
  if(loading) return (<Page title='Admin'>
    <Box sx={{minHeight: '1vh', minWidth: '1vw', }}>
    <CircularProgress sx={{position: 'fixed', top: '50%', left: '50%'}} />
    </Box>
  </Page>);

  const data = [];
  snapshot.forEach((doc) => {
    data.push({id: doc.id, data: doc.data()});
  });
  const sorted = data.sort((a, b) => {
    return new Date(b.data.TicketContent[b.data.TicketContent.length - 1].Time) - new Date(a.data.TicketContent[a.data.TicketContent.length - 1].Time)
  });
  return (
    <Page title="Admin">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
        <Grid item lg={4}>
            <NumofUser />
          </Grid>
          <Grid item lg={4}>
            <NumofTicket />
          </Grid>
          <Grid item lg={4}>
            <NumberofStaff />
          </Grid>
          <Grid item lg={10}>
            <ListofTickets data={sorted}/>
          </Grid>
          <Grid item lg={10}>
            <ListofStaff />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
