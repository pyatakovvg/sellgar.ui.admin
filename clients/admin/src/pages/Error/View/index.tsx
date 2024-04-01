import s from './default.module.scss';

export const ErrorView = () => {
  return (
    <div className={s.wrapper}>
      <p>Произошла ошибка</p>
    </div>
  );
};
