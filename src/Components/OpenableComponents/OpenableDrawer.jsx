import { Button, Drawer, List, ListItem, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LanguageContext } from '../../Pages/Pages'

const OpenableDrawer = ({ open, handleToggle }) => {

    const navigate = useNavigate()

    const language = React.useContext(LanguageContext)

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
                        <Typography color={"#ffffff"}>{language.openableDrawer.homePage}</Typography>
                    </ListItem>
                    <ListItem component={Button} onClick={() => { navigate("/users") }}>
                        <Typography color={"#ffffff"}>{language.openableDrawer.users}</Typography>
                    </ListItem>
                </List>
            </Drawer >

        </>
    )
}

export default OpenableDrawer