import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';


const NormalInput = ({control, defaultValue, variant, name, label}) => {
 

  return (
    <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: "Required" }}
        render={({ field, fieldState }) => (
          <TextField
            margin='dense'
            color='primary'
            required
            autoFocus
            id={name}
            name={name}
            label={label}
            fullWidth
            variant={variant}
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : null}
            {...field}
          />
        )}
      />
  );
};

export default NormalInput;
