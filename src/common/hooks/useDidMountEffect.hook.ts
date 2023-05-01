import { useEffect, useRef } from "react";

export const useDidMountEffect = (
  effect: React.EffectCallback,
  deps?: React.DependencyList
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) effect();
    else didMount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
