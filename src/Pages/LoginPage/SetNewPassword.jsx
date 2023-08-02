import { Box, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { LanguageContext } from "../Pages";
import NewPasswordInput from "../../Components/InputFields/NewPasswordInput";
import axios from "axios";
import { url } from "../../Resources/Url";
import ChangeLanguageButton from "../../Components/TopBar/ChangeLanguageButton";

function SetNewPassword({ changeLanguage, type, setSnackbarState }) {

    const { token } = useParams()

    const language = React.useContext(LanguageContext);

    const navigate = useNavigate()

    const [isLinkValid, setValid] = useState(false);

    const verifyLink = async () => {
        await axios.post(url + '/auth/' + type + "?token=" + token)
            .then((response) => {
                //continue to site
                setValid(true)

            }).catch((error) => {
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

                setSnackbarState({
                    snackbarOpen: true,
                    snackbarMessage: "New Password Is Set",
                    severity: "success"
                })
                navigate("/")
            }).catch((error) => {
                setSnackbarState({
                    snackbarOpen: true,
                    snackbarMessage: "Error Occured",
                    severity: "error"
                })
                navigate("/")
            })
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
                            <Typography variant="h3" >{language.loginPages.setNewPassword}</Typography>
                        </Box>
                        
                        <NewPasswordInput onInputChange={handleFormSubmit} />
                    </Box>

                </Container>
            </>
            }
        </>


    );
}

export default SetNewPassword;
