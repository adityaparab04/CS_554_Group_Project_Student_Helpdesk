import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Dialog, DialogContent, Drawer, Typography, Avatar, Stack } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
import { AuthContext } from '../../firebase/Auth';
import { useContext} from 'react';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import sidebarConfig from './SidebarConfig';
import sidebarConfigClient from './SidebarConfigClient';
import sidebarConfigStaff from './SidebarConfigStaff';

import NoProfilePic from 'src/img/blank.jpg';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'lg');
  const { currentUser } = useContext(AuthContext);
  const [ open, setOpen ] = useState(false);
  const [ imgUrl, setUrl ] = useState('');
  const handleClickOpen = (imgurl) => {
      setOpen(true);
      setUrl(imgurl);
  };
  const handleClose = () => {
      setOpen(false);
  };

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <AccountStyle>
          <Avatar 
            sx={{cursor: 'pointer'}}
            src={currentUser.profilePhoto} 
            alt="photoURL" 
            onClick={() => handleClickOpen((currentUser.profilePhoto !== null) ? currentUser.profilePhoto : NoProfilePic )}
          />
            <Link underline="none" component={RouterLink} to="/settings">
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" component='h1' sx={{ color: 'text.primary' }}>
                  {currentUser.firstName} {currentUser.lastName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {currentUser.role}
                </Typography>
              </Box>
            </Link>
        </AccountStyle>
      </Box>

      {currentUser.role === 'admin' && <NavSection navConfig={sidebarConfig} />}
      {currentUser.role === 'staff' && <NavSection navConfig={sidebarConfigStaff} />}
      {currentUser.role === 'client' && <NavSection navConfig={sidebarConfigClient} />}
      <Box sx={{ flexGrow: 1 }} />

      <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
            <img src={imgUrl ? imgUrl : NoProfilePic} srcSet={imgUrl ? imgUrl : NoProfilePic} alt={'useruploadedimages'}/>
        </DialogContent>
      </Dialog>

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{ pt: 5, borderRadius: 2, position: 'relative' }}
        >
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed'
            }
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
