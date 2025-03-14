import React, { useState } from 'react';
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

  const onSubmit: SubmitHandler<IFormData> = (data) => {
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
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
        </select>
        <p>{errors.gender?.message}</p>
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
              style={{ maxWidth: '30px', marginTop: '10px' }}
            />
          </div>
        )}
        <p>{errors.picture?.message}</p>
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
        <p>{errors.country?.message}</p>
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
