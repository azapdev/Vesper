import { useEffect, useState } from 'react';

function useMediaQuery(query: string): boolean {
    
  const [matches, setMatches] = useState<boolean>(() => {
    return typeof window !== 'undefined'
      ? window.matchMedia(query).matches
      : false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    setMatches(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
