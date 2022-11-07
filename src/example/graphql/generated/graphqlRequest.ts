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
  uuid: any;
};

/** columns and relationships of "address" */
export type Address = {
  __typename?: 'Address';
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  countryCode: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  deletedAt?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  postalCode: Scalars['numeric'];
  state: Scalars['String'];
  stateCode: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  userId: Scalars['uuid'];
};

/** aggregated selection of "address" */
export type AddressAggregate = {
  __typename?: 'AddressAggregate';
  aggregate?: Maybe<AddressAggregateFields>;
  nodes: Array<Address>;
};

/** aggregate fields of "address" */
export type AddressAggregateFields = {
  __typename?: 'AddressAggregateFields';
  avg?: Maybe<AddressAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<AddressMaxFields>;
  min?: Maybe<AddressMinFields>;
  stddev?: Maybe<AddressStddevFields>;
  stddevPop?: Maybe<AddressStddev_PopFields>;
  stddevSamp?: Maybe<AddressStddev_SampFields>;
  sum?: Maybe<AddressSumFields>;
  varPop?: Maybe<AddressVar_PopFields>;
  varSamp?: Maybe<AddressVar_SampFields>;
  variance?: Maybe<AddressVarianceFields>;
};


/** aggregate fields of "address" */
export type AddressAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<AddressSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type AddressAvgFields = {
  __typename?: 'AddressAvgFields';
  postalCode?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "address". All fields are combined with a logical 'AND'. */
export type AddressBoolExp = {
  _and?: InputMaybe<Array<AddressBoolExp>>;
  _not?: InputMaybe<AddressBoolExp>;
  _or?: InputMaybe<Array<AddressBoolExp>>;
  address1?: InputMaybe<StringComparisonExp>;
  address2?: InputMaybe<StringComparisonExp>;
  city?: InputMaybe<StringComparisonExp>;
  country?: InputMaybe<StringComparisonExp>;
  countryCode?: InputMaybe<StringComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  deletedAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  postalCode?: InputMaybe<NumericComparisonExp>;
  state?: InputMaybe<StringComparisonExp>;
  stateCode?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  userId?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "address" */
export enum AddressConstraint {
  /** unique or primary key constraint on columns "id" */
  AddressPkey = 'address_pkey'
}

/** input type for incrementing numeric columns in table "address" */
export type AddressIncInput = {
  postalCode?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "address" */
export type AddressInsertInput = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  postalCode?: InputMaybe<Scalars['numeric']>;
  state?: InputMaybe<Scalars['String']>;
  stateCode?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type AddressMaxFields = {
  __typename?: 'AddressMaxFields';
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  postalCode?: Maybe<Scalars['numeric']>;
  state?: Maybe<Scalars['String']>;
  stateCode?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type AddressMinFields = {
  __typename?: 'AddressMinFields';
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  postalCode?: Maybe<Scalars['numeric']>;
  state?: Maybe<Scalars['String']>;
  stateCode?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "address" */
export type AddressMutationResponse = {
  __typename?: 'AddressMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Address>;
};

/** on_conflict condition type for table "address" */
export type AddressOnConflict = {
  constraint: AddressConstraint;
  update_columns?: Array<AddressUpdateColumn>;
  where?: InputMaybe<AddressBoolExp>;
};

/** Ordering options when selecting data from "address". */
export type AddressOrderBy = {
  address1?: InputMaybe<OrderBy>;
  address2?: InputMaybe<OrderBy>;
  city?: InputMaybe<OrderBy>;
  country?: InputMaybe<OrderBy>;
  countryCode?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  deletedAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  postalCode?: InputMaybe<OrderBy>;
  state?: InputMaybe<OrderBy>;
  stateCode?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: address */
export type AddressPkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "address" */
export enum AddressSelectColumn {
  /** column name */
  Address1 = 'address1',
  /** column name */
  Address2 = 'address2',
  /** column name */
  City = 'city',
  /** column name */
  Country = 'country',
  /** column name */
  CountryCode = 'countryCode',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  Id = 'id',
  /** column name */
  PostalCode = 'postalCode',
  /** column name */
  State = 'state',
  /** column name */
  StateCode = 'stateCode',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "address" */
export type AddressSetInput = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  postalCode?: InputMaybe<Scalars['numeric']>;
  state?: InputMaybe<Scalars['String']>;
  stateCode?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type AddressStddevFields = {
  __typename?: 'AddressStddevFields';
  postalCode?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type AddressStddev_PopFields = {
  __typename?: 'AddressStddev_popFields';
  postalCode?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type AddressStddev_SampFields = {
  __typename?: 'AddressStddev_sampFields';
  postalCode?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type AddressSumFields = {
  __typename?: 'AddressSumFields';
  postalCode?: Maybe<Scalars['numeric']>;
};

/** update columns of table "address" */
export enum AddressUpdateColumn {
  /** column name */
  Address1 = 'address1',
  /** column name */
  Address2 = 'address2',
  /** column name */
  City = 'city',
  /** column name */
  Country = 'country',
  /** column name */
  CountryCode = 'countryCode',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  Id = 'id',
  /** column name */
  PostalCode = 'postalCode',
  /** column name */
  State = 'state',
  /** column name */
  StateCode = 'stateCode',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

export type AddressUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<AddressIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AddressSetInput>;
  where: AddressBoolExp;
};

/** aggregate var_pop on columns */
export type AddressVar_PopFields = {
  __typename?: 'AddressVar_popFields';
  postalCode?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type AddressVar_SampFields = {
  __typename?: 'AddressVar_sampFields';
  postalCode?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type AddressVarianceFields = {
  __typename?: 'AddressVarianceFields';
  postalCode?: Maybe<Scalars['Float']>;
};

/** ordering argument of a cursor */
export enum CursorOrdering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

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
  createdAt: Scalars['timestamptz'];
  deletedAt?: Maybe<Scalars['timestamptz']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['uuid'];
  lastName: Scalars['String'];
  phone?: Maybe<Scalars['numeric']>;
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
  stddevPop?: Maybe<UsersStddev_PopFields>;
  stddevSamp?: Maybe<UsersStddev_SampFields>;
  sum?: Maybe<UsersSumFields>;
  varPop?: Maybe<UsersVar_PopFields>;
  varSamp?: Maybe<UsersVar_SampFields>;
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
  phone?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type UsersBoolExp = {
  _and?: InputMaybe<Array<UsersBoolExp>>;
  _not?: InputMaybe<UsersBoolExp>;
  _or?: InputMaybe<Array<UsersBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  deletedAt?: InputMaybe<TimestamptzComparisonExp>;
  email?: InputMaybe<StringComparisonExp>;
  firstName?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  lastName?: InputMaybe<StringComparisonExp>;
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
  phone?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "users" */
export type UsersInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['numeric']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type UsersMaxFields = {
  __typename?: 'UsersMaxFields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['numeric']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type UsersMinFields = {
  __typename?: 'UsersMinFields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  lastName?: Maybe<Scalars['String']>;
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
  createdAt?: InputMaybe<OrderBy>;
  deletedAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  firstName?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  lastName?: InputMaybe<OrderBy>;
  phone?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: users */
export type UsersPkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "users" */
export enum UsersSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'firstName',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'lastName',
  /** column name */
  Phone = 'phone',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "users" */
export type UsersSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['numeric']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type UsersStddevFields = {
  __typename?: 'UsersStddevFields';
  phone?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type UsersStddev_PopFields = {
  __typename?: 'UsersStddev_popFields';
  phone?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type UsersStddev_SampFields = {
  __typename?: 'UsersStddev_sampFields';
  phone?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type UsersSumFields = {
  __typename?: 'UsersSumFields';
  phone?: Maybe<Scalars['numeric']>;
};

/** update columns of table "users" */
export enum UsersUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'firstName',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'lastName',
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
export type UsersVar_PopFields = {
  __typename?: 'UsersVar_popFields';
  phone?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type UsersVar_SampFields = {
  __typename?: 'UsersVar_sampFields';
  phone?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type UsersVarianceFields = {
  __typename?: 'UsersVarianceFields';
  phone?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type UuidComparisonExp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

/** Streaming cursor of the table "address" */
export type Address_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Address_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Address_StreamCursorValueInput = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  postalCode?: InputMaybe<Scalars['numeric']>;
  state?: InputMaybe<Scalars['String']>;
  stateCode?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "address" */
  deleteAddress?: Maybe<AddressMutationResponse>;
  /** delete single row from the table: "address" */
  deleteAddressByPk?: Maybe<Address>;
  /** delete data from the table: "users" */
  deleteUsers?: Maybe<UsersMutationResponse>;
  /** delete single row from the table: "users" */
  deleteUsersByPk?: Maybe<Users>;
  /** insert data into the table: "address" */
  insertAddress?: Maybe<AddressMutationResponse>;
  /** insert a single row into the table: "address" */
  insertAddressOne?: Maybe<Address>;
  /** insert data into the table: "users" */
  insertUsers?: Maybe<UsersMutationResponse>;
  /** insert a single row into the table: "users" */
  insertUsersOne?: Maybe<Users>;
  /** update data of the table: "address" */
  updateAddress?: Maybe<AddressMutationResponse>;
  /** update single row of the table: "address" */
  updateAddressByPk?: Maybe<Address>;
  /** update multiples rows of table: "address" */
  updateAddressMany?: Maybe<Array<Maybe<AddressMutationResponse>>>;
  /** update data of the table: "users" */
  updateUsers?: Maybe<UsersMutationResponse>;
  /** update single row of the table: "users" */
  updateUsersByPk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  updateUsersMany?: Maybe<Array<Maybe<UsersMutationResponse>>>;
};


/** mutation root */
export type Mutation_RootDeleteAddressArgs = {
  where: AddressBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteAddressByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteUsersArgs = {
  where: UsersBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteUsersByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsertAddressArgs = {
  objects: Array<AddressInsertInput>;
  onConflict?: InputMaybe<AddressOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAddressOneArgs = {
  object: AddressInsertInput;
  onConflict?: InputMaybe<AddressOnConflict>;
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
export type Mutation_RootUpdateAddressArgs = {
  _inc?: InputMaybe<AddressIncInput>;
  _set?: InputMaybe<AddressSetInput>;
  where: AddressBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateAddressByPkArgs = {
  _inc?: InputMaybe<AddressIncInput>;
  _set?: InputMaybe<AddressSetInput>;
  pk_columns: AddressPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateAddressManyArgs = {
  updates: Array<AddressUpdates>;
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
  /** fetch data from the table: "address" */
  address: Array<Address>;
  /** fetch aggregated fields from the table: "address" */
  addressAggregate: AddressAggregate;
  /** fetch data from the table: "address" using primary key columns */
  addressByPk?: Maybe<Address>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  usersByPk?: Maybe<Users>;
};


export type Query_RootAddressArgs = {
  distinctOn?: InputMaybe<Array<AddressSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AddressOrderBy>>;
  where?: InputMaybe<AddressBoolExp>;
};


export type Query_RootAddressAggregateArgs = {
  distinctOn?: InputMaybe<Array<AddressSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AddressOrderBy>>;
  where?: InputMaybe<AddressBoolExp>;
};


export type Query_RootAddressByPkArgs = {
  id: Scalars['uuid'];
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
  id: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "address" */
  address: Array<Address>;
  /** fetch aggregated fields from the table: "address" */
  addressAggregate: AddressAggregate;
  /** fetch data from the table: "address" using primary key columns */
  addressByPk?: Maybe<Address>;
  /** fetch data from the table in a streaming manner : "address" */
  addressStream: Array<Address>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  usersByPk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner : "users" */
  usersStream: Array<Users>;
};


export type Subscription_RootAddressArgs = {
  distinctOn?: InputMaybe<Array<AddressSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AddressOrderBy>>;
  where?: InputMaybe<AddressBoolExp>;
};


export type Subscription_RootAddressAggregateArgs = {
  distinctOn?: InputMaybe<Array<AddressSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AddressOrderBy>>;
  where?: InputMaybe<AddressBoolExp>;
};


export type Subscription_RootAddressByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAddressStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Address_StreamCursorInput>>;
  where?: InputMaybe<AddressBoolExp>;
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
  id: Scalars['uuid'];
};


export type Subscription_RootUsersStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Users_StreamCursorInput>>;
  where?: InputMaybe<UsersBoolExp>;
};

/** Streaming cursor of the table "users" */
export type Users_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Users_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_StreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['numeric']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

export type AddressFieldsFragment = { __typename?: 'Address', id: any, address1: string, address2: string, country: string, state: string, city: string, postalCode: any, userId: any };

export type UpsertAddressMutationVariables = Exact<{
  objects: Array<AddressInsertInput> | AddressInsertInput;
}>;


export type UpsertAddressMutation = { __typename?: 'mutation_root', insertAddress?: { __typename?: 'AddressMutationResponse', affected_rows: number } | null };

export type AddressByUserIdQueryVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type AddressByUserIdQuery = { __typename?: 'query_root', address: Array<{ __typename?: 'Address', id: any, address1: string, address2: string, country: string, state: string, city: string, postalCode: any, userId: any }> };

export type UserFieldsFragment = { __typename?: 'Users', id: any, firstName: string, lastName: string, email: string };

export type UpsertUsersMutationVariables = Exact<{
  objects: Array<UsersInsertInput> | UsersInsertInput;
}>;


export type UpsertUsersMutation = { __typename?: 'mutation_root', insertUsers?: { __typename?: 'UsersMutationResponse', affected_rows: number } | null };

export type UserByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type UserByIdQuery = { __typename?: 'query_root', usersById?: { __typename?: 'Users', id: any, firstName: string, lastName: string, email: string } | null };

export const AddressFieldsFragmentDoc = gql`
    fragment addressFields on Address {
  id
  address1
  address2
  country
  state
  city
  postalCode
  userId
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment userFields on Users {
  id
  firstName
  lastName
  email
}
    `;
export const UpsertAddressDocument = gql`
    mutation upsertAddress($objects: [AddressInsertInput!]!) {
  insertAddress(
    objects: $objects
    onConflict: {constraint: address_pkey, update_columns: [address1, address2, country, state, city, postalCode, userId]}
  ) {
    affected_rows
  }
}
    `;
export const AddressByUserIdDocument = gql`
    query addressByUserId($userId: uuid!) {
  address(where: {userId: {_eq: $userId}}) {
    ...addressFields
  }
}
    ${AddressFieldsFragmentDoc}`;
export const UpsertUsersDocument = gql`
    mutation upsertUsers($objects: [UsersInsertInput!]!) {
  insertUsers(
    objects: $objects
    onConflict: {constraint: users_pkey, update_columns: [email, firstName, lastName]}
  ) {
    affected_rows
  }
}
    `;
export const UserByIdDocument = gql`
    query userById($id: uuid!) {
  usersById: usersByPk(id: $id) {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    upsertAddress(variables: UpsertAddressMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertAddressMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertAddressMutation>(UpsertAddressDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'upsertAddress', 'mutation');
    },
    addressByUserId(variables: AddressByUserIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddressByUserIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddressByUserIdQuery>(AddressByUserIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addressByUserId', 'query');
    },
    upsertUsers(variables: UpsertUsersMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertUsersMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertUsersMutation>(UpsertUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'upsertUsers', 'mutation');
    },
    userById(variables: UserByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserByIdQuery>(UserByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'userById', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;