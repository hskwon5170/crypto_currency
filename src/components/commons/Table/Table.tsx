import React from "react";
import { useTable } from "react-table";
import { useDarkModeStore } from "../ZustandStore/ZustandStore";

function Table({ columns, data, onRowClick }: any) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  const { dark } = useDarkModeStore();

  const buttonClasses = `${
    dark ? "hover:bg-black" : "hover:bg-gray-200"
  } cursor-pointer hover:duration-100 hover:transition-all`;

  return (
    <table
      {...getTableProps()}
      className={`w-full sm:border-[1px] mb-20  ${
        dark ? "bg-[#1e1e1e]" : "bg-gray-100"
      } rounded-lg sm:border-[#2C2C2C] sm:rounded-lg sm:border-separate sm:pl-5 duration-200 shadow-2xl`}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="text-center align-middle py-6 text-[#7f7f7f] text-sm sm:py-3"
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
              className={buttonClasses}
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
