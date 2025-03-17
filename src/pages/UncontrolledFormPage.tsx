import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUncontrolledData } from '../redux/formSlice';
import { useNavigate } from 'react-router-dom';
import { ECountriesList } from '../types/country';
import validationSchema from '../components/validation';
import { IFormData } from '../types/type';
import { ValidationError } from 'yup';

const UncontrolledFormPage = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const ageRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const genderRef = useRef<HTMLSelectElement | null>(null);
  const termsRef = useRef<HTMLInputElement | null>(null);
  const pictureRef = useRef<HTMLInputElement | null>(null);
  const countryRef = useRef<HTMLSelectElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = pictureRef.current?.files?.[0];
    const formData: IFormData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      termsAccepted: termsRef.current?.checked || false,
      picture: pictureRef.current?.files || (null as FileList | null),
      country: countryRef.current?.value || '',
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as FileList | null;
          dispatch(
            addUncontrolledData({
              ...formData,
              picture: base64String,
            })
          );
          navigate('/');
        };
        reader.readAsDataURL(file);
      } else {
        dispatch(addUncontrolledData(formData));
        navigate('/');
      }
    } catch (validationError) {
      if (validationError instanceof ValidationError) {
        const formattedErrors: Record<string, string> = {};
        validationError.inner.forEach((error) => {
          formattedErrors[error.path || ''] = error.message;
        });
        setErrors(formattedErrors);
      }
    }
  };
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (nameRef.current) {
      nameRef.current.value = value;
    }

    if (value.length > 0) {
      setNameSuggestions(
        ['Alex', 'Johnny', 'Test'].filter((s) =>
          s.toLowerCase().startsWith(value.toLowerCase())
        )
      );
    } else {
      setNameSuggestions([]);
    }
  };

  const handleNameSuggestionClick = (suggestion: string) => {
    if (nameRef.current) {
      nameRef.current.value = suggestion;
    }
    setNameSuggestions([]);
  };

  const resetForm = () => {
    if (nameRef.current) nameRef.current.value = '';
    if (ageRef.current) ageRef.current.value = '';
    if (emailRef.current) emailRef.current.value = '';
    if (passwordRef.current) passwordRef.current.value = '';
    if (confirmPasswordRef.current) confirmPasswordRef.current.value = '';
    if (genderRef.current) genderRef.current.value = '';
    if (termsRef.current) termsRef.current.checked = false;
    if (pictureRef.current) pictureRef.current.value = '';
    if (countryRef.current) countryRef.current.value = '';
    setErrors({});
    setPreviewImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          ref={nameRef}
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
            }}
          >
            {nameSuggestions.map((suggestion, index) => (
              <li
                key={index}
                style={{ cursor: 'pointer' }}
                onClick={() => handleNameSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <p style={{ color: 'red' }}>{errors.name}</p>
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          ref={ageRef}
          placeholder="Enter your age"
          autoComplete="bday"
          min={0}
          step={1}
        />
        <p style={{ color: 'red' }}>{errors.age}</p>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          ref={emailRef}
          placeholder="Enter your email"
          autoComplete="email"
        />
        <p style={{ color: 'red' }}>{errors.email}</p>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          ref={passwordRef}
          placeholder="Enter a strong password"
          autoComplete="new-password"
        />
        <p style={{ color: 'red' }}>{errors.password}</p>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          ref={confirmPasswordRef}
          placeholder="Re-enter your password"
          autoComplete="new-password"
        />
        <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" ref={genderRef}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <p style={{ color: 'red' }}>{errors.gender}</p>
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
        <p style={{ color: 'red' }}>{errors.picture}</p>
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <select id="country" ref={countryRef} autoComplete="country">
          <option value="">Select</option>
          {Object.values(ECountriesList).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <p style={{ color: 'red' }}>{errors.country}</p>
      </div>
      <div>
        <input id="terms" type="checkbox" ref={termsRef} />
        <label htmlFor="terms">Accept Terms and Conditions</label>
        <p style={{ color: 'red' }}>{errors.termsAccepted}</p>
      </div>
      <div>
        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={resetForm}
          style={{ marginLeft: '10px' }}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default UncontrolledFormPage;
