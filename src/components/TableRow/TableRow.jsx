import React from "react";
import styles from "./TableRow.module.css";

export const TableRow = ({ row, rowName, minCell }) => {
  return (
    <>
      <tr>
        <th className={styles.rowHeaderCell}>{rowName}</th>
        {row.map((cellValue, i) => (
          <td
            key={`key_${i}`}
            className={
              minCell === i
                ? `${styles.defaultDataCell} ${styles.minValueCell}`
                : styles.defaultDataCell
            }
          >
            {cellValue ? cellValue.toFixed(2) : "NoData"}
          </td>
        ))}
      </tr>
    </>
  );
};
