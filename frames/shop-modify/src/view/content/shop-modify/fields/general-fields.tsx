import React from 'react';

import { Section } from './section/section.tsx';
import { TextField } from './control/text-field.tsx';

interface Props {
  disabled: boolean;
}

export const GeneralFields: React.FC<Props> = ({ disabled }) => (
  <Section title={'Основное'}>
    <TextField name={'name'} label={'Название'} placeholder={'Название магазина'} disabled={disabled} />
  </Section>
);
