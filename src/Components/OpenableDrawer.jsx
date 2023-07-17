import { Logout } from '@mui/icons-material'
import { Button, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React, { useState } from 'react'

const OpenableDrawer = ({ open, handleToggle }) => {

    return (
        <>
            <Drawer PaperProps={{
                sx: { width: "10%" },
            }} 
            variant="temporary" 
            anchor="left" 
            open={open} 
            onClose={handleToggle}>
                <List>
                    <ListItem button to="/">
                        <ListItemText primary="Users" />
                    </ListItem>
                    <ListItem button to="/companies">
                        <ListItemText primary="Companies" />
                    </ListItem>
                    <ListItem button to="/departments">
                        <ListItemText primary="Departments" />
                    </ListItem>
                </List>
            </Drawer>

        </>
    )
}

export default OpenableDrawer