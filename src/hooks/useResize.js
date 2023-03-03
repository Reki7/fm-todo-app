import {useEffect, useState} from "react";

export const sizes = {
  mobile: '375px',
  desktop: '768px',
};

function isMatch(media) {
  const query = `(min-width: ${sizes[media]})`;
  return window.matchMedia(query).matches;
}

export const useResize = () => {
  const [layout, setLayout] = useState('desktop');

  useEffect(() => {
    const listener = () => {
      const newLayout = window.innerWidth > 767 ? 'desktop' : 'mobile';
      setLayout(newLayout);
    }
    listener(layout);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener); //Cleanup
  }, []);

  return layout;
};