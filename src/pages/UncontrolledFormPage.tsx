import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUncontrolledData } from '../redux/formSlice';
import { useNavigate } from 'react-router-dom';
import { ECountriesList } from '../types/country';
import validationSchema from '../components/validation';
import { IFormData } from '../types/type';

const UncontrolledFormPage = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const file = pictureRef.current?.files?.[0];

    const IFormData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      termsAccepted: termsRef.current?.checked || false,
      picture: file ? URL.createObjectURL(file) : null,
      country: countryRef.current?.value || '',
    };

    try {
      validationSchema.validate(IFormData, { abortEarly: false });
      setErrors({});
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          IFormData.picture = base64String;
          dispatch(addUncontrolledData(IFormData));
          navigate('/');
        };
        reader.readAsDataURL(file);
      } else {
        dispatch(addUncontrolledData(IFormData));
        navigate('/');
      }
    } catch (validationError: any) {
      const formattedErrors: Record<string, string> = {};
      validationError.inner.forEach((error: any) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" ref={nameRef} />
          <p>{errors.name}</p>
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input id="age" type="number" ref={ageRef} />
          <p>{errors.age}</p>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" ref={emailRef} />
          <p>{errors.email}</p>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" ref={passwordRef} />
          <p>{errors.password}</p>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            ref={confirmPasswordRef}
          />
          <p>{errors.confirmPassword}</p>
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" ref={genderRef}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p>{errors.gender}</p>
        </div>
        <div>
          <label htmlFor="picture">Picture:</label>
          <input
            id="picture"
            type="file"
            accept="image/png, image/jpeg"
            ref={pictureRef}
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
          <p>{errors.picture}</p>
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <select id="country" ref={countryRef}>
            <option value="">Select</option>
            {Object.values(ECountriesList).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <p>{errors.country}</p>
        </div>
        <div>
          <input id="terms" type="checkbox" ref={termsRef} />
          <label htmlFor="terms">Accept Terms and Conditions</label>
          <p>{errors.termsAccepted}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  };
};
export default UncontrolledFormPage;
