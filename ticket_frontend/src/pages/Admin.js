// material
import { Box, Grid, Container, Typography } from '@mui/material';
import ListofTickets from 'src/components/ListofTickets';
// components
import Page from '../components/Page';
import * as React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore } from 'firebase/firestore';
import firebaseApp from '../firebase/Firebase'; 
import {  query,collection} from "firebase/firestore"; 
// ----------------------------------------------------------------------

export default function Admin() {
  const db = getFirestore(firebaseApp);
  const q = query(collection(db, "Tickets"));
  const [snapshot, loading] = useCollection(q);
  if(loading) return <div>Loading...</div>;
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
          <Grid item lg={10}>
            <ListofTickets data={sorted}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
