import React, { useState, useCallback } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from '../components/validation';
import { IFormData } from '../types/type';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addControlledData } from '../redux/formSlice';
import { ECountriesList } from '../types/country';

const ControlledFormPage: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const countries = Object.values(ECountriesList);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(validationSchema) as Resolver<IFormData>,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderError = useCallback(
    (error: string | undefined) =>
      error ? <p style={{ color: 'red' }}>{error}</p> : null,
    []
  );

  const onSubmit: SubmitHandler<IFormData> = useCallback(
    (data) => {
      if (data.picture && data.picture[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          data.picture = base64String as unknown as FileList;
          dispatch(addControlledData(data));
          navigate('/');
        };
        reader.readAsDataURL(data.picture[0]);
      } else {
        dispatch(addControlledData(data));
        navigate('/');
      }
    },
    [dispatch, navigate]
  );

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload a valid image (JPEG or PNG)');
      }
    },
    []
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" {...register('name')} />
        {renderError(errors.name?.message)}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input id="age" type="number" {...register('age')} min={0} step={1} />
        {renderError(errors.age?.message)}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" {...register('email')} />
        {renderError(errors.email?.message)}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" {...register('password')} />
        {renderError(errors.password?.message)}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
        {renderError(errors.confirmPassword?.message)}
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" {...register('gender')}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {renderError(errors.gender?.message)}
      </div>
      <div>
        <label htmlFor="picture">Picture:</label>
        <input
          id="picture"
          type="file"
          accept="image/png, image/jpeg"
          {...register('picture')}
          onChange={handleImageChange}
        />
        {previewImage && (
          <div>
            <img
              src={previewImage}
              alt="Preview"
              style={{ maxWidth: '100px', marginTop: '10px' }}
            />
          </div>
        )}
        {renderError(errors.picture?.message)}
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <select id="country" {...register('country')}>
          <option value="">Select</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {renderError(errors.country?.message)}
      </div>
      <div>
        <input id="terms" type="checkbox" {...register('termsAccepted')} />
        <label htmlFor="terms">Accept Terms and Conditions</label>
        {renderError(errors.termsAccepted?.message)}
      </div>
      <button type="submit" disabled={Object.keys(errors).length > 0}>
        Submit
      </button>
    </form>
  );
};

export default ControlledFormPage;
