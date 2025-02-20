export const lightTheme = {
  background: "url('/public/light.jpg') no-repeat center center",
  backgroundSize: 'cover',
  color: '#000000',
};

export const darkTheme = {
  background: "url('/public/dark.jpg') no-repeat center center ",
  backgroundSize: 'cover',
  color: '#4f8bd9',
};

export type Theme = typeof lightTheme | typeof darkTheme;
