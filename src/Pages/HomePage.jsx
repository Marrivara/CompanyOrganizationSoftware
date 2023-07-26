import React, { useEffect, useState } from 'react'
import TopBar from '../Components/TopBar'
import { Box, Container, Typography } from '@mui/material'
import { LanguageContext } from './Pages';
import LocalStorageDelete from '../LocalStorageFunctions';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ changeLanguage , signedIn, setSignedIn}) => {
    const language = React.useContext(LanguageContext);
    
    const navigate = useNavigate()

    const name = localStorage.getItem("name")
    const surname = localStorage.getItem("surname")
    const email = localStorage.getItem("email")
    const department = localStorage.getItem("department")

    useEffect(() => {
        checkUser()
        console.log("tekrar home" + signedIn)
    }, [])

    const checkUser = () => {
        if (!signedIn) {
            LocalStorageDelete()
            setSignedIn(false)
            //navigate("/")
        }
    }

    return (
        <>
            <TopBar changeLanguage={changeLanguage} setSignedIn={setSignedIn}/>
            <Container maxWidth="sm" sx={{
                display: "flex",
                flexDirection: "column",
            }}>

                <Box sx={{
                    bgcolor: '#CFE0FE',
                    boxShadow: 5,
                    borderRadius: 3,
                    px: 5,
                    py: 6,
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                }}>
                    <Box sx={{
                        py: 1,
                        px: 1,
                    }}>
                        <Typography variant="h4" >{name} {surname}</Typography>
                        <Typography variant="h5" >Email: {email}</Typography>
                        <Typography variant="h5" >Department: {department}</Typography>

                    </Box>
                </Box>

            </Container>
        </>
    )
}

export default HomePage