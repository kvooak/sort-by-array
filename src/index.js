import { useState, useEffect, useCallback } from 'react';

export default function useSortByArray(target = [], reference, propKey) {
  const [sorted, setSorted] = useState();
  const sortBy = useCallback(
    (a, b) => reference.indexOf(a[propKey]) - reference.indexOf(b[propKey]),
    [propKey, reference],
  );

  useEffect(() => {
    const _sorted = target.slice().sort(sortBy);
    setSorted(_sorted);
    return () => setSorted();
  }, [target, reference, sortBy]);

  return sorted;
}
