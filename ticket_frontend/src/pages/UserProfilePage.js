import React, { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Container, Grid, IconButton, InputAdornment, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
//formik
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import Iconify from 'src/components/Iconify';

//firebase functions
import { AuthContext } from 'src/firebase/Auth';
import EditProfile from 'src/components/EditProfileForm';
import ChangePassword from 'src/components/ChangePasswordForm';
import ChangeEmail from 'src/components/ChangeEmailForm';

const UserProfilePage = () => {
    const { currentUser } = React.useContext(AuthContext);
    const navigate = useNavigate();
    
    return (
        <Page title="Client">
            <Container maxWidth="xl">
            <Grid container justifyContent='space-between'>
                <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
                    <Logo />
                </Box>
                <Box>
                    <Button sx={{mt:2.5}} onClick={()=> navigate('/dashboard', ({replace: true}))}> Back to dashboard</Button>
                </Box>
            </Grid>
                <Box sx={{ pb: 5 }}>
                    <Typography
                        variant='h5'
                        component='h3'
                    >
                        {currentUser.displayName}
                    </Typography>
                </Box>
            </Container>
        </Page>
    )
}

export default UserProfilePage;