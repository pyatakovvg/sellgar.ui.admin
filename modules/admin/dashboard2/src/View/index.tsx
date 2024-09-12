import React from 'react';

import { Menu } from './Menu';
import { NavItem } from './NavItem';

export const Dashboard = () => {
  return (
    <div style={{ padding: 36 }}>
      <Menu>
        <Menu.CustomItem>
          <NavItem href={'/dashboard'}>Link 1</NavItem>
        </Menu.CustomItem>
        <Menu.CustomItem>
          <NavItem href={'/dashboard-2'}>Link 2</NavItem>
        </Menu.CustomItem>
        {/*<Menu.TextItem>text item 1</Menu.TextItem>*/}
        {/*<Menu.TextItem disabled={true}>text item 2</Menu.TextItem>*/}
        {/*<Menu.TextItem>text item 3</Menu.TextItem>*/}
      </Menu>
    </div>
  );
};
