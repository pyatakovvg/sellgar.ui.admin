import React from 'react';

const subscribe = (onChange: () => void) => {
  window.addEventListener('resize', onChange);

  return () => window.removeEventListener('resize', onChange);
};

const getSnapshot = () => window.innerWidth;

export const useScreenSize = () => {
  const width = React.useSyncExternalStore(subscribe, getSnapshot);

  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  };
};
