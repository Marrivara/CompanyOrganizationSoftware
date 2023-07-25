import { Drawer, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const OpenableDrawer = ({ open, handleToggle }) => {



    
/** Change Color **/





    return (
        <>
            <Drawer PaperProps={{
                sx: {/* width: { xs: "100%", sm: "30%", md: "20%", lg: "10%" }*/ },
            }}
                variant="temporary"
                anchor="left"
                open={open}
                onClose={handleToggle}>
                <List>
                    <ListItem component={Link} to="/home">
                        <ListItemText primary="Home Page" />
                    </ListItem>
                    <ListItem component={Link} to="/users">
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