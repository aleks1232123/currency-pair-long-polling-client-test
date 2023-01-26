import React from "react";
import { TableRow } from "../TableRow/TableRow";
import { getTableDataArrays } from "../../utils/getTableDataArrays";
import { ROW_NAMES } from "../../constants";
import styles from "./Table.module.css";

export const Table = ({ data }) => {
  const { tableRowsArr, minCellInARow } = getTableDataArrays(data);

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headerCell} colSpan="4">
              CURRENCY MARKET RATES
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className={styles.headerCell}>Pair Name/Market</th>
            <th className={styles.headerCell}>First</th>
            <th className={styles.headerCell}>Second</th>
            <th className={styles.headerCell}>Third</th>
          </tr>
          {tableRowsArr.map((row, i) => (
            <TableRow
              key={`row_${i}`}
              row={row}
              rowName={ROW_NAMES[i]}
              minCell={minCellInARow[i]}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
