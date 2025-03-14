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
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([]);
  const countries = Object.values(ECountriesList);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue('name', value, { shouldValidate: true });
    setNameSuggestions(
      value.length > 0
        ? ['John', 'Johnny', 'Jonathan', 'Joanna', 'Jolie'].filter((s) =>
            s.toLowerCase().startsWith(value.toLowerCase())
          )
        : []
    );
  };

  const handleNameSuggestionClick = (suggestion: string) => {
    setValue('name', suggestion, { shouldValidate: true });
    setNameSuggestions([]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          {...register('name')}
          placeholder="Enter your name"
          onChange={handleNameChange}
          autoComplete="name"
        />
        {nameSuggestions.length > 0 && (
          <ul
            style={{
              border: '1px solid #ccc',
              padding: '5px',
              marginTop: '5px',
              listStyle: 'none',
            }}
          >
            {nameSuggestions.map((suggestion, index) => (
              <li
                key={index}
                style={{
                  cursor: 'pointer',
                  padding: '3px 0',
                }}
                onClick={() => handleNameSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <p style={{ color: 'red' }}>{errors.name?.message}</p>
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          {...register('age')}
          placeholder="Enter your age"
        />
        <p style={{ color: 'red' }}>{errors.age?.message}</p>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          placeholder="Enter your email"
          autoComplete="email"
        />
        <p style={{ color: 'red' }}>{errors.email?.message}</p>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          placeholder="Enter your password"
          autoComplete="new-password"
        />
        <p style={{ color: 'red' }}>{errors.password?.message}</p>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          placeholder="Confirm your password"
        />
        <p style={{ color: 'red' }}>{errors.confirmPassword?.message}</p>
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" {...register('gender')}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <p style={{ color: 'red' }}>{errors.gender?.message}</p>
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
        <p style={{ color: 'red' }}>{errors.picture?.message}</p>
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
        <p style={{ color: 'red' }}>{errors.country?.message}</p>
      </div>
      <div>
        <input id="terms" type="checkbox" {...register('termsAccepted')} />
        <label htmlFor="terms">Accept Terms and Conditions</label>
        <p style={{ color: 'red' }}>{errors.termsAccepted?.message}</p>
      </div>
      <button type="submit" disabled={Object.keys(errors).length > 0}>
        Submit
      </button>
    </form>
  );
};

export default ControlledFormPage;
