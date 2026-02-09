import { Sidebar, MenuItem, User } from '@sellgar/kit';

import React from 'react';
import { NavLink } from 'react-router-dom';

import { layoutSlotContext } from '../layout-slot';

import s from './default.module.scss';

export const Aside = () => {
  const slotContext = React.useContext(layoutSlotContext);

  return (
    <div className={s.wrapper}>
      <Sidebar>
        <Sidebar.Top>
          <Sidebar.Block>
            <Sidebar.Cell>
              <User name={'Test'} caption={'pyatakov.viktor@gmail.com'} />
            </Sidebar.Cell>
          </Sidebar.Block>
        </Sidebar.Top>
        <Sidebar.Divider />
        <Sidebar.Middle>
          <div className={s.slot} ref={slotContext?.setNode ?? undefined} />
          <Sidebar.Block>
            <Sidebar.Additional>Компания</Sidebar.Additional>
            <Sidebar.Cell>
              <NavLink className={s.link} to={'/'} viewTransition={true}>
                {({ isActive, isPending }) => {
                  return (
                    <MenuItem leadIcon={'home-2-line'} caption={'Главная'} isActive={isActive} isPending={isPending} />
                  );
                }}
              </NavLink>
            </Sidebar.Cell>
            <Sidebar.Cell>
              <NavLink className={s.link} to={'/shops'} viewTransition={true}>
                {({ isActive, isPending }) => {
                  return (
                    <MenuItem leadIcon={'store-line'} caption={'Магазины'} isActive={isActive} isPending={isPending} />
                  );
                }}
              </NavLink>
            </Sidebar.Cell>
            <Sidebar.Cell>
              <NavLink className={s.link} to={'/products'} viewTransition={true}>
                {({ isActive, isPending }) => (
                  <MenuItem
                    leadIcon={'shopping-bag-3-line'}
                    caption={'Товары'}
                    isActive={isActive}
                    isPending={isPending}
                  />
                )}
              </NavLink>
            </Sidebar.Cell>
            <Sidebar.Cell>
              <NavLink className={s.link} to={'/store'} viewTransition={true}>
                {({ isActive, isPending }) => (
                  <MenuItem leadIcon={'unsplash-line'} caption={'Склад'} isActive={isActive} isPending={isPending} />
                )}
              </NavLink>
            </Sidebar.Cell>
          </Sidebar.Block>

          <Sidebar.Block>
            <Sidebar.Additional>Параметры</Sidebar.Additional>
            <Sidebar.Cell>
              <NavLink className={s.link} to={'/brands'} viewTransition={true}>
                {({ isActive, isPending }) => (
                  <MenuItem leadIcon={'copyright-line'} caption={'Бренды'} isActive={isActive} isPending={isPending} />
                )}
              </NavLink>
            </Sidebar.Cell>
            <Sidebar.Cell>
              <NavLink className={s.link} to={'/categories'} viewTransition={true}>
                {({ isActive, isPending }) => (
                  <MenuItem
                    leadIcon={'dashboard-line'}
                    caption={'Категории'}
                    isActive={isActive}
                    isPending={isPending}
                  />
                )}
              </NavLink>
            </Sidebar.Cell>
            <Sidebar.Cell>
              <NavLink className={s.link} to={'/units'} viewTransition={true}>
                {({ isActive, isPending }) => (
                  <MenuItem
                    leadIcon={'links-line'}
                    caption={'Единица измерения'}
                    isActive={isActive}
                    isPending={isPending}
                  />
                )}
              </NavLink>
            </Sidebar.Cell>
            <Sidebar.Cell>
              <NavLink className={s.link} to={'/properties'} viewTransition={true}>
                {({ isActive, isPending }) => (
                  <MenuItem leadIcon={'stock-line'} caption={'Свойства'} isActive={isActive} isPending={isPending} />
                )}
              </NavLink>
            </Sidebar.Cell>
          </Sidebar.Block>

          <Sidebar.Block>
            <Sidebar.Additional>Хранилище</Sidebar.Additional>
            <Sidebar.Cell>
              <NavLink className={s.link} to={'/files'} viewTransition={true}>
                {({ isActive, isPending }) => (
                  <MenuItem leadIcon={'file-text-line'} caption={'Файлы'} isActive={isActive} isPending={isPending} />
                )}
              </NavLink>
            </Sidebar.Cell>
          </Sidebar.Block>
        </Sidebar.Middle>

        <Sidebar.Bottom>
          <Sidebar.Cell>
            <NavLink className={s.link} to={'/settings'} viewTransition={true}>
              {({ isActive, isPending }) => (
                <MenuItem
                  leadIcon={'settings-3-line'}
                  caption={'Настройки'}
                  isActive={isActive}
                  isPending={isPending}
                />
              )}
            </NavLink>
          </Sidebar.Cell>
        </Sidebar.Bottom>
      </Sidebar>
    </div>
  );
};
