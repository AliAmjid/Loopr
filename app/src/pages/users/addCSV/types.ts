export type FileData = { data: string[] }[];

export interface AddCSVState {
  uploadCSVNext: boolean;
  fieldSelectNext: boolean;
  fileData: FileData;
  fields: ('name' | 'email' | 'role' | '__nothing__')[];
  setUploadNext: (active: boolean) => void;
  setFieldSelectNext: (active: boolean) => void;
  setFields: (fields: string[]) => void;
  setFileData: (data: FileData) => void;
}
