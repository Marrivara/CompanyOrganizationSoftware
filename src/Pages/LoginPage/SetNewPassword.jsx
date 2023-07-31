import { Box, Container, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { LanguageContext } from "../Pages";
import NewPasswordInput from "../../Components/InputFields/NewPasswordInput";
import axios from "axios";
import { url } from "../../Resources/Url";

function SetNewPassword({type}) {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const [password, setPassword] = useState();

    const language = React.useContext(LanguageContext);

    const navigate = useNavigate()

    const [isLinkValid, setValid] = useState(false);

    const [message, setMessage] = useState("");
    const [email, setEmail] = useState();

    useEffect(() => {
        const verifyLink = async () => {
            try {
                const response = await axios.post( url + '/auth/' + type +"?token="+token)
                setMessage(response.data.message)
                setEmail(response.data.data.email)
                if (response.status == "200") {
                    setValid(true)
                    console.log("validated")
                }
                console.log(response)
            } catch (error) {
                console.error(error)
                setMessage("Api Error")
            }


        }
        verifyLink()
    })

    const handleFormSubmit = async (data) => {
        
        if (isLinkValid) {
            try {
                const response = await axios.post(url + '/auth/setNewPassword', {
                    email: email,
                    password: data
                });
                console.log(response)
            } catch (error) {
                console.error(error)
            }
            console.log(data, email)
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
