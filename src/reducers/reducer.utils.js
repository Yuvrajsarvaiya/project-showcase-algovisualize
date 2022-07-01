import { ALGORITHM_TYPE, ALIGNMENT } from "../constants";
import { constructBarData } from "../utils";
import { SORT_DIRECTION } from "../utils/algorithms";

export function getInitialStateBasedOnAlgoType(algorithmType, initialInput) {
  const INITIAL_STATE = {
    algoBarValues: constructBarData(initialInput, 0, 0),
    completedSortedValues: [],
    isAlgorithmStarted: false,
    isAlgorithmRunning: false,
    isAlgorithmCompleted: false,
    timeInterval: 100,
    sortDirection: SORT_DIRECTION.ASCENDING,
    alignment: ALIGNMENT.BOTTOM,
  };

  if (algorithmType === ALGORITHM_TYPE.SELECTION_SORT.name) {
    INITIAL_STATE.algoBarValues.currentPair = [0, 1];
  } else if (algorithmType === ALGORITHM_TYPE.BUBBLE_SORT.name) {
    INITIAL_STATE.algoBarValues.currentPair = [0, 1];
  }
  return INITIAL_STATE;
}
