import React from 'react';

import { Scrollbar } from '@sellgar/kit';

import cn from 'classnames';
import s from './default.module.scss';

interface IPageStickyStackProps extends React.PropsWithChildren {
  className?: string;
  offsetTop?: number;
}

interface IPageStickyStackItemProps extends React.PropsWithChildren<
  Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>
> {
  sticky?: boolean;
  stickyOffset?: number;
  scale?: boolean;
  scaleMin?: number;
  scaleDistance?: number;
}

interface IStackItemConfig {
  order: number;
  element: HTMLDivElement | null;
  sticky: boolean;
  stickyOffset: number;
  height: number;
}

interface IStackContext {
  tops: Record<string, number>;
  zIndexes: Record<string, number>;
  scrollTop: number;
  getViewportTop: () => number;
  register: (id: string, config: Omit<IStackItemConfig, 'order'>) => void;
  update: (id: string, config: Partial<Omit<IStackItemConfig, 'order'>>) => void;
  unregister: (id: string) => void;
}

const StackContext = React.createContext<IStackContext | null>(null);

const getItemMetrics = (element: HTMLDivElement | null) => {
  if (!element) {
    return {
      height: 0,
    };
  }

  return {
    height: element.offsetHeight,
  };
};

const PageStickyStackComponent: React.FC<IPageStickyStackProps> = ({ children, className, offsetTop = 0 }) => {
  const [tops, setTops] = React.useState<Record<string, number>>({});
  const [zIndexes, setZIndexes] = React.useState<Record<string, number>>({});
  const [scrollTop, setScrollTop] = React.useState(0);
  const hostRef = React.useRef<HTMLDivElement | null>(null);
  const itemsRef = React.useRef(new Map<string, IStackItemConfig>());
  const orderRef = React.useRef(0);
  const viewportRef = React.useRef<HTMLElement | null>(null);

  const recalculate = React.useCallback(() => {
    const orderedItems = Array.from(itemsRef.current.entries())
      .sort(([, left], [, right]) => left.order - right.order)
      .map(([id, item]) => ({ id, ...item }));

    let previousStickyTop: number | null = null;
    let previousStickyHeight = 0;
    const nextTops: Record<string, number> = {};
    const nextZIndexes: Record<string, number> = {};
    const stickyItems = orderedItems.filter((item) => item.sticky);
    let stickyOrder = stickyItems.length;

    for (const item of orderedItems) {
      if (!item.sticky) {
        nextTops[item.id] = 0;
        nextZIndexes[item.id] = 0;
        continue;
      }

      if (previousStickyTop === null) {
        nextTops[item.id] = offsetTop + item.stickyOffset;
      } else {
        nextTops[item.id] = previousStickyTop + previousStickyHeight + item.stickyOffset;
      }

      previousStickyTop = nextTops[item.id];
      previousStickyHeight = item.element?.getBoundingClientRect().height ?? item.height;
      nextZIndexes[item.id] = stickyOrder--;
    }

    setTops((prevTops) => {
      const prevKeys = Object.keys(prevTops);
      const nextKeys = Object.keys(nextTops);

      if (prevKeys.length !== nextKeys.length) {
        return nextTops;
      }

      for (const key of nextKeys) {
        if (prevTops[key] !== nextTops[key]) {
          return nextTops;
        }
      }

      return prevTops;
    });

    setZIndexes((prevZIndexes) => {
      const prevKeys = Object.keys(prevZIndexes);
      const nextKeys = Object.keys(nextZIndexes);

      if (prevKeys.length !== nextKeys.length) {
        return nextZIndexes;
      }

      for (const key of nextKeys) {
        if (prevZIndexes[key] !== nextZIndexes[key]) {
          return nextZIndexes;
        }
      }

      return prevZIndexes;
    });
  }, [offsetTop]);

  const register = React.useCallback(
    (id: string, config: Omit<IStackItemConfig, 'order'>) => {
      itemsRef.current.set(id, {
        ...config,
        order: orderRef.current++,
      });
      recalculate();
    },
    [recalculate],
  );

  const update = React.useCallback(
    (id: string, config: Partial<Omit<IStackItemConfig, 'order'>>) => {
      const item = itemsRef.current.get(id);

      if (!item) {
        return;
      }

      itemsRef.current.set(id, {
        ...item,
        ...config,
      });

      recalculate();
    },
    [recalculate],
  );

  const unregister = React.useCallback(
    (id: string) => {
      itemsRef.current.delete(id);
      recalculate();
    },
    [recalculate],
  );

  const getViewportTop = React.useCallback(() => {
    return viewportRef.current?.getBoundingClientRect().top ?? hostRef.current?.getBoundingClientRect().top ?? 0;
  }, []);

  React.useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    let frame = 0;
    let cancelled = false;
    let pollFrame = 0;
    let retryFrame = 0;
    let nextScrollTop = 0;
    let currentViewport: HTMLElement | null = null;

    const resolveViewport = (): HTMLElement | null => {
      let parent: HTMLElement | null = host;
      while (parent) {
        if (parent.matches('[data-overlayscrollbars-viewport], .os-viewport, [data-overlayscrollbars-contents]')) {
          return parent;
        }
        parent = parent.parentElement;
      }

      const selectors = ['[data-overlayscrollbars-viewport]', '.os-viewport', '[data-overlayscrollbars-contents]'];

      for (const selector of selectors) {
        const node = host.querySelector(selector);

        if (node instanceof HTMLElement) {
          return node;
        }
      }

      return null;
    };

    const commitScrollTop = () => {
      frame = 0;
      setScrollTop(nextScrollTop);
      recalculate();
    };

    const attach = () => {
      if (cancelled) {
        return;
      }

      const viewport = resolveViewport();

      if (!viewport) {
        retryFrame = window.requestAnimationFrame(attach);
        return;
      }

      if (currentViewport !== viewport) {
        currentViewport?.removeEventListener('scroll', onScroll);
        currentViewport = viewport;
        currentViewport.addEventListener('scroll', onScroll, { passive: true });
      }

      viewportRef.current = viewport;
      nextScrollTop = viewport.scrollTop;
      setScrollTop(nextScrollTop);
    };

    const onScroll = (event: Event) => {
      const target = event.target;

      if (target instanceof HTMLElement) {
        viewportRef.current = target;
        nextScrollTop = target.scrollTop;
      } else {
        nextScrollTop = viewportRef.current?.scrollTop ?? 0;
      }

      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(commitScrollTop);
    };

    const onResize = () => {
      const viewport = resolveViewport();

      if (viewport) {
        if (currentViewport !== viewport) {
          currentViewport?.removeEventListener('scroll', onScroll);
          currentViewport = viewport;
          currentViewport.addEventListener('scroll', onScroll, { passive: true });
        }

        viewportRef.current = viewport;
        nextScrollTop = viewport.scrollTop;
      } else {
        nextScrollTop = 0;
      }

      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(commitScrollTop);
    };

    attach();
    window.addEventListener('resize', onResize);

    const poll = () => {
      if (cancelled) {
        return;
      }

      const viewport = viewportRef.current ?? resolveViewport();

      if (viewport && viewportRef.current !== viewport) {
        viewportRef.current = viewport;
      }

      if (viewport && currentViewport !== viewport) {
        currentViewport?.removeEventListener('scroll', onScroll);
        currentViewport = viewport;
        currentViewport.addEventListener('scroll', onScroll, { passive: true });
      }

      const currentScrollTop = viewport?.scrollTop ?? 0;

      if (currentScrollTop !== nextScrollTop) {
        nextScrollTop = currentScrollTop;

        if (!frame) {
          frame = window.requestAnimationFrame(commitScrollTop);
        }
      }

      pollFrame = window.requestAnimationFrame(poll);
    };

    poll();

    return () => {
      cancelled = true;

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      if (pollFrame) {
        window.cancelAnimationFrame(pollFrame);
      }
      if (retryFrame) {
        window.cancelAnimationFrame(retryFrame);
      }

      currentViewport?.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      viewportRef.current = null;
    };
  }, [recalculate]);

  const value = React.useMemo(
    (): IStackContext => ({
      getViewportTop,
      scrollTop,
      tops,
      zIndexes,
      register,
      update,
      unregister,
    }),
    [getViewportTop, register, scrollTop, tops, unregister, update, zIndexes],
  );

  const hostClassName = React.useMemo(() => cn(s.wrapper, className), [className]);
  const endSpacerHeight = React.useMemo(() => {
    const values = Object.values(tops);
    if (!values.length) {
      return 0;
    }

    return Math.max(...values);
  }, [tops]);

  return (
    <StackContext.Provider value={value}>
      <Scrollbar className={s.scrollbar}>
        <div ref={hostRef} className={hostClassName}>
          <div className={s.content}>
            {children}
            <div className={s.spacer} style={{ height: endSpacerHeight }} />
          </div>
        </div>
      </Scrollbar>
    </StackContext.Provider>
  );
};

const Item: React.FC<IPageStickyStackItemProps> = ({
  children,
  className,
  sticky = false,
  stickyOffset = 0,
  scale = false,
  scaleMin = 0.92,
  scaleDistance,
  style,
  ...props
}) => {
  const context = React.useContext(StackContext);
  const id = React.useId();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const stickyStartRef = React.useRef<number | null>(null);
  const [scaleValue, setScaleValue] = React.useState(1);

  const top = context?.tops[id] ?? 0;
  const zIndex = context?.zIndexes[id] ?? 0;
  const scrollTop = context?.scrollTop ?? 0;
  const getViewportTop = context?.getViewportTop;
  const register = context?.register;
  const unregister = context?.unregister;
  const update = context?.update;

  React.useEffect(() => {
    if (!register || !unregister) {
      return;
    }

    const metrics = getItemMetrics(ref.current);

    register(id, {
      element: ref.current,
      sticky,
      stickyOffset,
      height: metrics.height,
    });

    return () => {
      unregister(id);
    };
  }, [id, register, unregister]);

  React.useEffect(() => {
    if (!update) {
      return;
    }

    update(id, {
      element: ref.current,
      sticky,
      stickyOffset,
    });
  }, [id, sticky, stickyOffset, update]);

  React.useEffect(() => {
    if (!update || !ref.current) {
      return;
    }

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const element = ref.current;
    const observer = new ResizeObserver(() => {
      const metrics = getItemMetrics(element);

      update(id, {
        height: metrics.height,
      });
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [id, update]);

  React.useEffect(() => {
    if (!scale || !ref.current || !getViewportTop) {
      stickyStartRef.current = null;
      setScaleValue(1);
      return;
    }

    const element = ref.current;
    const viewportTop = getViewportTop();
    const rectTop = element.getBoundingClientRect().top - viewportTop;

    if (stickyStartRef.current === null || rectTop > top + 1) {
      stickyStartRef.current = scrollTop + rectTop - top;
    }

    const normalizedScaleMin = Math.max(Math.min(scaleMin, 1), 0.1);
    const autoDistance = Math.max(element.offsetHeight * (1 - normalizedScaleMin), 1);
    const distance = Math.max(scaleDistance ?? autoDistance, 1);
    const start = stickyStartRef.current ?? scrollTop;
    const progress = Math.min(Math.max((scrollTop - start) / distance, 0), 1);
    const nextScale = 1 - (1 - normalizedScaleMin) * progress;

    setScaleValue((prev) => {
      if (Math.abs(prev - nextScale) < 0.001) {
        return prev;
      }

      return nextScale;
    });
  }, [getViewportTop, scale, scaleDistance, scaleMin, scrollTop, top]);

  React.useEffect(() => {
    if (!update || !ref.current) {
      return;
    }

    update(id, {
      element: ref.current,
      height: ref.current.offsetHeight,
    });
  }, [id, scaleValue, update]);

  const itemClassName = React.useMemo(() => cn(s.item, sticky && s.itemSticky, className), [className, sticky]);

  const itemStyle = React.useMemo((): React.CSSProperties => {
    const transform = scale ? `scale(${scaleValue})` : undefined;
    const mergedTransform =
      style?.transform && transform ? `${style.transform} ${transform}` : (style?.transform ?? transform);

    return {
      ...style,
      ...(sticky ? { top } : null),
      zIndex: style?.zIndex ?? (sticky ? zIndex : undefined),
      transform: mergedTransform,
      transformOrigin: scale ? 'top left' : style?.transformOrigin,
    };
  }, [scale, scaleValue, sticky, style, top, zIndex]);

  return (
    <div ref={ref} {...props} className={itemClassName} style={itemStyle}>
      {children}
    </div>
  );
};

type TPageStickyStack = typeof PageStickyStackComponent & {
  Item: typeof Item;
};

export const PageStickyStack: TPageStickyStack = Object.assign(PageStickyStackComponent, {
  Item,
});
