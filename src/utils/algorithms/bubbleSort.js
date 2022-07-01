import { getSortConditionOnDirection } from "./getSortConditionOnDirection";

var isSorted = true;

function bubbleSort(
  array,
  currentRowIndex,
  currentColumnIndex,
  currentResult,
  sortedValues,
  sortDirection
) {
  let currentRunningArray =
    currentResult.currentAlgoOutput?.length > 0
      ? currentResult.currentAlgoOutput
      : array.barData;

  if (currentRowIndex === currentRunningArray.length) {
    return "stop";
  }
  if (currentColumnIndex >= currentRunningArray.length - 1 - currentRowIndex) {
    sortedValues.push(currentRunningArray[currentColumnIndex].barInputValue);

    if (isSorted === true) {
      for (let col = currentColumnIndex - 1; col >= 0; col--) {
        sortedValues.push(currentRunningArray[col].barInputValue);
      }
      return "stop";
    }
    currentResult.currentRowIndex += 1;
    currentResult.currentColumnIndex = 0;
    isSorted = true;
    return currentRunningArray;
  }
  if (
    getSortConditionOnDirection(
      currentRunningArray[currentColumnIndex].barInputValue,
      currentRunningArray[currentColumnIndex + 1].barInputValue,
      sortDirection
    )
  ) {
    swap(currentRunningArray, currentColumnIndex, currentColumnIndex + 1);
    isSorted = false;
  }
  currentResult.currentAlgoOutput = currentRunningArray;
  currentResult.currentColumnIndex += 1;

  function swap(array, i, j) {
    let temp = { ...array[i] };
    array[i] = { ...array[j] };
    array[j] = temp;
  }
}

export { bubbleSort };
