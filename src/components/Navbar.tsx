import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthProvider';
import AppTheme from './shared-theme/AppTheme';
import { Menu, MenuItem, styled, Tooltip } from '@mui/material';

const Offset = styled('div')(({ theme }) => theme?.mixins?.toolbar);

export default function Navbar() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    
    const handleSignOut = () => {
        logout();
        navigate("/login");
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        // <AppTheme>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{backgroundColor: '#daddff'}}>
                    <Toolbar>
                    <img src={`/logoFolio.png`} alt="Logo" style={{ width: "50px", height: "50px", marginRight: '1rem' }}/>
                    <Typography  component="div" sx={{ fontFamily: "Comforter", flexGrow: 1, fontSize: 46, color: '#2A2F69', height: 52, letterSpacing: 3, fontWeight: 600 }}>
                        Folio Hub
                    </Typography>
                    <Typography sx={{ fontFamily: "EB Garamond", flexGrow: 0, fontSize: 28, color: '#2A2F69', height: 40, marginRight: 1, fontWeight: 500 }}>
                        {user?.username || ''}
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <AccountCircle fontSize='large'/>
                        </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                            <MenuItem key={'account-setting'} onClick={handleCloseUserMenu}>
                                <Typography sx={{ textAlign: 'center' }}>Account</Typography>
                            </MenuItem>
                            <MenuItem key={'logout-setting'} onClick={handleCloseUserMenu}>
                                <Typography sx={{ textAlign: 'center' }} onClick={handleSignOut}>
                                    Logout
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    </Toolbar>
                </AppBar>
                <Offset />
            </Box>
        // </AppTheme>
  );
}
