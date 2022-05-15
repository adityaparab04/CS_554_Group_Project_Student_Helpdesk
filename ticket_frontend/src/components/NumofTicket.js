// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from 'src/utils/formatNumber';
//
import Iconify from './Iconify';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore } from 'firebase/firestore';
import firebaseApp from '../firebase/Firebase'; 
import {  query,collection,where} from "firebase/firestore"; 
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));
// ----------------------------------------------------------------------


export default function NumofTicket() {
  const db = getFirestore(firebaseApp);
  const q = query(collection(db, "Tickets"));
  const [snapshot, loading] = useCollection(q);
  if(loading) return <div>Loading...</div>;
  const TOTAL = snapshot.docs.length;
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon='fa6-solid:ticket' width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" component='h4' sx={{ opacity: 0.72 }}>
        Number of Ticket
      </Typography>
    </RootStyle>
  );
}
