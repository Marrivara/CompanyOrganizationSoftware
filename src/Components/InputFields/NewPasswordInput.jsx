import React, { useEffect, useState } from 'react'
import { Button, IconButton, InputAdornment, TextField, Box} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PasswordValidation from './PasswordValidation';
import StrengthBar from './StrengthBar';
import { LanguageContext } from '../../Pages/Pages';

const NewPasswordInput = ({ onInputChange}) => {

    const language = React.useContext(LanguageContext)

    const [password, setPassword] = useState();
    const [inputColor, setInputColor] = useState('primary');
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setStrength] = useState(0);
    const [validations, setValidations] = useState([
        { condition: language.passwordValidation.length, isValid: false },
        { condition: language.passwordValidation.upperCase, isValid: false },
        { condition: language.passwordValidation.digit, isValid: false },
        { condition: language.passwordValidation.specialChar, isValid: false },
        { condition: language.passwordValidation.lowerCase, isValid: false },
        { condition: language.passwordValidation.space, isValid: true }
    ]);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const checkPasswordValid = (newValidations) => {
        const isValid = newValidations.every((validation) => validation.isValid);
        setInputColor(isValid ? 'success' : 'error')
        return isValid;
    }

    useEffect(() => {
        setStrength(passwordIsValid ? calculatePasswordStrength : 0)
    }, [password])

    const calculatePasswordStrength = () => {
        if (password.length >= 12) {
            return (password.length >= 16 ? 100 : 70)
        } else {
            return 50
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwordIsValid) {
            onInputChange(password);
        }
    };

    const handleChange = async (e) => {
        let newPassword = e.target.value
        setPassword(newPassword)

        //Validation Rules
        const minLengthRegExp = /.{8,}/;
        const uppercaseRegExp = /(?=.*?[A-Z])/;
        const digitsRegExp = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[@$.!-+])/;
        const lowercaseRegExp = /(?=.*?[a-z])/;
        const spaceRegExp = /\s/;

        const updatedValidations = [
            {
                condition: language.passwordValidation.length,
                isValid: minLengthRegExp.test(newPassword)
            },
            {
                condition: language.passwordValidation.upperCase,
                isValid: uppercaseRegExp.test(newPassword)
            },
            {
                condition: language.passwordValidation.digit,
                isValid: digitsRegExp.test(newPassword)
            },
            {
                condition: language.passwordValidation.specialChar,
                isValid: specialCharRegExp.test(newPassword)
            },
            {
                condition: language.passwordValidation.lowerCase,
                isValid: lowercaseRegExp.test(newPassword)
            },
            {
                condition: language.passwordValidation.space,
                isValid: !spaceRegExp.test(newPassword)
            },
        ];

        setPasswordIsValid(checkPasswordValid(updatedValidations))
        setValidations(updatedValidations);
    }

    const tick = '\u2713'; // Tick mark
    const cross = '\u2717'; // Cross mark


    return (
        <>
            <TextField
                margin="dense"
                color={inputColor}
                id='password'
                focused
                required
                label={language.password}
                fullWidth
                type={showPassword ? 'text' : 'password'}
                defaultValue={password}
                onChange={handleChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={toggleShowPassword} edge="end">
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <StrengthBar strength={passwordStrength} />

            <Box bgcolor={'#cccccc'} borderRadius={2} display={'flex'} alignItems={'start'}>
                <PasswordValidation validations={validations} />
            </Box>

            <Button onClick={handleSubmit} fullWidth variant="contained" sx={{ mt: 3 }}>
                {language.send}
            </Button>

        </>
    )
}

export default NewPasswordInput