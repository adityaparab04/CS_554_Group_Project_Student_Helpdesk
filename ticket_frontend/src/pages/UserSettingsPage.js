import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//material ui
import { Avatar, Box, Button, Container, Dialog, DialogContent, Drawer, Grid, List, ListItem, ListItemText, ListItemIcon, Typography, AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import Page from 'src/components/Page';
import Logo from 'src/components/Logo';

import NoProfilePic from 'src/img/blank.jpg';

//firebase functions
import { AuthContext } from 'src/firebase/Auth';
import EditProfile from 'src/components/EditProfileForm';
import ChangePassword from 'src/components/ChangePasswordForm';
import ChangeEmail from 'src/components/ChangeEmailForm';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DashboardNavbar from 'src/layouts/dashboard/DashboardNavbar';
import ChangeDisplayPicture from 'src/components/ChangeDisplayPicture';
import DeleteAccount from 'src/components/DeleteAccount';

const useStyles = makeStyles({
    page: {
        background: '#f9f9f9',
        width: '100%'
    },
    drawer: {
        width: 280
    },
    drawerPaper: {
        background: '#f9f9f9',
        width: 280,
        borderRight: 'dashed 1px lightgrey'
    },
    root: {
        display: 'flex'
    },
    active: {
        background: 'rgba(0, 171, 85, 0.08)',
        color: '#008900',
        '&:hover': { color: '#3366FF !important' },
    },
    inactive: {
        '&:hover': { color: '#3366FF !important' },
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
    const [ changeEmailForm, setChangeEmailForm ] = useState(false);
    const [ changeProfilePic, setChangeProfilePic ] = useState(false);
    const [ deleteAccountForm, setDeleteAccountForm ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const [ imgUrl, setUrl ] = useState('');
    const navigate = useNavigate();
    const classes = useStyles();

    const handleClickOpen = (imgurl) => {
        setOpen(true);
        setUrl(imgurl);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleProfileEditForm = () => {
        setEditProfileForm(true);
        setChangePasswordForm(false);
        setChangeEmailForm(false);
        setChangeProfilePic(false);
        setDeleteAccountForm(false);
    }
    
    const handleChangePasswordForm = () => {
        setChangePasswordForm(true);
        setEditProfileForm(false);
        setChangeEmailForm(false);
        setChangeProfilePic(false);
        setDeleteAccountForm(false);
    }

    const handleChangeEmailForm = () => {
        setChangeEmailForm(true);
        setEditProfileForm(false);
        setChangePasswordForm(false);
        setChangeProfilePic(false);
        setDeleteAccountForm(false);
    }

    const handleChanegProfilePic = () => {
        setChangeProfilePic(true);
        setChangeEmailForm(false);
        setEditProfileForm(false);
        setChangePasswordForm(false);
        setDeleteAccountForm(false);
    }

    const handleDeleteAccountForm = () => {
        setDeleteAccountForm(true);
        setChangeProfilePic(false);
        setChangeEmailForm(false);
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
                    <Avatar 
                        sx={{cursor: 'pointer'}}
                        src={currentUser.profilePhoto} 
                        alt="photoURL" 
                        onClick={() => handleClickOpen((currentUser.profilePhoto !== null) ? currentUser.profilePhoto : NoProfilePic )}
                    />
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="subtitle2" component="h1" sx={{ color: 'text.primary' }}>
                                {currentUser.firstName} {currentUser.lastName}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {currentUser.role}
                            </Typography>
                        </Box>
                    </AccountStyle>
                </Box>
                <List>
                    <ListItem button onClick={handleProfileEditForm} className={editProfileForm ? classes.active : classes.inactive}>
                        <ListItemIcon><EditIcon fontSize='small'/></ListItemIcon>
                        <ListItemText disableTypography sx={{fontSize: 17, color: 'secondary'}}>Edit Profile</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleChangeEmailForm} className={changeEmailForm ? classes.active : classes.inactive}>
                        <ListItemIcon><EmailIcon fontSize='small'/></ListItemIcon>
                        <ListItemText disableTypography sx={{fontSize: 17}}>Change Email</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleChangePasswordForm} className={changePasswordForm ? classes.active : classes.inactive}>
                        <ListItemIcon><PasswordIcon fontSize='small'/></ListItemIcon>
                        <ListItemText disableTypography sx={{fontSize: 17}}>Change Password</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleChanegProfilePic} className={changeProfilePic ? classes.active : classes.inactive}>
                        <ListItemIcon><AddAPhotoIcon fontSize='small'/></ListItemIcon>
                        <ListItemText disableTypography sx={{fontSize: 17}}>Change Display Picture</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleDeleteAccountForm} className={deleteAccountForm ? classes.active : classes.inactive}>
                        <ListItemIcon><PersonRemoveIcon fontSize='small'/></ListItemIcon>
                        <ListItemText disableTypography sx={{fontSize: 17}}>Delete your account</ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                    <img src={imgUrl} srcSet={imgUrl} alt={'useruploadedimages'}/>
                </DialogContent>
            </Dialog>
            <div className={classes.page}>
            <DashboardNavbar />
            <br/>
            <Container maxWidth="xl">
                <Box sx={{mt:10}}>
                { editProfileForm && <EditProfile/>}
                { changePasswordForm && <ChangePassword/>}
                { changeEmailForm && <ChangeEmail/>}
                { changeProfilePic && <ChangeDisplayPicture />}
                { deleteAccountForm && <DeleteAccount />}
                </Box>
            </Container>
            </div>
            </div>
        </Page>
    )
}

export default UserSettingsPage;