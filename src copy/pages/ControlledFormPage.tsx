import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addControlledData } from '../redux/formSlice';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter')
    .required(),
  age: yup.number().positive().integer().required('Age is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'At least one uppercase letter required')
    .matches(/[a-z]/, 'At least one lowercase letter required')
    .matches(/\d/, 'At least one number required')
    .matches(/[@$!%*?&#]/, 'At least one special character required')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup.string().required('Gender is required'),
  termsAccepted: yup
    .boolean()
    .oneOf([true], 'You must accept the Terms and Conditions'),
});

const ControlledFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    dispatch(addControlledData(data));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" {...register('name')} />
        <p>{errors.name?.message}</p>
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input id="age" type="number" {...register('age')} />
        <p>{errors.age?.message}</p>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" {...register('email')} />
        <p>{errors.email?.message}</p>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" {...register('password')} />
        <p>{errors.password?.message}</p>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
        <p>{errors.confirmPassword?.message}</p>
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" {...register('gender')}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <p>{errors.gender?.message}</p>
      </div>
      <div>
        <input id="terms" type="checkbox" {...register('termsAccepted')} />
        <label htmlFor="terms">Accept Terms and Conditions</label>
        <p>{errors.termsAccepted?.message}</p>
      </div>
      <button type="submit" disabled={Object.keys(errors).length > 0}>
        Submit
      </button>
    </form>
  );
};

export default ControlledFormPage;
