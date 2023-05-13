import LoginPage from "./LoginPage";
import ForgotPassword from "./ForgotPassword"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ActivateAccount from "./ActivateAccount";
import SetNewPassword from "./SetNewPassword";
import { tr, en } from "../Greeting/languages";
import { Box, Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { GB, TR } from 'country-flag-icons/react/3x2'


export const LanguageContext = React.createContext();



function Pages() {

    const languages = { tr, en }

    const [language, setLanguage] = useState(localStorage.getItem("language"))

    const changeLanguage = () => {
        const nextLanguage = language === 'en' ? 'tr' : 'en'
        localStorage.setItem("language", nextLanguage)
        setLanguage(nextLanguage)
    }

    return (
        <>
            <LanguageContext.Provider value={languages[language]}>

                <Box display={"flex"} justifyContent={"flex-end"} marginBottom={6}>
                    <Button width={'5%'} onClick={changeLanguage}>
                        {language === 'en' ? <TR title="Türkçe"/> : <GB title="English" />}
                        
                    </Button>
                </Box>



                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="forgotPassword" element={<ForgotPassword />} />
                        <Route path="activateAccount" element={<ActivateAccount />} />
                        <Route path="setNewPassword" element={<SetNewPassword />} />
                    </Routes>
                </BrowserRouter>
            </LanguageContext.Provider>
        </>
    )

}
export default Pages