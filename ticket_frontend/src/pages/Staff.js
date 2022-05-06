// material
import { Box, Grid, Container, Typography } from '@mui/material';
import ListofTickets from 'src/components/ListofTickets';
import StaffTickets from 'src/components/StaffTickets';
// components
import Page from '../components/Page';
import * as React from 'react';
import { AuthContext } from '../firebase/Auth';
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
  if(loading) return <div>Loading...</div>;
  const data = [];
  snapshot.forEach((doc) => {
    data.push({id: doc.id, data: doc.data()});
});
  return (
    <Page title="Staff">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>


          <Grid item lg={10}>
           <StaffTickets data={data}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
