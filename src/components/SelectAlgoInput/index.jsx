import React from "react";

const SelectAlgoInput = ({ dispatch, algorithmType, setAlgorithmType }) => {
  return (
    <select
      name="algorithm"
      value={algorithmType}
      onChange={(event) => {
        if (event.target?.value === "selectionSort") {
          dispatch({ type: "INITIAL", payload: "selectionSort" });
          setAlgorithmType("selectionSort");
        } else if (event.target?.value === "bubbleSort") {
          dispatch({ type: "INITIAL", payload: "bubbleSort" });
          setAlgorithmType("bubbleSort");
        }
      }}
    >
      <option value="selectionSort">Selection Sort</option>
      <option value="bubbleSort">Bubble Sort</option>
    </select>
  );
};

export default SelectAlgoInput;
