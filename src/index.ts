import get from 'lodash.get';

type ObjectItem = object;
type ArrayItem = (number | string)[];
type TargetItem = ObjectItem | ArrayItem;
type Target = TargetItem[];
type ReferenceValue = number | string;
type Reference = ReferenceValue[];
type MapKey = number | string;
type PropertyKey = number | string;

// sort by order of appearance of values provided in reference array
// not respecting duplicate values.
const sortByNotExact =
  (ref: Reference, propKey: string | number) => (a: any, b: any) => {
    let compare = 0;
    let aValue;
    let bValue;

    if (typeof propKey === 'string') {
      aValue = get(a, propKey);
      bValue = get(b, propKey);
    } else if (typeof propKey === 'number') {
      aValue = a[propKey];
      bValue = b[propKey];
    } else {
      console.error(
        `Invalid field type was passed to sortByArray() function: ${typeof propKey}, expected String or Number`,
      );
      return compare;
    }

    compare = ref.indexOf(aValue) - ref.indexOf(bValue);

    return compare;
  };

const isEntryTarget = (target: Target): target is ArrayItem[] =>
  Array.isArray((target as ArrayItem[])[0]);

const isNumberPropKey = (propKey: PropertyKey): propKey is number => {
  return typeof propKey === 'number';
};

const setMapValue = (
  map: Map<MapKey, Target>,
  mapKey: MapKey,
  item: TargetItem,
) => {
  if (map.has(mapKey)) {
    const oldMapValueOfKey = map.get(mapKey);
    map.set(mapKey, oldMapValueOfKey!.concat(item));
  } else {
    map.set(mapKey, [item]);
  }
};

export default function sortByArray(
  target: Target,
  ref: Reference,
  propKey: PropertyKey,
  exact: null | 'exact',
): Target | undefined {
  let sorted = [];

  if (!exact) {
    sorted = target.slice().sort(sortByNotExact(ref, propKey));
    return sorted;
  }

  if (exact === 'exact') {
    if (target.length !== ref.length) {
      console.error(
        `Length of target array and reference array do not match.`,
      );
      return;
    }

    const map = new Map<MapKey, Target>();
    const refCountMap = new Map<MapKey, number>();
    const uniqueRef = Array.from(new Set(ref));
    uniqueRef.forEach((value) => refCountMap.set(value, 0));

    const isEntry = isEntryTarget(target);
    const isNumber = isNumberPropKey(propKey);

    // correct input type with entry array AND number propKey
    if (isEntry && isNumber) {
      target.forEach((item: ArrayItem) => {
        const mapKey = item[propKey];
        setMapValue(map, mapKey, item);
      });
    }

    // correct input type with object array AND string propKey
    if (!isEntry && !isNumber) {
      target.forEach((item: ObjectItem) => {
        const mapKey = get(item, propKey);
        setMapValue(map, mapKey, item);
      });
    }

    sorted = ref.map((value) => {
      const index = refCountMap.get(value);
      const currentValue = map.get(value)![index!];
      refCountMap.set(value, index! + 1);
      return currentValue;
    });

    return sorted;
  }

  console.error(
    `Invalid sort option passed to sortByArray() function: ${exact}, expected null or 'exact'`,
  );
  return;
}
