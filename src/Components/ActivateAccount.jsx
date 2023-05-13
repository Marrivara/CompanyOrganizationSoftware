import { Box, Button, Container, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import React from "react";
import { LanguageContext } from "./Pages";

function ActivateAccount() {

    const language = React.useContext(LanguageContext);

    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
        });
        setSubmitted(true)
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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '90%' }} justifyContent={'center'}
                >
                    <TextField
                        margin="normal"
                        color="primary"
                        required

                        autoFocus
                        id="email"
                        label={language.email}
                        name="email"
                        fullWidth


                    />


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
