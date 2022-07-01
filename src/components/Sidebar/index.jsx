import Button from "../Button";
import IntervalInput from "../IntervalInput";
import SelectAlgoInput from "../SelectAlgoInput";
import SortAlignment from "../SortAlignment";
import SortDirectionSelection from "../SortDirection";
import ThemeToggle from "../ThemeToggle";
import { CloseIcon, MenuIcon, SortingBar } from "../../assets/images";
import { useAlgoSort } from "../../contexts/SortProvider";
import { ACTION_TYPES } from "../../reducers/AlgoActions";

import styles from "./Sidebar.module.css";
import Input from "../Input";
import { useState } from "react";

function Sidebar({ algorithmType, setAlgorithmType, isOpen, setIsOpen }) {
  const [state, dispatch] = useAlgoSort();

  return (
    <>
      <aside
        className="sidebar"
        style={{
          left: isOpen ? 0 : "-24rem",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--primary)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 80,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "var(--btn-text-color)",
          }}
        >
          <span style={{ width: 35, marginTop: 3, marginRight: 4 }}>
            <SortingBar />
          </span>
          <h1>Sorting Visualizer</h1>
        </div>

        <div className={styles.closeMenu}>
          <span className={styles.closeIcon} onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </span>
        </div>

        <div style={{ paddingTop: 10 }}></div>

        <ThemeToggle />

        <SelectAlgoInput
          algorithmType={algorithmType}
          setAlgorithmType={setAlgorithmType}
        />

        <NumbersInput />

        <IntervalInput />

        <div className={styles.row}>
          <SortDirectionSelection />
          <div className={styles.verticalLine} />
          <SortAlignment />
        </div>

        <div>
          <h4 className={styles.actionHeading}>Actions</h4>
          <div className={styles.actionContainer}>
            <Button
              style={{
                cursor: state.isAlgorithmRunning ? "not-allowed" : "pointer",
              }}
              disbaled={state.isAlgorithmRunning}
              onClick={() => dispatch({ type: ACTION_TYPES.START })}
            >
              {state.isAlgorithmStarted ? "Resume" : "Start"}
            </Button>
            <Button
              style={{
                cursor: !state.isAlgorithmRunning ? "not-allowed" : "pointer",
              }}
              disabled={!state.isAlgorithmRunning}
              onClick={() => dispatch({ type: ACTION_TYPES.STOP })}
            >
              Stop
            </Button>
            <Button
              onClick={() => {
                dispatch({
                  type: ACTION_TYPES.RESET,
                  payload: { algorithmType },
                });
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </aside>

      <div
        style={
          isOpen ? { left: "-100%" } : { left: 20, transitionDelay: "0.4s" }
        }
        className={styles.menu}
        onClick={() => setIsOpen(true)}
      >
        <span className={styles.menuIcon}>
          <MenuIcon />
        </span>
        Open Menu
      </div>
    </>
  );
}

function NumbersInput() {
  const [state, dispatch] = useAlgoSort();
  const inputValues = state.algoBarValues.barData.map(
    ({ barInputValue }) => barInputValue
  );
  const [numbers, setNumbers] = useState(inputValues?.toString() || "");

  const handleChange = (event) => {
    setNumbers(event.target.value);
  };

  const updateInputData = () => {
    const inputNumbers = numbers?.split(",").map((num) => Number(num));
    dispatch({
      type: ACTION_TYPES.UPDATE_INPUT_DATA,
      payload: inputNumbers,
    });
  };

  return (
    <div>
      <label htmlFor="numbersInput" className={styles.label}>
        Enter Input Data
        <span style={{ fontSize: 12, display: "block", marginTop: 4 }}>
          Please put comma between numbers e.g <span>(10,20,30)</span>
        </span>
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Input
          type="text"
          name="numbersInput"
          id="numbersInput"
          onChange={handleChange}
          value={numbers}
          style={{ paddingBlock: 7 }}
        />
        <Button
          onClick={() => {
            updateInputData();
          }}
        >
          Update
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
