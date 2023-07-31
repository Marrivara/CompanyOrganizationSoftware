import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import EmailInput from './EmailInput';
import Password from './PasswordInput'; 

const Form = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <EmailInput control={control}/>
      <Password control={control}/>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default Form;
