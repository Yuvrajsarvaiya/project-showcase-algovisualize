import { useEffect, useRef, useState } from "react";

import { Bar, Sidebar } from "./components";
import { ACTION_TYPES } from "./reducers/AlgoActions";
import { getInitialStateBasedOnAlgoType } from "./reducers/reducer.utils";
import { ALGORITHM } from "./utils";
import { currentResult } from "./reducers/AlgoReducer";
import { ALGORITHM_TYPE } from "./constants";
import SortProvider, { useAlgoSort } from "./contexts/SortProvider";

import "./App.css";

const initialInput = [50, 30, 20, 10, 60, 25, 15, 65, 80, 85, 90];

export default function AppWrapper() {
  const [algorithmType, setAlgorithmType] = useState(
    ALGORITHM_TYPE.SELECTION_SORT.name
  );

  return (
    <SortProvider
      initialState={getInitialStateBasedOnAlgoType(algorithmType, initialInput)}
    >
      <App algorithmType={algorithmType} setAlgorithmType={setAlgorithmType} />
    </SortProvider>
  );
}

function App({ algorithmType, setAlgorithmType }) {
  const [state, dispatch] = useAlgoSort();
  const [isOpen, setIsOpen] = useState(true);

  const [maxValue, setMaxValue] = useState(
    Math.max(...state.algoBarValues.barData?.map((val) => val.barInputValue))
  );
  const [medianValue, setMedianValue] = useState(
    state.algoBarValues.barData?.reduce(
      (acc, val) => acc + val.barInputValue,
      0
    )
  );

  // const minValue = useRef(
  //   Math.min(...state.algoBarValues.barData?.map((val) => val.barInputValue))
  // );

  useEffect(() => {
    console.log(maxValue);
    setMaxValue(
      Math.max(...state.algoBarValues.barData?.map((val) => val.barInputValue))
    );
  }, [state.algoBarValues.barData]);

  useEffect(() => {
    if (algorithmType === ALGORITHM_TYPE.SELECTION_SORT.name) {
      currentResult.currentRowIndex = 0;
      currentResult.currentColumnIndex = 1;
    } else if (algorithmType === ALGORITHM_TYPE.BUBBLE_SORT.name) {
      currentResult.currentRowIndex = 0;
      currentResult.currentColumnIndex = 0;
    } else if (algorithmType === ALGORITHM_TYPE.INSERTION_SORT.name) {
      currentResult.currentColumnIndex = 1;
    }
  }, [algorithmType]);

  useEffect(() => {
    let interval;
    let shoudStop;
    function handleAlgoAnimation(event) {
      shoudStop = ALGORITHM[algorithmType](
        state.algoBarValues,
        currentResult.currentRowIndex,
        currentResult.currentColumnIndex,
        currentResult,
        state.completedSortedValues,
        state.sortDirection
      );
      if (shoudStop === "stop") {
        dispatch({ type: "COMPLETED" });
        return;
      }
      console.log("currentResult", currentResult);
      dispatch({
        type: ACTION_TYPES.UPDATE_UI,
        payload: {
          barData: currentResult.currentAlgoOutput,
          currentColumnIndex: currentResult.currentColumnIndex,
          currentRowIndex: currentResult.currentRowIndex,
          currentPair:
            algorithmType === ALGORITHM_TYPE.BUBBLE_SORT.name
              ? [
                  currentResult.currentColumnIndex,
                  currentResult.currentColumnIndex + 1,
                ]
              : algorithmType === ALGORITHM_TYPE.INSERTION_SORT.name
              ? [
                  currentResult.currentColumnIndex,
                  currentResult.currentColumnIndex - 1,
                ]
              : [
                  currentResult.currentRowIndex,
                  currentResult.currentColumnIndex,
                ],
        },
      });
    }

    if (state.isAlgorithmRunning) {
      if (interval) clearInterval(interval);
      interval = setInterval(handleAlgoAnimation, state.timeInterval);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [state.isAlgorithmRunning, algorithmType, state.timeInterval, dispatch]);

  return (
    <div className="App">
      <Sidebar
        algorithmType={algorithmType}
        setAlgorithmType={setAlgorithmType}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <section
        className="bar__container"
        style={{ marginLeft: isOpen ? "22.5rem" : 0 }}
      >
        <Bar maxValue={maxValue} />
      </section>
    </div>
  );
}
