import { Button, Icon, cellContext } from '@sellgar/kit';
import { useNavigate } from '@library/app';

import React from 'react';
import { useLocation } from 'react-router-dom';

import { context } from '../../../modify';

import s from './default.module.scss';

export const Actions: React.FC = () => {
  const { data } = React.use(cellContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { onOpen } = React.useContext(context);

  React.useEffect(() => {
    const handleHashChange = () => {
      console.log('Hash изменился:', window.location.hash);
      onOpen();
    };

    // Слушаем изменения hash
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className={s.wrapper}>
      <Button
        form={'icon'}
        style={'ghost'}
        size={'sm'}
        leadIcon={<Icon icon={'more-2-fill'} />}
        onClick={() => navigate.location('#modal=' + data.uuid)}
      />
    </div>
  );
};
