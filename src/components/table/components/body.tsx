import React, { FC } from "react";
import { BodyProps } from "../type";
import { Column } from "@/services/type";

const Body: FC<BodyProps> = ({ data, columns, actions, showFooter }) => {
  const renderCellContent = (column: Column<unknown>, row: unknown) => {
    return <>{column.filed(row)}</>;
  };

  const renderCell = (column: Column<unknown>, row: unknown, index: number) => {
    const style =
      column.styled && typeof column.styled === "function"
        ? column.styled(row)
        : column.styled || {};

    return (
      <td
        className={
          column.classes && typeof column.classes === "function"
            ? column.classes(row)
            : column.classes || ""
        }
        style={style}
        key={index}
      >
        {renderCellContent(column, row)}
      </td>
    );
  };

  const renderRow = (row: unknown, rowIndex: number) => (
    <tr key={rowIndex} className="hover">
      {columns.map((column, columnIndex) =>
        renderCell(column, row, columnIndex)
      )}
      {actions && actions.length && (
        <th className="flex items-center justify-center">
          {actions.map((action) => (
            <button
              key={action.name}
              className="ml-2"
              onClick={() => action.handler(row)}
            >
              {action.icon}
            </button>
          ))}
        </th>
      )}
    </tr>
  );

  return (
    <>
      <tbody>{data.map((row, rowIndex) => renderRow(row, rowIndex))}</tbody>
      {showFooter && (
        <tfoot>
          <tr>
            {columns.map((column) => (
              <th key={column.name}>{column.label}</th>
            ))}
          </tr>
        </tfoot>
      )}
    </>
  );
};

export default Body;
