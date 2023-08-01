import LoginPage from "./LoginPage/LoginPage";
import ForgotPassword from "./LoginPage/ForgotPassword"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ActivateAccount from "./LoginPage/ActivateAccount";
import SetNewPassword from "./LoginPage/SetNewPassword";
import { tr, en } from "../Resources/languages";
import React from "react";
import { useState } from "react";
import HomePage from "./AfterLoginPages/HomePage";
import Users from "./AfterLoginPages/Users";
import { Alert, Snackbar } from "@mui/material";

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

    const [snackbarState, setSnackbarState] = useState({
        snackbarOpen: false,
        snackbarMessage: "",
        severity: "",
    })

    const handleClose = () => {
        setSnackbarState({ ...snackbarState, open: false })
    };

    return (<>

        <LanguageContext.Provider value={languages[language]}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/home" element=
                        {signedIn ?
                            <HomePage changeLanguage={changeLanguage} signedIn={signedIn} setSignedIn={setSignedIn} setSnacbarState={setSnackbarState} />
                            :
                            <Navigate to="/" replace />
                        } />
                    <Route exact path="/" element=
                        {signedIn ? <Navigate to="/home" replace /> : <LoginPage changeLanguage={changeLanguage} setSignedIn={setSignedIn} setSnackbarState={setSnackbarState}/>}
                    />
                    <Route path="/users" element={signedIn ? <Users setSnackbarState={setSnackbarState} changeLanguage={changeLanguage} setSignedIn={setSignedIn} /> : <Navigate to="/" replace />} />
                    <Route path="forgotPassword" element={<ForgotPassword setSnackbarState={setSnackbarState} changeLanguage={changeLanguage}/>} />
                    <Route path="activateAccount" element={<ActivateAccount setSnackbarState={setSnackbarState} changeLanguage={changeLanguage}/>} />
                    <Route path="setNewPassword" element={<SetNewPassword type={"verifyActivationEmailToken"} setSnackbarState={setSnackbarState} changeLanguage={changeLanguage}/>} />
                    <Route path="resetPassword" element={<SetNewPassword type={"verifyResetPasswordToken"} setSnackbarState={setSnackbarState} changeLanguage={changeLanguage}/>} />
                </Routes>
            </BrowserRouter>
        </LanguageContext.Provider>

        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            severity={snackbarState.severity}
            autoHideDuration={2000}
            onClose={() => {setSnackbarState({...snackbarState, snackbarOpen:false})}}
            open={snackbarState.snackbarOpen}
        >
            <Alert severity={snackbarState.severity}>{snackbarState.snackbarMessage}</Alert>
        </Snackbar>
    </>
    )

}
export default Pages