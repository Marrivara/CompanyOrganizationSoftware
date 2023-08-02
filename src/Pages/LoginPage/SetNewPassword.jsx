import { Alert, Box, Container, Snackbar, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { LanguageContext } from "../Pages";
import NewPasswordInput from "../../Components/InputFields/NewPasswordInput";
import axios from "axios";
import { url } from "../../Resources/Url";
import ChangeLanguageButton from "../../Components/TopBar/ChangeLanguageButton";

function SetNewPassword({ changeLanguage, type, setSnackbarState }) {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const language = React.useContext(LanguageContext);

    const navigate = useNavigate()

    const [isLinkValid, setValid] = useState(false);

    const [message, setMessage] = useState("")


    const verifyLink = async () => {
        await axios.post(url + '/auth/' + type + "?token=" + token)
            .then((response) => {

                //continue to site
                setValid(true)
                setMessage("Token is Valid")
                //console.log(response)

            }).catch((error) => {
                setMessage("Wrong token")

                setSnackbarState({
                    snackbarOpen: true,
                    snackbarMessage: "Token is not valid",
                    severity: "error"
                })
                navigate("/")
            })
    }

    useEffect(() => {

        verifyLink()

    }, [])

    const handleFormSubmit = async (data) => {

        if (isLinkValid) {
            await axios.post(url + '/auth/setNewPassword', {

                token: token,
                password: data

            }).then((response) => {

                console.log(response)
                setSnackbarState({
                    snackbarOpen: true,
                    snackbarMessage: "New Password Is Set",
                    severity: "success"
                })
                setMessage("Password has changed")
                navigate("/")

            }).catch((error) => {
                setMessage("Password didnt change")
                console.error(error)
                setSnackbarState({
                    snackbarOpen: true,
                    snackbarMessage: "Error Occured",
                    severity: "error"
                })
                navigate("/")
            })
            localStorage.removeItem("passwordToken")
        }
    }

    return (
        <>
            {isLinkValid && <>
                <Box display={"flex"} justifyContent={"flex-end"} marginBottom={6}>
                    <ChangeLanguageButton changeLanguage={changeLanguage} />
                </Box>
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
                        alignItems: "center",
                    }}>
                        <Box sx={{
                            py: 1,
                            px: 1,
                        }}>
                            <Typography variant="h3" >{language.setNewPassword}</Typography>
                        </Box>
                        <Box component="form" noValidate sx={{ mt: 1, width: '90%' }} justifyContent={'center'}>
                            <NewPasswordInput onInputChange={handleFormSubmit} />
                        </Box>
                    </Box>

                </Container>
            </>
            }
        </>


    );
}

export default SetNewPassword;
