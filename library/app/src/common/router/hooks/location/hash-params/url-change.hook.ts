import React from 'react';

import { URLChangeObserver } from '../../../classes/url-change.observer.ts';

const urlChangeObserver = new URLChangeObserver();

export const useUrlChange = (callback: any, dependencies = []) => {
  const callbackRef = React.useRef(callback);

  callbackRef.current = callback;

  React.useEffect(() => {
    const handleUrlChange = () => {
      callbackRef.current({
        url: window.location.href,
        hash: window.location.hash,
        pathname: window.location.pathname,
        search: window.location.search,
      });
    };

    return urlChangeObserver.subscribe(handleUrlChange);
  }, dependencies);
};
