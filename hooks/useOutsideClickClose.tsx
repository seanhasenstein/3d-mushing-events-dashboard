import React from 'react';

export default function useOutsideClickClose(
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  ref: React.RefObject<HTMLElement>,
  callback = Function()
) {
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        callback();
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [callback, open, ref, setOpen]);
}
