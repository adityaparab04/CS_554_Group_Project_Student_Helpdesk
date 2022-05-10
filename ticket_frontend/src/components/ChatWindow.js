import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Card, CardContent, CardHeader } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Popper from '@mui/material/Popper';
import Popover from '@mui/material/Popover';
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';
import ChatPage from './ChatPage';


export default function ChatWindow() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [open, setOpen] = React.useState(false);
    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'spring-popper' : undefined;

    return (
        <div>
            <Fab sx={{
                margin: 0,
                top: 'auto',
                right: 20,
                bottom: 20,
                left: 'auto',
                position: 'fixed',
            }} variant="extended" size="medium" color="primary" aria-label="add" onClick={handleClick}>

                <ChatIcon sx={{ mr: 1 }} />
                Support Chat
            </Fab>
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl} placement='top-end'
            >
                <Card>
                <CardContent>
                    <ChatPage />
                </CardContent>
                </Card>
                
            </Popper>
        </div>
    );
}
