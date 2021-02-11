/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EditSubjectClassGroupsQuery
// ====================================================

export interface EditSubjectClassGroupsQuery_classGroups_edges_node_teacher {
  __typename: "User";
  id: string;
  firstname: string;
  lastname: string;
}

export interface EditSubjectClassGroupsQuery_classGroups_edges_node {
  __typename: "ClassGroup";
  id: string;
  section: string;
  year: number;
  teacher: EditSubjectClassGroupsQuery_classGroups_edges_node_teacher | null;
}

export interface EditSubjectClassGroupsQuery_classGroups_edges {
  __typename: "ClassGroupEdge";
  node: EditSubjectClassGroupsQuery_classGroups_edges_node | null;
  cursor: string;
}

export interface EditSubjectClassGroupsQuery_classGroups {
  __typename: "ClassGroupConnection";
  edges: (EditSubjectClassGroupsQuery_classGroups_edges | null)[] | null;
  totalCount: number;
}

export interface EditSubjectClassGroupsQuery {
  classGroups: EditSubjectClassGroupsQuery_classGroups | null;
}

export interface EditSubjectClassGroupsQueryVariables {
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
// GraphQL query operation: EditSubjectGroupQuery
// ====================================================

export interface EditSubjectGroupQuery_groups_edges_node {
  __typename: "Group";
  id: string;
  section: string;
}

export interface EditSubjectGroupQuery_groups_edges {
  __typename: "GroupEdge";
  node: EditSubjectGroupQuery_groups_edges_node | null;
  cursor: string;
}

export interface EditSubjectGroupQuery_groups {
  __typename: "GroupConnection";
  edges: (EditSubjectGroupQuery_groups_edges | null)[] | null;
  totalCount: number;
}

export interface EditSubjectGroupQuery {
  groups: EditSubjectGroupQuery_groups | null;
}

export interface EditSubjectGroupQueryVariables {
  before?: string | null;
  after?: string | null;
  first?: number | null;
  last?: number | null;
  section?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EditSubjectSummaryClassGroupQuery
// ====================================================

export interface EditSubjectSummaryClassGroupQuery_classGroup {
  __typename: "ClassGroup";
  id: string;
  year: number;
  section: string;
}

export interface EditSubjectSummaryClassGroupQuery_user {
  __typename: "User";
  id: string;
  firstname: string;
  lastname: string;
}

export interface EditSubjectSummaryClassGroupQuery {
  classGroup: EditSubjectSummaryClassGroupQuery_classGroup | null;
  user: EditSubjectSummaryClassGroupQuery_user | null;
}

export interface EditSubjectSummaryClassGroupQueryVariables {
  classGroup: string;
  teacher: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EditSubjectSummaryGroupQuery
// ====================================================

export interface EditSubjectSummaryGroupQuery_group {
  __typename: "Group";
  id: string;
  section: string;
}

export interface EditSubjectSummaryGroupQuery_user {
  __typename: "User";
  id: string;
  firstname: string;
  lastname: string;
}

export interface EditSubjectSummaryGroupQuery {
  group: EditSubjectSummaryGroupQuery_group | null;
  user: EditSubjectSummaryGroupQuery_user | null;
}

export interface EditSubjectSummaryGroupQueryVariables {
  group: string;
  teacher: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EditSubjectTeacherQuery
// ====================================================

export interface EditSubjectTeacherQuery_users_edges_node {
  __typename: "User";
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface EditSubjectTeacherQuery_users_edges {
  __typename: "UserEdge";
  node: EditSubjectTeacherQuery_users_edges_node | null;
  cursor: string;
}

export interface EditSubjectTeacherQuery_users {
  __typename: "UserConnection";
  edges: (EditSubjectTeacherQuery_users_edges | null)[] | null;
  totalCount: number;
}

export interface EditSubjectTeacherQuery {
  users: EditSubjectTeacherQuery_users | null;
}

export interface EditSubjectTeacherQueryVariables {
  before?: string | null;
  after?: string | null;
  first?: number | null;
  last?: number | null;
  resourceName?: string | null;
  email?: string | null;
  firstname?: string | null;
  lastname?: string | null;
}

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
// GraphQL mutation operation: WithPageMarkReadAllNotificationUserMutation
// ====================================================

export interface WithPageMarkReadAllNotificationUserMutation_markReadAllNotificationsUser_user {
  __typename: "User";
  id: string;
}

export interface WithPageMarkReadAllNotificationUserMutation_markReadAllNotificationsUser {
  __typename: "markReadAllNotificationsUserPayload";
  user: WithPageMarkReadAllNotificationUserMutation_markReadAllNotificationsUser_user | null;
}

export interface WithPageMarkReadAllNotificationUserMutation {
  markReadAllNotificationsUser: WithPageMarkReadAllNotificationUserMutation_markReadAllNotificationsUser | null;
}

export interface WithPageMarkReadAllNotificationUserMutationVariables {
  input: markReadAllNotificationsUserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WithPageMarkReadNotificationsUserMutation
// ====================================================

export interface WithPageMarkReadNotificationsUserMutation_markReadNotificationUser_user_notifications_edges_node {
  __typename: "Notification";
  id: string;
  viewAt: string | null;
}

export interface WithPageMarkReadNotificationsUserMutation_markReadNotificationUser_user_notifications_edges {
  __typename: "NotificationEdge";
  node: WithPageMarkReadNotificationsUserMutation_markReadNotificationUser_user_notifications_edges_node | null;
}

export interface WithPageMarkReadNotificationsUserMutation_markReadNotificationUser_user_notifications {
  __typename: "NotificationConnection";
  edges: (WithPageMarkReadNotificationsUserMutation_markReadNotificationUser_user_notifications_edges | null)[] | null;
}

export interface WithPageMarkReadNotificationsUserMutation_markReadNotificationUser_user {
  __typename: "User";
  id: string;
  notifications: WithPageMarkReadNotificationsUserMutation_markReadNotificationUser_user_notifications | null;
}

export interface WithPageMarkReadNotificationsUserMutation_markReadNotificationUser {
  __typename: "markReadNotificationUserPayload";
  user: WithPageMarkReadNotificationsUserMutation_markReadNotificationUser_user | null;
}

export interface WithPageMarkReadNotificationsUserMutation {
  markReadNotificationUser: WithPageMarkReadNotificationsUserMutation_markReadNotificationUser | null;
}

export interface WithPageMarkReadNotificationsUserMutationVariables {
  input: markReadNotificationUserInput;
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
  id: string;
  name: string;
}

export interface WithPageMeUserQuery_meUser_role {
  __typename: "AclRole";
  id: string;
  name: string;
  resources: (WithPageMeUserQuery_meUser_role_resources | null)[] | null;
}

export interface WithPageMeUserQuery_meUser {
  __typename: "User";
  id: string;
  firstname: string;
  lastname: string;
  role: WithPageMeUserQuery_meUser_role;
  notificationViewAtNullCount: number;
}

export interface WithPageMeUserQuery {
  meUser: WithPageMeUserQuery_meUser | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WithPageNotificationsQuery
// ====================================================

export interface WithPageNotificationsQuery_meUser_notifications_edges_node {
  __typename: "Notification";
  id: string;
  type: string;
  viewAt: string | null;
  parameters: any;
}

export interface WithPageNotificationsQuery_meUser_notifications_edges {
  __typename: "NotificationEdge";
  node: WithPageNotificationsQuery_meUser_notifications_edges_node | null;
  cursor: string;
}

export interface WithPageNotificationsQuery_meUser_notifications {
  __typename: "NotificationConnection";
  edges: (WithPageNotificationsQuery_meUser_notifications_edges | null)[] | null;
  totalCount: number;
}

export interface WithPageNotificationsQuery_meUser {
  __typename: "User";
  notifications: WithPageNotificationsQuery_meUser_notifications | null;
}

export interface WithPageNotificationsQuery {
  meUser: WithPageNotificationsQuery_meUser | null;
}

export interface WithPageNotificationsQueryVariables {
  first?: number | null;
  last?: number | null;
  before?: string | null;
  after?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AclEditRoleDeleteAclRoleMutation
// ====================================================

export interface AclEditRoleDeleteAclRoleMutation_deleteAclRole_aclRole {
  __typename: "AclRole";
  id: string;
}

export interface AclEditRoleDeleteAclRoleMutation_deleteAclRole {
  __typename: "deleteAclRolePayload";
  aclRole: AclEditRoleDeleteAclRoleMutation_deleteAclRole_aclRole | null;
}

export interface AclEditRoleDeleteAclRoleMutation {
  deleteAclRole: AclEditRoleDeleteAclRoleMutation_deleteAclRole | null;
}

export interface AclEditRoleDeleteAclRoleMutationVariables {
  input: deleteAclRoleInput;
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
  name: string;
}

export interface AclEditRoleUpdateRole_updateAclRole {
  __typename: "updateAclRolePayload";
  aclRole: AclEditRoleUpdateRole_updateAclRole_aclRole | null;
}

export interface AclEditRoleUpdateRole {
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
  name: string;
  resources: (AclCreateAclRole_createAclRole_aclRole_resources | null)[] | null;
}

export interface AclCreateAclRole_createAclRole {
  __typename: "createAclRolePayload";
  aclRole: AclCreateAclRole_createAclRole_aclRole | null;
}

export interface AclCreateAclRole {
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
  resources: (AclUpdateAclMutation_updateAclRole_aclRole_resources | null)[] | null;
}

export interface AclUpdateAclMutation_updateAclRole {
  __typename: "updateAclRolePayload";
  aclRole: AclUpdateAclMutation_updateAclRole_aclRole | null;
}

export interface AclUpdateAclMutation {
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
  name: string;
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
  email: string;
  firstname: string;
  lastname: string;
}

export interface ClassGroupsUpdateClassGroupMutation_updateClassGroup_classGroup {
  __typename: "ClassGroup";
  id: string;
  year: number;
  section: string;
  teacher: ClassGroupsUpdateClassGroupMutation_updateClassGroup_classGroup_teacher | null;
}

export interface ClassGroupsUpdateClassGroupMutation_updateClassGroup {
  __typename: "updateClassGroupPayload";
  classGroup: ClassGroupsUpdateClassGroupMutation_updateClassGroup_classGroup | null;
}

export interface ClassGroupsUpdateClassGroupMutation {
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
// GraphQL mutation operation: ClassGroupsUpdateUsersClassGroupMutation
// ====================================================

export interface ClassGroupsUpdateUsersClassGroupMutation_updateUsersClassGroup_classGroup {
  __typename: "ClassGroup";
  id: string;
}

export interface ClassGroupsUpdateUsersClassGroupMutation_updateUsersClassGroup {
  __typename: "updateUsersClassGroupPayload";
  classGroup: ClassGroupsUpdateUsersClassGroupMutation_updateUsersClassGroup_classGroup | null;
}

export interface ClassGroupsUpdateUsersClassGroupMutation {
  updateUsersClassGroup: ClassGroupsUpdateUsersClassGroupMutation_updateUsersClassGroup | null;
}

export interface ClassGroupsUpdateUsersClassGroupMutationVariables {
  input: updateUsersClassGroupInput;
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
  email: string;
  firstname: string;
  lastname: string;
}

export interface ClassGroupsClassGroupTeacher_classGroup {
  __typename: "ClassGroup";
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

export interface ClassGroupsClassGroupUsersQuery_classGroup_users_edges_node_classGroup {
  __typename: "ClassGroup";
  id: string;
  section: string;
  year: number;
}

export interface ClassGroupsClassGroupUsersQuery_classGroup_users_edges_node {
  __typename: "User";
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  classGroup: ClassGroupsClassGroupUsersQuery_classGroup_users_edges_node_classGroup | null;
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
  email?: string | null;
  firstname?: string | null;
  lastname?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClassGroupsUsersQuery
// ====================================================

export interface ClassGroupsUsersQuery_users_edges_node_classGroup {
  __typename: "ClassGroup";
  id: string;
  section: string;
  year: number;
}

export interface ClassGroupsUsersQuery_users_edges_node {
  __typename: "User";
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  classGroup: ClassGroupsUsersQuery_users_edges_node_classGroup | null;
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
  resourceName?: string | null;
  email?: string | null;
  firstname?: string | null;
  lastname?: string | null;
  isInClassGroup?: boolean | null;
  classGroups?: string[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DashboardWrittenExamsQuery
// ====================================================

export interface DashboardWrittenExamsQuery_writtenExams_edges_node_pointSystem_points_edges_node_user {
  __typename: "User";
  id: string;
}

export interface DashboardWrittenExamsQuery_writtenExams_edges_node_pointSystem_points_edges_node {
  __typename: "Point";
  user: DashboardWrittenExamsQuery_writtenExams_edges_node_pointSystem_points_edges_node_user;
  points: number;
}

export interface DashboardWrittenExamsQuery_writtenExams_edges_node_pointSystem_points_edges {
  __typename: "PointEdge";
  node: DashboardWrittenExamsQuery_writtenExams_edges_node_pointSystem_points_edges_node | null;
}

export interface DashboardWrittenExamsQuery_writtenExams_edges_node_pointSystem_points {
  __typename: "PointConnection";
  edges: (DashboardWrittenExamsQuery_writtenExams_edges_node_pointSystem_points_edges | null)[] | null;
}

export interface DashboardWrittenExamsQuery_writtenExams_edges_node_pointSystem {
  __typename: "PointSystem";
  maxPoints: number;
  points: DashboardWrittenExamsQuery_writtenExams_edges_node_pointSystem_points | null;
}

export interface DashboardWrittenExamsQuery_writtenExams_edges_node_subject_subjectType {
  __typename: "SubjectType";
  id: string;
  name: string;
}

export interface DashboardWrittenExamsQuery_writtenExams_edges_node_subject {
  __typename: "Subject";
  evaluationSystem: string;
  subjectType: DashboardWrittenExamsQuery_writtenExams_edges_node_subject_subjectType | null;
}

export interface DashboardWrittenExamsQuery_writtenExams_edges_node {
  __typename: "Exam";
  name: string;
  writtenAt: string;
  pointSystem: DashboardWrittenExamsQuery_writtenExams_edges_node_pointSystem | null;
  subject: DashboardWrittenExamsQuery_writtenExams_edges_node_subject | null;
}

export interface DashboardWrittenExamsQuery_writtenExams_edges {
  __typename: "ExamEdge";
  node: DashboardWrittenExamsQuery_writtenExams_edges_node | null;
}

export interface DashboardWrittenExamsQuery_writtenExams {
  __typename: "ExamConnection";
  edges: (DashboardWrittenExamsQuery_writtenExams_edges | null)[] | null;
}

export interface DashboardWrittenExamsQuery {
  writtenExams: DashboardWrittenExamsQuery_writtenExams | null;
}

export interface DashboardWrittenExamsQueryVariables {
  first: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Errors502MeUserQuery
// ====================================================

export interface Errors502MeUserQuery_meUser {
  __typename: "User";
  id: string;
}

export interface Errors502MeUserQuery {
  meUser: Errors502MeUserQuery_meUser | null;
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
// GraphQL mutation operation: GroupsUpdateUsersGroupMutation
// ====================================================

export interface GroupsUpdateUsersGroupMutation_updateUsersGroup_group {
  __typename: "Group";
  id: string;
}

export interface GroupsUpdateUsersGroupMutation_updateUsersGroup {
  __typename: "updateUsersGroupPayload";
  group: GroupsUpdateUsersGroupMutation_updateUsersGroup_group | null;
}

export interface GroupsUpdateUsersGroupMutation {
  updateUsersGroup: GroupsUpdateUsersGroupMutation_updateUsersGroup | null;
}

export interface GroupsUpdateUsersGroupMutationVariables {
  input: updateUsersGroupInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GroupsClassGroupsQuery
// ====================================================

export interface GroupsClassGroupsQuery_classGroups_edges_node {
  __typename: "ClassGroup";
  id: string;
  year: number;
  section: string;
}

export interface GroupsClassGroupsQuery_classGroups_edges {
  __typename: "ClassGroupEdge";
  node: GroupsClassGroupsQuery_classGroups_edges_node | null;
}

export interface GroupsClassGroupsQuery_classGroups {
  __typename: "ClassGroupConnection";
  edges: (GroupsClassGroupsQuery_classGroups_edges | null)[] | null;
}

export interface GroupsClassGroupsQuery {
  classGroups: GroupsClassGroupsQuery_classGroups | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GroupsGroupQuery
// ====================================================

export interface GroupsGroupQuery_group_users_edges_node_classGroup {
  __typename: "ClassGroup";
  id: string;
  year: number;
  section: string;
}

export interface GroupsGroupQuery_group_users_edges_node {
  __typename: "User";
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  classGroup: GroupsGroupQuery_group_users_edges_node_classGroup | null;
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
  email?: string | null;
  firstname?: string | null;
  lastname?: string | null;
  classGroups?: (string | null)[] | null;
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

export interface GroupsGroupsQueryVariables {
  section?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GroupsUsersQuery
// ====================================================

export interface GroupsUsersQuery_users_edges_node_classGroup {
  __typename: "ClassGroup";
  id: string;
  year: number;
  section: string;
}

export interface GroupsUsersQuery_users_edges_node_groups_edges_node {
  __typename: "Group";
  id: string;
}

export interface GroupsUsersQuery_users_edges_node_groups_edges {
  __typename: "GroupEdge";
  node: GroupsUsersQuery_users_edges_node_groups_edges_node | null;
}

export interface GroupsUsersQuery_users_edges_node_groups {
  __typename: "GroupConnection";
  edges: (GroupsUsersQuery_users_edges_node_groups_edges | null)[] | null;
}

export interface GroupsUsersQuery_users_edges_node {
  __typename: "User";
  id: string;
  firstname: string;
  lastname: string;
  classGroup: GroupsUsersQuery_users_edges_node_classGroup | null;
  groups: GroupsUsersQuery_users_edges_node_groups | null;
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
  groupId: string;
  resourceName?: string | null;
  email?: string | null;
  firstname?: string | null;
  lastname?: string | null;
  classGroups?: (string | null)[] | null;
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
  name: string;
}

export interface ProfileUserQuery_meUser {
  __typename: "User";
  id: string;
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
// GraphQL mutation operation: SchoolPeriodsCreateSchoolPeriodMutation
// ====================================================

export interface SchoolPeriodsCreateSchoolPeriodMutation_createSchoolPeriod_schoolPeriod {
  __typename: "SchoolPeriod";
  id: string;
}

export interface SchoolPeriodsCreateSchoolPeriodMutation_createSchoolPeriod {
  __typename: "createSchoolPeriodPayload";
  schoolPeriod: SchoolPeriodsCreateSchoolPeriodMutation_createSchoolPeriod_schoolPeriod | null;
}

export interface SchoolPeriodsCreateSchoolPeriodMutation {
  createSchoolPeriod: SchoolPeriodsCreateSchoolPeriodMutation_createSchoolPeriod | null;
}

export interface SchoolPeriodsCreateSchoolPeriodMutationVariables {
  input: createSchoolPeriodInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SchoolPeriodsDeleteSchoolPeriodMutation
// ====================================================

export interface SchoolPeriodsDeleteSchoolPeriodMutation_deleteSchoolPeriod_schoolPeriod {
  __typename: "SchoolPeriod";
  id: string;
}

export interface SchoolPeriodsDeleteSchoolPeriodMutation_deleteSchoolPeriod {
  __typename: "deleteSchoolPeriodPayload";
  schoolPeriod: SchoolPeriodsDeleteSchoolPeriodMutation_deleteSchoolPeriod_schoolPeriod | null;
}

export interface SchoolPeriodsDeleteSchoolPeriodMutation {
  deleteSchoolPeriod: SchoolPeriodsDeleteSchoolPeriodMutation_deleteSchoolPeriod | null;
}

export interface SchoolPeriodsDeleteSchoolPeriodMutationVariables {
  input: deleteSchoolPeriodInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SchoolPeriodsUpdateSchoolPeriodMutation
// ====================================================

export interface SchoolPeriodsUpdateSchoolPeriodMutation_updateSchoolPeriod_schoolPeriod {
  __typename: "SchoolPeriod";
  id: string;
}

export interface SchoolPeriodsUpdateSchoolPeriodMutation_updateSchoolPeriod {
  __typename: "updateSchoolPeriodPayload";
  schoolPeriod: SchoolPeriodsUpdateSchoolPeriodMutation_updateSchoolPeriod_schoolPeriod | null;
}

export interface SchoolPeriodsUpdateSchoolPeriodMutation {
  updateSchoolPeriod: SchoolPeriodsUpdateSchoolPeriodMutation_updateSchoolPeriod | null;
}

export interface SchoolPeriodsUpdateSchoolPeriodMutationVariables {
  input: updateSchoolPeriodInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SchollPeriodsSchollPeriodsQuery
// ====================================================

export interface SchollPeriodsSchollPeriodsQuery_schoolPeriods_edges_node {
  __typename: "SchoolPeriod";
  id: string;
  from: string;
  to: string;
  quarter: number;
  schoolYear: number;
}

export interface SchollPeriodsSchollPeriodsQuery_schoolPeriods_edges {
  __typename: "SchoolPeriodEdge";
  node: SchollPeriodsSchollPeriodsQuery_schoolPeriods_edges_node | null;
  cursor: string;
}

export interface SchollPeriodsSchollPeriodsQuery_schoolPeriods {
  __typename: "SchoolPeriodConnection";
  edges: (SchollPeriodsSchollPeriodsQuery_schoolPeriods_edges | null)[] | null;
  totalCount: number;
}

export interface SchollPeriodsSchollPeriodsQuery {
  schoolPeriods: SchollPeriodsSchollPeriodsQuery_schoolPeriods | null;
}

export interface SchollPeriodsSchollPeriodsQueryVariables {
  first?: number | null;
  last?: number | null;
  before?: string | null;
  after?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StudentSubjectsLearnedSubjectsQuery
// ====================================================

export interface StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_percentsToMarkConvert {
  __typename: "PercentToMarkConvert";
  id: string;
  one: number;
  two: number;
  three: number;
  four: number;
}

export interface StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_subjectType {
  __typename: "SubjectType";
  id: string;
  name: string;
}

export interface StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_exams_edges_node_pointSystem_points_edges_node_user {
  __typename: "User";
  id: string;
}

export interface StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_exams_edges_node_pointSystem_points_edges_node {
  __typename: "Point";
  examWritten: boolean;
  id: string;
  points: number;
  percentil: number;
  worstThan: number;
  user: StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_exams_edges_node_pointSystem_points_edges_node_user;
}

export interface StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_exams_edges_node_pointSystem_points_edges {
  __typename: "PointEdge";
  node: StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_exams_edges_node_pointSystem_points_edges_node | null;
}

export interface StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_exams_edges_node_pointSystem_points {
  __typename: "PointConnection";
  edges: (StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_exams_edges_node_pointSystem_points_edges | null)[] | null;
}

export interface StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_exams_edges_node_pointSystem {
  __typename: "PointSystem";
  id: string;
  maxPoints: number;
  average: number;
  points: StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_exams_edges_node_pointSystem_points | null;
}

export interface StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_exams_edges_node {
  __typename: "Exam";
  id: string;
  name: string;
  writtenAt: string;
  pointSystem: StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_exams_edges_node_pointSystem | null;
}

export interface StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_exams_edges {
  __typename: "ExamEdge";
  node: StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_exams_edges_node | null;
}

export interface StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_exams {
  __typename: "ExamConnection";
  edges: (StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_exams_edges | null)[] | null;
}

export interface StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node {
  __typename: "Subject";
  id: string;
  percentsToMarkConvert: StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_percentsToMarkConvert;
  subjectType: StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_subjectType | null;
  evaluationSystem: string;
  exams: StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node_exams | null;
}

export interface StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges {
  __typename: "SubjectEdge";
  node: StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges_node | null;
}

export interface StudentSubjectsLearnedSubjectsQuery_learnedSubjects {
  __typename: "SubjectConnection";
  edges: (StudentSubjectsLearnedSubjectsQuery_learnedSubjects_edges | null)[] | null;
}

export interface StudentSubjectsLearnedSubjectsQuery_schoolPeriods_edges_node {
  __typename: "SchoolPeriod";
  id: string;
  schoolYear: number;
  quarter: number;
}

export interface StudentSubjectsLearnedSubjectsQuery_schoolPeriods_edges {
  __typename: "SchoolPeriodEdge";
  node: StudentSubjectsLearnedSubjectsQuery_schoolPeriods_edges_node | null;
}

export interface StudentSubjectsLearnedSubjectsQuery_schoolPeriods {
  __typename: "SchoolPeriodConnection";
  edges: (StudentSubjectsLearnedSubjectsQuery_schoolPeriods_edges | null)[] | null;
}

export interface StudentSubjectsLearnedSubjectsQuery_meUser {
  __typename: "User";
  id: string;
}

export interface StudentSubjectsLearnedSubjectsQuery {
  learnedSubjects: StudentSubjectsLearnedSubjectsQuery_learnedSubjects | null;
  schoolPeriods: StudentSubjectsLearnedSubjectsQuery_schoolPeriods | null;
  meUser: StudentSubjectsLearnedSubjectsQuery_meUser | null;
}

export interface StudentSubjectsLearnedSubjectsQueryVariables {
  schoolPeriods?: string[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SubjectsAddSubjectCreateSubjectMutataion
// ====================================================

export interface SubjectsAddSubjectCreateSubjectMutataion_createSubject_subject {
  __typename: "Subject";
  id: string;
}

export interface SubjectsAddSubjectCreateSubjectMutataion_createSubject {
  __typename: "createSubjectPayload";
  subject: SubjectsAddSubjectCreateSubjectMutataion_createSubject_subject | null;
}

export interface SubjectsAddSubjectCreateSubjectMutataion {
  createSubject: SubjectsAddSubjectCreateSubjectMutataion_createSubject | null;
}

export interface SubjectsAddSubjectCreateSubjectMutataionVariables {
  input: createSubjectInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SubjectsEditSubjectUpdateSubjectMutation
// ====================================================

export interface SubjectsEditSubjectUpdateSubjectMutation_updateSubject_subject {
  __typename: "Subject";
  id: string;
}

export interface SubjectsEditSubjectUpdateSubjectMutation_updateSubject {
  __typename: "updateSubjectPayload";
  subject: SubjectsEditSubjectUpdateSubjectMutation_updateSubject_subject | null;
}

export interface SubjectsEditSubjectUpdateSubjectMutation {
  updateSubject: SubjectsEditSubjectUpdateSubjectMutation_updateSubject | null;
}

export interface SubjectsEditSubjectUpdateSubjectMutationVariables {
  input: updateSubjectInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SubjectsEditSubjectSubjectQuery
// ====================================================

export interface SubjectsEditSubjectSubjectQuery_subject_group {
  __typename: "Group";
  id: string;
}

export interface SubjectsEditSubjectSubjectQuery_subject_classGroup {
  __typename: "ClassGroup";
  id: string;
}

export interface SubjectsEditSubjectSubjectQuery_subject_teacher {
  __typename: "User";
  id: string;
}

export interface SubjectsEditSubjectSubjectQuery_subject {
  __typename: "Subject";
  id: string;
  group: SubjectsEditSubjectSubjectQuery_subject_group | null;
  classGroup: SubjectsEditSubjectSubjectQuery_subject_classGroup | null;
  teacher: SubjectsEditSubjectSubjectQuery_subject_teacher;
}

export interface SubjectsEditSubjectSubjectQuery {
  subject: SubjectsEditSubjectSubjectQuery_subject | null;
}

export interface SubjectsEditSubjectSubjectQueryVariables {
  id: string;
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
// GraphQL mutation operation: SubjectsDeleteSubjectMutation
// ====================================================

export interface SubjectsDeleteSubjectMutation_deleteSubject_subject {
  __typename: "Subject";
  id: string;
}

export interface SubjectsDeleteSubjectMutation_deleteSubject {
  __typename: "deleteSubjectPayload";
  subject: SubjectsDeleteSubjectMutation_deleteSubject_subject | null;
}

export interface SubjectsDeleteSubjectMutation {
  deleteSubject: SubjectsDeleteSubjectMutation_deleteSubject | null;
}

export interface SubjectsDeleteSubjectMutationVariables {
  input: deleteSubjectInput;
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
  teacher: SubjectsSubjectTypeQuery_subjectType_subjects_edges_node_teacher;
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
// GraphQL mutation operation: TeacherSubjectsUpdateColorSubjectMutation
// ====================================================

export interface TeacherSubjectsUpdateColorSubjectMutation_updateColorSubject_subject {
  __typename: "Subject";
  id: string;
}

export interface TeacherSubjectsUpdateColorSubjectMutation_updateColorSubject {
  __typename: "updateColorSubjectPayload";
  subject: TeacherSubjectsUpdateColorSubjectMutation_updateColorSubject_subject | null;
}

export interface TeacherSubjectsUpdateColorSubjectMutation {
  updateColorSubject: TeacherSubjectsUpdateColorSubjectMutation_updateColorSubject | null;
}

export interface TeacherSubjectsUpdateColorSubjectMutationVariables {
  input: updateColorSubjectInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TeacherSubjectsSubjectsQuery
// ====================================================

export interface TeacherSubjectsSubjectsQuery_meUser_taughtSubjects_edges_node_group {
  __typename: "Group";
  id: string;
  section: string;
}

export interface TeacherSubjectsSubjectsQuery_meUser_taughtSubjects_edges_node_classGroup {
  __typename: "ClassGroup";
  id: string;
  year: number;
  section: string;
}

export interface TeacherSubjectsSubjectsQuery_meUser_taughtSubjects_edges_node_subjectType {
  __typename: "SubjectType";
  id: string;
  name: string;
}

export interface TeacherSubjectsSubjectsQuery_meUser_taughtSubjects_edges_node {
  __typename: "Subject";
  id: string;
  teacherCardColor: string | null;
  evaluationSystem: string;
  group: TeacherSubjectsSubjectsQuery_meUser_taughtSubjects_edges_node_group | null;
  classGroup: TeacherSubjectsSubjectsQuery_meUser_taughtSubjects_edges_node_classGroup | null;
  subjectType: TeacherSubjectsSubjectsQuery_meUser_taughtSubjects_edges_node_subjectType | null;
}

export interface TeacherSubjectsSubjectsQuery_meUser_taughtSubjects_edges {
  __typename: "SubjectEdge";
  node: TeacherSubjectsSubjectsQuery_meUser_taughtSubjects_edges_node | null;
}

export interface TeacherSubjectsSubjectsQuery_meUser_taughtSubjects {
  __typename: "SubjectConnection";
  edges: (TeacherSubjectsSubjectsQuery_meUser_taughtSubjects_edges | null)[] | null;
}

export interface TeacherSubjectsSubjectsQuery_meUser {
  __typename: "User";
  taughtSubjects: TeacherSubjectsSubjectsQuery_meUser_taughtSubjects | null;
}

export interface TeacherSubjectsSubjectsQuery {
  meUser: TeacherSubjectsSubjectsQuery_meUser | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TeacherSubejctsSubjectPointSystemCreateExamMutation
// ====================================================

export interface TeacherSubejctsSubjectPointSystemCreateExamMutation_createExam_exam {
  __typename: "Exam";
  id: string;
}

export interface TeacherSubejctsSubjectPointSystemCreateExamMutation_createExam {
  __typename: "createExamPayload";
  exam: TeacherSubejctsSubjectPointSystemCreateExamMutation_createExam_exam | null;
}

export interface TeacherSubejctsSubjectPointSystemCreateExamMutation {
  createExam: TeacherSubejctsSubjectPointSystemCreateExamMutation_createExam | null;
}

export interface TeacherSubejctsSubjectPointSystemCreateExamMutationVariables {
  input: createExamInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutation
// ====================================================

export interface TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutation_createOrUpdatePointSystem_pointSystem {
  __typename: "PointSystem";
  id: string;
}

export interface TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutation_createOrUpdatePointSystem {
  __typename: "createOrUpdatePointSystemPayload";
  pointSystem: TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutation_createOrUpdatePointSystem_pointSystem | null;
}

export interface TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutation_updateExam_exam {
  __typename: "Exam";
  id: string;
}

export interface TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutation_updateExam {
  __typename: "updateExamPayload";
  exam: TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutation_updateExam_exam | null;
}

export interface TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutation {
  createOrUpdatePointSystem: TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutation_createOrUpdatePointSystem | null;
  updateExam: TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutation_updateExam | null;
}

export interface TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutationVariables {
  pointSystemInput: createOrUpdatePointSystemInput;
  examInput: updateExamInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TeacherSubjectsSubjectPointsSystemDeleteExamMutation
// ====================================================

export interface TeacherSubjectsSubjectPointsSystemDeleteExamMutation_deleteExam_exam {
  __typename: "Exam";
  id: string;
}

export interface TeacherSubjectsSubjectPointsSystemDeleteExamMutation_deleteExam {
  __typename: "deleteExamPayload";
  exam: TeacherSubjectsSubjectPointsSystemDeleteExamMutation_deleteExam_exam | null;
}

export interface TeacherSubjectsSubjectPointsSystemDeleteExamMutation {
  deleteExam: TeacherSubjectsSubjectPointsSystemDeleteExamMutation_deleteExam | null;
}

export interface TeacherSubjectsSubjectPointsSystemDeleteExamMutationVariables {
  input: deleteExamInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TeahcerSubjectsSubjectPointSystemUpdatePercentToMarkConvert
// ====================================================

export interface TeahcerSubjectsSubjectPointSystemUpdatePercentToMarkConvert_updatePercentToMarkConvert_percentToMarkConvert {
  __typename: "PercentToMarkConvert";
  id: string;
}

export interface TeahcerSubjectsSubjectPointSystemUpdatePercentToMarkConvert_updatePercentToMarkConvert {
  __typename: "updatePercentToMarkConvertPayload";
  percentToMarkConvert: TeahcerSubjectsSubjectPointSystemUpdatePercentToMarkConvert_updatePercentToMarkConvert_percentToMarkConvert | null;
}

export interface TeahcerSubjectsSubjectPointSystemUpdatePercentToMarkConvert {
  updatePercentToMarkConvert: TeahcerSubjectsSubjectPointSystemUpdatePercentToMarkConvert_updatePercentToMarkConvert | null;
}

export interface TeahcerSubjectsSubjectPointSystemUpdatePercentToMarkConvertVariables {
  input: updatePercentToMarkConvertInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TeacherSubjectsSubjectPointSystemSubjectQuery
// ====================================================

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject_subjectType {
  __typename: "SubjectType";
  id: string;
  name: string;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject_group_users_edges_node {
  __typename: "User";
  id: string;
  firstname: string;
  lastname: string;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject_group_users_edges {
  __typename: "UserEdge";
  node: TeacherSubjectsSubjectPointSystemSubjectQuery_subject_group_users_edges_node | null;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject_group_users {
  __typename: "UserConnection";
  edges: (TeacherSubjectsSubjectPointSystemSubjectQuery_subject_group_users_edges | null)[] | null;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject_group {
  __typename: "Group";
  section: string;
  users: TeacherSubjectsSubjectPointSystemSubjectQuery_subject_group_users | null;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject_classGroup_users_edges_node {
  __typename: "User";
  id: string;
  firstname: string;
  lastname: string;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject_classGroup_users_edges {
  __typename: "UserEdge";
  node: TeacherSubjectsSubjectPointSystemSubjectQuery_subject_classGroup_users_edges_node | null;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject_classGroup_users {
  __typename: "UserConnection";
  edges: (TeacherSubjectsSubjectPointSystemSubjectQuery_subject_classGroup_users_edges | null)[] | null;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject_classGroup {
  __typename: "ClassGroup";
  section: string;
  year: number;
  users: TeacherSubjectsSubjectPointSystemSubjectQuery_subject_classGroup_users | null;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject_exams_edges_node_pointSystem_points_edges_node_user {
  __typename: "User";
  id: string;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject_exams_edges_node_pointSystem_points_edges_node {
  __typename: "Point";
  user: TeacherSubjectsSubjectPointSystemSubjectQuery_subject_exams_edges_node_pointSystem_points_edges_node_user;
  points: number;
  examWritten: boolean;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject_exams_edges_node_pointSystem_points_edges {
  __typename: "PointEdge";
  node: TeacherSubjectsSubjectPointSystemSubjectQuery_subject_exams_edges_node_pointSystem_points_edges_node | null;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject_exams_edges_node_pointSystem_points {
  __typename: "PointConnection";
  edges: (TeacherSubjectsSubjectPointSystemSubjectQuery_subject_exams_edges_node_pointSystem_points_edges | null)[] | null;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject_exams_edges_node_pointSystem {
  __typename: "PointSystem";
  maxPoints: number;
  points: TeacherSubjectsSubjectPointSystemSubjectQuery_subject_exams_edges_node_pointSystem_points | null;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject_exams_edges_node {
  __typename: "Exam";
  id: string;
  name: string;
  writtenAt: string;
  pointSystem: TeacherSubjectsSubjectPointSystemSubjectQuery_subject_exams_edges_node_pointSystem | null;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject_exams_edges {
  __typename: "ExamEdge";
  node: TeacherSubjectsSubjectPointSystemSubjectQuery_subject_exams_edges_node | null;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject_exams {
  __typename: "ExamConnection";
  edges: (TeacherSubjectsSubjectPointSystemSubjectQuery_subject_exams_edges | null)[] | null;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject_percentsToMarkConvert {
  __typename: "PercentToMarkConvert";
  id: string;
  one: number;
  two: number;
  three: number;
  four: number;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_subject {
  __typename: "Subject";
  id: string;
  subjectType: TeacherSubjectsSubjectPointSystemSubjectQuery_subject_subjectType | null;
  group: TeacherSubjectsSubjectPointSystemSubjectQuery_subject_group | null;
  classGroup: TeacherSubjectsSubjectPointSystemSubjectQuery_subject_classGroup | null;
  exams: TeacherSubjectsSubjectPointSystemSubjectQuery_subject_exams | null;
  percentsToMarkConvert: TeacherSubjectsSubjectPointSystemSubjectQuery_subject_percentsToMarkConvert;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_schoolPeriods_edges_node {
  __typename: "SchoolPeriod";
  id: string;
  schoolYear: number;
  quarter: number;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_schoolPeriods_edges {
  __typename: "SchoolPeriodEdge";
  node: TeacherSubjectsSubjectPointSystemSubjectQuery_schoolPeriods_edges_node | null;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery_schoolPeriods {
  __typename: "SchoolPeriodConnection";
  edges: (TeacherSubjectsSubjectPointSystemSubjectQuery_schoolPeriods_edges | null)[] | null;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQuery {
  subject: TeacherSubjectsSubjectPointSystemSubjectQuery_subject | null;
  schoolPeriods: TeacherSubjectsSubjectPointSystemSubjectQuery_schoolPeriods | null;
}

export interface TeacherSubjectsSubjectPointSystemSubjectQueryVariables {
  id: string;
  schoolPeriods?: string[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UsersRolesQuery
// ====================================================

export interface UsersRolesQuery_aclRoles {
  __typename: "AclRole";
  id: string;
  name: string;
}

export interface UsersRolesQuery {
  aclRoles: (UsersRolesQuery_aclRoles | null)[] | null;
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
  name: string;
}

export interface UsersUsersQuery_users_edges_node {
  __typename: "User";
  id: string;
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
  name: string;
}

export interface UsersUserDetailUpdateUserMutation_updateUser_user {
  __typename: "User";
  id: string;
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
  name: string;
}

export interface UsersUserDetailUserQuery_user {
  __typename: "User";
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  createdAt: string;
  role: UsersUserDetailUserQuery_user_role;
}

export interface UsersUserDetailUserQuery_aclRoles {
  __typename: "AclRole";
  id: string;
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

// ====================================================
// GraphQL fragment: TeacherSubjectsSubjectPointSystemSubectUserFragment
// ====================================================

export interface TeacherSubjectsSubjectPointSystemSubectUserFragment_edges_node {
  __typename: "User";
  id: string;
  firstname: string;
  lastname: string;
}

export interface TeacherSubjectsSubjectPointSystemSubectUserFragment_edges {
  __typename: "UserEdge";
  node: TeacherSubjectsSubjectPointSystemSubectUserFragment_edges_node | null;
}

export interface TeacherSubjectsSubjectPointSystemSubectUserFragment {
  __typename: "UserConnection";
  edges: (TeacherSubjectsSubjectPointSystemSubectUserFragment_edges | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface changePasswordUserInput {
  oldPassword: string;
  newPassword: string;
  clientMutationId?: string | null;
}

export interface createAclRoleInput {
  name: string;
  resources?: (string | null)[] | null;
  clientMutationId?: string | null;
}

export interface createClassGroupInput {
  year: number;
  section: string;
  teacher?: string | null;
  clientMutationId?: string | null;
}

export interface createExamInput {
  name: string;
  subject?: string | null;
  writtenAt: string;
  clientMutationId?: string | null;
}

export interface createGroupInput {
  section: string;
  clientMutationId?: string | null;
}

export interface createOrUpdatePointSystemInput {
  exam: string;
  maxPoints: number;
  points?: createPointInput[] | null;
  clientMutationId?: string | null;
}

export interface createPointInput {
  user: string;
  points: number;
  examWritten: boolean;
  clientMutationId?: string | null;
}

export interface createSchoolPeriodInput {
  quarter: number;
  from: string;
  to: string;
  schoolYear: number;
  clientMutationId?: string | null;
}

export interface createSubjectInput {
  subjectType?: string | null;
  teacher: string;
  iGroupIri: string;
  clientMutationId?: string | null;
}

export interface createSubjectTypeInput {
  name: string;
  clientMutationId?: string | null;
}

export interface createUserInput {
  email: string;
  role: string;
  lastname: string;
  firstname: string;
  rawPassword?: string | null;
  clientMutationId?: string | null;
}

export interface deleteAclRoleInput {
  id: string;
  clientMutationId?: string | null;
}

export interface deleteClassGroupInput {
  id: string;
  clientMutationId?: string | null;
}

export interface deleteExamInput {
  id: string;
  clientMutationId?: string | null;
}

export interface deleteGroupInput {
  id: string;
  clientMutationId?: string | null;
}

export interface deleteSchoolPeriodInput {
  id: string;
  clientMutationId?: string | null;
}

export interface deleteSubjectInput {
  id: string;
  clientMutationId?: string | null;
}

export interface deleteSubjectTypeInput {
  id: string;
  clientMutationId?: string | null;
}

export interface markReadAllNotificationsUserInput {
  clientMutationId?: string | null;
}

export interface markReadNotificationUserInput {
  id: string;
  clientMutationId?: string | null;
}

export interface updateAclRoleInput {
  id: string;
  name?: string | null;
  resources?: (string | null)[] | null;
  clientMutationId?: string | null;
}

export interface updateClassGroupInput {
  id: string;
  year?: number | null;
  section?: string | null;
  teacher?: string | null;
  clientMutationId?: string | null;
}

export interface updateColorSubjectInput {
  id: string;
  teacherCardColor?: string | null;
  clientMutationId?: string | null;
}

export interface updateExamInput {
  id: string;
  name?: string | null;
  subject?: string | null;
  writtenAt?: string | null;
  clientMutationId?: string | null;
}

export interface updateGroupInput {
  id: string;
  section?: string | null;
  clientMutationId?: string | null;
}

export interface updatePercentToMarkConvertInput {
  id: string;
  one?: number | null;
  two?: number | null;
  three?: number | null;
  four?: number | null;
  clientMutationId?: string | null;
}

export interface updateSchoolPeriodInput {
  id: string;
  quarter?: number | null;
  from?: string | null;
  to?: string | null;
  schoolYear?: number | null;
  clientMutationId?: string | null;
}

export interface updateSubjectInput {
  id: string;
  subjectType?: string | null;
  teacher?: string | null;
  iGroupIri?: string | null;
  clientMutationId?: string | null;
}

export interface updateSubjectTypeInput {
  id: string;
  name?: string | null;
  clientMutationId?: string | null;
}

export interface updateUserInput {
  id: string;
  email?: string | null;
  role?: string | null;
  lastname?: string | null;
  firstname?: string | null;
  rawPassword?: string | null;
  clientMutationId?: string | null;
}

export interface updateUsersClassGroupInput {
  id: string;
  addUsers?: (string | null)[] | null;
  deleteUsers?: (string | null)[] | null;
  clientMutationId?: string | null;
}

export interface updateUsersGroupInput {
  id: string;
  addUsers?: (string | null)[] | null;
  deleteUsers?: (string | null)[] | null;
  clientMutationId?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
