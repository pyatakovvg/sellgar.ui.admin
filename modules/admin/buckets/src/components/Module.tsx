import { Heading } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';

import s from './default.module.scss';

export const Module = observer(() => {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector('[name="file"]');
    const formData = new FormData(form);

    fetch(import.meta.env.VITE_GATEWAY_API + '/v1/files/upload', {
      // Your POST endpoint
      method: 'POST',
      credentials: 'include',
      headers: {
        contentType: 'multipart/form-data',
      },
      body: formData,
    })
      .then(
        (response) => response.json(), // if the response is a JSON object
      )
      .then(
        (success) => console.log(success), // Handle the success response object
      )
      .catch(
        (error) => console.log(error), // Handle the error response object
      );
  }

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'h2'}>Хранилище</Heading>
      </div>
      <div className={s.content}>
        <form onSubmit={handleSubmit}>
          <input type={'file'} name={'file'} />
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
});
