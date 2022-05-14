import React, { useContext, useState } from 'react';
import { Box, Card, CardContent, Container, Grid, IconButton, Input, InputAdornment, Typography, TextField, Button, CardMedia } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';

//firebasefunctions
import { AuthContext } from 'src/firebase/Auth';
import { updatePhotoUrl } from 'src/firebase/FirebaseFunctions';
import { uploadImage } from 'src/firebase/Storage';

import NoProfilePic from 'src/img/blank.jpg'

import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles({
    card: {
        maxWidth: 180,
        height: 'auto',
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '1px solid',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
    },
    media: {
      height: '100%',
      width: '100%'
    }
});

const ChangeDisplayPicture = () => {
    const { currentUser } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const [ selectImage, setSelectedImage ] = useState(null);
    const classes = useStyles();
    let url = null;
    const handleChangeProfilePic = async () => {
        if(selectImage){
            url = await uploadImage(selectImage);
        }else{
            enqueueSnackbar('Please select the image !!', { variant: 'error' });
        }
        if(url){
            await updatePhotoUrl(url);
            enqueueSnackbar('Profile Picture updated successfully', { variant: 'success' });
            window.location.reload();
        }
    }

    const handleSelectImage = (e) => {
        if (e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    }
    
    return(
        <Container maxWidth="xl">
            <Box sx={{mb:5}}>
                <Typography variant='h4' component='h2'>Change your Display Picture..</Typography>
            </Box>
            <Card className={classes.card} variant='outlined'>
                <CardMedia 
                    className={classes.media} 
                    component='img'
                    image={(currentUser.profilePhoto !== null) ? currentUser.profilePhoto : NoProfilePic }
                    title='Profile Image'>
                </CardMedia>
            </Card>
            <Box sx={{ textAlign: 'center', mt: 10 }}>
            <label htmlFor="contained-button-file">
                <Input fullWidth accept="image/*" id="contained-button-file" multiple type="file" onChange={handleSelectImage}> {" "} </Input>
            </label>
            <Button variant="contained" component="span" onClick={handleChangeProfilePic}>
                Upload a new image
            </Button>
            </Box>
            <br/>
        </Container>
    )
}

export default ChangeDisplayPicture;