import { faker } from '@faker-js/faker';
import * as React from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { mockImgCover } from '../utils/mockImages';
//
import Scrollbar from './Scrollbar';
import Iconify from './Iconify';
import AssignDialog from './AssignDialog';
import StaffEditTicket from './StaffEditTicket';


// ----------------------------------------------------------------------


function TicketItem({ticket}) {
  const {TicketTitle, TicketContent, ClientID, UpdateTime, isAssigned, isResolved} = ticket.data;
  const TicketID = ticket.id;
  return (
    <Stack direction="row" alignItems="center" spacing={2} padding={1}>
      {/* <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      /> */}
      <Box sx={{ width: 800 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {TicketTitle}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {TicketContent[0].author}: {TicketContent[0].text}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, width: 100, color: 'text.secondary' }}>
        
        {formatDistance(Date.parse(TicketContent[0].Time), new Date())}
      </Typography>

      <StaffEditTicket TicketContent={TicketContent} TicketName={TicketTitle} TicketID={TicketID} isResolved={isResolved}/>

      
    </Stack>
  );
}


export default function StaffTickets({data}) {
  if (!data) {
    return (<div>Loading...</div>);
  }else{
    return (
      <Card>
        <CardHeader title="Your Assigned Tickets" />
  
        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
            {data.map((ticket,index) => (
              <TicketItem key={index} ticket={ticket} />
            ))}
          </Stack>
        </Scrollbar>
  
        <Divider />
  
        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            to="#"
            size="small"
            color="inherit"
            component={RouterLink}
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          >
            View all
          </Button>
        </Box>
      </Card>
    );
  }
  
}
