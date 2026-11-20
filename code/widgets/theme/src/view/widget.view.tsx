import * as App from '@sellgar/app/react';
import { Button, ButtonGroup } from '@sellgar/kit';

import React from 'react';

import type { ThemeWidgetProps } from '../classes/controller/theme/dto/theme-widget-props.dto.ts';
import { ThemeControllerInterface } from '../classes/controller/theme/theme-controller.interface.ts';

import { PreferenceIconFactory } from './preference-icon-factory';

const WidgetViewComponent: React.FC = () => {
  const props = App.useWidgetProps<ThemeWidgetProps>();
  const theme = App.useLoaderData(ThemeControllerInterface);
  const submit = App.useSubmit(ThemeControllerInterface);

  if (props.isOnlyIcon === true) {
    return (
      <Button.Icon
        aria-label={'Сменить тему'}
        size={'sm'}
        style={'secondary'}
        disabled={submit.inProcess}
        leadIcon={<PreferenceIconFactory preference={theme.preference} />}
        onClick={() => void submit({})}
      />
    );
  }

  return (
    <ButtonGroup size={'xs'} fill={'contain'}>
      <ButtonGroup.Icon
        disabled={submit.inProcess}
        isActive={theme.preference === 'system'}
        aria-label={'Системная тема'}
        aria-pressed={theme.preference === 'system'}
        leadIcon={<PreferenceIconFactory preference={'system'} />}
        onClick={() => void submit({ preference: 'system' })}
      >
        Системная
      </ButtonGroup.Icon>
      <ButtonGroup.Icon
        disabled={submit.inProcess}
        isActive={theme.preference === 'light'}
        aria-label={'Светлая тема'}
        aria-pressed={theme.preference === 'light'}
        leadIcon={<PreferenceIconFactory preference={'light'} />}
        onClick={() => void submit({ preference: 'light' })}
      >
        Светлая
      </ButtonGroup.Icon>
      <ButtonGroup.Icon
        disabled={submit.inProcess}
        isActive={theme.preference === 'dark'}
        aria-label={'Тёмная тема'}
        aria-pressed={theme.preference === 'dark'}
        leadIcon={<PreferenceIconFactory preference={'dark'} />}
        onClick={() => void submit({ preference: 'dark' })}
      >
        Темная
      </ButtonGroup.Icon>
    </ButtonGroup>
  );
};

export const WidgetView = App.reactive(WidgetViewComponent);
