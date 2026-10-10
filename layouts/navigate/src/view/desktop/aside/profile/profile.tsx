import { Sidebar, User } from '@sellgar/kit';
import { ProfileEntity } from '@library/domain';
import { ApplicationStoreInterface } from '@sellgar/app';
import { useDependency } from '@sellgar/app/react';

import React from 'react';

export const Profile: React.FC = () => {
  const applicationStore = useDependency(ApplicationStoreInterface);
  const profile = applicationStore.get(ProfileEntity);

  return (
    <Sidebar.Top>
      <Sidebar.Block>
        <Sidebar.Cell>
          <User name={'Профиль'} caption={profile?.user.login} />
        </Sidebar.Cell>
      </Sidebar.Block>
    </Sidebar.Top>
  );
};
