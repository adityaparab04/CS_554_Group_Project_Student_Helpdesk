import React, { useContext, useState } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import AuthSocial from '../sections/authentication/AuthSocial';
import { AuthContext } from '../firebase/Auth';
import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';

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


const RegisterPage = () => {
    // const { currentUser } = useContext(AuthContext);
    const [pwMatch, setPwMatch] = useState('');
    const handleSignUp = async (e) => {
      e.preventDefault();
      const {email, passwordOne, passwordTwo} = e.target.elements;
      if (passwordOne.value !== passwordTwo.value) {
        setPwMatch('Passwords do not match');
        return false;
      }
      try {
        await doCreateUserWithEmailAndPassword(
          email.value,
          passwordOne.value,
        );
      } catch (error) {
        alert(error);
      }
    }
    // if (currentUser) {
    //   return <Navigate to='/dashboard' />;
    // }
    return(
        <RootStyle title="Register | Minimal-UI">
        <AuthLayout>
            Already have an account? &nbsp;
            <Link underline="none" variant="subtitle2" component={RouterLink} to="/login-page">
            Login
            </Link>
        </AuthLayout>
        <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Manage the job more effectively with Minimal
        </Typography>
        <img alt="register" src="/static/illustrations/illustration_register.png" />
      </SectionStyle>
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Register To Raise a Ticket.
            </Typography>
          </Box>
          <div>
            <form onSubmit={handleSignUp}>

              <div className='form-group'>
                <label>
                  Email:
                  <input
                    className='form-control'
                    required
                    name='email'
                    type='email'
                    placeholder='Email'
                  />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  Password:
                  <input
                    className='form-control'
                    id='passwordOne'
                    name='passwordOne'
                    type='password'
                    placeholder='Password'
                    required
                  />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  Confirm Password:
                  <input
                    className='form-control'
                    name='passwordTwo'
                    type='password'
                    placeholder='Confirm Password'
                    required
                  />
                </label>
              </div>
              <button id='submitButton' name='submitButton' type='submit'>
                Sign Up
              </button>
            </form>
          </div>
          </ContentStyle>
        </Container>
      </RootStyle>
    )
}

export default RegisterPage;