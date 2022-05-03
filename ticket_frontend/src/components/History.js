import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export default function History() {
  const data = [{author: 'author1', text: 'i have a question'},{author: 'author2', text: 'i have a respond'},{author: 'author1', text: 'i have a question'},{author: 'author2', text: 'i have a respond'},{author: 'author1', text: 'i have a question'},{author: 'author2', text: 'i have a respond'},{author: 'author1', text: 'i have a question'},{author: 'author2', text: 'i have a respond i have a respond i have a respond i have a respond i have a respond i have a respond i have a respond i have a respond i have a respond i have a respond i have a respond i have a respond i have a respond i have a respond i have a respond i have a respond '}]
  return (
    <React.Fragment>
      
      <Timeline >
      {data.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent sx={{ flex: 0.2 }} color="text.secondary">
            {item.author} on {new Date().toLocaleString()}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot variant="outlined" color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>{item.text}</TimelineContent>
        </TimelineItem>
      ))}
      </Timeline>
    </React.Fragment>
  );
}
