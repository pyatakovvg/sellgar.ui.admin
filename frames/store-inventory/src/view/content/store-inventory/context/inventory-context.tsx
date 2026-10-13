import { InfoLine } from '@library/design';
import { Divider, Typography } from '@sellgar/kit';
import { useLoaderData } from '@sellgar/app/react';

import React from 'react';

import { StoreInventoryContextControllerInterface } from '../../../../classes/controller/context/store-inventory-context-controller.interface.ts';

import s from './default.module.scss';

export const InventoryContext: React.FC = () => {
  const data = useLoaderData(StoreInventoryContextControllerInterface);
  const inventory = data.record.inventory;
  const groups = [
    {
      label: 'Товар и магазин',
      lines: [
        { label: 'Товар', value: data.storeProduct.productSnapshot?.name ?? 'Не синхронизирован' },
        { label: 'Магазин', value: data.storeProduct.shopSnapshot?.name ?? 'Не синхронизирован' },
      ],
    },
    {
      label: 'Учётная запись',
      lines: [
        { label: 'Вариант', value: data.offer.variantSnapshot?.name ?? 'Не синхронизирован' },
        { label: 'Артикул', value: data.record.article },
        {
          label: 'Уточнения',
          value: data.record.clarifications.map((item) => item.value).join(', ') || 'Без уточнений',
        },
      ],
    },
    {
      label: 'Остатки',
      lines: [
        { label: 'Остаток', value: inventory.quantity },
        { label: 'Резерв', value: inventory.reserved },
        { label: 'Доступно', value: inventory.available },
      ],
    },
  ];

  return (
    <div className={s.wrapper}>
      {groups.map((group) => (
        <div key={group.label} className={s.group}>
          <Divider type={'label-center'} label={group.label} />
          {group.lines.map((line) => (
            <InfoLine
              key={line.label}
              label={
                <Typography size={'caption-m'} weight={'semi-bold'}>
                  <p className={s.label}>{line.label}:</p>
                </Typography>
              }
              value={
                <Typography size={'caption-m'} weight={'regular'}>
                  <p className={s.value}>{line.value}</p>
                </Typography>
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};
