function selectionSort(
  array,
  currentRowIndex,
  currentColumnIndex,
  currentResult,
  sortedValues
) {
  let currentRunningArray =
    currentResult.currentAlgoOutput?.length > 0
      ? currentResult.currentAlgoOutput
      : array.barData;
  console.log(sortedValues);
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
    currentRunningArray[currentRowIndex].barInputValue >
    currentRunningArray[currentColumnIndex].barInputValue
  ) {
    swap(currentRunningArray, currentRowIndex, currentColumnIndex);
    console.log(currentRunningArray);
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
