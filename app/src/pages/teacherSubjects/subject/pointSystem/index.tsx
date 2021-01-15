import React, { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import PercentsToMarkDialogIndex from 'pages/teacherSubjects/subject/pointSystem/percentsToMarkDialog';

import {
  TeacherSubejctsSubjectPointSystemCreateExamMutation,
  TeacherSubejctsSubjectPointSystemCreateExamMutationVariables,
  TeacherSubjectsSubjectPointSystemSubjectQuery,
  TeacherSubjectsSubjectPointSystemSubjectQueryVariables,
} from 'types/graphql';

import { formatDateToDay } from 'components/formatDate';
import { getMark, getPercents } from 'components/percents';
import withPage from 'components/withPage';

import TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_CREATE_EXAM_MUTATION from './mutation/addExam';
import TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_SUBJECT_QUERY from './queries/subject';
import subjectPageOptions from './pageOptions';
import PointSystem from './pointSystem';
import { Exams, SchoolPeriods, Students } from './types';

const PointSystemIndex: React.FC = () => {
  const router = useRouter();
  const [selectedSchoolPeriods, setSelectedSchoolPeriods] = useState<string[]>(
    [],
  );
  const { data: subjectData, loading: subjectLoading } = useQuery<
    TeacherSubjectsSubjectPointSystemSubjectQuery,
    TeacherSubjectsSubjectPointSystemSubjectQueryVariables
  >(TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_SUBJECT_QUERY, {
    variables: {
      id: `${router.query.id}`,
      schoolPeriods:
        selectedSchoolPeriods.length > 0 ? selectedSchoolPeriods : undefined,
    },
  });
  const [createExam, { loading: createExamLoading }] = useMutation<
    TeacherSubejctsSubjectPointSystemCreateExamMutation,
    TeacherSubejctsSubjectPointSystemCreateExamMutationVariables
  >(TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_CREATE_EXAM_MUTATION, {
    refetchQueries: ['TeacherSubjectsSubjectPointSystemSubjectQuery'],
    awaitRefetchQueries: true,
  });
  const [percentsToMarkOpen, setPercentsToMarkOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(
    namespaces.pages.teacherSubjects.subject.pointSystem,
  );

  const examCreateHandler = (): void => {
    createExam({
      variables: {
        input: {
          name: t('newTest'),
          subject: `${router.query.id}`,
          writtenAt: dayjs().toISOString(),
        },
      },
    }).then(() => {
      enqueueSnackbar(t('snackbars.createExam.success'), {
        variant: 'success',
      });
    });
  };

  const exams: Exams = [];

  let students: Students = [];
  // Set students basic info
  if (subjectData?.subject?.classGroup?.users?.edges) {
    for (const groupUser of subjectData.subject.classGroup.users.edges) {
      if (groupUser?.node) {
        students.push({
          id: groupUser.node.id,
          firstname: groupUser.node.firstname,
          lastname: groupUser.node.lastname,
          exams: [],
          totalPoints: 0,
          totalPercents: '',
          totalMark: 0,
        });
      }
    }
  } else if (subjectData?.subject?.group?.users?.edges) {
    for (const groupUser of subjectData.subject.group.users.edges) {
      if (groupUser?.node) {
        students.push({
          id: groupUser.node.id,
          firstname: groupUser.node.firstname,
          lastname: groupUser.node.lastname,
          exams: [],
          totalPoints: 0,
          totalPercents: '',
          totalMark: 0,
        });
      }
    }
  }

  let maxPoints = 0;

  let sortedExams = subjectData?.subject?.exams?.edges;
  if (subjectData?.subject?.exams?.edges) {
    sortedExams = [...(subjectData?.subject?.exams?.edges || [])].sort(
      (edge1, edge2) => {
        const written1 = dayjs(edge1?.node?.writtenAt);
        const written2 = dayjs(edge2?.node?.writtenAt);

        if (written2.isBefore(written1)) {
          return 1;
        }
        if (written1.isBefore(written2)) {
          return -1;
        }

        return 0;
      },
    );
  }

  // Set exams and studentExams
  for (const exam of sortedExams || []) {
    const examNode = exam?.node;
    if (examNode) {
      maxPoints += examNode.pointSystem?.maxPoints || 0;
      exams.push({
        id: examNode.id,
        name: examNode.name,
        maxPoints: examNode.pointSystem?.maxPoints || 0,
        writtenAt: examNode.writtenAt,
      });

      const examPoints: {
        user: { id: string };
        points: number;
        examWritten: boolean;
      }[] = [];

      examNode.pointSystem?.points?.edges?.forEach(point => {
        if (point?.node) {
          examPoints.push(point.node);
        }
      });

      students.forEach(student => {
        const studentExam = examPoints.find(
          examPoint => examPoint.user.id === student.id,
        );
        student.exams.push({
          id: examNode.id,
          points: studentExam?.points || 0,
          examWritten: studentExam?.examWritten || false,
          maxPoints: examNode?.pointSystem?.maxPoints || 0,
        });
      });
    }
  }

  // Set total values
  students = students.map(student => {
    let totalPoints = 0;
    student.exams.forEach(exam => {
      if (exam.examWritten) {
        totalPoints += exam.points;
      }
    });

    let totalPercents = '-';
    let numberTotalPercents = 0;
    if (maxPoints !== 0) {
      numberTotalPercents = getPercents({ max: maxPoints, value: totalPoints });
      totalPercents = `${numberTotalPercents}%`;
    }

    let totalMark = 5;
    if (subjectData?.subject?.percentsToMarkConvert)
      totalMark = getMark({
        percents: numberTotalPercents,
        percentsToMarkConvert: subjectData?.subject?.percentsToMarkConvert,
      });

    return { ...student, totalPoints, totalPercents, totalMark };
  });

  let subjectTitle = `${subjectData?.subject?.subjectType?.name} - `;
  if (subjectData?.subject?.group) {
    subjectTitle += subjectData.subject.group.section;
  }
  if (subjectData?.subject?.classGroup) {
    subjectTitle += `${subjectData.subject.classGroup.year} ${subjectData.subject.classGroup.section}`;
  }

  const schoolPeriods: SchoolPeriods = [];
  subjectData?.schoolPeriods?.edges?.forEach(schoolPeriodEdge => {
    if (schoolPeriodEdge?.node) schoolPeriods.push(schoolPeriodEdge.node);
  });

  return (
    <>
      <PercentsToMarkDialogIndex
        open={percentsToMarkOpen}
        percentsToMarkConvert={
          subjectData?.subject?.percentsToMarkConvert || {
            id: '',
            one: 0,
            two: 0,
            three: 0,
            four: 0,
          }
        }
        onClose={() => setPercentsToMarkOpen(false)}
      />
      <PointSystem
        loading={subjectLoading || createExamLoading}
        exams={exams}
        students={students}
        maxPoints={maxPoints}
        subjectTitle={subjectTitle}
        schoolPeriods={schoolPeriods}
        selectedSchoolPeriods={selectedSchoolPeriods}
        onSchoolPeriodsChange={schoolPeriods =>
          setSelectedSchoolPeriods(schoolPeriods)
        }
        onExamCreate={examCreateHandler}
        onPercentsToMarkEdit={() => setPercentsToMarkOpen(true)}
      />
    </>
  );
};

export default withPage(subjectPageOptions)(PointSystemIndex);
