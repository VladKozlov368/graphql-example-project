import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { MyContext } from '../context';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
  DateTime: any;
};


export type Query = {
  __typename?: 'Query';
  /** Returns user profile by accessToken. */
  profile: Admin;
  /** Returns user profile by accessToken. */
  show?: Maybe<Scalars['String']>;
  /** Returns user profile by accessToken. */
  showArr?: Maybe<Scalars['String']>;
  /** Returns user profile by accessToken. */
  user: User;
};


export type QueryShowArgs = {
  show: ShowInput;
};


export type QueryShowArrArgs = {
  show?: Maybe<Array<ShowInput>>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type ShowInput = {
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  linkApplePodcasts?: Maybe<Scalars['String']>;
  linkSpotify?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Login by email and password. */
  adminSignIn: AuthPayload;
  /** Login by email and password. */
  adminSignUp: AuthPayload;
  /** Generate a new pair of tokens: accessToken and refreshToken. Requires refreshToken in request header. */
  token: AuthPayload;
  /** Login by email and password. */
  userSignUp: UserPayload;
};


export type MutationAdminSignInArgs = {
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};


export type MutationAdminSignUpArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUserSignUpArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Admin = {
  __typename?: 'Admin';
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  admin: Admin;
};

export type UserPayload = {
  __typename?: 'UserPayload';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};




export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  Query: ResolverTypeWrapper<{}>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  ShowInput: ShowInput,
  Mutation: ResolverTypeWrapper<{}>,
  Admin: ResolverTypeWrapper<Admin>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  User: ResolverTypeWrapper<User>,
  AuthPayload: ResolverTypeWrapper<AuthPayload>,
  UserPayload: ResolverTypeWrapper<UserPayload>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Upload: Scalars['Upload'],
  Query: {},
  Int: Scalars['Int'],
  ShowInput: ShowInput,
  Mutation: {},
  Admin: Admin,
  ID: Scalars['ID'],
  User: User,
  AuthPayload: AuthPayload,
  UserPayload: UserPayload,
  DateTime: Scalars['DateTime'],
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  profile?: Resolver<ResolversTypes['Admin'], ParentType, ContextType>,
  show?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryShowArgs, 'show'>>,
  showArr?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryShowArrArgs, never>>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
};

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  adminSignIn?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationAdminSignInArgs, 'email'>>,
  adminSignUp?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationAdminSignUpArgs, 'email' | 'password'>>,
  token?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType>,
  userSignUp?: Resolver<ResolversTypes['UserPayload'], ParentType, ContextType, RequireFields<MutationUserSignUpArgs, 'firstName' | 'lastName' | 'email' | 'password'>>,
};

export type AdminResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Admin'] = ResolversParentTypes['Admin']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type AuthPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  admin?: Resolver<ResolversTypes['Admin'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserPayload'] = ResolversParentTypes['UserPayload']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type Resolvers<ContextType = MyContext> = {
  Upload?: GraphQLScalarType,
  Query?: QueryResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Admin?: AdminResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  AuthPayload?: AuthPayloadResolvers<ContextType>,
  UserPayload?: UserPayloadResolvers<ContextType>,
  DateTime?: GraphQLScalarType,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = MyContext> = Resolvers<ContextType>;
