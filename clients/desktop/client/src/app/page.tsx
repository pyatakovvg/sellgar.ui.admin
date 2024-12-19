import { Button, Input, SimpleSelect, Checkbox, Radio, Text } from '@library/kit';

import React from 'react';

import s from './page.module.scss';

export default function Home() {
  return (
    <main className={s.main}>
      <p>Hello world</p>
      <Button>Click me</Button>
      <Input />
      <SimpleSelect optionKey={'uuid'} optionValue={'name'} options={[]} value={null} />
      <Checkbox>
        <Text>check me</Text>
      </Checkbox>
      <Radio value={'test'}>
        <Text>check me</Text>
      </Radio>
    </main>
  );
}
