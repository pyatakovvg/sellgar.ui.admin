import React from 'react';

import s from './default.module.scss';

interface IProps {
  onScrollToTop?(state: boolean): void;
  onScrollToBottom?(state: boolean): void;
}

export const Scroller: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const [isTop, setIsTop] = React.useState(false);
  const [isBottom, setIsBottom] = React.useState(false);

  React.useEffect(() => {
    props.onScrollToTop && props.onScrollToTop(isTop);
  }, [isTop]);

  React.useEffect(() => {
    props.onScrollToBottom && props.onScrollToBottom(isBottom);
  }, [isBottom]);

  React.useEffect(() => {
    const handleBottom = () => {
      if (!wrapperRef.current) {
        return void 0;
      }
      const scrollTop = wrapperRef.current.scrollTop; // Положение прокрутки
      const scrollHeight = wrapperRef.current.scrollHeight; // Высота содержимого
      const clientHeight = wrapperRef.current.clientHeight; // Высота видимой части
      const heightDelta = scrollHeight - clientHeight - 0.5;

      if (scrollTop <= 0) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }

      if (scrollTop >= heightDelta) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };

    wrapperRef.current?.addEventListener('scroll', handleBottom);
    return () => {
      wrapperRef.current?.removeEventListener('scroll', handleBottom);
    };
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className={s.wrapper}>
      {props.children}
    </div>
  );
};
