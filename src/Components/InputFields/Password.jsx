import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';


const Password = ({ control, language }) => {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Controller
      name="password"
      control={control}
      defaultValue=""
      rules={{ required: language.passwordRequired }}
      render={({ field, fieldState }) => (
        <TextField
          margin='normal'
          color='primary'
          id='password'
          required
          label={language.password}
          fullWidth
          type={showPassword ? 'text' : 'password'}
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : null}
          {...field}
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
      )}
    />
  );
};

export default Password;