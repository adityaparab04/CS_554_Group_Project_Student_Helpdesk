import { Typography, Button, TextField } from '@mui/material'
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';

export default function MessageRoom({ data }) {

    const [msg, setMsg] = useState("")
    const [allMessages, setMessages] = useState([])
    const [socket, setSocket] = useState()
    const handleEnter = e => e.keyCode===13 ? onSubmit() : ""
    const handleChange = e => setMsg(e.target.value)
    const onSubmit = () => {
        if (msg) {
            const newMessage = { time: new Date(), msg, name: data.name, photoURL: data.photoURL }
            socket.emit("newMessage", { newMessage, room: data.room })
        }
    }
    useEffect(() => {
        const socket = io("/");
        setSocket(socket);
        socket.on("connect", () => {
            console.log("socket Connected")
            socket.emit("joinRoom", data.room)
        })
    }, [data.room])

    useEffect(() => {
        if (socket) {
            socket.on("getLatestMessage", (newMessage) => {
                setMessages([...allMessages, newMessage])
                setMsg("")
            })
        }
    }, [socket, allMessages])
    return (
        <Box sx={{ width: 400, height: 500 }}>
            <Typography variant="h5" component="h2">Chat Page</Typography>
            <Box sx={{ height: 400, overflowX: 'hidden', overflowY: 'scroll', pt: 5, pr: 1.5 }}>

                {(allMessages.map((msg,index) => {
                    const id = msg.name;
                    return <ChatMsg key={index} avatar={msg.photoURL} messages={[msg.msg]} side={id === data.name ? 'right' : 'left'} />
                }))}
            </Box>
            <br />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-start' }}>
                <TextField
                    required
                    id="title"
                    name="title"
                    value={msg}
                    onChange={handleChange}
                    onKeyDown={handleEnter}
                    label="Breifly summarize the issue"
                    variant="outlined"
                    fullWidth
                />
                <Button size="large" variant='contained' startIcon={<CheckIcon />} onClick={onSubmit}>Send</Button>
            </Box>
        </Box>
    )
}
