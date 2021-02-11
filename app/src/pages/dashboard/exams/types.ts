export interface Exam {
  name: string;
  writtenAt: string;
  pointSystem: {
    maxPoints: number;
    points:
      | ({
          edges:
            | ({
                node: {
                  user: {
                    id: string;
                  };
                  points: number;
                } | null;
              } | null)[]
            | null;
        } | null)
      | null;
  } | null;
  subject: {
    evaluationSystem: string;
    subjectType: {
      id: string;
      name: string;
    } | null;
  } | null;
}

export type Exams = Exam[];

export interface ExamsProps {
  exams: Exams;
  loading: boolean;
}

export interface PointSystemProps {
  exam: Exam;
}
