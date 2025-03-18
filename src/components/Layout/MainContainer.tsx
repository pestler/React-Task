import React from 'react';
import styles from './MainContainer.module.scss';

const MainContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <main className={styles.mainContainer}> {children}</main>;
};

export default MainContainer;
