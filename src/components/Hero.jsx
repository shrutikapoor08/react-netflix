import React from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {

  return (
    <section className={ styles.hero }>
      <div className={ styles.overlay }></div>
      <div className={ styles.content }>
        <div className={ styles.textContent }>
          <h1 className={ styles.title }>
            Unlimited movies, TV shows, and more
          </h1>
          <p className={ styles.subtitle }>
            Starts at $7.99. Cancel anytime.
          </p>
          <button className={ styles.ctaButton }>
            Restart Your Membership
            <ChevronRight size={ 20 } className={ styles.chevronIcon } />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;