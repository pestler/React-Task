import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addUncontrolledData } from '../redux/formSlice';
import { useNavigate } from 'react-router-dom';

const UncontrolledFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const errors: string[] = [];
    const name = nameRef.current?.value || '';
    const age = Number(ageRef.current?.value);
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const confirmPassword = confirmPasswordRef.current?.value || '';
    const gender = genderRef.current?.value || '';
    const termsAccepted = termsRef.current?.checked || false;

    if (!/^[A-Z]/.test(name))
      errors.push('Name must start with an uppercase letter');
    if (!age || age < 0) errors.push('Age must be a positive number');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.push('Invalid email address');
    if (password !== confirmPassword) errors.push('Passwords must match');
    if (!/[A-Z]/.test(password))
      errors.push('Password must contain an uppercase letter');
    if (!/[a-z]/.test(password))
      errors.push('Password must contain a lowercase letter');
    if (!/\d/.test(password)) errors.push('Password must contain a number');
    if (!/[@$!%*?&#]/.test(password))
      errors.push('Password must contain a special character');
    if (!gender) errors.push('Gender is required');
    if (!termsAccepted) errors.push('You must accept the Terms and Conditions');

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length > 0) {
      alert(errors.join('\n'));
    } else {
      const formData = {
        name: nameRef.current?.value || '',
        age: Number(ageRef.current?.value),
        email: emailRef.current?.value || '',
        password: passwordRef.current?.value || '',
        gender: genderRef.current?.value || '',
        termsAccepted: termsRef.current?.checked || false,
        picture: '',
        country: '',
      };

      dispatch(addUncontrolledData(formData));
      navigate('/');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" ref={nameRef} />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input id="age" type="number" ref={ageRef} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" ref={emailRef} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" ref={passwordRef} />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input id="confirmPassword" type="password" ref={confirmPasswordRef} />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" ref={genderRef}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <input id="terms" type="checkbox" ref={termsRef} />
        <label htmlFor="terms">Accept Terms and Conditions</label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledFormPage;
