import { useAlgoSort } from "../../contexts/SortProvider";
import { ACTION_TYPES } from "../../reducers/AlgoActions";
import Input from "../Input";

import styles from "./IntervalInput.module.css";

const IntervalInput = () => {
  const [{ timeInterval }, dispatch] = useAlgoSort();

  const onIntervalChange = (event) => {
    dispatch({
      type: ACTION_TYPES.SET_INTERVAL,
      payload: Number.parseInt(event.target.value),
    });
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} style={{ fontSize: 14 }}>
        Enter Speed of algorithm in ms (1000ms = 1s)
      </label>
      <Input
        defaultValue={timeInterval}
        name="interval"
        id="interval"
        type="number"
        max={10000}
        min={100}
        onChange={onIntervalChange}
      />
    </div>
  );
};

export default IntervalInput;
