import { Paragraph, Description, Icon } from '@library/kit';
import { UserEntity, PersonEntity } from '@library/infra';

import React from 'react';
import { Link } from 'react-router-dom';

import { normalizeFullName } from './utils';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  user: UserEntity;
}

const useFullName = (person?: PersonEntity) => {
  return React.useMemo(() => {
    if (!person) {
      return null;
    }
    return normalizeFullName(person?.firstName, person?.middleName, person?.lastName);
  }, [person]);
};

export const User: React.FC<IProps> = (props) => {
  const fullName = useFullName(props.user.person);

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div
          className={cn(s.name, {
            [s['name__no-enter']]: !fullName,
          })}
        >
          <Paragraph>{fullName ?? 'профайл незаполнен'}</Paragraph>
        </div>
        <div className={s.roles}>
          {props.user.roles.map((role) => {
            return (
              <div key={role.code} className={s.role}>
                <Description>{role.displayName}</Description>
              </div>
            );
          })}
        </div>
        <div className={s.info}>
          <div className={cn(s.status, { [s['status--active']]: !props.user.isBlocked })}>
            <Description>{props.user.isBlocked ? 'заблокирован' : 'активный'}</Description>
          </div>
        </div>
      </div>
      <Link className={s.link} to={import.meta.env.VITE_PUBLIC_URL + '/users/' + props.user.uuid}>
        <div className={s.control}>
          <Icon icon={'ellipsis'} />
        </div>
      </Link>
    </div>
  );
};
