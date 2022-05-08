import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import {Card, CardContent, Typography} from '@mui/material';

export default function History({content}) {
  return (
    <React.Fragment>
      
      <Timeline >
      {content.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent sx={{ flex: 0.2 }} color="text.secondary">
            <Typography variant="caption" color="text.secondary">
            {item.author}
            </Typography>
            <br />
            <Typography variant="caption" color="text.secondary">
            {new Date(Date.parse(item.Time)).toLocaleString()}
            </Typography>

            
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot variant="outlined" color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent><Card sx={{backgroundColor: 'primary.lighter',}} >
            <CardContent>
            <Typography sx={{ color: 'white'}} paragraph variant='body'>{item.text}</Typography>
            </CardContent>
            </Card></TimelineContent>
        </TimelineItem>
      ))}
      </Timeline>
    </React.Fragment>
  );
}
