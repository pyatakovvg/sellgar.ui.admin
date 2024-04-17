import { useFloating, autoPlacement, offset } from '@floating-ui/react';

import React from 'react';

import { Event } from '@/utils/Event';

import type { IDropDown } from './types';

import st from './default.module.scss';

export const events = new Event();

interface IFindProps {
  type: React.FC;
}

interface IFind extends React.PropsWithChildren<IFindProps> {}

function Find({ children, type }: IFind) {
  const result: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === type) {
        return result.push(child);
      }
    }
  });

  if (!result[0]) {
    throw new Error('Not ' + type.name);
  }
  return result[0];
}

const Content = (props: React.PropsWithChildren) => {
  return props.children;
};

const List = (props: React.PropsWithChildren) => {
  return props.children;
};

export const DropDown = (props: IDropDown) => {
  const [isOpen, setOpen] = React.useState(false);

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    strategy: 'fixed',
    middleware: [
      offset(4),
      autoPlacement({
        rootBoundary: 'document',
        allowedPlacements: ['top-start', 'top-end', 'bottom-start', 'bottom-end'],
      }),
    ],
  });

  React.useEffect(() => {
    const handleClose = (event: MouseEvent) => {
      if (isOpen) {
        if (!refs.domReference.current || props.disabled) {
          return void 0;
        }
        if (!refs.domReference.current.contains(event.target as Node)) {
          setOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClose);
    return () => {
      document.removeEventListener('click', handleClose);
    };
  }, [isOpen, refs, props.disabled]);

  function handleOpen() {
    if (props.disabled) {
      return void 0;
    }
    setOpen(!isOpen);
  }

  return (
    <div className={st.wrapper}>
      <div ref={refs.setReference} className={st.container}>
        <div className={st.content} onClick={() => handleOpen()}>
          <Find type={Content}>{props.children}</Find>
        </div>
        {isOpen && (
          <div ref={refs.setFloating} className={st.control} style={floatingStyles}>
            <Find type={List}>{props.children}</Find>
          </div>
        )}
      </div>
    </div>
  );
};

DropDown.List = List;
DropDown.Content = Content;
