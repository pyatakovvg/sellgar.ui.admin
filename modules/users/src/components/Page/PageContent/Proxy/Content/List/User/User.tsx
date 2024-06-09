import { Actions } from '@library/design';
import { Paragraph } from '@library/kit';
import { PersonEntity, UserEntity } from '@library/domain';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Role } from './Role';
import { Status } from './Status';

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
    let result = `${person.lastName} ${person.firstName}`;
    if (person.middleName) {
      result += ` ${person.middleName}`;
    }
    return result;
  }, [person]);
};

export const User: React.FC<IProps> = (props) => {
  const navigate = useNavigate();
  const fullName = useFullName(props.user.person);

  const handleEditClick = (uuid: string) => {
    navigate('/users/' + uuid);
  };

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
        <div className={s.info}>
          <div className={s.roles}>
            {props.user.roles.map((role) => {
              return (
                <div key={role.code} className={s.role}>
                  <Role displayName={role.displayName} />
                </div>
              );
            })}
          </div>
          <div className={s.status}>
            <Status isBlocked={props.user.isBlocked} />
          </div>
        </div>
      </div>
      <div className={s.control}>
        <Actions onEdit={() => handleEditClick(props.user.uuid)} onDelete={() => {}} />
      </div>
    </div>
  );
};
