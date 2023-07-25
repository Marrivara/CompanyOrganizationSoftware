import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LanguageContext } from "./Pages";
import EmailInput from "../Components/EmailInput";
import { useForm } from "react-hook-form";
import Password from "../Components/Password";
import axios from "axios";
import { url } from "../Url";
import { useNavigate } from "react-router-dom";
import ChangeLanguageButton from "../Components/ChangeLanguageButton";


function LoginPage({changeLanguage}) {

    const language = React.useContext(LanguageContext);

    const navigate = useNavigate()

    const { handleSubmit, control } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(url + "/auth/login", {
                email: data.email,
                password: data.password
            });
            console.log(response.data.data.accessToken)
            if(response.status=="200"){

                localStorage.setItem("userToken", response.data.data.accessToken)
                localStorage.setItem("userId", response.data.data.user.id)
                localStorage.setItem("name", response.data.data.user.name)
                localStorage.setItem("surname", response.data.data.user.surname)
                localStorage.setItem("role", response.data.data.user.role)
                navigate(`/home`)
            }
        } catch (error) {
            console.error(error)
        }
    }


    return (<>
        <Box display={"flex"} justifyContent={"flex-end"} marginBottom={6}>
            <ChangeLanguageButton changeLanguage={changeLanguage}/>
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

                    <EmailInput control={control} language={language} />
                    <Password control={control} language={language} />

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }}>
                        {language.signIn}
                    </Button>
                    <Stack direction={"row"} justifyContent={"space-between"} mt={2}>
                        <Link href="/ForgotPassword" variant="body2">{language.forgotPassword}</Link>
                        <Link href="/ActivateAccount" variant="body2">{language.activateAccount}</Link>
                    </Stack>
                </Box>
            </Box>

        </Container>
        </>
    );
}

export default LoginPage;
