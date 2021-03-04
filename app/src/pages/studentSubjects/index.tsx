import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';

import {
  StudentSubjectsLearnedSubjectsQuery,
  StudentSubjectsLearnedSubjectsQueryVariables,
} from 'types/graphql';

import withPage from 'components/withPage';

import STUDENT_SUBJECTS_LEARNED_SUBJECTS_QUERY from './queries/learnedSubjects';
import studentSubjectsPageOptions from './pageOptions';
import StudentSubjects from './studentSubjects';
import { SchoolPeriods, Subject, Subjects } from './types';

const StudentSubjectIndex: React.FC = () => {
  const [selectedSchoolPeriods, setSelectedSchoolPeriods] = useState<string[]>(
    [],
  );
  const {
    data: learnedSubjectsData,
    loading: learnedSubjectsLoading,
  } = useQuery<
    StudentSubjectsLearnedSubjectsQuery,
    StudentSubjectsLearnedSubjectsQueryVariables
  >(STUDENT_SUBJECTS_LEARNED_SUBJECTS_QUERY, {
    variables: {
      schoolPeriodsIterable:
        selectedSchoolPeriods.length > 0 ? selectedSchoolPeriods : undefined,
    },
  });

  const subjects: Subjects = [];
  let maxExams = 0;
  learnedSubjectsData?.learnedSubjects?.edges?.forEach(subjectEdge => {
    const subject: Subject = {
      id: '',
      subjectType: '',
      evaluationSystem: '',
      percentsToMarkConvert: { id: '', one: 0, two: 0, three: 0, four: 0 },
      exams: [],
    };
    const subjectNode = subjectEdge?.node;
    if (subjectNode) {
      subject.percentsToMarkConvert = subjectNode.percentsToMarkConvert;
      subject.subjectType = subjectNode.subjectType?.name || '';
      subject.evaluationSystem = subjectNode.evaluationSystem;

      if (subjectNode.exams?.edges?.length) {
        if (maxExams < subjectNode.exams.edges.length) {
          maxExams = subjectNode.exams.edges.length;
        }
      }

      subjectNode.exams?.edges?.forEach(examEdge => {
        const examNode = examEdge?.node;
        if (examNode) {
          examNode.pointSystem?.points?.edges?.forEach(pointsEdge => {
            const pointsNode = pointsEdge?.node;
            if (
              pointsNode &&
              pointsNode.user.id === learnedSubjectsData?.meUser?.id
            ) {
              subject.exams.push({
                id: examNode.id,
                name: examNode.name,
                writtenAt: examNode.writtenAt,
                pointSystem: {
                  points: pointsNode.points,
                  maxPoints: examNode.pointSystem?.maxPoints || 0,
                  examWritten: pointsNode.examWritten,
                  average: examNode.pointSystem?.average || 0,
                  percentil: pointsNode.percentil,
                  worstThan: pointsNode.worstThan,
                },
              });
            }
          });
        }
      });
      subjects.push(subject);
    }
  });

  const schoolPeriods: SchoolPeriods = [];
  learnedSubjectsData?.schoolPeriods?.edges?.forEach(schoolPeriodEdge => {
    if (schoolPeriodEdge?.node) {
      schoolPeriods.push({
        ...schoolPeriodEdge.node,
        id: schoolPeriodEdge.node._id,
      });
    }
  });

  useEffect(() => {
    if (
      learnedSubjectsData?.getCurrentHalfYearSchoolPeriods &&
      selectedSchoolPeriods.length === 0
    ) {
      setSelectedSchoolPeriods(
        learnedSubjectsData?.getCurrentHalfYearSchoolPeriods
          ?.filter(sp => sp?._id)
          .map(sp => sp!._id),
      );
    }
  }, [
    selectedSchoolPeriods,
    learnedSubjectsData?.getCurrentHalfYearSchoolPeriods,
  ]);

  return (
    <StudentSubjects
      subjects={subjects}
      maxExams={maxExams}
      schoolPeriods={schoolPeriods}
      selectedSchoolPeriods={selectedSchoolPeriods}
      loading={learnedSubjectsLoading}
      onSchoolPeriodsChange={schoolPeriods => {
        setSelectedSchoolPeriods(schoolPeriods);
      }}
    />
  );
};

export default withPage(studentSubjectsPageOptions)(StudentSubjectIndex);
