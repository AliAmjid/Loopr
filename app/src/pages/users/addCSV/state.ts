import create from 'zustand';

import { AddCSVState, FileData } from './types';

const useAddCSVState = create<AddCSVState>(set => ({
  uploadCSVNext: false,
  fieldSelectNext: false,
  fileData: [],
  fields: [],
  setUploadNext: (active: boolean) => set({ uploadCSVNext: active }),
  setFieldSelectNext: (active: boolean) => set({ fieldSelectNext: active }),
  setFileData: (data: FileData) => set({ fileData: data }),
  setFields: (fields: string[]) => set({ fields }),
}));

export default useAddCSVState;
