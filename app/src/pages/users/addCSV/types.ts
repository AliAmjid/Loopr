export type FileData = { data: string[] }[];

export type FieldType =
  | 'firstname'
  | 'lastname'
  | 'email'
  | 'role'
  | '__nothing__';

export interface AddCSVState {
  uploadCSVNext: boolean;
  fieldSelectNext: boolean;
  fileData: FileData;
  fields: FieldType[];
  setUploadNext: (active: boolean) => void;
  setFieldSelectNext: (active: boolean) => void;
  setFields: (fields: FieldType[]) => void;
  setFileData: (data: FileData) => void;
}
