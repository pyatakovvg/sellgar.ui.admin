import { ShopAddressType, ShopContactPurpose, ShopContactType, ShopLegalForm } from '@library/domain';
import * as yup from 'yup';

import type { ShopFormInput } from '../../../classes/controller/shop-modify/input/shop-form.input.ts';

const nullableText = yup.string().defined();

export const schema: yup.ObjectSchema<ShopFormInput> = yup.object({
  version: yup.number().integer().positive().optional(),
  name: yup.string().trim().required('Необходимо заполнить'),
  legalForm: yup.mixed<ShopLegalForm>().oneOf(Object.values(ShopLegalForm)).required(),
  legalName: nullableText.when('legalForm', {
    is: (form: ShopLegalForm) => form === ShopLegalForm.LEGAL_ENTITY,
    then: (value) => value.trim().required('Укажите юридическое наименование'),
  }),
  entrepreneurFullName: nullableText.when('legalForm', {
    is: (form: ShopLegalForm) => form === ShopLegalForm.INDIVIDUAL_ENTREPRENEUR,
    then: (value) => value.trim().required('Укажите ФИО предпринимателя'),
  }),
  registrationAuthority: nullableText.when('legalForm', {
    is: (form: ShopLegalForm) => form === ShopLegalForm.INDIVIDUAL_ENTREPRENEUR,
    then: (value) => value.trim().required('Укажите регистрирующий орган'),
  }),
  inn: nullableText
    .trim()
    .required('Укажите ИНН')
    .test('inn-by-legal-form', 'ИНН должен содержать 10 цифр для организации или 12 для ИП', function (value) {
      const form = this.parent as ShopFormInput;
      return form.legalForm === ShopLegalForm.LEGAL_ENTITY ? /^\d{10}$/.test(value) : /^\d{12}$/.test(value);
    }),
  kpp: nullableText.when('legalForm', {
    is: (form: ShopLegalForm) => form === ShopLegalForm.LEGAL_ENTITY,
    then: (value) =>
      value
        .trim()
        .required('Укажите КПП')
        .matches(/^\d{9}$/, 'КПП содержит 9 цифр'),
  }),
  ogrn: nullableText.when('legalForm', {
    is: (form: ShopLegalForm) => form === ShopLegalForm.LEGAL_ENTITY,
    then: (value) => value.matches(/^\d{13}$/, 'ОГРН содержит 13 цифр').required('Укажите ОГРН'),
  }),
  ogrnip: nullableText.when('legalForm', {
    is: (form: ShopLegalForm) => form === ShopLegalForm.INDIVIDUAL_ENTREPRENEUR,
    then: (value) => value.matches(/^\d{15}$/, 'ОГРНИП содержит 15 цифр').required('Укажите ОГРНИП'),
  }),
  legalAddress: nullableText.trim().when('legalForm', {
    is: (form: ShopLegalForm) => form === ShopLegalForm.LEGAL_ENTITY,
    then: (value) => value.required('Укажите юридический адрес'),
    otherwise: (value) => value.required('Укажите адрес регистрации'),
  }),
  actualLocation: nullableText,
  email: nullableText.email('Некорректная электронная почта'),
  phone: nullableText.test('legal-contact', 'Укажите телефон или электронную почту', function (value) {
    const form = this.parent as ShopFormInput;
    return Boolean(value.trim() || form.email.trim());
  }),
  contacts: yup
    .array()
    .of(
      yup.object({
        type: yup.mixed<ShopContactType>().oneOf(Object.values(ShopContactType)).required(),
        purpose: yup.mixed<ShopContactPurpose>().oneOf(Object.values(ShopContactPurpose)).required(),
        value: yup.string().trim().required('Укажите контакт'),
        isPublic: yup.boolean().required(),
      }),
    )
    .required(),
  addresses: yup
    .array()
    .of(
      yup.object({
        type: yup.mixed<ShopAddressType>().oneOf(Object.values(ShopAddressType)).required(),
        address: yup.string().trim().required('Укажите адрес'),
        comment: yup.string().defined(),
      }),
    )
    .required(),
});
