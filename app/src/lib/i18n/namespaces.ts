export default {
  pages: {
    login: 'P_login',
    acl: {
      index: 'P_acl_index',
      editRole: 'P_acl_editRole',
    },
    users: {
      index: 'P_users_index',
      addCSV: 'P_users_addCSV',
      userDetail: 'P_users_userDetail',
    },
    profile: {
      index: 'P_profile_index',
    },
    classGroups: {
      index: 'P_classGroups_index',
    },
    groups: {
      index: 'P_groups_index',
    },
    subjects: {
      index: 'P_subjects_index',
      editSubject: 'P_subjects_editSubject',
      addSubject: 'P_subjects_addSubject',
    },
    teacherSubjects: {
      index: 'P_teacherSubjects_index',
      subject: {
        pointSystem: 'P_teacherSubjects_subject_pointSystem',
      },
    },
    studentSubjects: {
      index: 'P_studentSubjects_index',
    },
  },
  components: {
    withPage: 'C_withPage',
    LanguageSelect: 'C_LanguageSelect',
    Help: 'C_Help',
    UserImportTable: 'C_UserImportTable',
    Stepper: 'C_Stepper',
    EditableListItem: 'C_EditableListItem',
    EditSubject: 'C_EditSubject',
  },
  other: {
    pages: 'O_pages',
  },
  lib: {
    materialTable: 'L_materialTable',
  },
};
