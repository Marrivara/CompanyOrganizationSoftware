import { Backdrop, Box, Button, CircularProgress, Container, Link, Typography } from "@mui/material";
import React from "react";
import { LanguageContext } from "../Pages";
import EmailInput from "../../Components/InputFields/EmailInput";
import { useForm } from "react-hook-form";
import axios from "axios";
import { url } from "../../Resources/Url";
import ChangeLanguageButton from "../../Components/TopBar/ChangeLanguageButton";

function ForgotPassword({ changeLanguage, setSnackbarState }) {

    const { handleSubmit, control } = useForm()

    const [backdropOpen, setBackdropOpen] = React.useState(false);

    const closeBackdrop = () => {
        setBackdropOpen(false);
    };
    const openBackdrop = () => {
        setBackdropOpen(true);
    };

    const language = React.useContext(LanguageContext);

    const onSubmit = async (data) => {
        openBackdrop()
        await axios.post(url + '/auth/forgotPassword', {
            email: data.email,
        },{
            headers:{
                'Accept-Language':language.language
            }
        }).then((response) => {
            if (response.status == "200") {
                setSnackbarState({
                    snackbarOpen: true,
                    snackbarMessage: language.snackbarMessages.linkSent,
                    severity: "success"
                })
            }
        }).catch((error) => {
            let message = ""
            switch (error.response.status) {
                case 404:
                    // wrong email
                    message = language.snackbarMessages.emailNotExists
                    break;
                case 400:
                    // user not activated
                    message = language.snackbarMessages.userNotActivated
                    break;
                default:
                    // server error
                    message = language.snackbarMessages.serverProblem
                    break;
            }
            setSnackbarState({
                snackbarOpen: true,
                snackbarMessage: message,
                severity: "error"
            })
        })
        closeBackdrop()
    }

    return (<>
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
                    <Typography variant="h3" >{language.loginPages.resetPassword}</Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '90%' }} justifyContent={'center'}
                >
                    <EmailInput control={control} language={language} />

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }}>
                        {language.loginPages.sendForgotPassword}
                    </Button>
                    <Typography variant="body2" mt={1}>
                        {language.loginPages.alreadyHaveAccount}{' '}
                        <Link href="/">
                            {language.loginPages.signIn}
                        </Link>
                    </Typography>

                </Box>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdropOpen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    </>

    );
}

export default ForgotPassword;
