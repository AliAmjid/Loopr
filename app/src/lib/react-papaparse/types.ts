export interface CSVReaderProps {
  onDrop?: (data: any, file?: any) => void;
  onFileLoad?: (data: any, file?: any) => void;
  onError?: (err: any, file: any, inputElem: any, reason: any) => void;
  config?: any;
  style?: any;
  noClick?: boolean;
  noDrag?: boolean;
  progressBarColor?: string;
  addRemoveButton?: boolean;
  onRemoveFile?: (data: any) => void;
  noProgressBar?: boolean;
  removeButtonColor?: string;
  isReset?: boolean;
}
