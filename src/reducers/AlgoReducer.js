import { ALGORITHM_TYPE } from "../constants";
import { constructBarData } from "../utils";
import { ACTION_TYPES } from "./AlgoActions";
import { getInitialStateBasedOnAlgoType } from "./reducer.utils";

const initialInput = [50, 30, 20, 10, 60, 25, 15, 65, 80, 85, 90];

export let currentResult = {
  currentAlgoOutput: [],
  currentRowIndex: 0,
  currentColumnIndex: 0,
};

export function algorithmReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.INITIAL:
      currentResult = {
        currentAlgoOutput: [],
        currentRowIndex: 0,
        currentColumnIndex: 1,
      };
      return getInitialStateBasedOnAlgoType(action.payload, initialInput);

    case ACTION_TYPES.START:
      if (state.isAlgorithmCompleted) {
        currentResult = {
          currentAlgoOutput: [],
          currentRowIndex: 0,
          currentColumnIndex: 1,
        };
        return {
          ...state,
          isAlgorithmStarted: true,
          isAlgorithmRunning: true,
          isAlgorithmCompleted: false,
          algoBarValues: constructBarData(initialInput, 0, 1),
          completedSortedValues: [],
        };
      }
      return {
        ...state,
        isAlgorithmRunning: true,
        isAlgorithmStarted: true,
      };

    case ACTION_TYPES.STOP:
      return { ...state, isAlgorithmRunning: false };

    case ACTION_TYPES.COMPLETED:
      return {
        ...state,
        isAlgorithmRunning: false,
        isAlgorithmStarted: false,
        isAlgorithmCompleted: true,
      };

    case ACTION_TYPES.RESET:
      currentResult = {
        currentAlgoOutput: [],
        currentRowIndex: 0,
        currentColumnIndex:
          action.payload.algorithmType === ALGORITHM_TYPE.BUBBLE_SORT.name
            ? 0
            : 1,
      };
      return {
        ...state,
        isAlgorithmRunning: false,
        isAlgorithmCompleted: false,
        isAlgorithmStarted: false,
        algoBarValues: constructBarData(initialInput, 0, 1),
        completedSortedValues: [],
      };

    case ACTION_TYPES.SET_INTERVAL:
      return {
        ...state,
        timeInterval: action.payload,
      };

    case ACTION_TYPES.UPDATE_UI:
      return { ...state, algoBarValues: action.payload };

    case ACTION_TYPES.UPDATE_BAR_DATA:
      return {
        ...state,
        algoBarValues: {
          ...state.algoBarValues,
          barData: action.payload.barData,
        },
      };

    case ACTION_TYPES.SET_SORTING_DIRECTION:
      return { ...state, sortDirection: action.payload };

    case ACTION_TYPES.SET_ALIGNMENT:
      return { ...state, alignment: action.payload };

    case ACTION_TYPES.UPDATE_INPUT_DATA:
      return {
        ...state,
        algoBarValues: constructBarData(action.payload, 0, 1),
      };

    default:
      throw new Error(`Could not find ${action.type}`);
  }
}
