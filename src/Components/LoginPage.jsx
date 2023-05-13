import { Box, Button, Container, Link, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { LanguageContext } from "./Pages";
import { tr, en } from "./languages";



function LoginPage() {


    const language = React.useContext(LanguageContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    }

    useEffect(() => {
        console.log(language)
        console.log(tr.activationLinkSent)
        console.log(LanguageContext)
    })

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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        color="primary"
                        required
                        fullWidth
                        autoFocus
                        id="email"
                        label="email"
                        name="email"


                    />
                    <TextField
                        margin="normal"
                        color="primary"
                        id="password"
                        
                        name="password"
                        required
                        type="password"
                        fullWidth
                    />

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }}>
                        
                    </Button>
                    <Stack direction={"row"} justifyContent={"space-between"} mt={2}>
                        <Link href="/ForgotPassword" variant="body2"></Link>
                        <Link href="/ActivateAccount" variant="body2"></Link>
                    </Stack>
                </Box>
            </Box>

        </Container>

    );
}

export default LoginPage;
