import React from 'react';

import { AddressFields } from './address-fields.tsx';
import { ContactFields } from './contact-fields.tsx';
import { GeneralFields } from './general-fields.tsx';
import { LegalFields } from './legal-fields.tsx';

interface Props {
  inProcess: boolean;
}

export const Fields: React.FC<Props> = ({ inProcess }) => (
  <>
    <GeneralFields disabled={inProcess} />
    <LegalFields disabled={inProcess} />
    <ContactFields disabled={inProcess} />
    <AddressFields disabled={inProcess} />
  </>
);
