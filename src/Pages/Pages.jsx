import LoginPage from "./LoginPage";
import ForgotPassword from "./ForgotPassword"
import { BrowserRouter, Routes, Route, Redirect, Navigate } from 'react-router-dom';
import ActivateAccount from "./ActivateAccount";
import SetNewPassword from "./SetNewPassword";
import { tr, en } from "../Components/languages";
import React, { useEffect } from "react";
import { useState } from "react";
import HomePage from "./HomePage";
import Users from "./Users";

export const LanguageContext = React.createContext();



function Pages() {


    const languages = { tr, en }

    const [language, setLanguage] = useState(localStorage.getItem("language"))
    const [signedIn, setSignedIn] = useState(localStorage.getItem("userId") != null)

    const changeLanguage = () => {
        const nextLanguage = language === 'en' ? 'tr' : 'en'
        localStorage.setItem("language", nextLanguage)
        setLanguage(nextLanguage)
    }

    useEffect(()=>{
        console.log("geldi")
        console.log(signedIn)
    })

    return (
        <>
            <LanguageContext.Provider value={languages[language]}>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/home" element=
                            {signedIn ?
                                <HomePage changeLanguage={changeLanguage} signedIn={signedIn} setSignedIn={setSignedIn} />
                                :
                                <Navigate to="/" replace />
                            } />
                            <Route exact path="/" element=
                                {signedIn ? <Navigate to="/home" replace/> : <LoginPage changeLanguage={changeLanguage} setSignedIn={setSignedIn}/>}
                            />
                            <Route path="/users" element={signedIn ? <Users changeLanguage={changeLanguage} setSignedIn={setSignedIn}/>: <Navigate to="/" replace />}/>
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