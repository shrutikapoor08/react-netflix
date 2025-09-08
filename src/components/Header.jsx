import React from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={ styles.header }>
      <div className={ styles.container }>
        <div className={ styles.logo }>
          <h1 className="text-xl lg:text-4xl font-bold text-red-600 ">REACTFLIX</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;