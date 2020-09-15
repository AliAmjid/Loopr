/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WithPageMeUserQuery
// ====================================================

export interface WithPageMeUserQuery_meUser_role {
  __typename: "AclRole";
  /**
   * Example format: ROLE_ADMIN.
   * Must start with 'ROLE_' and name cant be longer than 20 letters.
   * (regex: ^ROLE_[A-Z]{1,20}$/m)
   */
  name: string;
}

export interface WithPageMeUserQuery_meUser {
  __typename: "User";
  id: string;
  name: string;
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
  __typename: "AclRoleItem";
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
  __typename: "AclRoleItem";
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
  __typename: "AclResourceItem";
  id: string;
}

export interface AclCreateAclRole_createAclRole_aclRole {
  __typename: "AclRoleItem";
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
  __typename: "AclResourceItem";
  id: string;
}

export interface AclUpdateAclMutation_updateAclRole_aclRole {
  __typename: "AclRoleItem";
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
  id: string;
  resources: string[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AclTableQuery
// ====================================================

export interface AclTableQuery_aclResources {
  __typename: "AclResourceCollection";
  id: string;
  name: string;
}

export interface AclTableQuery_aclRoles_resources {
  __typename: "AclResourceCollection";
  id: string;
}

export interface AclTableQuery_aclRoles {
  __typename: "AclRoleCollection";
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
  username: string;
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
  name: string;
}

export interface LoginMeUserQuery {
  meUser: LoginMeUserQuery_meUser | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UsersUsersQuery
// ====================================================

export interface UsersUsersQuery_users_edges_node_role {
  __typename: "AclRoleCollection";
  id: string;
  /**
   * Example format: ROLE_ADMIN.
   * Must start with 'ROLE_' and name cant be longer than 20 letters.
   * (regex: ^ROLE_[A-Z]{1,20}$/m)
   */
  name: string;
}

export interface UsersUsersQuery_users_edges_node {
  __typename: "UserCollection";
  id: string;
  name: string;
  createdAt: string;
  role: UsersUsersQuery_users_edges_node_role;
}

export interface UsersUsersQuery_users_edges {
  __typename: "UserCollectionEdge";
  node: UsersUsersQuery_users_edges_node | null;
  cursor: string;
}

export interface UsersUsersQuery_users {
  __typename: "UserCollectionConnection";
  edges: (UsersUsersQuery_users_edges | null)[] | null;
}

export interface UsersUsersQuery {
  users: UsersUsersQuery_users | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface createAclRoleInput {
  clientMutationId?: string | null;
  name: string;
  resources?: (string | null)[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
