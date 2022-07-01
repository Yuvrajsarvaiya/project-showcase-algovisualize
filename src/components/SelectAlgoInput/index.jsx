import React from "react";
import { ALGORITHM_TYPE } from "../../constants";
import { useAlgoSort } from "../../contexts/SortProvider";

const algorithmOptions = Object.keys(ALGORITHM_TYPE);

const SelectAlgoInput = ({ algorithmType, setAlgorithmType }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, dispatch] = useAlgoSort();

  const onAlgorithmClicked = (selectedAlgorithm) => {
    const { name } = ALGORITHM_TYPE[selectedAlgorithm];
    if (name === undefined) return;
    dispatch({
      type: "INITIAL",
      payload: name,
    });
    setAlgorithmType(name);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <h4 style={{ textAlign: "left", color: "#c2b7a3", fontSize: 15 }}>
        Select Sorting Algorithm
      </h4>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {algorithmOptions.map((algorithm) => {
          const isActive = algorithm === algorithmType;
          const algorithmLabel = algorithm
            .toLocaleLowerCase()
            .split("_")
            .join(" ");

          return (
            <button
              key={algorithm}
              onClick={() => onAlgorithmClicked(algorithm)}
              style={{
                appearance: "none",
                border: `1px solid var(--primary)`,
                paddingBlock: "0.6em",
                paddingInline: "1.2em",
                fontSize: 14,
                fontWeight: "bold",
                borderRadius: 20,
                backgroundColor: isActive ? "var(--primary)" : "transparent",
                color: isActive ? "var(--btn-text-color)" : "#c2b7a3",
                textTransform: "capitalize",
                cursor: "pointer",
              }}
            >
              {algorithmLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectAlgoInput;
