import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { DownArrowIcon } from "../../assets/images";
import { ACTION_TYPES } from "../../reducers/AlgoActions";

import styles from "./Bar.module.css";

const Bar = ({
  input,
  maxValue,
  algoStart,
  sortedValues,
  dispatch,
  isAlgorithmCompleted,
}) => {
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
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              position: "relative",
              width: "100%",
              gap: 10,
              height: "calc(100% - 50px)",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            {input.barData.map((bar, index) => {
              const translateValue = 110 * index;
              const rgbValue = bar.barColor;

              return (
                <Draggable
                  key={`${bar.barInputValue}-${index}`}
                  draggableId={`${bar.barInputValue}-${index}`}
                  index={index}
                  isDragDisabled={algoStart || isAlgorithmCompleted}
                >
                  {(provided) => (
                    <div
                      className={styles.bar}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        height: `calc(${
                          (bar.barInputValue / maxValue) * 100
                        }%)`,
                        background: rgbValue,
                        // transform: `translateX(${translateValue}px)`,
                      }}
                    >
                      <div
                        className={styles.barText}
                        style={{
                          backgroundColor: sortedValues.includes(
                            bar.barInputValue
                          )
                            ? "red"
                            : "initial",
                        }}
                      >
                        {bar.barInputValue}
                      </div>
                      {input.currentPair.includes(index) && algoStart && (
                        <div
                          style={{
                            position: "absolute",
                            top: -80,
                            color: "white",
                          }}
                        >
                          <DownArrowIcon />
                        </div>
                      )}
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
