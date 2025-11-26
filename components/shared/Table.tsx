"use client";

import { MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import { useState, ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => ReactNode;
}

export interface CustomAction<T> {
  label: string;
  icon: ReactNode;
  onClick: (row: T) => void;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onView?: (row: T) => void;
  customActions?: CustomAction<T>[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Table<T extends Record<string, any>>({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  customActions,
}: TableProps<T>) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
    <div className="w-full flex-1 overflow-hidden rounded-lg bg-slate-800 border border-slate-700 shadow-md">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="overflow-x-auto border-b border-slate-700">
          <table className="w-full table-fixed">
            <thead className="bg-slate-700">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto overflow-x-auto">
          <table className="w-full table-fixed">
            <tbody className="divide-y divide-slate-700">
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-slate-700/40 transition-colors"
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-slate-200"
                    >
                      {column.render
                        ? column.render(row[column.accessor], row)
                        : String(row[column.accessor])}
                    </td>
                  ))}

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    <button
                      onClick={() => toggleMenu(rowIndex)}
                      className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-full hover:bg-slate-700"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openMenuIndex === rowIndex && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuIndex(null)}
                        />
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-slate-700 ring-1 ring-black ring-opacity-30 z-20">
                          <div className="py-1">
                            {customActions ? (
                              customActions.map((action, index) => (
                                <button
                                  key={index}
                                  onClick={() => {
                                    action.onClick(row);
                                    setOpenMenuIndex(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-600 flex items-center gap-3"
                                >
                                  {action.icon}
                                  {action.label}
                                </button>
                              ))
                            ) : (
                              <>
                                {onView && (
                                  <button
                                    onClick={() => {
                                      onView(row);
                                      setOpenMenuIndex(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-600 flex items-center gap-3"
                                  >
                                    <Eye size={16} />
                                    View
                                  </button>
                                )}
                                {onEdit && (
                                  <button
                                    onClick={() => {
                                      onEdit(row);
                                      setOpenMenuIndex(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-600 flex items-center gap-3"
                                  >
                                    <Edit size={16} />
                                    Edit
                                  </button>
                                )}
                                {onDelete && (
                                  <button
                                    onClick={() => {
                                      onDelete(row);
                                      setOpenMenuIndex(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 flex items-center gap-3"
                                  >
                                    <Trash2 size={16} />
                                    Delete
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
