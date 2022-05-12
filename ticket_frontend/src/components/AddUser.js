import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom';
import DialogContent from '@mui/material/DialogContent';
import { Box, Button, Card, CardContent, Container, Grid, IconButton, InputAdornment, Typography, TextField } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import { AuthContext } from '../firebase/Auth';
import { useSnackbar } from 'notistack';
//formik
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import DialogTitle from '@mui/material/DialogTitle';
import { doCreateUserWithEmailAndPassword } from 'src/firebase/FirebaseFunctions';

export default function AddUser() {
    const { currentUser } = React.useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const [ firstName, setFirstName ] = React.useState('');
    const [ lastName, setLastName ] = React.useState('');
    const [ displayName, setDisplayName ] = React.useState('');
    const [ phoneNumber, setPhoneNumber ] = React.useState('');
    const [role, setRole] = React.useState('staff');
    const [email, setEmail] = React.useState('');
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
    });
    const formik = useFormik({
        initialValues: {
          firstName: firstName,
          lastName: lastName,
          displayName: displayName,
          role: role,
          email: email,
        },
        validationSchema: RegisterSchema,
    });
    const { errors, touched, isSubmitting, getFieldProps, handleChange, values } = formik;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setFirstName(values.firstName);
            setLastName(values.lastName);
            setDisplayName(values.displayName);
            setEmail(values.email);
            await doCreateUserWithEmailAndPassword(values.email, 123456, values.firstName, values.lastName, '', '', 'staff');
            enqueueSnackbar("User added successfully", {variant: 'success'});
            setOpen(false);
        }catch(error){
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} >New Staff</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Staff</DialogTitle>
        <DialogContent >
            <Box sx={{pt:1}}>
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
                                    <Grid item xs={6}>
                                    <TextField
                                    disabled
                                        fullWidth
                                        label="Password"
                                        id='password'
                                        onChange={handleChange}
                                        value='123456'
                                    />
                                    </Grid>
                                    <Grid item xs={6}>
                                    <TextField
                                    disabled
                                        fullWidth
                                        label="Role"
                                        {...getFieldProps('role')}
                                        id='role'
                                        onChange={handleChange}
                                        value={values.role}
                                        error={Boolean(touched.role && errors.role)}
                                        helperText={touched.role && errors.role}
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
                                </Grid>
                                <Box 
                                    sx={{ mt: 3 }}
                                    display="flex"
                                    justifyContent="flex-end"
                                    alignItems="flex-end"
                                >
                                </Box>
                            </Form>
                        </FormikProvider>
                        </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
