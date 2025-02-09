import { useFloating, autoPlacement, offset } from '@floating-ui/react';

import React from 'react';

import { Provider } from './dropdown.context.ts';

import st from './default.module.scss';

interface IDropDownProps {
  alignStart?: 'start' | 'end';
  disabled?: boolean;
  onFocus?(): void;
  onBlur?(): void;
}

interface IFindProps {
  type: React.FC;
}

const Find = ({ children, type }: React.PropsWithChildren<IFindProps>) => {
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
};

const Content: React.FC<React.PropsWithChildren> = (props) => {
  return props.children;
};

const List: React.FC<React.PropsWithChildren> = (props) => {
  return props.children;
};

const DropDownComponent: React.FC<React.PropsWithChildren<IDropDownProps>> = (props) => {
  const [isOpen, setOpen] = React.useState(false);

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    strategy: 'fixed',
    middleware: [
      offset(4),
      autoPlacement({
        alignment: props?.alignStart ?? 'start',
        rootBoundary: 'document',
        allowedPlacements: ['top-start', 'top-end', 'bottom-start', 'bottom-end'],
      }),
    ],
  });

  React.useEffect(() => {
    if (isOpen) {
      props.onFocus && props.onFocus();
    } else {
      props.onBlur && props.onBlur();
    }
  }, [isOpen]);

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
    <Provider
      value={{
        isOpen,
        open: () => setOpen(true),
        close: () => setOpen(false),
      }}
    >
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
    </Provider>
  );
};

const DropDown = Object.assign(DropDownComponent, {
  List: List,
  Content: Content,
});

export { DropDown };
