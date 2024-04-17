import { Heading } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { useParams, useNavigate } from 'react-router-dom';

import { FormModify } from './Form';
import { context } from '../user.context.ts';

import s from './default.module.scss';

type IParams = {
  uuid?: string;
};

export const UsersView = observer(() => {
  const navigate = useNavigate();
  const params = useParams<IParams>();
  const { presenter } = React.useContext(context);

  React.useEffect(() => {
    (async () => {
      await presenter.getData(params.uuid);
    })();
  }, []);

  const handleRedirectToUser = (uuid: string) => {
    navigate(import.meta.env.VITE_PUBLIC_URL + '/users/' + uuid);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'h2'}>Пользователь</Heading>
      </div>
      <div className={s.content}>
        <div className={s.list}>
          {!presenter.isLoadingProcess && (
            <FormModify
              user={presenter.user}
              inProcess={false}
              onSubmit={async (value, { setValues }) => {
                await presenter.save(value);

                if (!value.uuid) {
                  handleRedirectToUser(presenter.user.uuid!);
                } else {
                  await setValues(presenter.user);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
});
