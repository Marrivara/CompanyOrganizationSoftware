import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LanguageContext } from "./Pages";
import EmailInput from "../Components/EmailInput";
import { useForm } from "react-hook-form";
import Password from "../Components/Password";
import axios from "axios";
import { url } from "../Url";
import { useNavigate } from "react-router-dom";


function LoginPage() {

    const language = React.useContext(LanguageContext);

    const navigate = useNavigate()

    const { handleSubmit, control } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(url + "/auth/login", {
                email: data.email,
                password: data.password
            });
            if(response.ok){
                localStorage.setItem("userToken", response.token)
                localStorage.setItem("userId", response.id)
                localStorage.setItem("role", response.role)
                navigate(`/home/${localStorage.getItem("userId")}`)
            }
        } catch (error) {
            console.error(error)
        }
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

    );
}

export default LoginPage;
