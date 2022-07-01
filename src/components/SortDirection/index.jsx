import { useAlgoSort } from "../../contexts/SortProvider";
import { ACTION_TYPES } from "../../reducers/AlgoActions";
import { SORT_DIRECTION } from "../../utils/algorithms";

import styles from "./SortDirection.module.css";

function SortDirectionSelection() {
  // eslint-disable-next-line no-unused-vars
  const [_, dispatch] = useAlgoSort();

  function onDirectionClicked(direction) {
    dispatch({
      type: ACTION_TYPES.SET_SORTING_DIRECTION,
      payload: direction,
    });
  }

  return (
    <div>
      <h4 className={styles.directionText}>Sorting Direction</h4>
      <div className={styles.directionWrapper}>
        <SortDiectionButton
          direction={SORT_DIRECTION.ASCENDING}
          onClick={() => {
            onDirectionClicked(SORT_DIRECTION.ASCENDING);
          }}
        />

        <SortDiectionButton
          direction={SORT_DIRECTION.DESCENDING}
          onClick={() => {
            onDirectionClicked(SORT_DIRECTION.DESCENDING);
          }}
        />
      </div>
    </div>
  );
}

function SortDiectionButton({ onClick, direction }) {
  const [state] = useAlgoSort();
  const { sortDirection } = state;

  return (
    <button
      onClick={onClick}
      className={`graph-btn ${
        sortDirection === direction ? "graph-btn--active" : ""
      }`}
    >
      <div
        className={`graph-bar-list ${
          direction === SORT_DIRECTION.DESCENDING
            ? "graph-bar-list--reverse"
            : ""
        }`}
      >
        <span className="graph-bar small"></span>
        <span className="graph-bar medium"></span>
        <span className="graph-bar large"></span>
      </div>
    </button>
  );
}

export default SortDirectionSelection;
