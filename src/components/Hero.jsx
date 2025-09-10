import React from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './Hero.module.css';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Hero = () => {

  return (
    <section className={ styles.hero }>
      <div className={ styles.overlay }></div>
      <div className={ styles.content }>
        <SignedOut>
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
        </SignedOut>
        <SignedIn>
          Hello, Shruti Kapoor
          <UserButton />
        </SignedIn>
      </div>
    </section>
  );
};

export default Hero;