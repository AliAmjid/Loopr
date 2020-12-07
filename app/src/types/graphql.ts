/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserImportTableCreateUserMutation
// ====================================================

export interface UserImportTableCreateUserMutation_createUser_user {
  __typename: "User";
  id: string;
}

export interface UserImportTableCreateUserMutation_createUser {
  __typename: "createUserPayload";
  user: UserImportTableCreateUserMutation_createUser_user | null;
}

export interface UserImportTableCreateUserMutation {
  /**
   * Creates a User.
   */
  createUser: UserImportTableCreateUserMutation_createUser | null;
}

export interface UserImportTableCreateUserMutationVariables {
  input: createUserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserImportTableAclRolesQuery
// ====================================================

export interface UserImportTableAclRolesQuery_aclRoles {
  __typename: "AclRole";
  id: string;
  /**
   * Example format: ROLE_ADMIN.
   * Must start with 'ROLE_' and name cant be longer than 20 letters.
   * (regex: ^ROLE_[A-Z]{1,20}$/m)
   */
  name: string;
}

export interface UserImportTableAclRolesQuery {
  aclRoles: (UserImportTableAclRolesQuery_aclRoles | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WithPageMeUserQuery
// ====================================================

export interface WithPageMeUserQuery_meUser_role_resources {
  __typename: "AclResource";
  name: string;
}

export interface WithPageMeUserQuery_meUser_role {
  __typename: "AclRole";
  /**
   * Example format: ROLE_ADMIN.
   * Must start with 'ROLE_' and name cant be longer than 20 letters.
   * (regex: ^ROLE_[A-Z]{1,20}$/m)
   */
  name: string;
  /**
   * Must be an array IRIs (acl_resources/<uuid>) of existing resources
   */
  resources: (WithPageMeUserQuery_meUser_role_resources | null)[] | null;
}

export interface WithPageMeUserQuery_meUser {
  __typename: "User";
  id: string;
  firstname: string;
  lastname: string;
  role: WithPageMeUserQuery_meUser_role;
}

export interface WithPageMeUserQuery {
  meUser: WithPageMeUserQuery_meUser | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AclEditRoleUpdateRole
// ====================================================

export interface AclEditRoleUpdateRole_updateAclRole_aclRole {
  __typename: "AclRole";
  id: string;
  /**
   * Example format: ROLE_ADMIN.
   * Must start with 'ROLE_' and name cant be longer than 20 letters.
   * (regex: ^ROLE_[A-Z]{1,20}$/m)
   */
  name: string;
}

export interface AclEditRoleUpdateRole_updateAclRole {
  __typename: "updateAclRolePayload";
  aclRole: AclEditRoleUpdateRole_updateAclRole_aclRole | null;
}

export interface AclEditRoleUpdateRole {
  /**
   * Updates a AclRole.
   */
  updateAclRole: AclEditRoleUpdateRole_updateAclRole | null;
}

export interface AclEditRoleUpdateRoleVariables {
  id: string;
  name?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AclEditRoleAclRole
// ====================================================

export interface AclEditRoleAclRole_aclRole {
  __typename: "AclRole";
  id: string;
  /**
   * Example format: ROLE_ADMIN.
   * Must start with 'ROLE_' and name cant be longer than 20 letters.
   * (regex: ^ROLE_[A-Z]{1,20}$/m)
   */
  name: string;
}

export interface AclEditRoleAclRole {
  aclRole: AclEditRoleAclRole_aclRole | null;
}

export interface AclEditRoleAclRoleVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AclCreateAclRole
// ====================================================

export interface AclCreateAclRole_createAclRole_aclRole_resources {
  __typename: "AclResource";
  id: string;
}

export interface AclCreateAclRole_createAclRole_aclRole {
  __typename: "AclRole";
  id: string;
  /**
   * Example format: ROLE_ADMIN.
   * Must start with 'ROLE_' and name cant be longer than 20 letters.
   * (regex: ^ROLE_[A-Z]{1,20}$/m)
   */
  name: string;
  /**
   * Must be an array IRIs (acl_resources/<uuid>) of existing resources
   */
  resources: (AclCreateAclRole_createAclRole_aclRole_resources | null)[] | null;
}

export interface AclCreateAclRole_createAclRole {
  __typename: "createAclRolePayload";
  aclRole: AclCreateAclRole_createAclRole_aclRole | null;
}

export interface AclCreateAclRole {
  /**
   * Creates a AclRole.
   */
  createAclRole: AclCreateAclRole_createAclRole | null;
}

export interface AclCreateAclRoleVariables {
  input: createAclRoleInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AclUpdateAclMutation
// ====================================================

export interface AclUpdateAclMutation_updateAclRole_aclRole_resources {
  __typename: "AclResource";
  id: string;
}

export interface AclUpdateAclMutation_updateAclRole_aclRole {
  __typename: "AclRole";
  id: string;
  /**
   * Must be an array IRIs (acl_resources/<uuid>) of existing resources
   */
  resources: (AclUpdateAclMutation_updateAclRole_aclRole_resources | null)[] | null;
}

export interface AclUpdateAclMutation_updateAclRole {
  __typename: "updateAclRolePayload";
  aclRole: AclUpdateAclMutation_updateAclRole_aclRole | null;
}

export interface AclUpdateAclMutation {
  /**
   * Updates a AclRole.
   */
  updateAclRole: AclUpdateAclMutation_updateAclRole | null;
}

export interface AclUpdateAclMutationVariables {
  input: updateAclRoleInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AclTableQuery
// ====================================================

export interface AclTableQuery_aclResources {
  __typename: "AclResource";
  id: string;
  name: string;
}

export interface AclTableQuery_aclRoles_resources {
  __typename: "AclResource";
  id: string;
}

export interface AclTableQuery_aclRoles {
  __typename: "AclRole";
  id: string;
  /**
   * Example format: ROLE_ADMIN.
   * Must start with 'ROLE_' and name cant be longer than 20 letters.
   * (regex: ^ROLE_[A-Z]{1,20}$/m)
   */
  name: string;
  /**
   * Must be an array IRIs (acl_resources/<uuid>) of existing resources
   */
  resources: (AclTableQuery_aclRoles_resources | null)[] | null;
}

export interface AclTableQuery {
  aclResources: (AclTableQuery_aclResources | null)[] | null;
  aclRoles: (AclTableQuery_aclRoles | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ClassGroupsAddClassGroupMutation
// ====================================================

export interface ClassGroupsAddClassGroupMutation_createClassGroup_classGroup {
  __typename: "ClassGroup";
  id: string;
}

export interface ClassGroupsAddClassGroupMutation_createClassGroup {
  __typename: "createClassGroupPayload";
  classGroup: ClassGroupsAddClassGroupMutation_createClassGroup_classGroup | null;
}

export interface ClassGroupsAddClassGroupMutation {
  /**
   * Creates a ClassGroup.
   */
  createClassGroup: ClassGroupsAddClassGroupMutation_createClassGroup | null;
}

export interface ClassGroupsAddClassGroupMutationVariables {
  input: createClassGroupInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ClassGroupsDeleteClassGroupMutation
// ====================================================

export interface ClassGroupsDeleteClassGroupMutation_deleteClassGroup_classGroup {
  __typename: "ClassGroup";
  id: string;
}

export interface ClassGroupsDeleteClassGroupMutation_deleteClassGroup {
  __typename: "deleteClassGroupPayload";
  classGroup: ClassGroupsDeleteClassGroupMutation_deleteClassGroup_classGroup | null;
}

export interface ClassGroupsDeleteClassGroupMutation {
  /**
   * Deletes a ClassGroup.
   */
  deleteClassGroup: ClassGroupsDeleteClassGroupMutation_deleteClassGroup | null;
}

export interface ClassGroupsDeleteClassGroupMutationVariables {
  input: deleteClassGroupInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ClassGroupsUpdateClassGroupMutation
// ====================================================

export interface ClassGroupsUpdateClassGroupMutation_updateClassGroup_classGroup_teacher {
  __typename: "User";
  id: string;
  /**
   * email of user
   */
  email: string;
  firstname: string;
  lastname: string;
}

export interface ClassGroupsUpdateClassGroupMutation_updateClassGroup_classGroup {
  __typename: "ClassGroup";
  id: string;
  year: number;
  section: string;
  /**
   * Teacher needs to be user with resource GROUP_TEACHER
   */
  teacher: ClassGroupsUpdateClassGroupMutation_updateClassGroup_classGroup_teacher | null;
}

export interface ClassGroupsUpdateClassGroupMutation_updateClassGroup {
  __typename: "updateClassGroupPayload";
  classGroup: ClassGroupsUpdateClassGroupMutation_updateClassGroup_classGroup | null;
}

export interface ClassGroupsUpdateClassGroupMutation {
  /**
   * Updates a ClassGroup.
   */
  updateClassGroup: ClassGroupsUpdateClassGroupMutation_updateClassGroup | null;
}

export interface ClassGroupsUpdateClassGroupMutationVariables {
  input: updateClassGroupInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClassGroupsClassGroupsQuery
// ====================================================

export interface ClassGroupsClassGroupsQuery_classGroups_edges_node {
  __typename: "ClassGroup";
  id: string;
  year: number;
  section: string;
}

export interface ClassGroupsClassGroupsQuery_classGroups_edges {
  __typename: "ClassGroupEdge";
  node: ClassGroupsClassGroupsQuery_classGroups_edges_node | null;
}

export interface ClassGroupsClassGroupsQuery_classGroups {
  __typename: "ClassGroupConnection";
  edges: (ClassGroupsClassGroupsQuery_classGroups_edges | null)[] | null;
}

export interface ClassGroupsClassGroupsQuery {
  classGroups: ClassGroupsClassGroupsQuery_classGroups | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClassGroupsClassGroupTeacher
// ====================================================

export interface ClassGroupsClassGroupTeacher_classGroup_teacher {
  __typename: "User";
  id: string;
  /**
   * email of user
   */
  email: string;
  firstname: string;
  lastname: string;
}

export interface ClassGroupsClassGroupTeacher_classGroup {
  __typename: "ClassGroup";
  /**
   * Teacher needs to be user with resource GROUP_TEACHER
   */
  teacher: ClassGroupsClassGroupTeacher_classGroup_teacher | null;
}

export interface ClassGroupsClassGroupTeacher {
  classGroup: ClassGroupsClassGroupTeacher_classGroup | null;
}

export interface ClassGroupsClassGroupTeacherVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClassGroupsClassGroupUsersQuery
// ====================================================

export interface ClassGroupsClassGroupUsersQuery_classGroup_users_edges_node {
  __typename: "User";
  id: string;
  /**
   * email of user
   */
  email: string;
  firstname: string;
  lastname: string;
}

export interface ClassGroupsClassGroupUsersQuery_classGroup_users_edges {
  __typename: "UserEdge";
  node: ClassGroupsClassGroupUsersQuery_classGroup_users_edges_node | null;
  cursor: string;
}

export interface ClassGroupsClassGroupUsersQuery_classGroup_users {
  __typename: "UserConnection";
  edges: (ClassGroupsClassGroupUsersQuery_classGroup_users_edges | null)[] | null;
  totalCount: number;
}

export interface ClassGroupsClassGroupUsersQuery_classGroup {
  __typename: "ClassGroup";
  id: string;
  users: ClassGroupsClassGroupUsersQuery_classGroup_users | null;
}

export interface ClassGroupsClassGroupUsersQuery {
  classGroup: ClassGroupsClassGroupUsersQuery_classGroup | null;
}

export interface ClassGroupsClassGroupUsersQueryVariables {
  id: string;
  usersFirst?: number | null;
  usersLast?: number | null;
  usersAfter?: string | null;
  usersBefore?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClassGroupsUsersQuery
// ====================================================

export interface ClassGroupsUsersQuery_users_edges_node {
  __typename: "User";
  id: string;
  /**
   * email of user
   */
  email: string;
  firstname: string;
  lastname: string;
}

export interface ClassGroupsUsersQuery_users_edges {
  __typename: "UserEdge";
  node: ClassGroupsUsersQuery_users_edges_node | null;
  cursor: string;
}

export interface ClassGroupsUsersQuery_users {
  __typename: "UserConnection";
  edges: (ClassGroupsUsersQuery_users_edges | null)[] | null;
  totalCount: number;
}

export interface ClassGroupsUsersQuery {
  users: ClassGroupsUsersQuery_users | null;
}

export interface ClassGroupsUsersQueryVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GroupsAddGroupMutation
// ====================================================

export interface GroupsAddGroupMutation_createGroup_group {
  __typename: "Group";
  id: string;
}

export interface GroupsAddGroupMutation_createGroup {
  __typename: "createGroupPayload";
  group: GroupsAddGroupMutation_createGroup_group | null;
}

export interface GroupsAddGroupMutation {
  /**
   * Creates a Group.
   */
  createGroup: GroupsAddGroupMutation_createGroup | null;
}

export interface GroupsAddGroupMutationVariables {
  input: createGroupInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GroupsDeleteMutation
// ====================================================

export interface GroupsDeleteMutation_deleteGroup_group {
  __typename: "Group";
  id: string;
}

export interface GroupsDeleteMutation_deleteGroup {
  __typename: "deleteGroupPayload";
  group: GroupsDeleteMutation_deleteGroup_group | null;
}

export interface GroupsDeleteMutation {
  /**
   * Deletes a Group.
   */
  deleteGroup: GroupsDeleteMutation_deleteGroup | null;
}

export interface GroupsDeleteMutationVariables {
  input: deleteGroupInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GroupsUpdateGroupMutation
// ====================================================

export interface GroupsUpdateGroupMutation_updateGroup_group {
  __typename: "Group";
  id: string;
  section: string;
}

export interface GroupsUpdateGroupMutation_updateGroup {
  __typename: "updateGroupPayload";
  group: GroupsUpdateGroupMutation_updateGroup_group | null;
}

export interface GroupsUpdateGroupMutation {
  /**
   * Updates a Group.
   */
  updateGroup: GroupsUpdateGroupMutation_updateGroup | null;
}

export interface GroupsUpdateGroupMutationVariables {
  input: updateGroupInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GroupsGroupQuery
// ====================================================

export interface GroupsGroupQuery_group_users_edges_node {
  __typename: "User";
  id: string;
  firstname: string;
  lastname: string;
}

export interface GroupsGroupQuery_group_users_edges {
  __typename: "UserEdge";
  node: GroupsGroupQuery_group_users_edges_node | null;
  cursor: string;
}

export interface GroupsGroupQuery_group_users {
  __typename: "UserConnection";
  edges: (GroupsGroupQuery_group_users_edges | null)[] | null;
  totalCount: number;
}

export interface GroupsGroupQuery_group {
  __typename: "Group";
  id: string;
  users: GroupsGroupQuery_group_users | null;
}

export interface GroupsGroupQuery {
  group: GroupsGroupQuery_group | null;
}

export interface GroupsGroupQueryVariables {
  id: string;
  usersFirst?: number | null;
  usersLast?: number | null;
  usersAfter?: string | null;
  usersBefore?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GroupsGroupsQuery
// ====================================================

export interface GroupsGroupsQuery_groups_edges_node {
  __typename: "Group";
  id: string;
  section: string;
}

export interface GroupsGroupsQuery_groups_edges {
  __typename: "GroupEdge";
  node: GroupsGroupsQuery_groups_edges_node | null;
}

export interface GroupsGroupsQuery_groups {
  __typename: "GroupConnection";
  edges: (GroupsGroupsQuery_groups_edges | null)[] | null;
}

export interface GroupsGroupsQuery {
  groups: GroupsGroupsQuery_groups | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GroupsUsersQuery
// ====================================================

export interface GroupsUsersQuery_users_edges_node {
  __typename: "User";
  id: string;
  firstname: string;
  lastname: string;
}

export interface GroupsUsersQuery_users_edges {
  __typename: "UserEdge";
  node: GroupsUsersQuery_users_edges_node | null;
  cursor: string;
}

export interface GroupsUsersQuery_users {
  __typename: "UserConnection";
  edges: (GroupsUsersQuery_users_edges | null)[] | null;
  totalCount: number;
}

export interface GroupsUsersQuery {
  users: GroupsUsersQuery_users | null;
}

export interface GroupsUsersQueryVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoginGetTokenQuery
// ====================================================

export interface LoginGetTokenQuery_getToken {
  __typename: "Token";
  /**
   * Use token in header like this: 'Authorization: Bearer {token}'
   */
  token: string;
}

export interface LoginGetTokenQuery {
  getToken: LoginGetTokenQuery_getToken | null;
}

export interface LoginGetTokenQueryVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoginMeUserQuery
// ====================================================

export interface LoginMeUserQuery_meUser {
  __typename: "User";
  id: string;
  firstname: string;
  lastname: string;
}

export interface LoginMeUserQuery {
  meUser: LoginMeUserQuery_meUser | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ProfileChangePassword
// ====================================================

export interface ProfileChangePassword_changePasswordUser_user {
  __typename: "User";
  id: string;
}

export interface ProfileChangePassword_changePasswordUser {
  __typename: "changePasswordUserPayload";
  user: ProfileChangePassword_changePasswordUser_user | null;
}

export interface ProfileChangePassword {
  /**
   * ChangePasswords a User.
   */
  changePasswordUser: ProfileChangePassword_changePasswordUser | null;
}

export interface ProfileChangePasswordVariables {
  input: changePasswordUserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProfileUserQuery
// ====================================================

export interface ProfileUserQuery_meUser_role {
  __typename: "AclRole";
  id: string;
  /**
   * Example format: ROLE_ADMIN.
   * Must start with 'ROLE_' and name cant be longer than 20 letters.
   * (regex: ^ROLE_[A-Z]{1,20}$/m)
   */
  name: string;
}

export interface ProfileUserQuery_meUser {
  __typename: "User";
  id: string;
  /**
   * email of user
   */
  email: string;
  firstname: string;
  lastname: string;
  role: ProfileUserQuery_meUser_role;
}

export interface ProfileUserQuery {
  meUser: ProfileUserQuery_meUser | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SubjectsAddSubjectAddMutation
// ====================================================

export interface SubjectsAddSubjectAddMutation_createSubject_subject {
  __typename: "Subject";
  id: string;
}

export interface SubjectsAddSubjectAddMutation_createSubject {
  __typename: "createSubjectPayload";
  subject: SubjectsAddSubjectAddMutation_createSubject_subject | null;
}

export interface SubjectsAddSubjectAddMutation {
  /**
   * Creates a Subject.
   */
  createSubject: SubjectsAddSubjectAddMutation_createSubject | null;
}

export interface SubjectsAddSubjectAddMutationVariables {
  input: createSubjectInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SubjectsAddSubjectClassGroupsQuery
// ====================================================

export interface SubjectsAddSubjectClassGroupsQuery_classGroups_edges_node_teacher {
  __typename: "User";
  id: string;
  firstname: string;
  lastname: string;
}

export interface SubjectsAddSubjectClassGroupsQuery_classGroups_edges_node {
  __typename: "ClassGroup";
  id: string;
  section: string;
  year: number;
  /**
   * Teacher needs to be user with resource GROUP_TEACHER
   */
  teacher: SubjectsAddSubjectClassGroupsQuery_classGroups_edges_node_teacher | null;
}

export interface SubjectsAddSubjectClassGroupsQuery_classGroups_edges {
  __typename: "ClassGroupEdge";
  node: SubjectsAddSubjectClassGroupsQuery_classGroups_edges_node | null;
  cursor: string;
}

export interface SubjectsAddSubjectClassGroupsQuery_classGroups {
  __typename: "ClassGroupConnection";
  edges: (SubjectsAddSubjectClassGroupsQuery_classGroups_edges | null)[] | null;
  totalCount: number;
}

export interface SubjectsAddSubjectClassGroupsQuery {
  classGroups: SubjectsAddSubjectClassGroupsQuery_classGroups | null;
}

export interface SubjectsAddSubjectClassGroupsQueryVariables {
  before?: string | null;
  after?: string | null;
  first?: number | null;
  last?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SubjectsAddSubjectGroupQuery
// ====================================================

export interface SubjectsAddSubjectGroupQuery_groups_edges_node {
  __typename: "Group";
  id: string;
  section: string;
}

export interface SubjectsAddSubjectGroupQuery_groups_edges {
  __typename: "GroupEdge";
  node: SubjectsAddSubjectGroupQuery_groups_edges_node | null;
  cursor: string;
}

export interface SubjectsAddSubjectGroupQuery_groups {
  __typename: "GroupConnection";
  edges: (SubjectsAddSubjectGroupQuery_groups_edges | null)[] | null;
  totalCount: number;
}

export interface SubjectsAddSubjectGroupQuery {
  groups: SubjectsAddSubjectGroupQuery_groups | null;
}

export interface SubjectsAddSubjectGroupQueryVariables {
  before?: string | null;
  after?: string | null;
  first?: number | null;
  last?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SubjectsAddSubjectSummaryClassGroupQuery
// ====================================================

export interface SubjectsAddSubjectSummaryClassGroupQuery_classGroup {
  __typename: "ClassGroup";
  id: string;
  year: number;
  section: string;
}

export interface SubjectsAddSubjectSummaryClassGroupQuery_user {
  __typename: "User";
  id: string;
  firstname: string;
  lastname: string;
}

export interface SubjectsAddSubjectSummaryClassGroupQuery {
  classGroup: SubjectsAddSubjectSummaryClassGroupQuery_classGroup | null;
  user: SubjectsAddSubjectSummaryClassGroupQuery_user | null;
}

export interface SubjectsAddSubjectSummaryClassGroupQueryVariables {
  classGroup: string;
  teacher: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SubjectsAddSubjectSummaryGroupQuery
// ====================================================

export interface SubjectsAddSubjectSummaryGroupQuery_group {
  __typename: "Group";
  id: string;
  section: string;
}

export interface SubjectsAddSubjectSummaryGroupQuery_user {
  __typename: "User";
  id: string;
  firstname: string;
  lastname: string;
}

export interface SubjectsAddSubjectSummaryGroupQuery {
  group: SubjectsAddSubjectSummaryGroupQuery_group | null;
  user: SubjectsAddSubjectSummaryGroupQuery_user | null;
}

export interface SubjectsAddSubjectSummaryGroupQueryVariables {
  group: string;
  teacher: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SubjectsAddSubjectTeacherQuery
// ====================================================

export interface SubjectsAddSubjectTeacherQuery_users_edges_node {
  __typename: "User";
  id: string;
  /**
   * email of user
   */
  email: string;
  firstname: string;
  lastname: string;
}

export interface SubjectsAddSubjectTeacherQuery_users_edges {
  __typename: "UserEdge";
  node: SubjectsAddSubjectTeacherQuery_users_edges_node | null;
  cursor: string;
}

export interface SubjectsAddSubjectTeacherQuery_users {
  __typename: "UserConnection";
  edges: (SubjectsAddSubjectTeacherQuery_users_edges | null)[] | null;
  totalCount: number;
}

export interface SubjectsAddSubjectTeacherQuery {
  users: SubjectsAddSubjectTeacherQuery_users | null;
}

export interface SubjectsAddSubjectTeacherQueryVariables {
  before?: string | null;
  after?: string | null;
  first?: number | null;
  last?: number | null;
  resourceName?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SubjectsAddSubjectTypeMutation
// ====================================================

export interface SubjectsAddSubjectTypeMutation_createSubjectType_subjectType {
  __typename: "SubjectType";
  id: string;
}

export interface SubjectsAddSubjectTypeMutation_createSubjectType {
  __typename: "createSubjectTypePayload";
  subjectType: SubjectsAddSubjectTypeMutation_createSubjectType_subjectType | null;
}

export interface SubjectsAddSubjectTypeMutation {
  /**
   * Creates a SubjectType.
   */
  createSubjectType: SubjectsAddSubjectTypeMutation_createSubjectType | null;
}

export interface SubjectsAddSubjectTypeMutationVariables {
  input: createSubjectTypeInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SubjectsDeleteSubjectTypeMutation
// ====================================================

export interface SubjectsDeleteSubjectTypeMutation_deleteSubjectType_subjectType {
  __typename: "SubjectType";
  id: string;
}

export interface SubjectsDeleteSubjectTypeMutation_deleteSubjectType {
  __typename: "deleteSubjectTypePayload";
  subjectType: SubjectsDeleteSubjectTypeMutation_deleteSubjectType_subjectType | null;
}

export interface SubjectsDeleteSubjectTypeMutation {
  /**
   * Deletes a SubjectType.
   */
  deleteSubjectType: SubjectsDeleteSubjectTypeMutation_deleteSubjectType | null;
}

export interface SubjectsDeleteSubjectTypeMutationVariables {
  input: deleteSubjectTypeInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SubjectsUpdateSubjectTypeMutation
// ====================================================

export interface SubjectsUpdateSubjectTypeMutation_updateSubjectType_subjectType {
  __typename: "SubjectType";
  id: string;
  name: string;
}

export interface SubjectsUpdateSubjectTypeMutation_updateSubjectType {
  __typename: "updateSubjectTypePayload";
  subjectType: SubjectsUpdateSubjectTypeMutation_updateSubjectType_subjectType | null;
}

export interface SubjectsUpdateSubjectTypeMutation {
  /**
   * Updates a SubjectType.
   */
  updateSubjectType: SubjectsUpdateSubjectTypeMutation_updateSubjectType | null;
}

export interface SubjectsUpdateSubjectTypeMutationVariables {
  input: updateSubjectTypeInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SubjectsSubjectTypeQuery
// ====================================================

export interface SubjectsSubjectTypeQuery_subjectType_subjects_edges_node_group {
  __typename: "Group";
  id: string;
  section: string;
}

export interface SubjectsSubjectTypeQuery_subjectType_subjects_edges_node_classGroup {
  __typename: "ClassGroup";
  id: string;
  year: number;
  section: string;
}

export interface SubjectsSubjectTypeQuery_subjectType_subjects_edges_node_teacher {
  __typename: "User";
  id: string;
  firstname: string;
  lastname: string;
}

export interface SubjectsSubjectTypeQuery_subjectType_subjects_edges_node {
  __typename: "Subject";
  id: string;
  group: SubjectsSubjectTypeQuery_subjectType_subjects_edges_node_group | null;
  classGroup: SubjectsSubjectTypeQuery_subjectType_subjects_edges_node_classGroup | null;
  teacher: SubjectsSubjectTypeQuery_subjectType_subjects_edges_node_teacher | null;
}

export interface SubjectsSubjectTypeQuery_subjectType_subjects_edges {
  __typename: "SubjectEdge";
  node: SubjectsSubjectTypeQuery_subjectType_subjects_edges_node | null;
  cursor: string;
}

export interface SubjectsSubjectTypeQuery_subjectType_subjects {
  __typename: "SubjectConnection";
  edges: (SubjectsSubjectTypeQuery_subjectType_subjects_edges | null)[] | null;
  totalCount: number;
}

export interface SubjectsSubjectTypeQuery_subjectType {
  __typename: "SubjectType";
  id: string;
  subjects: SubjectsSubjectTypeQuery_subjectType_subjects | null;
}

export interface SubjectsSubjectTypeQuery {
  subjectType: SubjectsSubjectTypeQuery_subjectType | null;
}

export interface SubjectsSubjectTypeQueryVariables {
  id: string;
  subjectsFirst?: number | null;
  subjectsLast?: number | null;
  subjectsAfter?: string | null;
  subjectsBefore?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SubjectsSubjectTypesQuery
// ====================================================

export interface SubjectsSubjectTypesQuery_subjectTypes_edges_node {
  __typename: "SubjectType";
  id: string;
  name: string;
}

export interface SubjectsSubjectTypesQuery_subjectTypes_edges {
  __typename: "SubjectTypeEdge";
  node: SubjectsSubjectTypesQuery_subjectTypes_edges_node | null;
}

export interface SubjectsSubjectTypesQuery_subjectTypes {
  __typename: "SubjectTypeConnection";
  edges: (SubjectsSubjectTypesQuery_subjectTypes_edges | null)[] | null;
}

export interface SubjectsSubjectTypesQuery {
  subjectTypes: SubjectsSubjectTypesQuery_subjectTypes | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UsersAddCsvCreateUserMutation
// ====================================================

export interface UsersAddCsvCreateUserMutation_createUser_user {
  __typename: "User";
  id: string;
}

export interface UsersAddCsvCreateUserMutation_createUser {
  __typename: "createUserPayload";
  user: UsersAddCsvCreateUserMutation_createUser_user | null;
}

export interface UsersAddCsvCreateUserMutation {
  /**
   * Creates a User.
   */
  createUser: UsersAddCsvCreateUserMutation_createUser | null;
}

export interface UsersAddCsvCreateUserMutationVariables {
  input: createUserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UsersAddManualCreateUserMutation
// ====================================================

export interface UsersAddManualCreateUserMutation_createUser_user {
  __typename: "User";
  id: string;
}

export interface UsersAddManualCreateUserMutation_createUser {
  __typename: "createUserPayload";
  user: UsersAddManualCreateUserMutation_createUser_user | null;
}

export interface UsersAddManualCreateUserMutation {
  /**
   * Creates a User.
   */
  createUser: UsersAddManualCreateUserMutation_createUser | null;
}

export interface UsersAddManualCreateUserMutationVariables {
  input: createUserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UsersAddManualUpdateUser
// ====================================================

export interface UsersAddManualUpdateUser_updateUser_user_role {
  __typename: "AclRole";
  id: string;
  /**
   * Example format: ROLE_ADMIN.
   * Must start with 'ROLE_' and name cant be longer than 20 letters.
   * (regex: ^ROLE_[A-Z]{1,20}$/m)
   */
  name: string;
}

export interface UsersAddManualUpdateUser_updateUser_user {
  __typename: "User";
  firstname: string;
  lastname: string;
  /**
   * email of user
   */
  email: string;
  role: UsersAddManualUpdateUser_updateUser_user_role;
}

export interface UsersAddManualUpdateUser_updateUser {
  __typename: "updateUserPayload";
  user: UsersAddManualUpdateUser_updateUser_user | null;
}

export interface UsersAddManualUpdateUser {
  /**
   * Updates a User.
   */
  updateUser: UsersAddManualUpdateUser_updateUser | null;
}

export interface UsersAddManualUpdateUserVariables {
  input: updateUserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UsersAddManualAclRolesQuery
// ====================================================

export interface UsersAddManualAclRolesQuery_aclRoles {
  __typename: "AclRole";
  id: string;
  /**
   * Example format: ROLE_ADMIN.
   * Must start with 'ROLE_' and name cant be longer than 20 letters.
   * (regex: ^ROLE_[A-Z]{1,20}$/m)
   */
  name: string;
}

export interface UsersAddManualAclRolesQuery {
  aclRoles: (UsersAddManualAclRolesQuery_aclRoles | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UsersUsersQuery
// ====================================================

export interface UsersUsersQuery_users_edges_node_role {
  __typename: "AclRole";
  id: string;
  /**
   * Example format: ROLE_ADMIN.
   * Must start with 'ROLE_' and name cant be longer than 20 letters.
   * (regex: ^ROLE_[A-Z]{1,20}$/m)
   */
  name: string;
}

export interface UsersUsersQuery_users_edges_node {
  __typename: "User";
  id: string;
  /**
   * email of user
   */
  email: string;
  firstname: string;
  lastname: string;
  createdAt: string;
  role: UsersUsersQuery_users_edges_node_role;
}

export interface UsersUsersQuery_users_edges {
  __typename: "UserEdge";
  node: UsersUsersQuery_users_edges_node | null;
  cursor: string;
}

export interface UsersUsersQuery_users {
  __typename: "UserConnection";
  edges: (UsersUsersQuery_users_edges | null)[] | null;
  totalCount: number;
}

export interface UsersUsersQuery {
  users: UsersUsersQuery_users | null;
}

export interface UsersUsersQueryVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UsersUserDetailUpdateUserMutation
// ====================================================

export interface UsersUserDetailUpdateUserMutation_updateUser_user_role {
  __typename: "AclRole";
  id: string;
  /**
   * Example format: ROLE_ADMIN.
   * Must start with 'ROLE_' and name cant be longer than 20 letters.
   * (regex: ^ROLE_[A-Z]{1,20}$/m)
   */
  name: string;
}

export interface UsersUserDetailUpdateUserMutation_updateUser_user {
  __typename: "User";
  id: string;
  /**
   * email of user
   */
  email: string;
  firstname: string;
  lastname: string;
  role: UsersUserDetailUpdateUserMutation_updateUser_user_role;
}

export interface UsersUserDetailUpdateUserMutation_updateUser {
  __typename: "updateUserPayload";
  user: UsersUserDetailUpdateUserMutation_updateUser_user | null;
}

export interface UsersUserDetailUpdateUserMutation {
  /**
   * Updates a User.
   */
  updateUser: UsersUserDetailUpdateUserMutation_updateUser | null;
}

export interface UsersUserDetailUpdateUserMutationVariables {
  input: updateUserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UsersUserDetailUserQuery
// ====================================================

export interface UsersUserDetailUserQuery_user_role {
  __typename: "AclRole";
  id: string;
  /**
   * Example format: ROLE_ADMIN.
   * Must start with 'ROLE_' and name cant be longer than 20 letters.
   * (regex: ^ROLE_[A-Z]{1,20}$/m)
   */
  name: string;
}

export interface UsersUserDetailUserQuery_user {
  __typename: "User";
  id: string;
  /**
   * email of user
   */
  email: string;
  firstname: string;
  lastname: string;
  createdAt: string;
  role: UsersUserDetailUserQuery_user_role;
}

export interface UsersUserDetailUserQuery_aclRoles {
  __typename: "AclRole";
  id: string;
  /**
   * Example format: ROLE_ADMIN.
   * Must start with 'ROLE_' and name cant be longer than 20 letters.
   * (regex: ^ROLE_[A-Z]{1,20}$/m)
   */
  name: string;
}

export interface UsersUserDetailUserQuery {
  user: UsersUserDetailUserQuery_user | null;
  aclRoles: (UsersUserDetailUserQuery_aclRoles | null)[] | null;
}

export interface UsersUserDetailUserQueryVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface changePasswordUserInput {
  clientMutationId?: string | null;
  newPassword: string;
  oldPassword: string;
}

export interface createAclRoleInput {
  clientMutationId?: string | null;
  name: string;
  resources?: (string | null)[] | null;
}

export interface createClassGroupInput {
  clientMutationId?: string | null;
  section: string;
  teacher?: string | null;
  year: number;
}

export interface createGroupInput {
  clientMutationId?: string | null;
  section: string;
  users?: (string | null)[] | null;
}

export interface createSubjectInput {
  classGroup?: string | null;
  clientMutationId?: string | null;
  group?: string | null;
  subjectType?: string | null;
  teacher?: string | null;
}

export interface createSubjectTypeInput {
  clientMutationId?: string | null;
  name: string;
}

export interface createUserInput {
  classGroup?: string | null;
  clientMutationId?: string | null;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
}

export interface deleteClassGroupInput {
  clientMutationId?: string | null;
  id: string;
}

export interface deleteGroupInput {
  clientMutationId?: string | null;
  id: string;
}

export interface deleteSubjectTypeInput {
  clientMutationId?: string | null;
  id: string;
}

export interface updateAclRoleInput {
  clientMutationId?: string | null;
  id: string;
  name?: string | null;
  resources?: (string | null)[] | null;
}

export interface updateClassGroupInput {
  clientMutationId?: string | null;
  id: string;
  section?: string | null;
  teacher?: string | null;
  year?: number | null;
}

export interface updateGroupInput {
  clientMutationId?: string | null;
  id: string;
  section?: string | null;
  users?: (string | null)[] | null;
}

export interface updateSubjectTypeInput {
  clientMutationId?: string | null;
  id: string;
  name?: string | null;
}

export interface updateUserInput {
  classGroup?: string | null;
  clientMutationId?: string | null;
  email?: string | null;
  firstname?: string | null;
  id: string;
  lastname?: string | null;
  role?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
