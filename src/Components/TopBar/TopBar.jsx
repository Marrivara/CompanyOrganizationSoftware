import React, { useState } from 'react'
import ChangeLanguageButton from './ChangeLanguageButton'
import { Box, Button, IconButton, List } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { Logout } from '@mui/icons-material'
import OpenableDrawer from '../OpenableComponents/OpenableDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import LocalStorageDelete from '../../Resources/LocalStorageFunctions';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ changeLanguage , setSignedIn}) => {

    const navigate = useNavigate()

    const logout = () => {
        LocalStorageDelete()
        setSignedIn(false)
        //navigate("/")
    }
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <Box display={"flex"} marginBottom={6}>
            <Box flexGrow={"1"}>
                <Button onClick={handleToggle}>
                    <MenuIcon fontSize='large' />
                </Button>
            </Box>
            <OpenableDrawer open={open} handleToggle={handleToggle} />
            <Box >
                <ChangeLanguageButton changeLanguage={changeLanguage} />
                {localStorage.getItem("userId") != null ?
                    <Button onClick={logout}>
                        <LogoutIcon />
                    </Button> : <></>}
            </Box>
        </Box>
    )
}

export default TopBar