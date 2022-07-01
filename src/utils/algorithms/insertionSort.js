import { getSortConditionOnDirection } from "./getSortConditionOnDirection";

function insertionSort(
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

  if (currentColumnIndex === 0) {
    const maxValue = currentRunningArray?.map((val) => val.barInputValue);

    currentRowIndex += 1;
    currentColumnIndex = currentRowIndex;
    currentResult.currentRowIndex = currentRowIndex;
    currentResult.currentColumnIndex = currentColumnIndex;
    return;
  }

  if (
    getSortConditionOnDirection(
      currentRunningArray[currentColumnIndex - 1].barInputValue,
      currentRunningArray[currentColumnIndex].barInputValue,
      sortDirection
    )
  ) {
    swap(currentRunningArray, currentColumnIndex, currentColumnIndex - 1);
    currentResult.currentColumnIndex -= 1;
    currentColumnIndex -= 1;
  } else {
    currentRowIndex += 1;
    currentColumnIndex = currentRowIndex;
    currentResult.currentRowIndex = currentRowIndex;
    currentResult.currentColumnIndex = currentColumnIndex;
  }

  currentResult.currentAlgoOutput = currentRunningArray;

  function swap(array, i, j) {
    let temp = { ...array[i] };
    array[i] = { ...array[j] };
    array[j] = temp;
  }
}

export { insertionSort };
