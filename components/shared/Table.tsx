"use client";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

/* ---------------------------------- */
/* Column type                         */
/* ---------------------------------- */

export interface Column<T> {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  format?: (value: number) => string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

/* ---------------------------------- */
/* Props                               */
/* ---------------------------------- */

interface TableComponentProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: keyof T;
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  actions?: (row: T) => React.ReactNode;
}

/* ---------------------------------- */
/* Component                           */
/* ---------------------------------- */

const TableComponent = <T,>({
  columns,
  rows,
  rowKey,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  actions,
}: TableComponentProps<T>) => {
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={String(column.id)} align={column.align}>
                  {column.label}
                </TableCell>
              ))}

              {actions && <TableCell align="center">Actions</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover key={String(row[rowKey])}>
                  {columns.map((column) => {
                    const value = row[column.id];

                    let content: React.ReactNode;

                    if (column.render) {
                      content = column.render(value, row);
                    } else if (column.format && typeof value === "number") {
                      content = column.format(value);
                    } else {
                      content = String(value);
                    }

                    return (
                      <TableCell
                        key={String(column.id)}
                        align={column.align}
                        className="whitespace-nowrap"
                      >
                        {content}
                      </TableCell>
                    );
                  })}

                  {actions && (
                    <TableCell align="center">{actions(row)}</TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableComponent;
