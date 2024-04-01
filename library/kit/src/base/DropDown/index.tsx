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
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const controlRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (props.disabled) {
      setOpen(false);
    }
  }, [props.disabled]);

  React.useEffect(() => {
    const handleClose = () => {
      setOpen(false);
    };
    events.on('close', handleClose);
    return () => {
      events.off('close', handleClose);
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen && props.onFocus) {
      props.onFocus();
    }
    if (!isOpen && props.onBlur) {
      props.onBlur();
    }
  }, [isOpen]);

  React.useEffect(() => {
    const handleClose = (event: MouseEvent) => {
      if (!wrapperRef.current || props.disabled) {
        return void 0;
      }
      if (isOpen && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClose);
    return () => {
      document.removeEventListener('click', handleClose);
    };
  }, [isOpen, wrapperRef, props.disabled]);

  // React.useEffect(() => {
  //   if (!wrapperRef.current || !controlRef.current) {
  //     return void 0;
  //   }
  //   const wrapperRect: DOMRect = wrapperRef.current.getBoundingClientRect();
  //
  //   controlRef.current.style.top = wrapperRect.height + 'px';
  //   controlRef.current.style.left = '0px';
  // }, [wrapperRef, controlRef, isOpen]);

  function handleOpen() {
    if (props.disabled) {
      return void 0;
    }
    setOpen(!isOpen);
  }

  return (
    <div className={st.wrapper}>
      <div ref={wrapperRef} className={st.container}>
        <div className={st.content} onClick={() => handleOpen()}>
          <Find type={Content}>{props.children}</Find>
        </div>
        {isOpen && (
          <div ref={controlRef} className={st.control}>
            <div className={st.list}>
              <Find type={List}>{props.children}</Find>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

DropDown.List = List;
DropDown.Content = Content;
