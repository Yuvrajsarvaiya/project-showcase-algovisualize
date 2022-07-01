import { SORT_DIRECTION } from ".";

export function getSortConditionOnDirection(value1, value2, direction) {
  if (direction === SORT_DIRECTION.ASCENDING) {
    return value1 > value2;
  }
  return value1 < value2;
}
