import { Button, Drawer, List, ListItem, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const OpenableDrawer = ({ open, handleToggle }) => {

    const navigate = useNavigate()

    return (
        <>
            <Drawer PaperProps={{
                sx: {
                    bgcolor: "#0c1117"
                }
            }}
                
                variant="temporary"
                anchor="left"
                open={open}
                onClose={handleToggle}>
                <List>
                    <ListItem component={Button} onClick={() => { navigate("/home") }}>
                        <Typography color={"#ffffff"}>Home Page</Typography>
                    </ListItem>
                    <ListItem component={Button} onClick={() => { navigate("/users") }}>
                        <Typography color={"#ffffff"}>Users</Typography>
                    </ListItem>
                </List>
            </Drawer >

        </>
    )
}

export default OpenableDrawer