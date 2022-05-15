import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import {Box, Card, CardContent, Typography} from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';    
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

export default function History({content, photourls}) {
  const [open, setOpen] = React.useState(false);
  const [url,setUrl] = React.useState('');
  const handleClickOpen = (imgurl) => {
    setOpen(true);
    setUrl(imgurl);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Box sx={{maxHeight: 400, overflowY: 'scroll'}}>
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
          <TimelineContent><Card sx={{backgroundColor: 'primary.light',}} >
            <CardContent>
            <Typography sx={{ color: 'white'}} paragraph variant='body'>{item.text}</Typography>
            </CardContent>
            </Card></TimelineContent>
        </TimelineItem>
      ))}
      </Timeline>
      </Box>
      <ImageList sx={{ maxHeight: 164 }} cols={5} rowHeight={164} >
      {photourls.map((item, index) => (
        <ImageListItem key={index} sx={{'&:hover': {
          border: '1px solid black',
          cursor: 'pointer',
      },}}>
          <img
            onClick={() =>handleClickOpen(item)} sx={{"&:hover": {
              pointer: 'pointer',
            }}}
            src={item}
            srcSet={item}
            alt={'useruploadedimages' + index}
            loading="lazy"
          />
          <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
          <img src={url} srcSet={url} alt={'useruploadedimages' + index}/>
        </DialogContent>
      </Dialog>
        </ImageListItem>
      ))}
    </ImageList>
    </React.Fragment>
  );
}
