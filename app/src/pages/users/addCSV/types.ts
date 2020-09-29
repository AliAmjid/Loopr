export interface AddCSVState {
  uploadNext: boolean;
  fileData: { data: string[] }[];
  setUploadNext: (active: boolean) => void;
  setFileData: (data: string[]) => void;
}
