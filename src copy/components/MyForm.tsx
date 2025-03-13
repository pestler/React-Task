import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import yupPassword from 'yup-password';
yupPassword(yup);

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .password()
    .min(8, 'Password must be at least 8 characters long')
    .minLowercase(1, 'Password must contain at least one lowercase letter')
    .minUppercase(1, 'Password must contain at least one uppercase letter')
    .minNumbers(1, 'Password must contain at least one number')
    .required('Password is required'),
});

const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input type="email" {...register('email')} />
        <p>{errors.email?.message}</p>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" {...register('password')} />
        <p>{errors.password?.message}</p>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
