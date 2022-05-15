import React, { useContext, useState } from 'react';
import { Box, Card, CardContent, Container, Grid, IconButton, InputAdornment, Typography, TextField, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
//formik
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

//components imported
import Iconify from 'src/components/Iconify';

//firebasefunctions
import { AuthContext } from 'src/firebase/Auth';
import { doChangePassword } from 'src/firebase/FirebaseFunctions';

const ChangePassword = () => {
    const { currentUser } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const [ showCurrentPassword, setShowCurrentPassword ] = useState(false);
    const [ showNewPassword, setShowNewPassword ] = useState(false);
    const [ showConfirmNewPassword, setShowConfirmNewPassword ] = useState(false);
    const RegisterSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email must be a valid email address')
            .required('Email is required'),
        currentPassword: Yup.string().min(6, 'Too Short!')
            .required('Password is required'),
        newPassword: Yup.string().min(6, 'Too Short!')
            .required('Password is required'),
        confirmNewPassword: Yup.string()
            .when("newPassword", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                [Yup.ref("newPassword")],
                "Both password need to be the same"
            )
          })
      });

    const formik = useFormik({
        initialValues: {
            email: currentUser.email,
            oldEmail: currentUser.email,
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema: RegisterSchema,
      });
    const { errors, touched, getFieldProps, handleChange, values } = formik;

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if(values.currentPassword === values.newPassword){
            enqueueSnackbar("Old and new password cannot be same", { variant: 'error' });
            return false;
        }
        else if (values.newPassword !== values.confirmNewPassword) {
            enqueueSnackbar("passwords don't match", { variant: 'error' });
            return false
        }
        try {
            await doChangePassword(
              values.email,
              values.currentPassword,
              values.newPassword,
              values.confirmNewPassword
            );
            enqueueSnackbar("password changed successfully", { variant: 'success' });
        }catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    }

    if(currentUser.providerId === 'password'){
        return(
            <Container maxWidth="xl">
            <Box sx={{mb:5}}>
                <Typography variant='h4' component='h2'>Change your password..</Typography>
            </Box>
            <Grid container justifyContent="space-evenly">
                    <Card sx={{ maxWidth: 700 }} margin='auto' variant='outlined'>
                        <CardContent>
                            <FormikProvider value={formik}>
                                <Form autoComplete="off" noValidate onSubmit={handleChangePassword}>
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
                                                label="Email"
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
                                            required
                                            fullWidth
                                            label="Current Password"
                                            {...getFieldProps('currentPassword')}
                                            id='currentPassword'
                                            type={showCurrentPassword ? 'text' : 'password'}
                                            onChange={handleChange}
                                            value={values.currentPassword}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <label htmlFor='show-currentPassword'>
                                                            <IconButton id='show-currentPassword' edge="end" onClick={() => setShowCurrentPassword((prev) => !prev)}>
                                                                <Iconify icon={showCurrentPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                            </IconButton>
                                                        </label>
                                                    </InputAdornment>
                                                )
                                            }}
                                            error={Boolean(touched.currentPassword && errors.currentPassword)}
                                            helperText={touched.currentPassword && errors.currentPassword}
                                        />
                                        </Grid>
                                        <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="New Password"
                                            {...getFieldProps('newPassword')}
                                            id='newPassword'
                                            type={showNewPassword ? 'text' : 'password'}
                                            onChange={handleChange}
                                            value={values.newPassword}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <label htmlFor='show-NewPassword'>
                                                            <IconButton id='show-NewPassword' edge="end" onClick={() => setShowNewPassword((prev) => !prev)}>
                                                                <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                            </IconButton>
                                                        </label>
                                                    </InputAdornment>
                                                )
                                            }}
                                            error={Boolean(touched.newPassword && errors.newPassword)}
                                            helperText={touched.newPassword && errors.newPassword}
                                        />
                                        </Grid>
                                        <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Confirm New Password"
                                            {...getFieldProps('confirmNewPassword')}
                                            id='confirmNewPassword'
                                            type={showConfirmNewPassword ? 'text' : 'password'}
                                            onChange={handleChange}
                                            value={values.confirmNewPassword}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <label htmlFor='show-confirmNewPassword'>
                                                            <IconButton id='show-confirmNewPassword' edge="end" onClick={() => setShowConfirmNewPassword((prev) => !prev)}>
                                                                <Iconify icon={showConfirmNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                            </IconButton>
                                                        </label>
                                                    </InputAdornment>
                                                )
                                            }}
                                            error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
                                            helperText={touched.confirmNewPassword && errors.confirmNewPassword}
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
                                component='h2'
                            >
                            You cannot Change Password because you have signed in through your Google Account..
                            </Typography>
                        </CardContent>
                    </Card>
                </Container>
        )
    }
}

export default ChangePassword;