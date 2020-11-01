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
    },
  },
  components: {
    withPage: 'C_withPage',
    LanguageSelect: 'C_LanguageSelect',
    Help: 'C_Help',
    UserImportTable: 'C_UserImportTable',
    Stepper: 'C_Stepper',
  },
  other: {
    pages: 'O_pages',
  },
  lib: {
    materialTable: 'L_materialTable',
  },
};
