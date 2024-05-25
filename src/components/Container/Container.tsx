import React, { ReactNode } from 'react';
import styles from './Container.module.css';

interface ContainerProps {
   children: ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => (
   <div className={styles.container}>{children}</div>
);
