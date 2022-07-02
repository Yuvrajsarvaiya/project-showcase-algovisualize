import { useState } from "react";
import { useAlgoSort } from "../../contexts/SortProvider";
import { ACTION_TYPES } from "../../reducers/AlgoActions";
import Input from "../Input";

import styles from "./IntervalInput.module.css";

const IntervalInput = () => {
  const [{ timeInterval }, dispatch] = useAlgoSort();
  const [error, setError] = useState(null);

  const onIntervalChange = (event) => {
    const value = Number(event.target.value);
    let isValid = true;

    if (event.target.value?.trim() === "") {
      setError("speed field is required");
      isValid = false;
    } else if (Number.isNaN(value)) {
      setError("please enter valid number");
      isValid = false;
    } else if (!Number.isInteger(value)) {
      setError("only integer values are allowed");
      isValid = false;
    } else if (value < 100 || value > 5000) {
      setError("Speed must be in range '100-5,000'");
      isValid = false;
    } else {
      setError(null);
    }

    if (!isValid) {
      dispatch({ type: ACTION_TYPES.SET_INPUT_ERROR, payload: true });
      return;
    }

    dispatch({
      type: ACTION_TYPES.SET_INTERVAL,
      payload: {
        interval: Number.parseInt(event.target.value),
        isInputError: false,
      },
    });
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} style={{ fontSize: 14 }}>
        Enter Speed of algorithm in ms (1000ms = 1s)
      </label>
      <div style={{ width: "100%" }}>
        <Input
          defaultValue={timeInterval}
          name="interval"
          id="interval"
          type="number"
          max={10000}
          min={100}
          onChange={onIntervalChange}
        />
        {error ? (
          <p
            style={{
              textAlign: "left",
              fontSize: 13,
              opacity: 1,
              fontWeight: "bold",
              color: "#ba1f3c",
              marginTop: 2,
            }}
          >
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default IntervalInput;
