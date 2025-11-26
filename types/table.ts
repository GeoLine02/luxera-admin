export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface CustomAction<T> {
  label: string;
  icon: React.ReactNode;
  onClick: (row: T) => void;
}
