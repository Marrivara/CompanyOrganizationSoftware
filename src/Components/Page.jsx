import LoginPage from "./LoginPage";
import ForgotPassword from "./ForgotPassword"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ActivateAccount from "./ActivateAccount";
import SetNewPassword from "./SetNewPassword";

function Page() {
        return (

                <BrowserRouter>
                        <Routes>
                                <Route path="/" element={<LoginPage/>}/>
                                <Route path="forgotPassword" element={<ForgotPassword/>}/>
                                <Route path="activateAccount" element={<ActivateAccount/>}/>
                                <Route path="setNewPassword" element={<SetNewPassword/>}/>
                        </Routes>
                </BrowserRouter>
        )

}
export default Page