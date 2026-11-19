import React from 'react';
import ReactDOM from 'react-dom';

import './default.css';

import { Container } from './components/Container';

export const Message: React.FC = () => {
  const [portal, setPortal] = React.useState<Element | null>(null);

  React.useEffect(() => {
    const pushContainer = document.querySelector('#push');

    if (!pushContainer) {
      const containerElement = document.createElement('div');

      containerElement.setAttribute('id', 'push');
      document.body.appendChild(containerElement);

      setPortal(containerElement);
    } else {
      setPortal(pushContainer);
    }
  }, []);

  if (!portal) {
    return null;
  }

  return ReactDOM.createPortal(<Container />, portal, 'push');
};
