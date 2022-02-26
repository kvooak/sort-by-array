import { useState, useEffect, useCallback } from 'react';
import get from 'lodash.get';

type TargetObjectValue = NonNullable<Record<string, number | string | null>>;
type TargetEntryValue = [number | string, number | string];
type ReferenceValue = number | string;

type Target = TargetObjectValue[] | TargetEntryValue[];
type Reference = ReferenceValue[];

type TPropertyKey<T> = T extends TargetObjectValue[] ? string : number;

export default function useSortByArray<
  TTarget extends Target,
  U extends Reference,
  V extends TPropertyKey<TTarget>,
>(target: TTarget, reference: U, propKey: V): Target | undefined {
  const [sorted, setSorted] = useState<Target | undefined>(undefined);
  const sortBy = useCallback(
    (a, b) => {
      if (typeof propKey === 'string') {
        return (
          reference.indexOf(get(a, propKey)) -
          reference.indexOf(get(b, propKey))
        );
      }

      if (typeof propKey === 'number') {
        return reference.indexOf(a[propKey]) - reference.indexOf(b[propKey]);
      }

      return 0;
    },
    [propKey, reference],
  );

  useEffect(() => {
    const _sorted = target.slice().sort(sortBy);
    setSorted(_sorted);
    return () => setSorted(undefined);
  }, [target, reference, sortBy]);

  return sorted;
}
