export interface Row {
  role: string;
  email: string;
  name: string;
  tableData?: {
    id: number;
  };
  error?: boolean;
}
export type Rows = Row[];
export interface UserUploadProps {
  rows: Rows;
  loading: boolean;
  onSelectedChange: (selected: Rows) => void;
  onSubmit: () => void;
}
