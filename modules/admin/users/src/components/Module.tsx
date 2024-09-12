import { Heading, Icon } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { useGetData } from '@/hooks/useGetData.ts';
import { useRefreshData } from '@/hooks/useRefreshData.ts';
import { useSearchParams } from '@/hooks/useSearchParams.ts';

import { Page } from './Page';

import s from './default.module.scss';

export const Module = observer(() => {
  const [searchParams] = useSearchParams();
  const [isInit, setIsInit] = React.useState(false);

  const navigate = useNavigate();

  const getData = useGetData();
  const refreshData = useRefreshData();

  React.useEffect(() => {
    (async () => {
      if (isInit) {
        await refreshData(searchParams);
      } else {
        await getData(searchParams);
        setIsInit(true);
      }
    })();
  }, [searchParams]);

  const handleCreateUser = () => {
    navigate('/users/create');
  };

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'h2'}>Пользователи</Heading>
      </div>
      <div className={s.content}>
        <Page />
      </div>
      <div className={s.control}>
        <div className={s.button} onClick={handleCreateUser}>
          <Icon icon={'plus'} />
        </div>
      </div>
    </div>
  );
});
