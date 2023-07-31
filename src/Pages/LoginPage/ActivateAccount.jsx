import { Box, Button, Container, Link, Typography } from "@mui/material";
import { useState } from "react";
import React from "react";
import { LanguageContext } from "../Pages";
import EmailInput from "../../Components/InputFields/EmailInput";
import { useForm } from "react-hook-form";
import axios from "axios";
import { url } from "../../Resources/Url";

function ActivateAccount({ setSnackbarState }) {

    const { handleSubmit, control } = useForm();

    const language = React.useContext(LanguageContext);

    const [submitted, setSubmitted] = useState(false)

    const onSubmit = async (data) => {
        await axios.post(url + '/auth/activateAccount', {
            email: data.email,

        }).then((response) => {

            setSnackbarState({
                snackbarOpen: true,
                snackbarMessage: language.activationLinkSent,
                severity: "success"
            })

        }).catch((error) => {
            let message = ""
            switch (error.response.status) {
                case 401:
                    // wrong email
                    message = "Email Doesn't Exist"
                    break;
                case 400:
                    // user already activated
                    message = error.response.data.message
                    break;
                default:
                    // server error
                    message = "Server Error"
                    break;
            }
            console.log("burası")
            setSnackbarState({
                snackbarOpen: true,
                snackbarMessage: message,
                severity: "error"
            })
        })
    }

    return (

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
                    <Typography variant="h3" >{language.activateAccount}</Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '90%' }} justifyContent={'center'}
                >
                    <EmailInput control={control} language={language} />


                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }}>
                        {language.activateUser}
                    </Button>

                    <Typography variant="body2" mt={1}>
                        {language.alreadyHaveAccount}{' '}
                        <Link href="/">
                            {language.signIn}
                        </Link>
                    </Typography>

                </Box>
            </Box>

        </Container>

    );
}

export default ActivateAccount;
