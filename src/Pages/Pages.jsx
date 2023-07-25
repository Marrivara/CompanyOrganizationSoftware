import LoginPage from "./LoginPage";
import ForgotPassword from "./ForgotPassword"
import { BrowserRouter, Routes, Route, Redirect, Navigate } from 'react-router-dom';
import ActivateAccount from "./ActivateAccount";
import SetNewPassword from "./SetNewPassword";
import { tr, en } from "../Components/languages";
import React from "react";
import { useState } from "react";
import HomePage from "./HomePage";
import Users from "./Users";

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
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={
                            localStorage.getItem("userId") === null ? (
                                <LoginPage changeLanguage={changeLanguage} />
                            ) : (
                                <Navigate to={`/home`} replace />
                            )} />
                        <Route path="/home" element={<HomePage changeLanguage={changeLanguage}/>} />
                        <Route path="/users" element={<Users changeLanguage={changeLanguage}/>} />
                        <Route path="forgotPassword" element={<ForgotPassword />} />
                        <Route path="activateAccount" element={<ActivateAccount />} />
                        <Route path="setNewPassword" element={<SetNewPassword type={"verifyActivationEmailToken"} />} />
                        <Route path="resetPassword" element={<SetNewPassword type={"verifyResetPasswordToken"} />} />
                    </Routes>
                </BrowserRouter>
            </LanguageContext.Provider>
        </>
    )

}
export default Pages