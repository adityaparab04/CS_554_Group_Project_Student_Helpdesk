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


function TicketItem({ ticket }) {
  const { TicketTitle, TicketContent, ClientID, UpdateTime, isAssigned, isResolved, photoURL } = ticket.data;
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
          {TicketContent[TicketContent.length - 1].author}: {TicketContent[TicketContent.length - 1].text}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, width: 100, color: 'text.secondary' }}>

        {formatDistance(Date.parse(TicketContent[TicketContent.length - 1].Time), new Date())}
      </Typography>
      <StaffEditTicket TicketContent={TicketContent} TicketName={TicketTitle} TicketID={TicketID} isResolved={isResolved} urls={photoURL} />
    </Stack>
  );
}


export default function StaffTickets({ data }) {
  const [ispreview, setIspreview] = React.useState(true);
  if (!data) {
    return (<div>Loading...</div>);
  } else {
    const display = ispreview ? data.slice(0, 5) : data;
    return (
      <Card>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} p={2}>
                <Typography variant="h5" gutterBottom>
                Your Assigned Tickets
                </Typography>
            </Stack>

        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {display.map((ticket, index) => (
            <TicketItem key={index} ticket={ticket} />
          ))}
        </Stack>
        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            onClick={() => setIspreview(!ispreview)}
            size="small"
            color="inherit"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          >
            {ispreview ? 'Show more' : 'Show less'}
          </Button>
        </Box>
      </Card>
    );
  }

}
