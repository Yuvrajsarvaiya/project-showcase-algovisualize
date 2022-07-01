import { ALGORITHM_TYPE } from "../../constants";
import { selectionSort } from "./selectionSort";
import { bubbleSort } from "./bubbleSort";
import { insertionSort } from "./insertionSort";

export const ALGORITHM = {
  [ALGORITHM_TYPE.SELECTION_SORT.name]: selectionSort,
  [ALGORITHM_TYPE.BUBBLE_SORT.name]: bubbleSort,
  [ALGORITHM_TYPE.INSERTION_SORT.name]: insertionSort,
};

export const SORT_DIRECTION = {
  ASCENDING: "ASCENDING",
  DESCENDING: "DESCENDING",
};
