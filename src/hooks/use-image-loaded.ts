import { useState, useEffect } from "react";

export function useImageLoaded(src: string) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    if (img.complete) {
      setLoaded(true);
    } else {
      img.onload = () => setLoaded(true);
    }
    return () => { img.onload = null; };
  }, [src]);

  return loaded;
}
