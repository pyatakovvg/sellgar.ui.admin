import React from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import { context } from '../product.context.ts';

import styles from './default.module.scss';

export const ProductView = observer(() => {
  const params = useParams();
  const { controller } = React.useContext(context);

  React.useEffect(() => {
    if (!!params.uuid) {
      controller.getData(params.uuid);
    }
  }, []);

  return <div></div>;
});
