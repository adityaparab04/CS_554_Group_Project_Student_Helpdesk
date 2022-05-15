import { Typography, Button, TextField } from '@mui/material'
import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import Moment from 'react-moment'
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CheckIcon from '@mui/icons-material/Check';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../firebase/Auth';
import { getUserInfo } from 'src/firebase/DataBase'
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';

export default function MessageRoom({ data }) {
    const location = useLocation()
    const msgBoxRef = useRef()

    const [messagedata, setMessagedata] = useState({})
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const [allMessages, setMessages] = useState([])
    const [socket, setSocket] = useState()
    const handleEnter = e => e.keyCode===13 ? onSubmit() : ""
    const handleChange = e => setMsg(e.target.value)
    const onSubmit = () => {
        if (msg) {
            setLoading(true)
            const newMessage = { time: new Date(), msg, name: data.name, photoURL: data.photoURL }
            socket.emit("newMessage", { newMessage, room: data.room })
        }
    }
    useEffect(() => {
        const socket = io("http://localhost:9000")
        setSocket(socket)
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
                setLoading(false)
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
