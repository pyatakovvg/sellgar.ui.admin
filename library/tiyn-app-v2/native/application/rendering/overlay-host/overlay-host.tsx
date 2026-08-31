import React from 'react';

interface OverlayHostProps {
  readonly children: React.ReactNode;
  readonly frame: React.ReactNode;
  readonly modal: React.ReactNode;
  readonly notification: React.ReactNode;
}

export const OverlayHost: React.FC<OverlayHostProps> = (props) => {
  return (
    <>
      {props.children}
      {props.frame}
      {props.modal}
      {props.notification}
    </>
  );
};
