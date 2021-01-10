import React from 'react';

import {
  Box,
  Button,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { bottomShadow } from 'components/shadows';
import SideDialog from 'components/SideDialog';

import { EditProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  header: { ...bottomShadow },
  headerInfo: {
    [theme.breakpoints.up('sm')]: {
      minWidth: 300,
    },
  },
  headerActions: {
    width: '100%',
  },
}));

const Edit: React.FC<EditProps> = props => {
  const classes = useStyles();
  const { t } = useTranslation(
    namespaces.pages.teacherSubjects.subject.pointSystem,
  );

  return (
    <SideDialog open={props.open} loading={props.loading}>
      <Box p={2} display="flex" alignItems="center" className={classes.header}>
        <Box display="flex" alignItems="center" className={classes.headerInfo}>
          <Box>
            <Typography variant="h5">{props.exam.name}</Typography>
            <Typography>
              {`${props.exam.maxPoints} ${t(
                'common:gqlObjects.point.points.accusative',
              )}`}
            </Typography>
            <Typography>{props.exam.writtenAt}</Typography>
          </Box>
          <Box pl={4} display="flex">
            <IconButton color="primary" onClick={props.onExamInfoEdit}>
              <EditIcon />
            </IconButton>
            <Box pl={1}>
              <IconButton color="primary" onClick={props.onDelete}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box
          className={classes.headerActions}
          display="flex"
          justifyContent="flex-end"
        >
          <Button color="primary" onClick={props.onCancel}>
            {t('common:actions.cancel')}
          </Button>
          <Box pl={2}>
            <Button
              color="primary"
              variant="contained"
              onClick={props.onSubmit}
            >
              {t('common:actions.save')}
            </Button>
          </Box>
        </Box>
      </Box>
      <Box pt={2}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width={250}>
                {t('common:gqlObjects.user.firstname')}
              </TableCell>
              <TableCell width={250}>
                {t('common:gqlObjects.user.lastname')}
              </TableCell>
              <TableCell />
              <TableCell width={100}>
                {t('common:gqlObjects.point.points.nominative')}
              </TableCell>
              <TableCell width={100}>
                {t('common:gqlObjects.point.percents')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.students?.map(student => {
              return (
                <TableRow key={student.id}>
                  <TableCell>{student.firstname}</TableCell>
                  <TableCell>{student.lastname}</TableCell>
                  <TableCell />
                  <TableCell>
                    <TextField
                      value={student.pointsValue}
                      error={student.pointsError}
                      color={student.pointsWarning ? 'secondary' : 'primary'}
                      onChange={e =>
                        props.onStudentExamChange({
                          studentId: student.id,
                          points: e.target.value,
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      disabled={props.exam.maxPoints === 0}
                      value={student.percentsValue}
                      error={student.percentsError}
                      color={student.percentsWarning ? 'secondary' : 'primary'}
                      onChange={e =>
                        props.onStudentExamChange({
                          studentId: student.id,
                          percents: e.target.value,
                        })
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </SideDialog>
  );
};

export default Edit;
