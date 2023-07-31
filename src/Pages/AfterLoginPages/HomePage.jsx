import React, { useEffect } from 'react'
import TopBar from '../../Components/TopBar/TopBar'
import { Box, Container, Typography } from '@mui/material'
import { LanguageContext } from '../Pages';
import LocalStorageDelete from '../../Resources/LocalStorageFunctions';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ changeLanguage, signedIn, setSignedIn, setSnackbarState }) => {
    const language = React.useContext(LanguageContext);

    const navigate = useNavigate()

    const name = localStorage.getItem("name")
    const surname = localStorage.getItem("surname")
    const email = localStorage.getItem("email")
    const department = localStorage.getItem("department")
    const role = localStorage.getItem("role")

    useEffect(() => {
        checkUser()
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
            <TopBar changeLanguage={changeLanguage} setSignedIn={setSignedIn} />
            <Container maxWidth="sm" sx={{
                display: "flex",
                flexDirection: "column",
            }}>

                <Box
                    sx={{
                        bgcolor: '#CFE0FE',
                        boxShadow: 5,
                        borderRadius: 3,
                        px: 5,
                        py: 2,
                        marginTop: 4,
                        marginBottom: 2,
                        display: "flex",
                        flexDirection: "column",
                        
                    }}>
                    <Box display={'flex'} margin={3} justifyContent={'center'} >
                        <Typography variant="h3" >
                            {name} {surname}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="body1" gutterBottom>
                            Email: {email}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Department: {department}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Role: {role}
                        </Typography>

                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default HomePage