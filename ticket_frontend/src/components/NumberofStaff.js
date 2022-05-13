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
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));
// ----------------------------------------------------------------------



export default function NumberofStaff() {
  const db = getFirestore(firebaseApp);
  const q = query(collection(db, "Users"), where("role", "==", 'staff'));
  const [snapshot, loading] = useCollection(q);
  if(loading) return <div>Loading...</div>;
  const TOTAL = snapshot.docs.length;
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon='ic:twotone-support-agent' width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Number of Staff
      </Typography>
    </RootStyle>
  );
}
