import React from 'react';

export interface IActionButton extends React.PropsWithChildren {
  caption: string;
  disabled?: boolean;
}
