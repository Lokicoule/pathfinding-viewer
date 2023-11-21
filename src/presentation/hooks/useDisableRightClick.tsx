import { useLayoutEffect, RefObject } from "react";

export const useDisableRightClick = (ref: RefObject<HTMLElement>) => {
  useLayoutEffect(() => {
    const disableRightClick = (event: MouseEvent) => {
      event.preventDefault();
    };

    const element = ref.current;
    element?.addEventListener("contextmenu", disableRightClick);

    return () => {
      element?.removeEventListener("contextmenu", disableRightClick);
    };
  }, [ref]);
};
