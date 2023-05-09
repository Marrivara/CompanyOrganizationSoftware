import { Box, Button, Container, Link, Stack, TextField, Typography } from "@mui/material";

function LoginPage() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    }

    return (

        <Container maxWidth="sm" sx={{
            display: "flex",
            flexDirection: "column",
        }}>

            <Box sx={{
                //bgcolor: 'primary.dark',
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
                    <Typography variant="h2" >Sign In</Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        color="primary"
                        required
                        fullWidth
                        autoFocus
                        id="email"
                        label="Email Address"
                        name="email"


                    />
                    <TextField
                        margin="normal"
                        color="primary"
                        id="password"
                        label="Password"
                        name="password"
                        required
                        fullWidth
                    />

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }}>
                        SIGN IN
                    </Button>
                    <Stack direction={"row"} justifyContent={"space-between"} mt={2}>
                        <Link href="#" variant="body2">Forgot Password?</Link>
                        <Link href="#" variant="body2">Activate Account</Link>
                    </Stack>
                </Box>
            </Box>

        </Container>

    );
}

export default LoginPage;
