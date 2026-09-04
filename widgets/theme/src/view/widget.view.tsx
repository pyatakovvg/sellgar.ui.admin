import * as App from '@sellgar/app/react';
import { Button, ButtonGroup, Typography } from '@sellgar/kit';
import { ShieldUserLineIcon, SunFillIcon, SunLineIcon } from '@sellgar/kit/icons';

import React from 'react';

import type { ThemeWidgetProps } from '../classes/controller/theme/dto/theme-widget-props.dto.ts';
import { ThemeControllerInterface } from '../classes/controller/theme/theme-controller.interface.ts';

import { PreferenceIconFactory } from './preference-icon-factory';

import s from './default.module.scss';

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
    <div className={s.wrapper}>
      <Typography size={'caption-l'}>
        <p className={s.title}>Тема:</p>
      </Typography>

      <ButtonGroup size={'sm'}>
        <ButtonGroup.Icon
          disabled={submit.inProcess}
          isActive={theme.preference === 'system'}
          leadIcon={<ShieldUserLineIcon />}
          onClick={() => void submit({ preference: 'system' })}
        >
          Системная
        </ButtonGroup.Icon>
        <ButtonGroup.Icon
          disabled={submit.inProcess}
          isActive={theme.preference === 'light'}
          leadIcon={<SunLineIcon />}
          onClick={() => void submit({ preference: 'light' })}
        >
          Светлая
        </ButtonGroup.Icon>
        <ButtonGroup.Icon
          disabled={submit.inProcess}
          isActive={theme.preference === 'dark'}
          leadIcon={<SunFillIcon />}
          onClick={() => void submit({ preference: 'dark' })}
        >
          Темная
        </ButtonGroup.Icon>
      </ButtonGroup>
    </div>
  );
};

export const WidgetView = App.reactive(WidgetViewComponent);
