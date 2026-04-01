import { useState, useEffect } from 'react';
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    // mock fetch
    setData(null);
  }, [url]);
  return { data };
}
