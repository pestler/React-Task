export const lightTheme = {
  background: 'url("./light.jpg") no-repeat center center,rgb(203, 219, 233)',
  backgroundColor: '#f5f5f5 ',
  color: 'rgb(50, 57, 65)',
};

export const darkTheme = {
  background: 'url("./dark.jpg") no-repeat center center,rgb(38, 85, 136)',
  backgroundColor: '#7d5757 ',
  color: 'rgb(226, 230, 235)',
};

export type Theme = typeof lightTheme | typeof darkTheme;
