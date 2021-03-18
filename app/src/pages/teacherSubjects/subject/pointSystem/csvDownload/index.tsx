import React from 'react';

import { Button } from '@material-ui/core';
import { CSVDownloader, jsonToCSV } from 'react-papaparse';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { CSVDownloadIndexProps } from './types';

const CSVDownload: React.FC<CSVDownloadIndexProps> = props => {
  const { t } = useTranslation(
    namespaces.pages.teacherSubjects.subject.pointSystem,
  );

  const jsonData: string[][] = [];

  const header = [
    t('common:gqlObjects.user.firstname'),
    t('common:gqlObjects.user.lastname'),
  ];
  props.exams.forEach(exam => {
    header.push(`${exam.name}\n${exam.writtenAt}\n${exam.maxPoints}`);
  });
  header.push(
    ...[
      `${t('common:gqlObjects.point.points.nominative')}\n(${props.maxPoints})`,
      t('common:gqlObjects.point.percents'),
      t('common:gqlObjects.point.mark'),
    ],
  );

  jsonData.push(header);

  props.students.forEach(student => {
    const exams = student.exams.map(exam => `${exam.points}\n${exam.percents}`);
    jsonData.push([
      student.firstname,
      student.lastname,
      ...exams,
      `${student.totalPoints}`,
      student.totalPercents,
      `${student.totalMark}`,
    ]);
  });
  const CSVData = jsonToCSV(jsonData, { delimiter: ';' });

  return (
    <CSVDownloader
      data={CSVData}
      style={{ display: 'flex' }}
      filename={props.subjectTitle}
    >
      <Button color="primary">{t('common:actions.download')}</Button>
    </CSVDownloader>
  );
};

export default CSVDownload;
