import { Typography, Button, TextField } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CheckIcon from '@mui/icons-material/Check';
import { useSnackbar } from 'notistack';

import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';

export default function ChatPage() {
    const { enqueueSnackbar } = useSnackbar();
    const [room, setRoom] = React.useState('');
    const [selectPage, setSelectPage] = React.useState(true);
  const handleChange = (event) => {
    setRoom(event.target.value);
  };
  const handleConnect = () => {
    if (room !== '') {
        setSelectPage(false);
        enqueueSnackbar("Connected to " + room, { variant: 'success' });
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
    <Box sx={{ width: 400, height: 500}}>
        <Typography variant="h5" component="h2">Chat Page</Typography>
        <Box sx={{ height: 400,overflowX: 'hidden',overflowY: 'scroll', pt:5, pr:1.5}}> 
        <ChatMsg
      avatar={''}
      messages={[
        'Hi Jenny, How r u today?',
        'Did you train yesterday',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
      ]}
    />
    <ChatMsg
      side={'right'}
      messages={[
        "Great! What's about you?",
        'Of course I did. Speaking of which check this out',
      ]}
    />
    <ChatMsg avatar={''} messages={['Im good.', 'See u later.']} />
        </Box>
        <br />
        <Box sx={{display:'flex', gap:1,justifyContent:'flex-start'}}>
        <TextField
            required
            id="title"
            name="title"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            label="Breifly summarize the issue"
            variant="outlined"
            fullWidth
          />
            <Button size="large" variant='contained' startIcon={<CheckIcon />}>Send</Button>
        </Box>
    </Box>
  )
}
