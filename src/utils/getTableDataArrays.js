export const getTableDataArrays = (state) => {
  // по идее нужна проверка на соответствие порядка данных в объекте порядку данных в массиве
  // т.к. Object.values() не гарантирует порядок
  const tableColumnsArr = state.map((source) => Object.values(source)); // данные в виде массива колонок
  tableColumnsArr.forEach((source) => {
    source.push(
      source[0] / source[1],
      source[0] / source[2],
      source[2] / source[1]
    );
  });

  const tableRowsArr = []; //данные в виде массива строк
  for (let i = 0; i < tableColumnsArr[0].length; i++) {
    const tableRow = [];
    tableColumnsArr.forEach((arr) => tableRow.push(arr[i]));
    tableRowsArr.push(tableRow);
  }

  const minCellInARow = []; //массив с индексом клетки с наименьшим значением для каждой строки
  tableRowsArr.forEach((row) =>
    minCellInARow.push(row.indexOf(Math.min(...row)))
  );

  return { tableColumnsArr, tableRowsArr, minCellInARow };
};
