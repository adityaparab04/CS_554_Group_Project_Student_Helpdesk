import * as React from 'react';
import { Card, CardContent } from '@mui/material';
import Popper from '@mui/material/Popper';
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
