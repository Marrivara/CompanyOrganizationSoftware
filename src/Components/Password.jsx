import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';


const Password = ({control,language}) => {

  return (
    <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: language.passwordRequired}}
        render={({ field, fieldState }) => (
          <TextField
            margin='normal'
            color='primary'
            id='password'
            required
            label={language.password}
            fullWidth
            type="password"
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : null}
            {...field}
          />
        )}
      />
  );
};

export default Password;