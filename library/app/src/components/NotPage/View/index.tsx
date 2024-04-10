import { Icon, Heading } from '@library/kit';

import s from './default.module.scss';

export const NotPageView = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.icon}>
          <Icon icon={'signs-post'} />
        </div>
        <div className={s.description}>
          <Heading variant={'h2'}>Страница не найдена</Heading>
        </div>
      </div>
    </div>
  );
};
