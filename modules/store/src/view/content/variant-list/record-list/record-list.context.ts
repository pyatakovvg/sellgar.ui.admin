import type { StoreOfferEntity } from '@library/domain';
import React from 'react';

export const RecordListContext = React.createContext<StoreOfferEntity | null>(null);
