// material
import { Box, Grid, Container, Typography } from '@mui/material';
import ListofTickets from 'src/components/ListofTickets';
import StaffTickets from 'src/components/StaffTickets';
// components
import Page from '../components/Page';
import * as React from 'react';
import { AuthContext } from '../firebase/Auth';
import CircularProgress from '@mui/material/CircularProgress';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore } from 'firebase/firestore';
import firebaseApp from '../firebase/Firebase'; 
import {  query,collection,where} from "firebase/firestore"; 
// ----------------------------------------------------------------------

export default function Staff() {
  const { currentUser } = React.useContext(AuthContext);
  const db = getFirestore(firebaseApp);
  const q = query(collection(db, "Tickets"), where("StaffID", "==", currentUser.uid));
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
    <Page title="Staff">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4" component='h2'>Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item lg={10}>
           <StaffTickets data={sorted}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
