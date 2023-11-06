import React from "react";
import { useTable } from "react-table";

function Table({ columns, data, onRowClick }: any) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      className="w-full sm:border-[1px] sm:border-[#2C2C2C] sm:rounded-lg sm:border-separate"
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="text-center align-middle pb-6 text-[#7f7f7f] text-sm sm:py-3"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className="cursor-pointer hover:bg-gray-900 hover:transition-all hover:duration-100"
              onClick={() => onRowClick(row.original.id as any)}
            >
              {row.cells.map((cell: any) => (
                <td
                  {...cell.getCellProps()}
                  className="text-center align-middle w-10 "
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
