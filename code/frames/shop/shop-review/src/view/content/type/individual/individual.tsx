import { useLoaderData } from '@sellgar/app/react';
import { Typography, Divider } from '@sellgar/kit';
import { InfoLine } from '@library/design';

import React from 'react';

import { ShopModifyControllerInterface } from '../../../../classes/controller/shop-modify/shop-modify-controller.interface.ts';

import s from './default.module.css';

export const Individual: React.FC = () => {
  const data = useLoaderData(ShopModifyControllerInterface);

  return (
    <>
      <InfoLine
        label={
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <p className={s.label}>ФИО:</p>
          </Typography>
        }
        value={
          <Typography size={'caption-m'} weight={'regular'}>
            <p className={s.value}>{data.legalDetails?.entrepreneurFullName}</p>
          </Typography>
        }
      />
      <InfoLine
        label={
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <p className={s.label}>ОГРНИП:</p>
          </Typography>
        }
        value={
          <Typography size={'caption-m'} weight={'regular'}>
            <p className={s.value}>{data.legalDetails?.ogrnip}</p>
          </Typography>
        }
      />
      <InfoLine
        label={
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <p className={s.label}>Регистрирующий орган:</p>
          </Typography>
        }
        value={
          <Typography size={'caption-m'} weight={'regular'}>
            <p className={s.value}>{data.legalDetails?.registrationAuthority}</p>
          </Typography>
        }
      />
      <InfoLine
        label={
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <p className={s.label}>ИНН:</p>
          </Typography>
        }
        value={
          <Typography size={'caption-m'} weight={'regular'}>
            <p className={s.value}>{data.legalDetails?.inn}</p>
          </Typography>
        }
      />
      <InfoLine
        label={
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <p className={s.label}>Адрес:</p>
          </Typography>
        }
        value={
          <Typography size={'caption-m'} weight={'regular'}>
            <p className={s.value}>{data.legalDetails?.legalAddress}</p>
          </Typography>
        }
      />
      <InfoLine
        label={
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <p className={s.label}>E-mail:</p>
          </Typography>
        }
        value={
          <Typography size={'caption-m'} weight={'regular'}>
            <p className={s.value}>{data.legalDetails?.email}</p>
          </Typography>
        }
      />
      <InfoLine
        label={
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <p className={s.label}>Телефон:</p>
          </Typography>
        }
        value={
          <Typography size={'caption-m'} weight={'regular'}>
            <p className={s.value}>{data.legalDetails?.phone}</p>
          </Typography>
        }
      />
    </>
  );
};
