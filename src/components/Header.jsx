import React from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={ styles.header }>
      <div className={ styles.container }>
        <div className={ styles.logo }>
          <h1 className="text-3xl md:text-4xl font-bold text-red-600 ">NETFLIX</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;