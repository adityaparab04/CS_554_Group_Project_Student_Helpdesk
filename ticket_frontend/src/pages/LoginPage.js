import React from 'react';
import Page from '../components/Page';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
import { doSignInWithEmailAndPassword } from '../firebase/FirebaseFunctions'
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import { LoginForm } from '../sections/authentication/login';
import AuthSocial from '../sections/authentication/AuthSocial';

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
    const handleLogin = async (event) => {
      event.preventDefault();
      let {email, password} = event.target.elements;
      try {
        await doSignInWithEmailAndPassword(email.value, password.value);
      } catch (error) {
        alert(error);
      }
    };
    return(
        <RootStyle title="Login | Minimal-UI">
          <AuthLayout>
            Don’t have an account? &nbsp;
            <Link underline="none" variant="subtitle2" component={RouterLink} to="/register-page">
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
                <Typography variant="h4" gutterBottom>
                  Sign in to Raise a Ticket
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
                <form onSubmit={handleLogin}>
                <div className='form-group'>
                  <label>
                    Email:
                    <input
                      className='form-control'
                      name='email'
                      id='email'
                      type='email'
                      placeholder='Email'
                      required
                    />
                  </label>
                </div>
                <div className='form-group'>
                  <label>
                    Password:
                    <input
                      className='form-control'
                      name='password'
                      type='password'
                      placeholder='Password'
                      required
                    />
                  </label>
                </div>
                <button type='submit'>Log in</button>
              </form>
              </Stack>
            </ContentStyle>
          </Container>
        </RootStyle>
    )
}

export default LoginPage;