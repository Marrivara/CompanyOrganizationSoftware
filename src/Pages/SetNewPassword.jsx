import { Box, Container, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { LanguageContext } from "./Pages";
import NewPasswordInput from "../Components/NewPasswordInput";
import axios from "axios";

function SetNewPassword({type}) {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const [password, setPassword] = useState();

    const language = React.useContext(LanguageContext);

    const navigate = useNavigate()

    const [isLinkValid, setValid] = useState(true);

    const [message, setMessage] = useState("");
    const [email, setEmail] = useState();

    useEffect(() => {
        const verifyLink = async () => {
            try {
                const response = await axios.post('http://localhost:5000/auth/' + type, {
                    token: token,
                });
                setMessage(response.message)
                setEmail(response.email)
                if (response.ok) {
                    setValid(true)
                }

            } catch (error) {
                console.error(error)
                setMessage("Api Error")
            }


        }

        verifyLink()
    })

    const handleFormSubmit = async (data) => {
        console.log(data.password)
        if (isLinkValid) {
            try {
                const response = await axios.post('http://localhost:5000/auth/setNewPassword', {
                    email: email,
                    password: data.password
                });
                console.log(response.data)
            } catch (error) {
                console.error(error)
            }
        }


    }

    return (
        <>
            {isLinkValid ? <Container maxWidth="sm" sx={{
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
                    <Box component="form" noValidate sx={{ mt: 1, width: '90%' }} justifyContent={'center'}>
                        <NewPasswordInput onInputChange={handleFormSubmit} language={language} />
                    </Box>
                </Box>

            </Container> : <Typography>{message}</Typography>}
        </>


    );
}

export default SetNewPassword;
