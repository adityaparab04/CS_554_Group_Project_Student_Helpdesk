// material
import { Box, Grid, Container, Typography } from '@mui/material';
import * as React from 'react';
import ListofTickets from 'src/components/ListofTickets';
import Mytickets from 'src/components/Mytickets';
import NewRequest from 'src/components/Newrequest';
// components
import Page from '../components/Page';
import { AuthContext } from '../firebase/Auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore } from 'firebase/firestore';
import firebaseApp from '../firebase/Firebase'; 
import {  query, collection, where} from "firebase/firestore"; 
// ----------------------------------------------------------------------

export default function Client() {
  const { currentUser } = React.useContext(AuthContext);
  const db = getFirestore(firebaseApp);
  const q = query(collection(db, "Tickets"), where("ClientID", "==", currentUser.uid));
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
    <Page title="Client">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4" component="h2">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item lg={10}>
            <Mytickets data={sorted}/>
          </Grid>
          <Grid item lg={10}>
            <NewRequest />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
