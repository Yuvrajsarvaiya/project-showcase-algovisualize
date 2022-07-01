import { ALIGNMENT } from "../../constants";
import { useAlgoSort } from "../../contexts/SortProvider";
import { ACTION_TYPES } from "../../reducers/AlgoActions";
import Button from "../Button";

import styles from "./sortAlignment.module.css";

const getActiveStyles = (currentAlignment, specifiedAlignment) => {
  if (currentAlignment === specifiedAlignment) {
    return {
      backgroundColor: "var(--primary)",
      color: "var(--btn-text-color)",

      // color: isActive ? "var(--btn-text-color)" : "#c2b7a3",
    };
  }
  return {};
};

const alignmentBtnStyle = {
  paddingInline: 10,
  fontSize: 14,
  letterSpacing: 0.5,
  backgroundColor: "transparent",
  border: "2px solid var(--primary)",
  color: "#c2b7a3",
};

function SortAlignment() {
  const [{ alignment }, dispatch] = useAlgoSort();

  function handleAlignment(alignment) {
    dispatch({
      type: ACTION_TYPES.SET_ALIGNMENT,
      payload: alignment,
    });
  }

  return (
    <div>
      <h4 className={styles.alignmentText}>Alignment</h4>
      <div className={styles.flex}>
        <Button
          style={{
            ...alignmentBtnStyle,
            ...getActiveStyles(alignment, ALIGNMENT.BOTTOM),
          }}
          onClick={() => handleAlignment(ALIGNMENT.BOTTOM)}
        >
          Bottom
        </Button>
        <Button
          style={{
            ...alignmentBtnStyle,
            ...getActiveStyles(alignment, ALIGNMENT.TOP),
          }}
          onClick={() => handleAlignment(ALIGNMENT.TOP)}
        >
          Top
        </Button>
      </div>
    </div>
  );
}

export default SortAlignment;
