export interface IFormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  picture: FileList | null;
  country: string;
  termsAccepted: boolean;
}
