import { Box, Button, Container, Link, Typography } from "@mui/material";
import { useState } from "react";
import React from "react";
import { LanguageContext } from "./Pages";
import EmailInput from "../Components/EmailInput";
import { useForm } from "react-hook-form";
import axios from "axios";

function ActivateAccount() {

    const { handleSubmit, control } = useForm();

    const language = React.useContext(LanguageContext);

    const [submitted, setSubmitted] = useState(false)

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/activateUser', {
                email: data.email,
            });
            console.log(response.data)
            setSubmitted(true)
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
                    <Typography variant="h3" >{language.activateAccount}</Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '90%' }} justifyContent={'center'}
                >
                    <EmailInput control={control} language={language}/>


                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }}>
                        {language.activateUser}
                    </Button>
                    {submitted && <Typography variant="h6" sx={{ mt: 1 }}>{language.activationLinkSent}</Typography>}

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
