export interface SummaryProps {
  loading: boolean;
  classGroup: boolean;
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
