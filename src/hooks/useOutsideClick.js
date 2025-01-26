import { useEffect, useRef } from "react";

export default function useOutsideClick(cb, exceptionDataId) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        e.target.dataset.id != exceptionDataId
      )
        cb();
    }
    document.addEventListener("click", handleClick, { capture: true });

    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, [cb, exceptionDataId]);

  return ref;
}
