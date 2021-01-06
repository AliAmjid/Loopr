const routes = {
  login: {
    index: '/login',
  },
  dashboard: {
    index: '/dashboard',
  },
  users: {
    index: '/users',
    addManual: '/users/addManual',
    addCSV: '/users/addCSV',
    userDetail: '/users/userDetail',
  },
  acl: {
    index: '/acl',
    editRole: '/acl/editRole',
  },
  profile: {
    index: '/profile',
  },
  groups: {
    index: '/groups',
  },
  classGroups: {
    index: '/classGroups',
  },
  subjects: {
    index: '/subjects',
    editSubject: '/subjects/editSubject',
    addSubject: '/subjects/addSubject',
  },
  schoolPeriods: {
    index: '/schoolPeriods',
  },
  teacherSubjects: {
    index: '/teacherSubjects',
    subject: {
      points: '/teacherSubjects/subject/pointSystem',
    },
  },
  studentSubjects: {
    index: '/studentSubjects',
  },
};

export default routes;
