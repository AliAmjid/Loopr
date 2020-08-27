/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoggedUserQuery
// ====================================================

export interface LoggedUserQuery_meUser {
  __typename: "User";
  id: string;
  name: string;
}

export interface LoggedUserQuery {
  meUser: LoggedUserQuery_meUser | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTokenQuery
// ====================================================

export interface GetTokenQuery_getToken {
  __typename: "Token";
  /**
   * Use token in header like this: 'Authorization: Bearer {token}'
   */
  token: string;
}

export interface GetTokenQuery {
  getToken: GetTokenQuery_getToken | null;
}

export interface GetTokenQueryVariables {
  username: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AlreadyLoggedUserQuery
// ====================================================

export interface AlreadyLoggedUserQuery_meUser {
  __typename: "User";
  id: string;
  name: string;
}

export interface AlreadyLoggedUserQuery {
  meUser: AlreadyLoggedUserQuery_meUser | null;
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
