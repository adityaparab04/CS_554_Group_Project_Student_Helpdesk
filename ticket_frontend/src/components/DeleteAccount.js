import React, { useState, useContext} from "react";
import { Box, Button, Card, CardContent, Container, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

//formik
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

import Iconify from 'src/components/Iconify';

//firebasefunctions
import { AuthContext } from 'src/firebase/Auth';
import { doDeleteUser } from "src/firebase/FirebaseFunctions";

const DeleteAccount = () => {
    const { currentUser } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const [ showPassword, setShowPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email must be a valid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
      });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: RegisterSchema,
      });
    
    const { errors, touched, getFieldProps, handleChange, values } = formik;

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        if(!values.email){
            enqueueSnackbar("Enter the email", { variant: 'error' });
            return false;
        }
        if(!values.password){
            enqueueSnackbar("Enter the password", { variant: 'error' });
            return false;
        }
        try {
            const deletedUser = await doDeleteUser(values.email, values.password);
            enqueueSnackbar(deletedUser, { variant: 'success' });
        }catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    }

    if(currentUser.providerId === 'password'){
        return (
            <Container>
            <Box sx={{mb:5}}>
                <Typography variant='h4' component='h2'>Delete your Account.</Typography>
            </Box>
            <Grid container justifyContent="space-evenly">
            <Card sx={{ maxWidth: 700 }} margin='auto' variant='outlined'>
                <CardContent>
                    <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={handleDeleteAccount}>
                            <Grid 
                                container 
                                justifyContent="space-evenly"
                                rowSpacing={3}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            >
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Enter your email.."
                                        {...getFieldProps('email')}
                                        id='email'
                                        type='email'
                                        onChange={handleChange}
                                        value={values.email}
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Enter your password.."
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
                                    color='error'
                                >
                                Delete Account
                                </Button>
                            </Box>
                        </Form>
                    </FormikProvider>
                </CardContent>
            </Card>
            </Grid>
            </Container>
        )
    }else{
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
                        You cannot Delete account because you have signed in through your Google.
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        )
    }
}

export default DeleteAccount;