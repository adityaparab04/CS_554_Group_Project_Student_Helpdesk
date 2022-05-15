import { Typography, Button } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CheckIcon from '@mui/icons-material/Check';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../firebase/Auth';

import MessageRoom from './MessageRoom';

export default function ChatPage() {
    const { enqueueSnackbar } = useSnackbar();
    const [room, setRoom] = React.useState('');
    const { currentUser } = React.useContext(AuthContext);
    const id = currentUser.uid;
    const [data, setData] = React.useState({ name:"", room:"", photoURL:"" });
    const [selectPage, setSelectPage] = React.useState(true);
  const handleChange = (event) => {
    setRoom(event.target.value);
  };
  const handleConnect = () => {
    if (room !== '') {
        setSelectPage(false);
        enqueueSnackbar("Connected to " + room, { variant: 'success' });
        setData({ name: id, room: room, photoURL: currentUser.profilePhoto });
    }else{
        enqueueSnackbar("Please select a room", { variant: 'error' });
    }
    
  }
  if (selectPage) {
    return (
        <Box sx={{ width: 320, minHeight: 350 }}>
            <Typography sx={{mb:5}} variant="h5" component="h2">Student Support Desk</Typography>
            <Box sx={{mb:15}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Room</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={room}
              label="Select Room"
              onChange={handleChange}
            >
              <MenuItem value={'room1'}>Student Enquiry</MenuItem>
              <MenuItem value={'room2'}>Ticket</MenuItem>
            </Select>
          </FormControl>
          
        </Box>
        <Button size="large" variant='contained' onClick={handleConnect}><CheckIcon />Connect</Button>
        </Box>
      )
  }
  return (
    <MessageRoom data={data}/>
  )
}
