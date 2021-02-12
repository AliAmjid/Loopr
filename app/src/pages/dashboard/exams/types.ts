interface Exam {
  name: string;
  writtenAt: string;
  pointSystem: {
    maxPoints: number;
    points:
      | ({
          edges:
            | ({
                node: {
                  points: number;
                  examWritten: boolean;
                  user: {
                    id: string;
                  };
                } | null;
              } | null)[]
            | null;
        } | null)
      | null;
  } | null;
  subject: {
    evaluationSystem: string;
    percentsToMarkConvert: {
      one: number;
      two: number;
      three: number;
      four: number;
    } | null;
    subjectType: {
      id: string;
      name: string;
    } | null;
  } | null;
}

export type Exams = Exam[];

interface User {
  id: string;
}

export interface ExamsProps {
  exams: Exams;
  user: User;
  loading: boolean;
}

export interface PointSystemProps {
  exam: Exam;
  user: User;
}
