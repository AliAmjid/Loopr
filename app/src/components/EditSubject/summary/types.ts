export interface SummaryProps {
  loading: boolean;
  classGroup: boolean;
  submitButtonLabel: string;
  teacher?: {
    firstname: string;
    lastname: string;
  } | null;
  group?: {
    year?: number;
    section: string;
  } | null;
  onSubmit: () => void;
}

export interface SummaryIndexProps {
  submitButtonLabel: string;
  onSubmit: () => Promise<void>;
}
