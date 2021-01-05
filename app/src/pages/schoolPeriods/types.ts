import { Query } from 'material-table';

export interface SchoolPeriod {
  id: string;
  from: string;
  to: string;
  quarter: number;
  schoolYear: number;
}

export interface GetSchoolPeriodsReturn {
  schoolPeriods: SchoolPeriod[];
  totalCount: number;
}

export interface SchoolPeriodsProps {
  getSchoolPeriods: (
    query: Query<SchoolPeriod>,
  ) => Promise<GetSchoolPeriodsReturn>;
  onDelete: (id: string) => void;
}
