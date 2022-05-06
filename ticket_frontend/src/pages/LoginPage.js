import React, { useState, useContext } from 'react';
import Page from '../components/Page';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// material
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Button, Divider, Container, Typography, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';

//firebase auth function
import { doGoogleSignIn, doSignInWithEmailAndPassword , doPasswordReset} from '../firebase/FirebaseFunctions';
// layouts
import AuthLayout from '../layouts/AuthLayout';
import { AuthContext } from '../firebase/Auth';
// components
import Iconify from '../components/Iconify';
import { useSnackbar } from 'notistack';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false
    },
    validationSchema: LoginSchema,
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, handleChange } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await doSignInWithEmailAndPassword(values.email, values.password);
      navigate('/dashboard', { replace: true })
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const forgotPassword = async (e) => {
    e.preventDefault();
    try {
      if (values.email) {
        await doPasswordReset(values.email);
        alert('Password reset email was sent');
      } else {
        alert(
          'Please enter an email address before you click the forgot password link'
        );
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }

  }
  const handleSocialSignIn = async (e) => {
    e.preventDefault();
    try {
        await doGoogleSignIn();
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    };

  // if(currentUser){
  //   return <Navigate to='/dashboard' />
  // }
  return (
    <RootStyle title="Login | Minimal-UI">
      <AuthLayout>
        Don’t have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          Get started
        </Link>
      </AuthLayout>

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Hi, Welcome Back
        </Typography>
        <img src="/static/illustrations/illustration_login.png" alt="login" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h4" gutterBottom>
                Sign In To Raise a Ticket.
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Enter your details below.
              </Typography>
            </Box>
            <>
            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleSocialSignIn} alt='google signin'>
                <Iconify icon="eva:google-fill" color="#DF3E30" height={24} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>
          </>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleLogin}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    autoComplete="username"
                    type="email"
                    label="Email address"
                    {...getFieldProps('email')}
                    onChange={handleChange}
                    value={values.email}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextField
                    fullWidth
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    {...getFieldProps('password')}
                    onChange={handleChange}
                    value={values.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword} edge="end">
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                    <FormControlLabel
                      control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
                      label="Remember me"
                    />
                    <Link component={RouterLink} variant="subtitle2" to="#" underline="hover" onClick={forgotPassword}>
                      Forgot password?
                    </Link>
                  </Stack>
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Login
                  </LoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
          </Stack>
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}

export default LoginPage;