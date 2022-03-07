import { constructBarData } from "../utils";

export function getInitialStateBasedOnAlgoType(algorithmType, initialInput) {
  const INITIAL_STATE = {
    isAlgorithmRunning: false,
    isAlgorithmCompleted: false,
    algoBarValues: constructBarData(initialInput, 0, 0),
    timeInterval: 1000,
    completedSortedValues: [],
  };

  if (algorithmType === "selectionSort") {
    INITIAL_STATE.algoBarValues.currentPair = [0, 1];
  } else if (algorithmType === "bubbleSort") {
    INITIAL_STATE.algoBarValues.currentPair = [0, 1];
  }
  return INITIAL_STATE;
}
