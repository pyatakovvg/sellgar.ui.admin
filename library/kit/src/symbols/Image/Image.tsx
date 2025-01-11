import React from 'react';

import { Error } from './Error';
import { Loading } from './Loading';

import s from './default.module.scss';

interface IProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

enum ImageStatus {
  LOADING,
  ERROR,
  DONE,
}

export const ImageComponent: React.FC<IProps> = ({ src, ...props }) => {
  const imageRef = React.useRef<HTMLDivElement | null>(null);
  const [loadedSrc, setSrc] = React.useState<string>('');
  const [status, setStatus] = React.useState<ImageStatus>(ImageStatus.LOADING);

  React.useEffect(() => {
    const image = new Image();

    const handleLoadEvent = () => {
      setSrc(src);
      setStatus(ImageStatus.DONE);
    };

    const handleErrorEvent = () => {
      setStatus(ImageStatus.ERROR);
    };

    image.addEventListener('load', handleLoadEvent);
    image.addEventListener('error', handleErrorEvent);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          image.src = src;
          observer.unobserve(entry.target);
        }
      });
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();

      image.removeEventListener('load', handleLoadEvent);
      image.removeEventListener('error', handleErrorEvent);
    };
  }, [src]);

  return (
    <div className={s.wrapper} ref={imageRef}>
      {status === ImageStatus.LOADING && <Loading />}
      {status === ImageStatus.ERROR && <Error />}
      {status === ImageStatus.DONE && <img className={s.image} {...props} src={loadedSrc} alt={props.alt} />}
    </div>
  );
};
