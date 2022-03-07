import React from "react";
import { ACTION_TYPES } from "../../reducers/AlgoActions";

const IntervalInput = ({ dispatch, timeInterval }) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const algoSpeedInterval = event.target.elements["interval"].value;
        dispatch({
          type: ACTION_TYPES.SET_INTERVAL,
          payload: Number.parseInt(algoSpeedInterval),
        });
      }}
    >
      <label>Enter Speed of algorithm</label>
      <input
        defaultValue={timeInterval}
        name="interval"
        id="interval"
        type="number"
        max={10000}
        min={100}
      />
      <input type="submit" />
    </form>
  );
};

export default IntervalInput;
