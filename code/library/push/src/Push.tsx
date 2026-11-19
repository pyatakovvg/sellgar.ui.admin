import React from 'react';
import ReactDOM from 'react-dom';

import { Container } from './Container';
import { PushController } from './controller';

export const controller = new PushController();

export const Push: React.FC = () => {
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
  return ReactDOM.createPortal(<Container controller={controller} />, portal, 'push');
};
