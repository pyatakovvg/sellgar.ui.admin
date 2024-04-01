import React from 'react';

function useCheckAutofill(inputRef: React.MutableRefObject<HTMLDivElement | null>) {
  const [isAutofill, setAutofill] = React.useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    if (inputRef.current) {
      timeout = setTimeout(() => {
        clearInterval(interval);
      }, 2000);

      interval = setInterval(() => {
        const autofilledInput = inputRef.current?.querySelector('input:-webkit-autofill');

        if (autofilledInput) {
          setAutofill(true);
          clearTimeout(timeout);
          clearInterval(interval);
        }
      }, 50);
    }
    return () => {
      clearTimeout(timeout);
      clearTimeout(interval);
    };
  }, [inputRef]);

  return isAutofill;
}

export default useCheckAutofill;
