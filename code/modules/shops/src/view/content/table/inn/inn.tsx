import type { ShopEntity } from '@library/domain';

import React from 'react';

interface IProps {
  shop: ShopEntity;
}

export const Inn: React.FC<IProps> = (props) => {
  return <span>{props.shop.legalDetails?.inn ?? '—'}</span>;
};
