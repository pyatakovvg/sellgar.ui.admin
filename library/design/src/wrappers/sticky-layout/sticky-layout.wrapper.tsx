import React from 'react';
import classNames from 'classnames';
import stickybits from 'stickybits';

import { Scrollbar } from '@sellgar/kit';

import s from './default.module.scss';

type TStickybitsVerticalPosition = 'top' | 'bottom';
type TStickyDirection = 'top' | 'bottom' | 'left' | 'right';

interface IStickyLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number | string;
  padding?: number | string;
  scrollbarClassName?: string;
  scrollbarStyle?: React.CSSProperties;
  stickyAutoOffsetPadding?: number;
  stickyAutoOffsetGap?: number;
}

interface IStickyLayoutStaticProps extends React.HTMLAttributes<HTMLDivElement> {
  zIndex?: number;
  offset?: number;
}

interface IStickyLayoutStickyProps extends React.HTMLAttributes<HTMLDivElement> {
  offset?: number;
  autoOffset?: boolean;
  zIndex?: number;
  direction?: TStickyDirection[];
  useStickyClasses?: boolean;
  noStyles?: boolean;
  useFixed?: boolean;
  useGetBoundingClientRect?: boolean;
  verticalPosition?: TStickybitsVerticalPosition;
  parentClass?: string;
  stickyClass?: string;
  stuckClass?: string;
  stickyChangeClass?: string;
  customStickyChangeNumber?: number;
  scrollEl?: Window | HTMLElement | string;
}

interface IStickyLayoutContext {
  layoutRef: React.RefObject<HTMLDivElement | null>;
  scrollViewport: HTMLElement | null;
  stickyAutoOffsetPadding: number;
  stickyAutoOffsetGap: number;
}

const StickyLayoutContext = React.createContext<IStickyLayoutContext | null>(null);

const StickyLayoutComponent: React.FC<React.PropsWithChildren<IStickyLayoutProps>> = ({
  className,
  style,
  gap,
  padding,
  children,
  scrollbarClassName,
  scrollbarStyle,
  stickyAutoOffsetPadding = 0,
  stickyAutoOffsetGap = 0,
  ...props
}) => {
  const layoutRef = React.useRef<HTMLDivElement>(null);
  const scrollbarRef = React.useRef<HTMLDivElement>(null);
  const [scrollViewport, setScrollViewport] = React.useState<HTMLElement | null>(null);

  const layoutStyle = React.useMemo<React.CSSProperties>(() => {
    let accumStyles = style || {};

    if (gap) {
      accumStyles = {
        ...accumStyles,
        ['--sticky-layout-gap' as string]: typeof gap === 'number' ? `${gap}px` : gap,
      };
    }

    if (padding) {
      accumStyles = {
        ...accumStyles,
        ['--sticky-layout-padding' as string]: typeof padding === 'number' ? `${padding}px` : padding,
      };
    }

    return accumStyles;
  }, [gap, padding, style]);

  React.useEffect(() => {
    if (!scrollbarRef.current) {
      return;
    }

    const scrollElement = scrollbarRef.current;
    const updateScrollViewport = () => {
      setScrollViewport(scrollElement.querySelector<HTMLElement>('[data-overlayscrollbars-viewport]'));
    };

    updateScrollViewport();
  }, []);

  return (
    <StickyLayoutContext.Provider value={{ layoutRef, scrollViewport, stickyAutoOffsetPadding, stickyAutoOffsetGap }}>
      <Scrollbar ref={scrollbarRef} className={classNames(s.scrollbar, scrollbarClassName)} style={scrollbarStyle}>
        <div ref={layoutRef} className={classNames(s.layout, className)} style={layoutStyle} {...props}>
          {children}
        </div>
      </Scrollbar>
    </StickyLayoutContext.Provider>
  );
};

const StickyLayoutStatic: React.FC<React.PropsWithChildren<IStickyLayoutStaticProps>> = ({
  className,
  children,
  zIndex,
  offset = 0,
  ...props
}) => {
  const context = React.useContext(StickyLayoutContext);
  const ref = React.useRef<HTMLDivElement>(null);
  const [stickyOffsetBefore, setStickyOffsetBefore] = React.useState(0);

  React.useEffect(() => {
    if (!ref.current || !context?.layoutRef.current) {
      return;
    }

    const layoutElement = context.layoutRef.current;

    const calculateOffsetBefore = () => {
      if (!ref.current) {
        return;
      }

      const stickyElements = Array.from(
        layoutElement.querySelectorAll('[data-sticky-layout-sticky="true"]'),
      ) as HTMLElement[];
      let nextOffset = context.stickyAutoOffsetPadding;
      let stickyCountBeforeCurrent = 0;
      let manualTopOffsetBeforeCurrent = 0;

      for (const stickyElement of stickyElements) {
        const position = stickyElement.compareDocumentPosition(ref.current);
        const isBeforeCurrent = !!(position & Node.DOCUMENT_POSITION_FOLLOWING);
        if (!isBeforeCurrent) {
          continue;
        }

        nextOffset += stickyElement.getBoundingClientRect().height;
        stickyCountBeforeCurrent += 1;
        const manualTopOffset = Number(stickyElement.dataset.stickyLayoutManualTopOffset || 0);
        if (!Number.isNaN(manualTopOffset)) {
          manualTopOffsetBeforeCurrent = Math.max(manualTopOffsetBeforeCurrent, manualTopOffset);
        }
      }

      nextOffset += context.stickyAutoOffsetGap * stickyCountBeforeCurrent;
      nextOffset += manualTopOffsetBeforeCurrent;
      setStickyOffsetBefore((previousOffset) => (previousOffset === nextOffset ? previousOffset : nextOffset));
    };

    const resizeObserver = new ResizeObserver(calculateOffsetBefore);
    const observeStickyElements = () => {
      resizeObserver.disconnect();
      const stickyElements = Array.from(
        layoutElement.querySelectorAll('[data-sticky-layout-sticky="true"]'),
      ) as HTMLElement[];
      stickyElements.forEach((element) => resizeObserver.observe(element));
    };

    const mutationObserver = new MutationObserver(() => {
      observeStickyElements();
      calculateOffsetBefore();
    });

    observeStickyElements();
    calculateOffsetBefore();

    mutationObserver.observe(layoutElement, {
      childList: true,
      subtree: true,
    });

    window.addEventListener('resize', calculateOffsetBefore);

    return () => {
      window.removeEventListener('resize', calculateOffsetBefore);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [context]);

  const staticStyle = React.useMemo<React.CSSProperties>(
    () => ({
      ['--sticky-layout-before-offset' as string]: `${stickyOffsetBefore + offset}px`,
      ...(typeof zIndex === 'undefined' ? null : { zIndex }),
      ...(props.style || {}),
    }),
    [offset, props.style, stickyOffsetBefore, zIndex],
  );

  return (
    <div ref={ref} className={classNames(s.block, s.static, className)} {...props} style={staticStyle}>
      {children}
    </div>
  );
};

const StickyLayoutSticky: React.FC<React.PropsWithChildren<IStickyLayoutStickyProps>> = ({
  className,
  children,
  offset,
  autoOffset = false,
  zIndex,
  direction = ['top'],
  useStickyClasses,
  noStyles,
  useFixed,
  useGetBoundingClientRect,
  verticalPosition,
  parentClass,
  stickyClass,
  stuckClass,
  stickyChangeClass,
  customStickyChangeNumber,
  scrollEl,
  ...props
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const context = React.useContext(StickyLayoutContext);
  const [resolvedOffset, setResolvedOffset] = React.useState(offset ?? 0);
  const horizontalOffset = offset ?? 0;
  const directions = React.useMemo(() => direction, [direction]);
  const hasTop = directions.includes('top');
  const hasBottom = directions.includes('bottom');
  const hasLeft = directions.includes('left');
  const hasRight = directions.includes('right');
  const hasSingleVerticalDirection = (hasTop && !hasBottom) || (!hasTop && hasBottom);
  const shouldUseStickybits = hasSingleVerticalDirection;
  const resolvedVerticalPosition: TStickybitsVerticalPosition | undefined = React.useMemo(() => {
    if (hasBottom && !hasTop) return 'bottom';
    if (hasTop && !hasBottom) return 'top';
    return verticalPosition;
  }, [hasBottom, hasTop, verticalPosition]);

  React.useEffect(() => {
    if (!autoOffset) {
      setResolvedOffset(offset ?? 0);
      return;
    }

    if (!ref.current || !context?.layoutRef.current) {
      return;
    }

    const layoutElement = context.layoutRef.current;

    const calculateOffset = () => {
      if (!ref.current) {
        return;
      }

      const stickyElements = Array.from(
        layoutElement.querySelectorAll('[data-sticky-layout-sticky="true"]'),
      ) as HTMLElement[];
      let nextOffset = context?.stickyAutoOffsetPadding || 0;
      let stickyCountBeforeCurrent = 0;

      for (const element of stickyElements) {
        if (element === ref.current) {
          break;
        }

        nextOffset += element.getBoundingClientRect().height;
        stickyCountBeforeCurrent += 1;
      }

      nextOffset += (context?.stickyAutoOffsetGap || 0) * stickyCountBeforeCurrent;

      setResolvedOffset((previousOffset) => (previousOffset === nextOffset ? previousOffset : nextOffset));
    };

    const resizeObserver = new ResizeObserver(() => {
      calculateOffset();
    });

    const observeStickyElements = () => {
      resizeObserver.disconnect();

      const stickyElements = Array.from(
        layoutElement.querySelectorAll('[data-sticky-layout-sticky="true"]'),
      ) as HTMLElement[];
      stickyElements.forEach((element) => resizeObserver.observe(element));
    };

    const mutationObserver = new MutationObserver(() => {
      observeStickyElements();
      calculateOffset();
    });

    observeStickyElements();
    calculateOffset();

    mutationObserver.observe(layoutElement, {
      childList: true,
      subtree: true,
    });

    window.addEventListener('resize', calculateOffset);

    return () => {
      window.removeEventListener('resize', calculateOffset);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [autoOffset, context, offset]);

  React.useEffect(() => {
    if (!(hasLeft || hasRight)) return;
    if (!ref.current || !context?.scrollViewport) return;

    const element = ref.current;
    const viewport = context.scrollViewport;

    const setViewportWidth = () => {
      element.style.setProperty('--sticky-layout-viewport-width', `${viewport.clientWidth}px`);
    };

    setViewportWidth();

    const resizeObserver = new ResizeObserver(setViewportWidth);
    resizeObserver.observe(viewport);

    return () => {
      resizeObserver.disconnect();
      element.style.removeProperty('--sticky-layout-viewport-width');
    };
  }, [context?.scrollViewport, hasLeft, hasRight]);

  React.useEffect(() => {
    if (!shouldUseStickybits) {
      return;
    }

    if (!ref.current) {
      return;
    }

    const instance = stickybits(ref.current, {
      stickyBitStickyOffset: resolvedOffset,
      useStickyClasses,
      noStyles,
      useFixed,
      useGetBoundingClientRect,
      verticalPosition: resolvedVerticalPosition,
      parentClass,
      stickyClass,
      stuckClass,
      stickyChangeClass,
      customStickyChangeNumber,
      scrollEl: scrollEl || context?.scrollViewport || undefined,
    });

    const update = () => instance.update();

    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
      instance.cleanup();
    };
  }, [
    context?.scrollViewport,
    customStickyChangeNumber,
    noStyles,
    parentClass,
    resolvedOffset,
    resolvedVerticalPosition,
    scrollEl,
    shouldUseStickybits,
    stickyChangeClass,
    stickyClass,
    stuckClass,
    useFixed,
    useGetBoundingClientRect,
    useStickyClasses,
  ]);

  const stickyStyle = React.useMemo<React.CSSProperties | undefined>(() => {
    const style: React.CSSProperties = {
      ...(props.style || {}),
    };
    const width = style.width;
    const isFullWidth = width === '100%';

    if (typeof zIndex !== 'undefined') {
      style.zIndex = zIndex;
    }

    if (!shouldUseStickybits) {
      style.position = 'sticky';
    }

    if (hasTop) {
      style.top = resolvedOffset;
    }

    if (hasBottom) {
      style.bottom = resolvedOffset;
    }

    if (hasLeft) {
      style.left = horizontalOffset;
      if (isFullWidth) {
        style.width = 'var(--sticky-layout-viewport-width)';
      }
    }

    if (hasRight) {
      style.right = horizontalOffset;
      if (isFullWidth) {
        style.width = 'var(--sticky-layout-viewport-width)';
      }
    }

    if (Object.keys(style).length === 0) {
      return undefined;
    }

    return style;
  }, [
    hasBottom,
    hasLeft,
    hasRight,
    hasTop,
    horizontalOffset,
    props.style,
    resolvedOffset,
    shouldUseStickybits,
    zIndex,
  ]);

  const manualTopOffset = !autoOffset && hasTop && !hasBottom ? resolvedOffset : 0;

  return (
    <div
      ref={ref}
      data-sticky-layout-sticky="true"
      data-sticky-layout-manual-top-offset={manualTopOffset}
      className={classNames(s.block, s.sticky, className)}
      {...props}
      style={stickyStyle}
    >
      {children}
    </div>
  );
};

type TStickyLayout = typeof StickyLayoutComponent & {
  Static: typeof StickyLayoutStatic;
  Sticky: typeof StickyLayoutSticky;
};

export const StickyLayout = Object.assign(StickyLayoutComponent, {
  Static: StickyLayoutStatic,
  Sticky: StickyLayoutSticky,
}) as TStickyLayout;
