import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { LanguageContext } from "./Pages";
import NewPasswordInput from "../Components/NewPasswordInput";

function SetNewPassword() {

    const [password, setPassword] = useState();

    const language = React.useContext(LanguageContext);

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            password: data.get("password"),
        });
        //navigate("/")
        console.log(password);

    }

    const handleFormSubmit = (value) => {
        console.log("this is inside" , value)
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
                    <Typography variant="h3" >{language.setNewPassword}</Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '90%' }} justifyContent={'center'}>
                    <NewPasswordInput onInputChange={handleFormSubmit} language={language}/>
                </Box>
            </Box>

        </Container>

    );
}

export default SetNewPassword;
