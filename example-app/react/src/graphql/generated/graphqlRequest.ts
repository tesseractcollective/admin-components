import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  numeric: any;
  timestamptz: any;
};

/** columns and relationships of "addresses" */
export type Addresses = {
  __typename?: 'Addresses';
  address1: Scalars['String'];
  address2: Scalars['String'];
  countryCode: Scalars['String'];
  countryName: Scalars['String'];
  id: Scalars['Int'];
  postalCode: Scalars['numeric'];
  stateCode: Scalars['String'];
  stateName: Scalars['String'];
  userId: Scalars['Int'];
};

/** aggregated selection of "addresses" */
export type AddressesAggregate = {
  __typename?: 'AddressesAggregate';
  aggregate?: Maybe<AddressesAggregateFields>;
  nodes: Array<Addresses>;
};

/** aggregate fields of "addresses" */
export type AddressesAggregateFields = {
  __typename?: 'AddressesAggregateFields';
  avg?: Maybe<AddressesAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<AddressesMaxFields>;
  min?: Maybe<AddressesMinFields>;
  stddev?: Maybe<AddressesStddevFields>;
  stddevPop?: Maybe<AddressesStddevPopFields>;
  stddevSamp?: Maybe<AddressesStddevSampFields>;
  sum?: Maybe<AddressesSumFields>;
  varPop?: Maybe<AddressesVarPopFields>;
  varSamp?: Maybe<AddressesVarSampFields>;
  variance?: Maybe<AddressesVarianceFields>;
};


/** aggregate fields of "addresses" */
export type AddressesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<AddressesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type AddressesAvgFields = {
  __typename?: 'AddressesAvgFields';
  id?: Maybe<Scalars['Float']>;
  postalCode?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "addresses". All fields are combined with a logical 'AND'. */
export type AddressesBoolExp = {
  _and?: InputMaybe<Array<AddressesBoolExp>>;
  _not?: InputMaybe<AddressesBoolExp>;
  _or?: InputMaybe<Array<AddressesBoolExp>>;
  address1?: InputMaybe<StringComparisonExp>;
  address2?: InputMaybe<StringComparisonExp>;
  countryCode?: InputMaybe<StringComparisonExp>;
  countryName?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  postalCode?: InputMaybe<NumericComparisonExp>;
  stateCode?: InputMaybe<StringComparisonExp>;
  stateName?: InputMaybe<StringComparisonExp>;
  userId?: InputMaybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "addresses" */
export enum AddressesConstraint {
  /** unique or primary key constraint on columns "id" */
  AddressesPkey = 'addresses_pkey'
}

/** input type for incrementing numeric columns in table "addresses" */
export type AddressesIncInput = {
  id?: InputMaybe<Scalars['Int']>;
  postalCode?: InputMaybe<Scalars['numeric']>;
  userId?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "addresses" */
export type AddressesInsertInput = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  countryName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  postalCode?: InputMaybe<Scalars['numeric']>;
  stateCode?: InputMaybe<Scalars['String']>;
  stateName?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type AddressesMaxFields = {
  __typename?: 'AddressesMaxFields';
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  countryName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  postalCode?: Maybe<Scalars['numeric']>;
  stateCode?: Maybe<Scalars['String']>;
  stateName?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type AddressesMinFields = {
  __typename?: 'AddressesMinFields';
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  countryName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  postalCode?: Maybe<Scalars['numeric']>;
  stateCode?: Maybe<Scalars['String']>;
  stateName?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "addresses" */
export type AddressesMutationResponse = {
  __typename?: 'AddressesMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Addresses>;
};

/** on_conflict condition type for table "addresses" */
export type AddressesOnConflict = {
  constraint: AddressesConstraint;
  update_columns?: Array<AddressesUpdateColumn>;
  where?: InputMaybe<AddressesBoolExp>;
};

/** Ordering options when selecting data from "addresses". */
export type AddressesOrderBy = {
  address1?: InputMaybe<OrderBy>;
  address2?: InputMaybe<OrderBy>;
  countryCode?: InputMaybe<OrderBy>;
  countryName?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  postalCode?: InputMaybe<OrderBy>;
  stateCode?: InputMaybe<OrderBy>;
  stateName?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: addresses */
export type AddressesPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "addresses" */
export enum AddressesSelectColumn {
  /** column name */
  Address1 = 'address1',
  /** column name */
  Address2 = 'address2',
  /** column name */
  CountryCode = 'countryCode',
  /** column name */
  CountryName = 'countryName',
  /** column name */
  Id = 'id',
  /** column name */
  PostalCode = 'postalCode',
  /** column name */
  StateCode = 'stateCode',
  /** column name */
  StateName = 'stateName',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "addresses" */
export type AddressesSetInput = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  countryName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  postalCode?: InputMaybe<Scalars['numeric']>;
  stateCode?: InputMaybe<Scalars['String']>;
  stateName?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type AddressesStddevFields = {
  __typename?: 'AddressesStddevFields';
  id?: Maybe<Scalars['Float']>;
  postalCode?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type AddressesStddevPopFields = {
  __typename?: 'AddressesStddevPopFields';
  id?: Maybe<Scalars['Float']>;
  postalCode?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type AddressesStddevSampFields = {
  __typename?: 'AddressesStddevSampFields';
  id?: Maybe<Scalars['Float']>;
  postalCode?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "addresses" */
export type AddressesStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: AddressesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type AddressesStreamCursorValueInput = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  countryName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  postalCode?: InputMaybe<Scalars['numeric']>;
  stateCode?: InputMaybe<Scalars['String']>;
  stateName?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type AddressesSumFields = {
  __typename?: 'AddressesSumFields';
  id?: Maybe<Scalars['Int']>;
  postalCode?: Maybe<Scalars['numeric']>;
  userId?: Maybe<Scalars['Int']>;
};

/** update columns of table "addresses" */
export enum AddressesUpdateColumn {
  /** column name */
  Address1 = 'address1',
  /** column name */
  Address2 = 'address2',
  /** column name */
  CountryCode = 'countryCode',
  /** column name */
  CountryName = 'countryName',
  /** column name */
  Id = 'id',
  /** column name */
  PostalCode = 'postalCode',
  /** column name */
  StateCode = 'stateCode',
  /** column name */
  StateName = 'stateName',
  /** column name */
  UserId = 'userId'
}

export type AddressesUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<AddressesIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AddressesSetInput>;
  where: AddressesBoolExp;
};

/** aggregate var_pop on columns */
export type AddressesVarPopFields = {
  __typename?: 'AddressesVarPopFields';
  id?: Maybe<Scalars['Float']>;
  postalCode?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type AddressesVarSampFields = {
  __typename?: 'AddressesVarSampFields';
  id?: Maybe<Scalars['Float']>;
  postalCode?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type AddressesVarianceFields = {
  __typename?: 'AddressesVarianceFields';
  id?: Maybe<Scalars['Float']>;
  postalCode?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** ordering argument of a cursor */
export enum CursorOrdering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type NumericComparisonExp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  Asc = 'ASC',
  /** in ascending order, nulls first */
  AscNullsFirst = 'ASC_NULLS_FIRST',
  /** in ascending order, nulls last */
  AscNullsLast = 'ASC_NULLS_LAST',
  /** in descending order, nulls first */
  Desc = 'DESC',
  /** in descending order, nulls first */
  DescNullsFirst = 'DESC_NULLS_FIRST',
  /** in descending order, nulls last */
  DescNullsLast = 'DESC_NULLS_LAST'
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'Users';
  countryCode: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  deletedAt?: Maybe<Scalars['timestamptz']>;
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  phone: Scalars['numeric'];
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "users" */
export type UsersAggregate = {
  __typename?: 'UsersAggregate';
  aggregate?: Maybe<UsersAggregateFields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type UsersAggregateFields = {
  __typename?: 'UsersAggregateFields';
  avg?: Maybe<UsersAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<UsersMaxFields>;
  min?: Maybe<UsersMinFields>;
  stddev?: Maybe<UsersStddevFields>;
  stddevPop?: Maybe<UsersStddevPopFields>;
  stddevSamp?: Maybe<UsersStddevSampFields>;
  sum?: Maybe<UsersSumFields>;
  varPop?: Maybe<UsersVarPopFields>;
  varSamp?: Maybe<UsersVarSampFields>;
  variance?: Maybe<UsersVarianceFields>;
};


/** aggregate fields of "users" */
export type UsersAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<UsersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type UsersAvgFields = {
  __typename?: 'UsersAvgFields';
  id?: Maybe<Scalars['Float']>;
  phone?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type UsersBoolExp = {
  _and?: InputMaybe<Array<UsersBoolExp>>;
  _not?: InputMaybe<UsersBoolExp>;
  _or?: InputMaybe<Array<UsersBoolExp>>;
  countryCode?: InputMaybe<StringComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  deletedAt?: InputMaybe<TimestamptzComparisonExp>;
  email?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  phone?: InputMaybe<NumericComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "users" */
export enum UsersConstraint {
  /** unique or primary key constraint on columns "email" */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey'
}

/** input type for incrementing numeric columns in table "users" */
export type UsersIncInput = {
  id?: InputMaybe<Scalars['Int']>;
  phone?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "users" */
export type UsersInsertInput = {
  countryCode?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['numeric']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type UsersMaxFields = {
  __typename?: 'UsersMaxFields';
  countryCode?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['numeric']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type UsersMinFields = {
  __typename?: 'UsersMinFields';
  countryCode?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['numeric']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "users" */
export type UsersMutationResponse = {
  __typename?: 'UsersMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** on_conflict condition type for table "users" */
export type UsersOnConflict = {
  constraint: UsersConstraint;
  update_columns?: Array<UsersUpdateColumn>;
  where?: InputMaybe<UsersBoolExp>;
};

/** Ordering options when selecting data from "users". */
export type UsersOrderBy = {
  countryCode?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  deletedAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  phone?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: users */
export type UsersPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "users" */
export enum UsersSelectColumn {
  /** column name */
  CountryCode = 'countryCode',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "users" */
export type UsersSetInput = {
  countryCode?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['numeric']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type UsersStddevFields = {
  __typename?: 'UsersStddevFields';
  id?: Maybe<Scalars['Float']>;
  phone?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type UsersStddevPopFields = {
  __typename?: 'UsersStddevPopFields';
  id?: Maybe<Scalars['Float']>;
  phone?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type UsersStddevSampFields = {
  __typename?: 'UsersStddevSampFields';
  id?: Maybe<Scalars['Float']>;
  phone?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "users" */
export type UsersStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: UsersStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UsersStreamCursorValueInput = {
  countryCode?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['numeric']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type UsersSumFields = {
  __typename?: 'UsersSumFields';
  id?: Maybe<Scalars['Int']>;
  phone?: Maybe<Scalars['numeric']>;
};

/** update columns of table "users" */
export enum UsersUpdateColumn {
  /** column name */
  CountryCode = 'countryCode',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type UsersUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<UsersIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UsersSetInput>;
  where: UsersBoolExp;
};

/** aggregate var_pop on columns */
export type UsersVarPopFields = {
  __typename?: 'UsersVarPopFields';
  id?: Maybe<Scalars['Float']>;
  phone?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type UsersVarSampFields = {
  __typename?: 'UsersVarSampFields';
  id?: Maybe<Scalars['Float']>;
  phone?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type UsersVarianceFields = {
  __typename?: 'UsersVarianceFields';
  id?: Maybe<Scalars['Float']>;
  phone?: Maybe<Scalars['Float']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "addresses" */
  deleteAddresses?: Maybe<AddressesMutationResponse>;
  /** delete single row from the table: "addresses" */
  deleteAddressesByPk?: Maybe<Addresses>;
  /** delete data from the table: "users" */
  deleteUsers?: Maybe<UsersMutationResponse>;
  /** delete single row from the table: "users" */
  deleteUsersByPk?: Maybe<Users>;
  /** insert data into the table: "addresses" */
  insertAddresses?: Maybe<AddressesMutationResponse>;
  /** insert a single row into the table: "addresses" */
  insertAddressesOne?: Maybe<Addresses>;
  /** insert data into the table: "users" */
  insertUsers?: Maybe<UsersMutationResponse>;
  /** insert a single row into the table: "users" */
  insertUsersOne?: Maybe<Users>;
  /** update data of the table: "addresses" */
  updateAddresses?: Maybe<AddressesMutationResponse>;
  /** update single row of the table: "addresses" */
  updateAddressesByPk?: Maybe<Addresses>;
  /** update multiples rows of table: "addresses" */
  updateAddressesMany?: Maybe<Array<Maybe<AddressesMutationResponse>>>;
  /** update data of the table: "users" */
  updateUsers?: Maybe<UsersMutationResponse>;
  /** update single row of the table: "users" */
  updateUsersByPk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  updateUsersMany?: Maybe<Array<Maybe<UsersMutationResponse>>>;
};


/** mutation root */
export type Mutation_RootDeleteAddressesArgs = {
  where: AddressesBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteAddressesByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDeleteUsersArgs = {
  where: UsersBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteUsersByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsertAddressesArgs = {
  objects: Array<AddressesInsertInput>;
  onConflict?: InputMaybe<AddressesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAddressesOneArgs = {
  object: AddressesInsertInput;
  onConflict?: InputMaybe<AddressesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersArgs = {
  objects: Array<UsersInsertInput>;
  onConflict?: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersOneArgs = {
  object: UsersInsertInput;
  onConflict?: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type Mutation_RootUpdateAddressesArgs = {
  _inc?: InputMaybe<AddressesIncInput>;
  _set?: InputMaybe<AddressesSetInput>;
  where: AddressesBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateAddressesByPkArgs = {
  _inc?: InputMaybe<AddressesIncInput>;
  _set?: InputMaybe<AddressesSetInput>;
  pk_columns: AddressesPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateAddressesManyArgs = {
  updates: Array<AddressesUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateUsersArgs = {
  _inc?: InputMaybe<UsersIncInput>;
  _set?: InputMaybe<UsersSetInput>;
  where: UsersBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateUsersByPkArgs = {
  _inc?: InputMaybe<UsersIncInput>;
  _set?: InputMaybe<UsersSetInput>;
  pk_columns: UsersPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateUsersManyArgs = {
  updates: Array<UsersUpdates>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "addresses" */
  addresses: Array<Addresses>;
  /** fetch aggregated fields from the table: "addresses" */
  addressesAggregate: AddressesAggregate;
  /** fetch data from the table: "addresses" using primary key columns */
  addressesByPk?: Maybe<Addresses>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  usersByPk?: Maybe<Users>;
};


export type Query_RootAddressesArgs = {
  distinctOn?: InputMaybe<Array<AddressesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AddressesOrderBy>>;
  where?: InputMaybe<AddressesBoolExp>;
};


export type Query_RootAddressesAggregateArgs = {
  distinctOn?: InputMaybe<Array<AddressesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AddressesOrderBy>>;
  where?: InputMaybe<AddressesBoolExp>;
};


export type Query_RootAddressesByPkArgs = {
  id: Scalars['Int'];
};


export type Query_RootUsersArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Query_RootUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Query_RootUsersByPkArgs = {
  id: Scalars['Int'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "addresses" */
  addresses: Array<Addresses>;
  /** fetch aggregated fields from the table: "addresses" */
  addressesAggregate: AddressesAggregate;
  /** fetch data from the table: "addresses" using primary key columns */
  addressesByPk?: Maybe<Addresses>;
  /** fetch data from the table in a streaming manner : "addresses" */
  addressesStream: Array<Addresses>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  usersByPk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner : "users" */
  usersStream: Array<Users>;
};


export type Subscription_RootAddressesArgs = {
  distinctOn?: InputMaybe<Array<AddressesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AddressesOrderBy>>;
  where?: InputMaybe<AddressesBoolExp>;
};


export type Subscription_RootAddressesAggregateArgs = {
  distinctOn?: InputMaybe<Array<AddressesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AddressesOrderBy>>;
  where?: InputMaybe<AddressesBoolExp>;
};


export type Subscription_RootAddressesByPkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootAddressesStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<AddressesStreamCursorInput>>;
  where?: InputMaybe<AddressesBoolExp>;
};


export type Subscription_RootUsersArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootUsersByPkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootUsersStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<UsersStreamCursorInput>>;
  where?: InputMaybe<UsersBoolExp>;
};

export type AddressFieldsFragment = { __typename?: 'Addresses', id: number };

export type AddressByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AddressByIdQuery = { __typename?: 'query_root', addressById?: { __typename?: 'Addresses', id: number } | null };

export type UserFieldsFragment = { __typename?: 'Users', id: number };

export type UserByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserByIdQuery = { __typename?: 'query_root', userById?: { __typename?: 'Users', id: number } | null };

export const AddressFieldsFragmentDoc = gql`
    fragment addressFields on Addresses {
  id
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment userFields on Users {
  id
}
    `;
export const AddressByIdDocument = gql`
    query addressById($id: Int!) {
  addressById: addressesByPk(id: $id) {
    ...addressFields
  }
}
    ${AddressFieldsFragmentDoc}`;
export const UserByIdDocument = gql`
    query userById($id: Int!) {
  userById: usersByPk(id: $id) {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    addressById(variables: AddressByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddressByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddressByIdQuery>(AddressByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addressById', 'query');
    },
    userById(variables: UserByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserByIdQuery>(UserByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'userById', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;