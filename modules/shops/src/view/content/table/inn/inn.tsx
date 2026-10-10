import type { ShopEntity } from '@library/domain';
import * as Kit from '@sellgar/kit';
import React from 'react';

export const Inn: React.FC = () => {
  const { data } = Kit.useCellData<ShopEntity>();
  return <span>{data.legalDetails?.inn ?? '—'}</span>;
};
