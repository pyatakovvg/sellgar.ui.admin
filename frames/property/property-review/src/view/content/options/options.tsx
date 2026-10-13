import { PropertyKind } from '@library/domain';
import { useLoaderData } from '@sellgar/app/react';
import { Divider } from '@sellgar/kit';
import React from 'react';
import { PropertyReviewControllerInterface } from '../../../classes/controller/property-review/property-review-controller.interface.ts';
import { Option } from './option';
import s from './default.module.scss';

export const Options: React.FC = () => {
  const property = useLoaderData(PropertyReviewControllerInterface);
  if (property.kind !== PropertyKind.OPTIONS) return null;
  return (
    <section className={s.wrapper} aria-label={'Опции свойства'}>
      <Divider type={'label-center'} label={'Опции'} />
      {property.options.map((option) => (
        <Option key={option.code} option={option} />
      ))}
    </section>
  );
};
