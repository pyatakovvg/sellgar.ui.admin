import { Paragraph, Icon } from '@library/kit';

import React from 'react';
import { Link } from 'react-router-dom';

import { normalizeFullName } from './utils';

import cn from 'classnames';
import s from './default.module.scss';

export interface IPerson {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface IUser {
  uuid: string;
  isBlocked: boolean;
  person?: IPerson;
}

interface IProps {
  user: IUser;
}

const useFullName = (person?: IPerson) => {
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
      <div
        className={cn(s.name, {
          [s['name__no-enter']]: !fullName,
        })}
      >
        <Paragraph>{fullName ?? 'профайл незаполнен'}</Paragraph>
      </div>
      <div className={s.info}>
        <Paragraph>{props.user.isBlocked ? 'заблокирован' : 'активный'}</Paragraph>
      </div>
      <Link className={s.link} to={import.meta.env.VITE_PUBLIC_URL + '/users/' + props.user.uuid}>
        <div className={s.control}>
          <Icon icon={'ellipsis'} />
        </div>
      </Link>
    </div>
  );
};
