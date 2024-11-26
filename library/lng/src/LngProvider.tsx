import React from 'react';
import { observer } from 'mobx-react';
import { I18nextProvider } from 'react-i18next';

import { Provider } from './lng.context.ts';
import { container } from './classes/classes.di.ts';
import { LngPresenter, LngPresenterSymbol } from './classes/presenters/lng.presenter.ts';

export const LngProvider: React.FC<React.PropsWithChildren> = observer((props) => {
  const [presenter] = React.useState(() => container.get<LngPresenter>(LngPresenterSymbol));

  return (
    <Provider
      value={{
        presenter,
      }}
    >
      <I18nextProvider i18n={presenter.getI18NextInstance()}>
        {presenter.isInitialized() && props.children}
      </I18nextProvider>
    </Provider>
  );
});
