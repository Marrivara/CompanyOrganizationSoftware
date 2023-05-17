import { TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';


const EmailInput = ({control, language}) => {
 

  return (
    <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{ required: language.emailRequired , minLength:4, pattern: {value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: language.wrongEmail}}}
        render={({ field, fieldState }) => (
          <TextField
            margin='normal'
            color='primary'
            required
            autoFocus
            id='email'
            name='email'
            label={language.email}
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : null}
            {...field}
          />
        )}
      />
  );
};

export default EmailInput;
