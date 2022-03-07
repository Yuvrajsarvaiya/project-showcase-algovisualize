import { useEffect, useReducer, useRef, useState } from "react";

import {
  Bar,
  BarInput,
  Button,
  IntervalInput,
  SelectAlgoInput,
} from "./components";
import { ACTION_TYPES } from "./reducers/AlgoActions";
import { getInitialStateBasedOnAlgoType } from "./reducers/reducer.utils";
import { ALGORITHM } from "./utils";

import "./App.css";
import { algorithmReducer, currentResult } from "./reducers/AlgoReducer";

const initialInput = [50, 30, 20, 10, 60, 25, 15, 65, 80, 85, 90];

export default function App() {
  const [algorithmType, setAlgorithmType] = useState("bubbleSort");
  const [state, dispatch] = useReducer(
    algorithmReducer,
    getInitialStateBasedOnAlgoType(algorithmType, initialInput)
  );

  const maxValue = useRef(
    Math.max(...state.algoBarValues.barData?.map((val) => val.barInputValue))
  );

  useEffect(() => {
    if (algorithmType === "selectionSort") {
      currentResult.currentRowIndex = 0;
      currentResult.currentColumnIndex = 1;
    } else if (algorithmType === "bubbleSort") {
      currentResult.currentRowIndex = 0;
      currentResult.currentColumnIndex = 0;
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
        state.completedSortedValues
      );
      if (shoudStop === "stop") {
        dispatch({ type: "COMPLETED" });
        return;
      }
      console.log("currentResult", currentResult.currentAlgoOutput);
      dispatch({
        type: ACTION_TYPES.UPDATE_UI,
        payload: {
          barData: currentResult.currentAlgoOutput,
          currentColumnIndex: currentResult.currentColumnIndex,
          currentRowIndex: currentResult.currentRowIndex,
          currentPair:
            algorithmType === "bubbleSort"
              ? [
                  currentResult.currentColumnIndex,
                  currentResult.currentColumnIndex + 1,
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
  }, [state.isAlgorithmRunning, algorithmType, state.timeInterval]);

  return (
    <div className="App">
      <div className="button__header">
        <Button
          disbaled={state.isAlgorithmRunning}
          onClick={() => dispatch({ type: ACTION_TYPES.START })}
        >
          Start
        </Button>
        <Button
          disabled={!state.isAlgorithmRunning}
          onClick={() => dispatch({ type: ACTION_TYPES.STOP })}
        >
          Stop
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: ACTION_TYPES.RESET, payload: { algorithmType } });
          }}
        >
          Reset
        </Button>

        <SelectAlgoInput
          dispatch={dispatch}
          algorithmType={algorithmType}
          setAlgorithmType={setAlgorithmType}
        />

        <IntervalInput timeInterval={state.timeInterval} dispatch={dispatch} />
        {/* <BarInput /> */}
      </div>

      <section className="bar__container">
        <Bar
          input={state.algoBarValues}
          maxValue={maxValue.current}
          algoStart={state.isAlgorithmRunning}
          sortedValues={state.completedSortedValues}
          dispatch={dispatch}
          isAlgorithmCompleted={state.isAlgorithmCompleted}
        />
      </section>
    </div>
  );
}
