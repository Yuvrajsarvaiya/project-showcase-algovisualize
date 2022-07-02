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
import { useEffect } from "react";

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

        <NumbersInput key={algorithmType} />

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
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const numbersList = event.target.value;
    setNumbers(numbersList);
    handleError(numbersList);
  };

  const handleError = (numbersString) => {
    console.log("numbersString", numbersString.trim());
    const positiveNumberRegex = /^[0-9,+]*$/;
    let inRange = true;
    let isPositive = true;
    let isValidString = positiveNumberRegex.test(numbersString);
    let isEmpty = numbersString?.trim() === "";

    numbersString.split(",").forEach((val) => {
      if (val.trim() === "") return;
      let value = Number(val);
      if (value < 1 || value > 200) {
        inRange = false;
      } else if (value < 0) {
        isPositive = false;
      }
    });
    if (isEmpty) {
      setError("please enter input");
    } else if (!isPositive) {
      setError("only positive numbers are allowed");
    } else if (!inRange) {
      setError("number must not exceed 1-200");
    } else if (!isValidString) {
      setError("Please enter valid input");
    } else {
      setError(null);
    }

    return { inRange, isPositive, isValidString, isEmpty };
  };

  const updateInputData = () => {
    if (error) return;
    const { inRange, isPositive, isValidString, isEmpty } =
      handleError(numbers);
    if (!inRange || !isPositive || !isValidString || isEmpty) return;

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
      {error ? (
        <p
          style={{
            textAlign: "left",
            fontSize: 13,
            opacity: 1,
            fontWeight: "bold",
            color: "#ba1f3c",
          }}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default Sidebar;
