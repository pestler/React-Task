import * as yup from 'yup';
import { ECountriesList } from '../types/country';

const сountriesList = Object.values(ECountriesList);

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is required')
    .transform((value) => (value === '' ? undefined : value))
    .min(0, 'Age must be greater than or equal to 0'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /[A-ZА-Я]/,
      'Password must contain an uppercase letter (English or Russian)'
    )
    .matches(
      /[a-zа-я]/,
      'Password must contain a lowercase letter (English or Russian)'
    )
    .matches(/\d/, 'Password must contain a number')
    .matches(/[@$!%*?&#]/, 'Password must contain a special character')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup.string().required('Gender is required'),
  termsAccepted: yup
    .boolean()
    .oneOf([true], 'You must accept the Terms and Conditions'),
  picture: yup
    .mixed()
    .nullable()
    .test('fileSize', 'File size must be less than 2MB', (value) =>
      value && Array.isArray(value) && value.length > 0
        ? value[0].size <= 2 * 1024 * 1024
        : true
    )
    .test('fileType', 'Only JPEG and PNG are allowed', (value) =>
      value && Array.isArray(value) && value.length > 0
        ? ['image/jpeg', 'image/png'].includes(value[0].type)
        : true
    ),
  country: yup
    .string()
    .oneOf(сountriesList, 'Invalid country')
    .required('Country is required'),
});

export default validationSchema;
