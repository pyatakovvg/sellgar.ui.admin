import React, { ReactNode } from 'react';

export interface CustomItemProps {
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const CustomItem: React.FC<React.PropsWithChildren<CustomItemProps>> = (props) => {
  const handleClick = () => {
    if (props.disabled) {
      return void 0;
    }
    props.onClick && props.onClick();
  };

  return React.cloneElement(React.Children.only(props.children) as any, {
    isActive: props.isActive,
    disabled: props.disabled,
    onClick: handleClick,
  });

  // return props.children({
  //   isActive: props.isActive,
  //   disabled: props.disabled,
  //   onClick: handleClick,
  // });
};
