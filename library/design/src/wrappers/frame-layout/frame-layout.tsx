import { Scrollbar } from '@sellgar/kit';

import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

interface ScrollbarPositionState {
  readonly isAtBottom: boolean;
  readonly isAtTop: boolean;
}

interface ScrollbarPositionStateResult extends ScrollbarPositionState {
  readonly ref: React.RefObject<HTMLDivElement | null>;
}

const DEFAULT_SCROLLBAR_POSITION_STATE = {
  isAtBottom: true,
  isAtTop: true,
} satisfies ScrollbarPositionState;

const FrameLayoutContext = React.createContext<ScrollbarPositionState>(DEFAULT_SCROLLBAR_POSITION_STATE);

const FrameLayoutComponent: React.FC<React.PropsWithChildren> = (props) => {
  const scrollPosition = useScrollbarPositionState();
  const contextValue = React.useMemo<ScrollbarPositionState>(() => {
    return {
      isAtBottom: scrollPosition.isAtBottom,
      isAtTop: scrollPosition.isAtTop,
    };
  }, [scrollPosition.isAtBottom, scrollPosition.isAtTop]);

  return (
    <FrameLayoutContext.Provider value={contextValue}>
      <Scrollbar ref={scrollPosition.ref} className={s.wrapper}>
        {props.children}
      </Scrollbar>
    </FrameLayoutContext.Provider>
  );
};

const Header: React.FC<React.PropsWithChildren> = (props) => {
  const scrollPosition = useFrameLayoutContext();
  const className = cn(s.header, {
    [s.headerScrolled]: !scrollPosition.isAtTop,
  });

  return <div className={className}>{props.children}</div>;
};

const Content: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.content}>{props.children}</div>;
};

const Controls: React.FC<React.PropsWithChildren> = (props) => {
  const scrollPosition = useFrameLayoutContext();
  const className = cn(s.control, {
    [s.controlScrolled]: !scrollPosition.isAtBottom,
  });

  return <div className={className}>{props.children}</div>;
};

type FrameLayoutComponentType = typeof FrameLayoutComponent & {
  Header: typeof Header;
  Content: typeof Content;
  Controls: typeof Controls;
};

export const FrameLayout: FrameLayoutComponentType = Object.assign(FrameLayoutComponent, {
  Header,
  Content,
  Controls,
});

const useFrameLayoutContext = (): ScrollbarPositionState => {
  return React.useContext(FrameLayoutContext);
};

const useScrollbarPositionState = (): ScrollbarPositionStateResult => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [state, setState] = React.useState<ScrollbarPositionState>(DEFAULT_SCROLLBAR_POSITION_STATE);

  React.useEffect(() => {
    const rootElement = ref.current;

    if (!rootElement) {
      return;
    }

    const scrollElement = getScrollbarScrollElement(rootElement);
    const contentElement = getScrollbarContentElement(rootElement);
    const updateState = (): void => {
      updateScrollbarPositionState(scrollElement, setState);
    };
    const resizeObserver = new ResizeObserver(updateState);
    const mutationObserver = new MutationObserver(updateState);

    updateState();
    scrollElement.addEventListener('scroll', updateState, {
      passive: true,
    });
    resizeObserver.observe(rootElement);
    resizeObserver.observe(scrollElement);
    mutationObserver.observe(contentElement, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    if (contentElement !== rootElement && contentElement !== scrollElement) {
      resizeObserver.observe(contentElement);
    }

    return () => {
      scrollElement.removeEventListener('scroll', updateState);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return {
    ref,
    isAtBottom: state.isAtBottom,
    isAtTop: state.isAtTop,
  };
};

const updateScrollbarPositionState = (
  scrollElement: HTMLElement,
  setState: React.Dispatch<React.SetStateAction<ScrollbarPositionState>>,
) => {
  const nextState = getScrollbarPositionState(scrollElement);

  setState((currentState) => {
    if (currentState.isAtTop === nextState.isAtTop && currentState.isAtBottom === nextState.isAtBottom) {
      return currentState;
    }

    return nextState;
  });
};

const getScrollbarScrollElement = (rootElement: HTMLElement): HTMLElement => {
  const viewportElement = rootElement.querySelector('[data-overlayscrollbars-viewport]');

  if (viewportElement instanceof HTMLElement) {
    return viewportElement;
  }

  const contentElement = rootElement.firstElementChild;

  if (contentElement instanceof HTMLElement) {
    return contentElement;
  }

  return rootElement;
};

const getScrollbarContentElement = (rootElement: HTMLElement): HTMLElement => {
  const contentElement =
    rootElement.querySelector('[data-overlayscrollbars-contents]') ??
    rootElement.querySelector('[data-overlayscrollbars-content]');

  if (contentElement instanceof HTMLElement) {
    return contentElement;
  }

  return rootElement;
};

const getScrollbarPositionState = (scrollElement: HTMLElement): ScrollbarPositionState => {
  const scrollBottom = scrollElement.scrollTop + scrollElement.clientHeight;

  return {
    isAtBottom: scrollBottom >= scrollElement.scrollHeight - 1,
    isAtTop: scrollElement.scrollTop <= 0,
  };
};
