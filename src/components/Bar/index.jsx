import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { DownArrowIcon } from "../../assets/images";
import { ALIGNMENT } from "../../constants";
import { useAlgoSort } from "../../contexts/SortProvider";
import { ACTION_TYPES } from "../../reducers/AlgoActions";

import styles from "./Bar.module.css";

const heightToBeFilled = window.innerHeight * 0.8;
const getBarHeight = (barInputValue, maxValue) => {
  const barHeight = (barInputValue / maxValue) * heightToBeFilled;
  return barHeight;
};

const Bar = ({ maxValue }) => {
  const [state, dispatch] = useAlgoSort();
  const {
    isAlgorithmStarted,
    isAlgorithmRunning,
    isAlgorithmCompleted,
    completedSortedValues: sortedValues,
    algoBarValues: input,
    alignment,
  } = state;

  const handleReorderBars = (result) => {
    if (!result.source || !result.destination) return;
    const copiedBardData = input.barData.map((barObj) => ({ ...barObj }));
    const [reorderItem] = copiedBardData?.splice(result.source.index, 1);
    copiedBardData.splice(result.destination.index, 0, reorderItem);
    console.log(copiedBardData);
    dispatch({
      type: ACTION_TYPES.UPDATE_BAR_DATA,
      payload: { barData: copiedBardData },
    });
  };

  return (
    <DragDropContext onDragEnd={handleReorderBars}>
      <Droppable droppableId="bars" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems:
                alignment === ALIGNMENT.BOTTOM ? "flex-end" : "flex-start",
            }}
          >
            {input.barData.map((bar, index) => {
              const rgbValue = bar.barColor;

              return (
                <Draggable
                  key={`${bar.barInputValue}-${index}`}
                  draggableId={`${bar.barInputValue}-${index}`}
                  index={index}
                  isDragDisabled={isAlgorithmRunning || isAlgorithmCompleted}
                >
                  {(provided) => (
                    <div
                      className={styles.bar}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        height: getBarHeight(bar.barInputValue, maxValue),
                        margin: 5,
                      }}
                    >
                      <div
                        style={{
                          // width: 100,
                          transition: "all 200ms ease-out",
                          height: getBarHeight(bar.barInputValue, maxValue),
                          background: rgbValue,
                        }}
                      >
                        <div
                          className={styles.barText}
                          style={{
                            userSelect: "none",
                            transition: "all 200ms ease-out",
                            fontSize: 14,
                            padding: 7,
                            backgroundColor: sortedValues.includes(
                              bar.barInputValue
                            )
                              ? "var(--primary)"
                              : "initial",
                          }}
                        >
                          {bar.barInputValue}
                        </div>
                        {input.currentPair.includes(index) &&
                          isAlgorithmStarted && (
                            <div
                              style={{
                                position: "absolute",
                                top: -80,
                                left: "50%",
                                transform: "translateX(-50%)",
                                color: "white",
                              }}
                            >
                              <DownArrowIcon />
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Bar;
