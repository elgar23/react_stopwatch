import { useState, useEffect } from "react";

export default function useDoubleClick(actionDoubleClick, delay = 300) {
  const [click, setClick] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClick(0);
    }, delay);

    if (click === 2) actionDoubleClick();

    return () => clearTimeout(timer);
  });

  return () => setClick((prev) => prev + 1)
}