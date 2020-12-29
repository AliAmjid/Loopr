import { Query } from 'material-table';

export interface Teacher {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

type Teachers = Teacher[];

export type TeacherGetReturn = Promise<{
  totalCount: number;
  teachers: Teachers;
}>;

export type TeacherGetArgs = Query<Teacher>;

export interface TeacherProps {
  selectedTeacher: string | undefined;
  onTeacherGet: (query: TeacherGetArgs) => TeacherGetReturn;
  onSelect: (teacher: string) => void;
}
