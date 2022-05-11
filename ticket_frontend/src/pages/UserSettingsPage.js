import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//material ui
import { Avatar, Box, Button, Container, Drawer, Grid, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';

import Page from 'src/components/Page';
import Logo from 'src/components/Logo';

// mocks_
import account from 'src/_mocks_/account';

//firebase functions
import { AuthContext } from 'src/firebase/Auth';
import EditProfile from 'src/components/EditProfileForm';
import ChangePassword from 'src/components/ChangePasswordForm';
import ChangeEmail from 'src/components/ChangeEmailForm';

const useStyles = makeStyles({
    page: {
        background: '#f9f9f9',
        width: '100%'
    },
    drawer: {
        width: 280
    },
    drawerPaper: {
        width: 280
    },
    root: {
        display: 'flex'
    },
    active: {
        background: 'rgba(0, 171, 85, 0.08)'
    },
    listItemText:{
        fontSize:'0.2em',
    }
});

const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: theme.palette.grey[500_12]
}));


const UserSettingsPage = () => {
    const { currentUser } = React.useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const [ editProfileForm, setEditProfileForm ] = useState(true);
    const [ changePasswordForm, setChangePasswordForm ] = useState(false);
    const [ changeEmailForm, setChangeEmailForm ] = useState(false)
    const navigate = useNavigate();
    const classes = useStyles();

    const handleProfileEditForm = () => {
        setEditProfileForm(true);
        setChangePasswordForm(false);
        setChangeEmailForm(false);
    }
    
    const handleChangePasswordForm = () => {
        setChangePasswordForm(true);
        setEditProfileForm(false);
        setChangeEmailForm(false);
    }

    const handleChangeEmailForm = () => {
        setChangeEmailForm(true);
        setEditProfileForm(false);
        setChangePasswordForm(false);
    }

    return (
        <Page title="Settings">
            <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant='permanent'
                anchor='left'
                classes={{paper: classes.drawerPaper}}
            >
                <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
                    <Logo />
                </Box>
                <Box sx={{ mb: 5, mx: 2.5 }}>
                    <AccountStyle>
                        <Avatar src={account.photoURL} alt="photoURL" />
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                                {currentUser.firstName} {currentUser.lastName}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {currentUser.role}
                            </Typography>
                        </Box>
                    </AccountStyle>
                </Box>
                <List>
                    <ListItem button onClick={handleProfileEditForm} className={editProfileForm ? classes.active : null}>
                        <ListItemIcon><EditIcon fontSize='small'/></ListItemIcon>
                        <ListItemText secondary>Edit Profile</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleChangeEmailForm} className={changeEmailForm ? classes.active : null}>
                        <ListItemIcon><EmailIcon fontSize='small'/></ListItemIcon>
                        <ListItemText secondary>Change Email</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleChangePasswordForm} className={changePasswordForm ? classes.active : null}>
                        <ListItemIcon><PasswordIcon fontSize='small'/></ListItemIcon>
                        <ListItemText secondary>Change Password</ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            <div className={classes.page}>
            <Container maxWidth="xl">
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    <Button sx={{mt:2.5}} onClick={()=> navigate('/dashboard', ({replace: true}))}> Back to dashboard</Button>
                </Box>
                <Box sx={{mt:10}}>
                { editProfileForm && <EditProfile/>}
                { changePasswordForm && <ChangePassword/>}
                { changeEmailForm && <ChangeEmail/>}
                </Box>
            </Container>
            </div>
            </div>
        </Page>
    )
}

export default UserSettingsPage;