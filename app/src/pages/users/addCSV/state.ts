import create from 'zustand';

import { AddCSVState } from './types';

const useAddCSVState = create<AddCSVState>(set => ({
  uploadNext: false,
  fileData: [],
  setUploadNext: (active: boolean) => set({ uploadNext: active }),
  setFileData: (data: string[]) => set({ fileData: data }),
}));

export default useAddCSVState;
