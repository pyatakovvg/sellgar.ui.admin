import React from 'react';

import { StockView } from './View';
import { Provider } from './stock.context.ts';
import { StockController } from './stock.controller';

export default function StockModule() {
  const controller = new StockController();

  return () => (
    <Provider value={{ controller }}>
      <StockView />
    </Provider>
  );
}
