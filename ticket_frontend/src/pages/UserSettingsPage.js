import React, { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom';
import { Box, Card, CardContent, Container, Grid, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
//formik
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { AuthContext } from 'src/firebase/Auth';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';

const UserSettingsPage = () => {
    const { currentUser } = React.useContext(AuthContext);
    const formik = useFormik({
        initialValues: {
            email: currentUser.email,
            currentPassword: '',
            newPassword: '',
            confirmNewPassowrd: '',
        },
        // validationSchema: RegisterSchema,
      });
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps, handleChange, values } = formik;
    return(
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
                            Change your Password
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
                                <Form autoComplete="off" noValidate>
                                    <Grid 
                                        container 
                                        justifyContent="space-evenly"
                                        rowSpacing={3}
                                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                    >
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
                                            label="Current Password"
                                            {...getFieldProps('currentPassword')}
                                            id='currentPassword'
                                            onChange={handleChange}
                                            value={values.currentPassword}
                                            error={Boolean(touched.currentPassword && errors.currentPassword)}
                                            helperText={touched.currentPassword && errors.currentPassword}
                                        />
                                        </Grid>
                                        <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="New Password"
                                            {...getFieldProps('newPassword')}
                                            id='newPassword'
                                            onChange={handleChange}
                                            value={values.newPassword}
                                            error={Boolean(touched.newPassword && errors.newPassword)}
                                            helperText={touched.newPassword && errors.newPassword}
                                        />
                                        </Grid>
                                        <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Confirm New Password"
                                            {...getFieldProps('confirmNewPassowrd')}
                                            id='confirmNewPassowrd'
                                            onChange={handleChange}
                                            value={values.confirmNewPassowrd}
                                            error={Boolean(touched.confirmNewPassowrd && errors.confirmNewPassowrd)}
                                            helperText={touched.confirmNewPassowrd && errors.confirmNewPassowrd}
                                        />
                                        </Grid>
                                    </Grid>
                                    <Box 
                                        display="flex"
                                        justifyContent="flex-end"
                                        alignItems="flex-end"
                                        sx={{ mt: 3 }}
                                    >
                                    <Button 
                                        variant="contained" 
                                        size='small' 
                                        type='submit'
                                    >
                                    Change password
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

export default UserSettingsPage;