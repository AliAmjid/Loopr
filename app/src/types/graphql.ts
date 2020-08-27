/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WithPageMeUserQuery
// ====================================================

export interface WithPageMeUserQuery_meUser {
  __typename: "User";
  id: string;
  name: string;
}

export interface WithPageMeUserQuery {
  meUser: WithPageMeUserQuery_meUser | null;
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

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
