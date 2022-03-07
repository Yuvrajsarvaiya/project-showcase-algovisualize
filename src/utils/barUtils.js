import { getRandomColor } from ".";

export function constructBarData(
  arrayValues,
  initialRowIndex,
  initialColumnIndex
) {
  const copiedArrayValues = [...arrayValues];

  const barInfo = {
    barData: [],
    currentRowIndex: initialRowIndex,
    currentColumnIndex: initialColumnIndex,
    currentPair: [0, 1],
  };
  for (let index = 0; index < copiedArrayValues?.length; index++) {
    barInfo.barData.push({
      barColor: getRandomColor(),
      barInputValue: arrayValues[index],
    });
  }
  return barInfo;
}
