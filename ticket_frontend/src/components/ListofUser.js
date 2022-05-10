import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card, Button, Divider, Typography, CardHeader, Stack } from '@mui/material';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore } from 'firebase/firestore';
import firebaseApp from '../firebase/Firebase';
import { query, collection,where } from "firebase/firestore";


export default function ListofUser() {
    const db = getFirestore(firebaseApp);
    const q = query(collection(db, "Users"));
    const [snapshot, loading] = useCollection(q);
    if (loading) return <div>Loading...</div>;
    const data = [];
  snapshot.forEach((doc) => {
    data.push({id: doc.id, data: doc.data()});
});
    return (
        <TableContainer component={Card}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} pr={1}>
                <Typography variant="h5" gutterBottom>
                    User
                </Typography>
                <Button
                    variant="contained"

                >
                    New User
                </Button>
            </Stack>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>User ID</TableCell>
                        <TableCell align="right">First Name</TableCell>
                        <TableCell align="right">Last Name</TableCell>
                        <TableCell align="right">Email Address</TableCell>
                        <TableCell align="right">Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.data.firstName}</TableCell>
                            <TableCell align="right">{row.data.lastName}</TableCell>
                            <TableCell align="right">{row.data.email}</TableCell>
                            <TableCell align="right">{row.data.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
