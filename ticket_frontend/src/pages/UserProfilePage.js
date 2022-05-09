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
import { doUpdateUser } from 'src/firebase/FirebaseFunctions';

const UserProfilePage = () => {
    const { currentUser } = React.useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const [ showPassword, setShowPassword ] = useState(false);
    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('First name required'),
        lastName: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Last name required'),
        displayName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Last name required'),
        email: Yup.string()
          .email('Email must be a valid email address')
          .required('Email is required'),
        password: Yup.string()
          .required('Password is required'),
    });
    const formik = useFormik({
        initialValues: {
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          displayName: currentUser.displayName,
          email: currentUser.email,
          password: ''
        },
        validationSchema: RegisterSchema,
    });
    const { errors, touched, isSubmitting, getFieldProps, handleChange, values } = formik;
    const [ oldEmail, setOldEmail ] = useState(values.email);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log(oldEmail, values.email, values.password)
            await doUpdateUser(oldEmail, values.email, values.firstName, values.lastName, values.displayName, values.password);
            setOldEmail(values.email);
            enqueueSnackbar("User information updated successfully", {variant: 'success'});
            // navigate('/dashboard', { replace: true });
        }catch(error){
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    }
    return (
        <Page title="Client">
            <Container maxWidth="xl">
                <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
                    <Logo />
                </Box>
                <Box sx={{ pb: 5 }}>
                    <Typography
                        variant='h5'
                        component='h2'
                    >
                        Edit User
                    </Typography>
                </Box>
                <Box sx={{ pb: 5 }}>
                    <Typography
                        variant='h5'
                        component='h3'
                    >
                        {currentUser.displayName}
                    </Typography>
                </Box>
                <Grid
                    container
                    justifyContent="space-evenly"
                >
                <Card sx={{ maxWidth: 700 }} margin='auto' variant='outlined'>
                    <CardContent>
                        <FormikProvider value={formik}>
                            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                <Grid 
                                    container 
                                    justifyContent="space-evenly"
                                    rowSpacing={3}
                                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                >
                                    <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        {...getFieldProps('firstName')}
                                        id='firstName'
                                        onChange={handleChange}
                                        value={values.firstName}
                                        error={Boolean(touched.firstName && errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        {...getFieldProps('lastName')}
                                        id='lastName'
                                        onChange={handleChange}
                                        value={values.lastName}
                                        error={Boolean(touched.lastName && errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                    />
                                    </Grid>
                                    <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Dislay Name"
                                        {...getFieldProps('displayName')}
                                        id='displayName'
                                        onChange={handleChange}
                                        value={values.displayName}
                                        error={Boolean(touched.displayName && errors.displayName)}
                                        helperText={touched.displayName && errors.displayName}
                                    />
                                    </Grid>
                                    <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        {...getFieldProps('email')}
                                        id='email'
                                        onChange={handleChange}
                                        value={values.email}
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                    </Grid>
                                    <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Enter password to update profile"
                                        {...getFieldProps('password')}
                                        id='password'
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={handleChange}
                                        value={values.password}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        error={Boolean(touched.password && errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                    </Grid>
                                </Grid>
                                <Box 
                                    sx={{ mt: 3 }}
                                    display="flex"
                                    justifyContent="flex-end"
                                    alignItems="flex-end"
                                >
                                <Button 
                                    variant="contained" 
                                    size='small' 
                                    type='submit'
                                >
                                Save Changes
                                </Button>
                                </Box>
                            </Form>
                        </FormikProvider>
                    </CardContent>
                </Card>
                </Grid>
            </Container>
        </Page>
    )
}

export default UserProfilePage;