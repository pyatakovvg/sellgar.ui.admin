import { useLoaderData } from '@sellgar/app/react';
import { Typography, Divider } from '@sellgar/kit';
import { InfoLine } from '@library/design';

import React from 'react';

import { ShopModifyControllerInterface } from '../../../../classes/controller/shop-modify/shop-modify-controller.interface.ts';

import s from './default.module.css';

export const Legal: React.FC = () => {
  const data = useLoaderData(ShopModifyControllerInterface);

  return (
    <>
      <InfoLine
        label={
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <p className={s.title}>Наименование:</p>
          </Typography>
        }
        value={
          <Typography size={'caption-m'} weight={'regular'}>
            <p className={s.value}>{data.legalDetails?.legalName}</p>
          </Typography>
        }
      />
      <InfoLine
        label={
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <p className={s.title}>КПП:</p>
          </Typography>
        }
        value={
          <Typography size={'caption-m'} weight={'regular'}>
            <p className={s.value}>{data.legalDetails?.kpp}</p>
          </Typography>
        }
      />
      <InfoLine
        label={
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <p className={s.title}>ОГРН:</p>
          </Typography>
        }
        value={
          <Typography size={'caption-m'} weight={'regular'}>
            <p className={s.value}>{data.legalDetails?.ogrn}</p>
          </Typography>
        }
      />
      <InfoLine
        label={
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <p className={s.title}>ИНН:</p>
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
            <p className={s.title}>Адрес:</p>
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
            <p className={s.title}>E-mail:</p>
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
            <p className={s.title}>Телефон:</p>
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
