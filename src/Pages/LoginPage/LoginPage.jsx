import { Backdrop, Box, Button, CircularProgress, Container, Link, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { LanguageContext } from "../Pages";
import EmailInput from "../../Components/InputFields/EmailInput";
import { useForm } from "react-hook-form";
import Password from "../../Components/InputFields/Password";
import axios from "axios";
import { url } from "../../Resources/Url";
import { useNavigate } from "react-router-dom";
import ChangeLanguageButton from "../../Components/TopBar/ChangeLanguageButton";


function LoginPage({ changeLanguage, setSignedIn, setSnackbarState }) {

    const language = React.useContext(LanguageContext);
    const [loginError, setLoginError] = useState(false)

    const [backdropOpen, setBackdropOpen] = React.useState(false);

    const closeBackdrop = () => {
        setBackdropOpen(false);
    };
    const openBackdrop = () => {
        setBackdropOpen(true);
    };

    const navigate = useNavigate()

    const { handleSubmit, control } = useForm();

    const onSubmit = async (data) => {
        openBackdrop()
  
            await axios.post(url + "/auth/login", {
                email: data.email,
                password: data.password
            }).then((response) =>{
                //Might store the id's of the objects****
                localStorage.setItem("userId", response.data.data.user.id)
                localStorage.setItem("userToken", response.data.data.accessToken)
                localStorage.setItem("name", response.data.data.user.name)
                localStorage.setItem("surname", response.data.data.user.surname)
                localStorage.setItem("role", response.data.data.user.role.name)
                localStorage.setItem("email", response.data.data.user.email)
                localStorage.setItem("department", response.data.data.user.department.name)
                localStorage.setItem("company", response.data.data.user.company.name)
                setSignedIn(true)
                setLoginError(false)
                setSnackbarState({
                    snackbarOpen: true,
                    snackbarMessage: language.snackbarMessages.loginSuccessful,
                    severity: "success"
                })

            }).catch((error) =>{
                setSnackbarState({
                    snackbarOpen: true,
                    snackbarMessage: language.snackbarMessages.loginError,
                    severity: "error"
                })
            setLoginError(true)
            });
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
                    <Typography variant="h2" >{language.signIn}</Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>

                    <EmailInput control={control} language={language} defaultValue={""} variant={'outlined'} />
                    <Password control={control} language={language} />

                    {loginError && <Typography mt={1} variant="body2" color={'error'}>Email or password is wrong</Typography>}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }}>
                        {language.signIn}
                    </Button>
                    <Stack direction={"row"} justifyContent={"space-between"} mt={2}>
                        <Link href="/ForgotPassword" variant="body2">{language.forgotPassword}</Link>
                        <Link href="/ActivateAccount" variant="body2">{language.activateAccount}</Link>
                    </Stack>
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

export default LoginPage;
