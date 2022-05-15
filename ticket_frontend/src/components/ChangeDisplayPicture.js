import React, { useContext, useState } from 'react';
import { Box, Button, Card, CardMedia, Container, Dialog, DialogContent, Grid, Input, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';

//firebasefunctions
import { AuthContext } from 'src/firebase/Auth';
import { updatePhotoUrl } from 'src/firebase/FirebaseFunctions';
import { uploadImage } from 'src/firebase/Storage';

import NoProfilePic from 'src/img/blank.jpg';

import AddIcon from '@mui/icons-material/Add';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

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
    const classes = useStyles();
    const [ selectImage, setSelectedImage ] = useState(null);
    const [ open, setOpen ] = React.useState(false);
    const [ imgUrl, setUrl ] = React.useState('');
    const handleClickOpen = (imgurl) => {
        setOpen(true);
        setUrl(imgurl);
    };
    const handleClose = () => {
        setOpen(false);
    };
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
                    title='Profile Image'
                    onClick={() =>handleClickOpen((currentUser.profilePhoto !== null) ? currentUser.profilePhoto : NoProfilePic )} sx={{"&:hover": {
                        pointer: 'pointer'
                    }}}
                    >
                </CardMedia>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                    <img src={imgUrl} srcSet={imgUrl} alt={'useruploadedimages'}/>
                </DialogContent>
            </Dialog>
            <Box sx={{ textAlign: 'center', mt: 5 }}>
            <label htmlFor="contained-button-file">
                <Input sx={{display: "none"}} fullWidth accept="image/*" id="contained-button-file" multiple type="file" onChange={handleSelectImage}> {" "} </Input>
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
            <br/>
            { selectImage ? 
            <Button variant="contained" component="span" onClick={handleChangeProfilePic}>
                Upload a new image
            </Button> : 
            <Button disabled variant="contained" component="span" onClick={handleChangeProfilePic}>
                Upload a new image
            </Button> 
            }
            </Box>
            <br/>
        </Container>
    )
}

export default ChangeDisplayPicture;