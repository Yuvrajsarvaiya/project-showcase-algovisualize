import { getSortConditionOnDirection } from "./getSortConditionOnDirection";

function selectionSort(
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

  if (currentRowIndex === currentRunningArray.length - 1) {
    sortedValues.push(currentRunningArray[currentRowIndex].barInputValue);
    return "stop";
  }

  if (currentColumnIndex >= currentRunningArray.length) {
    // TODO RETHINK
    sortedValues?.push(currentRunningArray[currentRowIndex].barInputValue);
    currentResult.currentRowIndex += 1;
    currentResult.currentColumnIndex = currentResult.currentRowIndex + 1;
    return currentRunningArray;
  }

  if (
    getSortConditionOnDirection(
      currentRunningArray[currentRowIndex].barInputValue,
      currentRunningArray[currentColumnIndex].barInputValue,
      sortDirection
    )
  ) {
    swap(currentRunningArray, currentRowIndex, currentColumnIndex);
  }
  currentResult.currentAlgoOutput = currentRunningArray;
  currentResult.currentColumnIndex += 1;

  function swap(array, i, j) {
    let temp = { ...array[i] };
    array[i] = { ...array[j] };
    array[j] = temp;
  }
}

export { selectionSort };
