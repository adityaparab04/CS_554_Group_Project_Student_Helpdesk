import React, { useContext, useState } from 'react';
import { Box, Card, CardContent, Container, Grid, IconButton, InputAdornment, Typography, TextField, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
//formik
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

import Iconify from 'src/components/Iconify';

//firebasefunctions
import { AuthContext } from 'src/firebase/Auth';
import { doChangeEmail } from 'src/firebase/FirebaseFunctions';

const ChangeEmail = () => {
    const { currentUser } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const [ showPassword, setShowPassword] = useState(false);
    const RegisterSchema = Yup.object().shape({
        oldEmail: Yup.string()
            .email('Email must be a valid email address')
            .required('Email is required'),
        newEmail: Yup.string()
            .email('Email must be a valid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
      });

    const formik = useFormik({
        initialValues: {
            oldEmail: currentUser.email,
            newEmail: '',
            password: ''
        },
        validationSchema: RegisterSchema,
      });
    const { errors, touched, getFieldProps, handleChange, values } = formik;

    const handleChangeEmail = async (e) => {
        e.preventDefault();
        if(values.oldEmail === values.newEmail){
            enqueueSnackbar("Old and new email cannot be same", { variant: 'error' });
            return false;
        }
        try {
            await doChangeEmail(
              values.oldEmail,
              values.newEmail,
              values.password
            );
        }catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    }

    if(currentUser.providerId === 'password'){
        return(
            <Container maxWidth="xl">
            <Grid container justifyContent="space-evenly">
                <Card sx={{ maxWidth: 700 }} margin='auto' variant='outlined'>
                <CardContent>
                    <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={handleChangeEmail}>
                            <Grid 
                                container 
                                justifyContent="space-evenly"
                                rowSpacing={3}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            >
                                <Grid item xs={12}>
                                    <TextField
                                        disabled
                                        fullWidth
                                        label="Old Email"
                                        {...getFieldProps('oldEmail')}
                                        id='oldEmail'
                                        type='email'
                                        onChange={handleChange}
                                        value={values.oldEmail}
                                        error={Boolean(touched.oldEmail && errors.oldEmail)}
                                        helperText={touched.oldEmail && errors.oldEmail}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Enter a new Email"
                                    {...getFieldProps('newEmail')}
                                    id='newEmail'
                                    type='email'
                                    onChange={handleChange}
                                    value={values.newEmail}
                                    error={Boolean(touched.newEmail && errors.newEmail)}
                                    helperText={touched.newEmail && errors.newEmail}
                                />
                                </Grid>
                                    <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Enter your password to confirm changes"
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
                                    Change Email
                                    </Button>
                                    </Box>
                                </Form>
                            </FormikProvider>
                        </CardContent>
                    </Card>
                </Grid> 
            </Container>
        )
    }else {
        return(
                <Container maxWidth='xl'>
                    <Card 
                        sx={{ maxWidth: 700, mx: "auto", mt: 10, boxShadow: "2px 2px rgba(0, 0, 0, 0.2)" }} 
                        variant='outlined' 
                        raised='true'
                    >
                        <CardContent>
                            <Typography 
                                variant='h5'
                                component='h3'
                            >
                            You cannot Change Email because you have signed in through your Google Account..
                            </Typography>
                        </CardContent>
                    </Card>
                </Container>
        )
    }
}

export default ChangeEmail;