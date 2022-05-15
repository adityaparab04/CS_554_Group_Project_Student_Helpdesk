import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Stack, TextField, IconButton, InputAdornment, Input } from '@mui/material';
import { LoadingButton } from '@mui/lab';
//formik
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';
import { uploadImage } from 'src/firebase/Storage';
import { useSnackbar } from 'notistack';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

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
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectImage, setSelectedImage] = useState(null);

  const handleSelectImage = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  }
  var phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .required('First name required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .required('Last name required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    phoneNumber: Yup.string()
    .matches(phoneRegEx, 'Invalid Phone Number')
    .min(8, "Phone Number must be atleast 8 characters")
    .max(10, "Phone Number at most must be 10 characters"),
    password: Yup.string().min(6, 'Too Short!')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        )
      })
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: ''
    },
    validationSchema: RegisterSchema,
  });
  const { errors, touched, isSubmitting, getFieldProps, handleChange, values } = formik;

  let url = null;
  const handleSignUp = async (e) => {
    
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      enqueueSnackbar("passwords not same", { variant: 'error' });
      return false;
    }
    if(!values.firstName || values.firstName.length < 2 || values.firstName.length > 50 || !values.firstName.replace(/\s/g, "").length ){
      enqueueSnackbar("invalid firstname", { variant: 'error' });
      return false
    }

    if(values.firstName.toLowerCase().replace(/[^a-z]/g, "").length !== values.firstName.length){
      enqueueSnackbar("first name should only contain characters", { variant: 'error' });
      return false;
    }

    if(!values.lastName || values.lastName.length < 2 || values.lastName.length > 50 || !values.lastName.replace(/\s/g, "").length ){
      enqueueSnackbar("invalid lastname", { variant: 'error' });
      return false;
    }
    if(values.lastName.toLowerCase().replace(/[^a-z]/g, "").length !== values.lastName.length){
      enqueueSnackbar("last name should only contain characters", { variant: 'error' });
      return false;
    }
    if(values.phoneNumber){
      if(typeof values.phoneNumber !== 'string' || !values.phoneNumber.replace(/\s/g, "" || values.phoneNumber.match(/^\d{3}[-]\d{3}[-]\d{4}$/) === null).length){
        enqueueSnackbar("Please enter a valid input phoneNumber", { variant: 'error' });
        return false;
      }
    }
    if (selectImage) {
      url = await uploadImage(selectImage)
    }

    try {
      await doCreateUserWithEmailAndPassword(
        values.email,
        values.confirmPassword,
        values.firstName,
        values.lastName,
        values.phoneNumber,
        url,
        'client'
      );
      enqueueSnackbar("Account created successfully", { variant: 'success' });
      navigate('/login', { replace: true })
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }

  return (
    <RootStyle title="Register | Minimal-UI">
      <AuthLayout>
        Already have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          Login
        </Link>
      </AuthLayout>
      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" component="h1" sx={{ px: 5, mt: 10, mb: 5 }}>
          Manage the job more effectively with Mutables Ticket Website
        </Typography>
        <img alt="register" src="/static/illustrations/illustration_register.png" />
      </SectionStyle>
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Register To Raise a Ticket.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Enter your details below.
            </Typography>
          </Box>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSignUp}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    {...getFieldProps('firstName')}
                    id='firstName'
                    onChange={handleChange}
                    value={values.firstName}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    {...getFieldProps('lastName')}
                    id='lastName'
                    onChange={handleChange}
                    value={values.lastName}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Stack>
                <TextField
                  required
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
                <TextField
                  fullWidth
                  label="Phone Number"
                  {...getFieldProps('phoneNumber')}
                  id='phoneNumber'
                  type='number'
                  onChange={handleChange}
                  value={values.phoneNumber}
                  error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  {...getFieldProps('password')}
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  value={values.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <label htmlFor='see-password'>
                        <IconButton id='see-password' edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                        </label>
                      </InputAdornment>
                    )
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  {...getFieldProps('confirmPassword')}
                  id='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <label htmlFor="see-confirmPassword">
                      <InputAdornment position="end">
                        <IconButton  id='see-confirmPassword' edge="end" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                          <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                      </label>
                    )
                  }}
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
                <Box sx={{textAlign:'center'}}>
                {selectImage ? <Typography variant='body1'>{selectImage.name}</Typography> : null}
                <label htmlFor="contained-button-file">
                  <Input sx={{display: 'none'}} fullWidth accept="image/*" id="contained-button-file" multiple type="file" onChange={handleSelectImage} />
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
                </label>
                </Box>
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Register
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}

export default RegisterPage;