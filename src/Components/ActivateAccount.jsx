import { Box, Button, Container, Link, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

function ActivateAccount() {

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
                    <Typography variant="h3" >Activate Account</Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '90%' }} justifyContent={'center'}
                >
                    <TextField
                        margin="normal"
                        color="primary"
                        required

                        autoFocus
                        id="email"
                        label="Email Address"
                        name="email"
                        fullWidth


                    />


                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }}>
                        Activate User
                    </Button>
                    {submitted && <Typography variant="h6" sx={{ mt: 1 }}>An activation link has been sent</Typography>}

                    <Typography variant="body2" mt={1}>
                        Already have an account?{' '}
                        <Link href="/">
                            Sign in
                        </Link>
                    </Typography>

                </Box>
            </Box>

        </Container>

    );
}

export default ActivateAccount;
