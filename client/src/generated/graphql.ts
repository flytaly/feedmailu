import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<Array<User>>;
  me?: Maybe<User>;
  myOptions: Options;
  myFeeds?: Maybe<Array<UserFeed>>;
  getFeedInfoByToken?: Maybe<UserFeed>;
  myFeedItems: PaginatedItemsResponse;
};


export type QueryGetFeedInfoByTokenArgs = {
  id: Scalars['String'];
  token: Scalars['String'];
};


export type QueryMyFeedItemsArgs = {
  feedId: Scalars['Float'];
  skip?: Maybe<Scalars['Float']>;
  take?: Maybe<Scalars['Float']>;
  filter?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  role: Scalars['String'];
  locale: Scalars['String'];
  timeZone: Scalars['String'];
  userFeeds?: Maybe<Array<UserFeed>>;
  options: Options;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  feeds: Array<UserFeed>;
};

export type UserFeed = {
  __typename?: 'UserFeed';
  id: Scalars['Float'];
  user: User;
  feed: Feed;
  activated: Scalars['Boolean'];
  title?: Maybe<Scalars['String']>;
  schedule: DigestSchedule;
  withContentTable: TernaryState;
  itemBody: TernaryState;
  attachments: TernaryState;
  theme: Theme;
  filter?: Maybe<Scalars['String']>;
  lastDigestSentAt?: Maybe<Scalars['DateTime']>;
  lastViewedItemDate?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  newItemsCount: Scalars['Float'];
};

export type Feed = {
  __typename?: 'Feed';
  id: Scalars['Float'];
  url: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  favicon?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  imageTitle?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  lastSuccessfulUpd: Scalars['DateTime'];
  lastPubdate?: Maybe<Scalars['DateTime']>;
  userFeeds?: Maybe<Array<UserFeed>>;
};


export enum DigestSchedule {
  Realtime = 'realtime',
  Everyhour = 'everyhour',
  Every2hours = 'every2hours',
  Every3hours = 'every3hours',
  Every6hours = 'every6hours',
  Every12hours = 'every12hours',
  Daily = 'daily',
  Disable = 'disable'
}

export enum TernaryState {
  Enable = 'enable',
  Disable = 'disable',
  Default = 'default'
}

export enum Theme {
  Default = 'default',
  Text = 'text'
}

export type Options = {
  __typename?: 'Options';
  dailyDigestHour: Scalars['Float'];
  withContentTableDefault: Scalars['Boolean'];
  itemBodyDefault: Scalars['Boolean'];
  attachmentsDefault?: Maybe<Scalars['Boolean']>;
  themeDefault: Theme;
  customSubject?: Maybe<Scalars['String']>;
  shareEnable: Scalars['Boolean'];
  shareList?: Maybe<Array<ShareId>>;
};

export enum ShareId {
  Pocket = 'pocket',
  Evernote = 'evernote',
  Trello = 'trello'
}

export type PaginatedItemsResponse = {
  __typename?: 'PaginatedItemsResponse';
  items: Array<Item>;
  hasMore: Scalars['Boolean'];
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['Float'];
  guid?: Maybe<Scalars['String']>;
  pubdate?: Maybe<Scalars['DateTime']>;
  link?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  feed: Feed;
  enclosures?: Maybe<Array<Enclosure>>;
  createdAt: Scalars['DateTime'];
};

export type Enclosure = {
  __typename?: 'Enclosure';
  url: Scalars['String'];
  length?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  requestEmailVerification: Scalars['Boolean'];
  requestPasswordReset: MessageResponse;
  resetPassword: UserResponse;
  verifyEmail: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  updateUserInfo: User;
  setOptions: OptionsResponse;
  addFeedWithEmail?: Maybe<UserFeedResponse>;
  addFeedToCurrentUser: UserFeedResponse;
  activateFeed: UserFeedResponse;
  setFeedActivated: UserFeedResponse;
  deleteMyFeeds: DeletedFeedResponse;
  setFeedOptions: UserFeedResponse;
  unsubscribeByToken: Scalars['Boolean'];
  setLastViewedItemDate?: Maybe<UserFeed>;
  feedback?: Maybe<FeedbackResponse>;
};


export type MutationRegisterArgs = {
  userInfo?: Maybe<UserInfoInput>;
  input: EmailPasswordInput;
};


export type MutationRequestPasswordResetArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  input: PasswordResetInput;
};


export type MutationVerifyEmailArgs = {
  userId: Scalars['String'];
  token: Scalars['String'];
};


export type MutationLoginArgs = {
  input: EmailPasswordInput;
};


export type MutationUpdateUserInfoArgs = {
  userInfo: UserInfoInput;
};


export type MutationSetOptionsArgs = {
  opts: OptionsInput;
};


export type MutationAddFeedWithEmailArgs = {
  feedOpts?: Maybe<UserFeedOptionsInput>;
  userInfo?: Maybe<UserInfoInput>;
  input: AddFeedEmailInput;
};


export type MutationAddFeedToCurrentUserArgs = {
  feedOpts?: Maybe<UserFeedOptionsInput>;
  input: AddFeedInput;
};


export type MutationActivateFeedArgs = {
  userFeedId: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSetFeedActivatedArgs = {
  userFeedId: Scalars['Float'];
};


export type MutationDeleteMyFeedsArgs = {
  ids: Array<Scalars['Float']>;
};


export type MutationSetFeedOptionsArgs = {
  opts: UserFeedOptionsInput;
  id: Scalars['Float'];
};


export type MutationUnsubscribeByTokenArgs = {
  id: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSetLastViewedItemDateArgs = {
  itemId: Scalars['Float'];
  userFeedId: Scalars['Float'];
};


export type MutationFeedbackArgs = {
  input: FeedbackInput;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<ArgumentError>>;
  user?: Maybe<User>;
};

export type ArgumentError = {
  __typename?: 'ArgumentError';
  argument?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type UserInfoInput = {
  locale?: Maybe<Scalars['String']>;
  timeZone?: Maybe<Scalars['String']>;
};

export type EmailPasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: Scalars['String'];
};

export type PasswordResetInput = {
  password: Scalars['String'];
  token: Scalars['String'];
  userId: Scalars['String'];
};

export type OptionsResponse = {
  __typename?: 'OptionsResponse';
  errors?: Maybe<Array<ArgumentError>>;
  options?: Maybe<Options>;
};

export type OptionsInput = {
  dailyDigestHour?: Maybe<Scalars['Float']>;
  customSubject?: Maybe<Scalars['String']>;
  shareList?: Maybe<Array<Scalars['String']>>;
  shareEnable?: Maybe<Scalars['Boolean']>;
  withContentTableDefault?: Maybe<Scalars['Boolean']>;
  itemBodyDefault?: Maybe<Scalars['Boolean']>;
  attachmentsDefault?: Maybe<Scalars['Boolean']>;
  themeDefault?: Maybe<Scalars['String']>;
};

export type UserFeedResponse = {
  __typename?: 'UserFeedResponse';
  errors?: Maybe<Array<ArgumentError>>;
  userFeed?: Maybe<UserFeed>;
};

export type UserFeedOptionsInput = {
  title?: Maybe<Scalars['String']>;
  schedule?: Maybe<Scalars['String']>;
  withContentTable?: Maybe<Scalars['String']>;
  itemBody?: Maybe<Scalars['String']>;
  attachments?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['String']>;
};

export type AddFeedEmailInput = {
  feedUrl: Scalars['String'];
  email: Scalars['String'];
};

export type AddFeedInput = {
  feedUrl: Scalars['String'];
};

export type DeletedFeedResponse = {
  __typename?: 'DeletedFeedResponse';
  errors?: Maybe<Array<ArgumentError>>;
  ids?: Maybe<Array<Scalars['String']>>;
};

export type FeedbackResponse = {
  __typename?: 'FeedbackResponse';
  errors?: Maybe<Array<ArgumentError>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type FeedbackInput = {
  email: Scalars['String'];
  text: Scalars['String'];
};

export type FeedFieldsFragment = (
  { __typename?: 'Feed' }
  & Pick<Feed, 'id' | 'url' | 'link' | 'title' | 'description' | 'language' | 'favicon' | 'imageUrl' | 'imageTitle' | 'lastSuccessfulUpd' | 'lastPubdate' | 'createdAt' | 'updatedAt'>
);

export type ItemFieldsFragment = (
  { __typename?: 'Item' }
  & Pick<Item, 'id' | 'guid' | 'pubdate' | 'link' | 'title' | 'description' | 'summary' | 'imageUrl' | 'createdAt'>
  & { enclosures?: Maybe<Array<(
    { __typename?: 'Enclosure' }
    & Pick<Enclosure, 'url' | 'length' | 'type'>
  )>> }
);

export type OptionsFieldsFragment = (
  { __typename?: 'Options' }
  & Pick<Options, 'dailyDigestHour' | 'withContentTableDefault' | 'itemBodyDefault' | 'attachmentsDefault' | 'themeDefault' | 'customSubject' | 'shareEnable' | 'shareList'>
);

export type UserFeedFieldsFragment = (
  { __typename?: 'UserFeed' }
  & Pick<UserFeed, 'id' | 'activated' | 'title' | 'schedule' | 'withContentTable' | 'itemBody' | 'attachments' | 'theme' | 'filter' | 'createdAt' | 'lastDigestSentAt' | 'newItemsCount' | 'lastViewedItemDate'>
);

export type UserFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'role' | 'email' | 'emailVerified' | 'locale' | 'timeZone'>
);

export type UsualUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & UserFieldsFragment
  )>, errors?: Maybe<Array<(
    { __typename?: 'ArgumentError' }
    & Pick<ArgumentError, 'message' | 'argument'>
  )>> }
);

export type ActivateFeedMutationVariables = Exact<{
  token: Scalars['String'];
  userFeedId: Scalars['String'];
}>;


export type ActivateFeedMutation = (
  { __typename?: 'Mutation' }
  & { activateFeed: (
    { __typename?: 'UserFeedResponse' }
    & { userFeed?: Maybe<(
      { __typename?: 'UserFeed' }
      & { feed: (
        { __typename?: 'Feed' }
        & Pick<Feed, 'id' | 'url' | 'title'>
      ) }
      & UserFeedFieldsFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'ArgumentError' }
      & Pick<ArgumentError, 'message' | 'argument'>
    )>> }
  ) }
);

export type AddFeedToCurrentUserMutationVariables = Exact<{
  feedOpts?: Maybe<UserFeedOptionsInput>;
  input: AddFeedInput;
}>;


export type AddFeedToCurrentUserMutation = (
  { __typename?: 'Mutation' }
  & { addFeedToCurrentUser: (
    { __typename?: 'UserFeedResponse' }
    & { userFeed?: Maybe<(
      { __typename?: 'UserFeed' }
      & { feed: (
        { __typename?: 'Feed' }
        & FeedFieldsFragment
      ) }
      & UserFeedFieldsFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'ArgumentError' }
      & Pick<ArgumentError, 'message' | 'argument'>
    )>> }
  ) }
);

export type AddFeedWithEmailMutationVariables = Exact<{
  feedOpts?: Maybe<UserFeedOptionsInput>;
  userInfo?: Maybe<UserInfoInput>;
  input: AddFeedEmailInput;
}>;


export type AddFeedWithEmailMutation = (
  { __typename?: 'Mutation' }
  & { addFeedWithEmail?: Maybe<(
    { __typename?: 'UserFeedResponse' }
    & { userFeed?: Maybe<(
      { __typename?: 'UserFeed' }
      & { feed: (
        { __typename?: 'Feed' }
        & Pick<Feed, 'id' | 'url' | 'title'>
      ) }
      & UserFeedFieldsFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'ArgumentError' }
      & Pick<ArgumentError, 'message' | 'argument'>
    )>> }
  )> }
);

export type DeleteMyFeedsMutationVariables = Exact<{
  ids: Array<Scalars['Float']> | Scalars['Float'];
}>;


export type DeleteMyFeedsMutation = (
  { __typename?: 'Mutation' }
  & { deleteMyFeeds: (
    { __typename?: 'DeletedFeedResponse' }
    & Pick<DeletedFeedResponse, 'ids'>
    & { errors?: Maybe<Array<(
      { __typename?: 'ArgumentError' }
      & Pick<ArgumentError, 'message'>
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & UsualUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & UsualUserResponseFragment
  ) }
);

export type RequestEmailVerificationMutationVariables = Exact<{ [key: string]: never; }>;


export type RequestEmailVerificationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'requestEmailVerification'>
);

export type RequestPasswordResetMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type RequestPasswordResetMutation = (
  { __typename?: 'Mutation' }
  & { requestPasswordReset: (
    { __typename?: 'MessageResponse' }
    & Pick<MessageResponse, 'message'>
  ) }
);

export type ResetPasswordMutationVariables = Exact<{
  input: PasswordResetInput;
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'UserResponse' }
    & UsualUserResponseFragment
  ) }
);

export type SendFeedbackMutationVariables = Exact<{
  input: FeedbackInput;
}>;


export type SendFeedbackMutation = (
  { __typename?: 'Mutation' }
  & { feedback?: Maybe<(
    { __typename?: 'FeedbackResponse' }
    & Pick<FeedbackResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'ArgumentError' }
      & Pick<ArgumentError, 'argument' | 'message'>
    )>> }
  )> }
);

export type SetFeedOptionsMutationVariables = Exact<{
  id: Scalars['Float'];
  opts: UserFeedOptionsInput;
}>;


export type SetFeedOptionsMutation = (
  { __typename?: 'Mutation' }
  & { setFeedOptions: (
    { __typename?: 'UserFeedResponse' }
    & { userFeed?: Maybe<(
      { __typename?: 'UserFeed' }
      & UserFeedFieldsFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'ArgumentError' }
      & Pick<ArgumentError, 'message'>
    )>> }
  ) }
);

export type SetLastViewedItemDateMutationVariables = Exact<{
  itemId: Scalars['Float'];
  userFeedId: Scalars['Float'];
}>;


export type SetLastViewedItemDateMutation = (
  { __typename?: 'Mutation' }
  & { setLastViewedItemDate?: Maybe<(
    { __typename?: 'UserFeed' }
    & Pick<UserFeed, 'id' | 'lastViewedItemDate' | 'newItemsCount'>
  )> }
);

export type SetOptionsMutationVariables = Exact<{
  opts: OptionsInput;
}>;


export type SetOptionsMutation = (
  { __typename?: 'Mutation' }
  & { setOptions: (
    { __typename?: 'OptionsResponse' }
    & { options?: Maybe<(
      { __typename?: 'Options' }
      & OptionsFieldsFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'ArgumentError' }
      & Pick<ArgumentError, 'message' | 'argument'>
    )>> }
  ) }
);

export type UnsubscribeByTokenMutationVariables = Exact<{
  id: Scalars['String'];
  token: Scalars['String'];
}>;


export type UnsubscribeByTokenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'unsubscribeByToken'>
);

export type UpdateUserInfoMutationVariables = Exact<{
  userInfo: UserInfoInput;
}>;


export type UpdateUserInfoMutation = (
  { __typename?: 'Mutation' }
  & { updateUserInfo: (
    { __typename?: 'User' }
    & Pick<User, 'timeZone' | 'locale'>
  ) }
);

export type VerifyEmailMutationVariables = Exact<{
  userId: Scalars['String'];
  token: Scalars['String'];
}>;


export type VerifyEmailMutation = (
  { __typename?: 'Mutation' }
  & { verifyEmail: (
    { __typename?: 'UserResponse' }
    & UsualUserResponseFragment
  ) }
);

export type GetFeedInfoByTokenQueryVariables = Exact<{
  id: Scalars['String'];
  token: Scalars['String'];
}>;


export type GetFeedInfoByTokenQuery = (
  { __typename?: 'Query' }
  & { getFeedInfoByToken?: Maybe<(
    { __typename?: 'UserFeed' }
    & { feed: (
      { __typename?: 'Feed' }
      & Pick<Feed, 'title' | 'url'>
    ) }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFieldsFragment
  )> }
);

export type MyFeedItemsQueryVariables = Exact<{
  skip?: Maybe<Scalars['Float']>;
  take?: Maybe<Scalars['Float']>;
  feedId: Scalars['Float'];
  filter?: Maybe<Scalars['String']>;
}>;


export type MyFeedItemsQuery = (
  { __typename?: 'Query' }
  & { myFeedItems: (
    { __typename?: 'PaginatedItemsResponse' }
    & Pick<PaginatedItemsResponse, 'hasMore'>
    & { items: Array<(
      { __typename?: 'Item' }
      & ItemFieldsFragment
    )> }
  ) }
);

export type MyFeedsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyFeedsQuery = (
  { __typename?: 'Query' }
  & { myFeeds?: Maybe<Array<(
    { __typename?: 'UserFeed' }
    & { feed: (
      { __typename?: 'Feed' }
      & FeedFieldsFragment
    ) }
    & UserFeedFieldsFragment
  )>> }
);

export type MyOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyOptionsQuery = (
  { __typename?: 'Query' }
  & { myOptions: (
    { __typename?: 'Options' }
    & OptionsFieldsFragment
  ) }
);

export const FeedFieldsFragmentDoc = gql`
    fragment FeedFields on Feed {
  id
  url
  link
  title
  description
  language
  favicon
  imageUrl
  imageTitle
  lastSuccessfulUpd
  lastPubdate
  createdAt
  updatedAt
}
    `;
export const ItemFieldsFragmentDoc = gql`
    fragment ItemFields on Item {
  id
  guid
  pubdate
  link
  title
  description
  summary
  imageUrl
  enclosures {
    url
    length
    type
  }
  createdAt
}
    `;
export const OptionsFieldsFragmentDoc = gql`
    fragment OptionsFields on Options {
  dailyDigestHour
  withContentTableDefault
  itemBodyDefault
  attachmentsDefault
  themeDefault
  customSubject
  shareEnable
  shareList
}
    `;
export const UserFeedFieldsFragmentDoc = gql`
    fragment UserFeedFields on UserFeed {
  id
  activated
  title
  schedule
  withContentTable
  itemBody
  attachments
  theme
  filter
  createdAt
  lastDigestSentAt
  newItemsCount
  lastViewedItemDate
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  role
  email
  emailVerified
  locale
  timeZone
}
    `;
export const UsualUserResponseFragmentDoc = gql`
    fragment UsualUserResponse on UserResponse {
  user {
    ...UserFields
  }
  errors {
    message
    argument
  }
}
    ${UserFieldsFragmentDoc}`;
export const ActivateFeedDocument = gql`
    mutation activateFeed($token: String!, $userFeedId: String!) {
  activateFeed(token: $token, userFeedId: $userFeedId) {
    userFeed {
      ...UserFeedFields
      feed {
        id
        url
        title
      }
    }
    errors {
      message
      argument
    }
  }
}
    ${UserFeedFieldsFragmentDoc}`;
export type ActivateFeedMutationFn = Apollo.MutationFunction<ActivateFeedMutation, ActivateFeedMutationVariables>;

/**
 * __useActivateFeedMutation__
 *
 * To run a mutation, you first call `useActivateFeedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateFeedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateFeedMutation, { data, loading, error }] = useActivateFeedMutation({
 *   variables: {
 *      token: // value for 'token'
 *      userFeedId: // value for 'userFeedId'
 *   },
 * });
 */
export function useActivateFeedMutation(baseOptions?: Apollo.MutationHookOptions<ActivateFeedMutation, ActivateFeedMutationVariables>) {
        return Apollo.useMutation<ActivateFeedMutation, ActivateFeedMutationVariables>(ActivateFeedDocument, baseOptions);
      }
export type ActivateFeedMutationHookResult = ReturnType<typeof useActivateFeedMutation>;
export type ActivateFeedMutationResult = Apollo.MutationResult<ActivateFeedMutation>;
export type ActivateFeedMutationOptions = Apollo.BaseMutationOptions<ActivateFeedMutation, ActivateFeedMutationVariables>;
export const AddFeedToCurrentUserDocument = gql`
    mutation addFeedToCurrentUser($feedOpts: UserFeedOptionsInput, $input: AddFeedInput!) {
  addFeedToCurrentUser(input: $input, feedOpts: $feedOpts) {
    userFeed {
      ...UserFeedFields
      feed {
        ...FeedFields
      }
    }
    errors {
      message
      argument
    }
  }
}
    ${UserFeedFieldsFragmentDoc}
${FeedFieldsFragmentDoc}`;
export type AddFeedToCurrentUserMutationFn = Apollo.MutationFunction<AddFeedToCurrentUserMutation, AddFeedToCurrentUserMutationVariables>;

/**
 * __useAddFeedToCurrentUserMutation__
 *
 * To run a mutation, you first call `useAddFeedToCurrentUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFeedToCurrentUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFeedToCurrentUserMutation, { data, loading, error }] = useAddFeedToCurrentUserMutation({
 *   variables: {
 *      feedOpts: // value for 'feedOpts'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddFeedToCurrentUserMutation(baseOptions?: Apollo.MutationHookOptions<AddFeedToCurrentUserMutation, AddFeedToCurrentUserMutationVariables>) {
        return Apollo.useMutation<AddFeedToCurrentUserMutation, AddFeedToCurrentUserMutationVariables>(AddFeedToCurrentUserDocument, baseOptions);
      }
export type AddFeedToCurrentUserMutationHookResult = ReturnType<typeof useAddFeedToCurrentUserMutation>;
export type AddFeedToCurrentUserMutationResult = Apollo.MutationResult<AddFeedToCurrentUserMutation>;
export type AddFeedToCurrentUserMutationOptions = Apollo.BaseMutationOptions<AddFeedToCurrentUserMutation, AddFeedToCurrentUserMutationVariables>;
export const AddFeedWithEmailDocument = gql`
    mutation addFeedWithEmail($feedOpts: UserFeedOptionsInput, $userInfo: UserInfoInput, $input: AddFeedEmailInput!) {
  addFeedWithEmail(input: $input, userInfo: $userInfo, feedOpts: $feedOpts) {
    userFeed {
      ...UserFeedFields
      feed {
        id
        url
        title
      }
    }
    errors {
      message
      argument
    }
  }
}
    ${UserFeedFieldsFragmentDoc}`;
export type AddFeedWithEmailMutationFn = Apollo.MutationFunction<AddFeedWithEmailMutation, AddFeedWithEmailMutationVariables>;

/**
 * __useAddFeedWithEmailMutation__
 *
 * To run a mutation, you first call `useAddFeedWithEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFeedWithEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFeedWithEmailMutation, { data, loading, error }] = useAddFeedWithEmailMutation({
 *   variables: {
 *      feedOpts: // value for 'feedOpts'
 *      userInfo: // value for 'userInfo'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddFeedWithEmailMutation(baseOptions?: Apollo.MutationHookOptions<AddFeedWithEmailMutation, AddFeedWithEmailMutationVariables>) {
        return Apollo.useMutation<AddFeedWithEmailMutation, AddFeedWithEmailMutationVariables>(AddFeedWithEmailDocument, baseOptions);
      }
export type AddFeedWithEmailMutationHookResult = ReturnType<typeof useAddFeedWithEmailMutation>;
export type AddFeedWithEmailMutationResult = Apollo.MutationResult<AddFeedWithEmailMutation>;
export type AddFeedWithEmailMutationOptions = Apollo.BaseMutationOptions<AddFeedWithEmailMutation, AddFeedWithEmailMutationVariables>;
export const DeleteMyFeedsDocument = gql`
    mutation deleteMyFeeds($ids: [Float!]!) {
  deleteMyFeeds(ids: $ids) {
    ids
    errors {
      message
    }
  }
}
    `;
export type DeleteMyFeedsMutationFn = Apollo.MutationFunction<DeleteMyFeedsMutation, DeleteMyFeedsMutationVariables>;

/**
 * __useDeleteMyFeedsMutation__
 *
 * To run a mutation, you first call `useDeleteMyFeedsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMyFeedsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMyFeedsMutation, { data, loading, error }] = useDeleteMyFeedsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteMyFeedsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMyFeedsMutation, DeleteMyFeedsMutationVariables>) {
        return Apollo.useMutation<DeleteMyFeedsMutation, DeleteMyFeedsMutationVariables>(DeleteMyFeedsDocument, baseOptions);
      }
export type DeleteMyFeedsMutationHookResult = ReturnType<typeof useDeleteMyFeedsMutation>;
export type DeleteMyFeedsMutationResult = Apollo.MutationResult<DeleteMyFeedsMutation>;
export type DeleteMyFeedsMutationOptions = Apollo.BaseMutationOptions<DeleteMyFeedsMutation, DeleteMyFeedsMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    ...UsualUserResponse
  }
}
    ${UsualUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation register($email: String!, $password: String!) {
  register(input: {email: $email, password: $password}) {
    ...UsualUserResponse
  }
}
    ${UsualUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RequestEmailVerificationDocument = gql`
    mutation requestEmailVerification {
  requestEmailVerification
}
    `;
export type RequestEmailVerificationMutationFn = Apollo.MutationFunction<RequestEmailVerificationMutation, RequestEmailVerificationMutationVariables>;

/**
 * __useRequestEmailVerificationMutation__
 *
 * To run a mutation, you first call `useRequestEmailVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestEmailVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestEmailVerificationMutation, { data, loading, error }] = useRequestEmailVerificationMutation({
 *   variables: {
 *   },
 * });
 */
export function useRequestEmailVerificationMutation(baseOptions?: Apollo.MutationHookOptions<RequestEmailVerificationMutation, RequestEmailVerificationMutationVariables>) {
        return Apollo.useMutation<RequestEmailVerificationMutation, RequestEmailVerificationMutationVariables>(RequestEmailVerificationDocument, baseOptions);
      }
export type RequestEmailVerificationMutationHookResult = ReturnType<typeof useRequestEmailVerificationMutation>;
export type RequestEmailVerificationMutationResult = Apollo.MutationResult<RequestEmailVerificationMutation>;
export type RequestEmailVerificationMutationOptions = Apollo.BaseMutationOptions<RequestEmailVerificationMutation, RequestEmailVerificationMutationVariables>;
export const RequestPasswordResetDocument = gql`
    mutation RequestPasswordReset($email: String!) {
  requestPasswordReset(email: $email) {
    message
  }
}
    `;
export type RequestPasswordResetMutationFn = Apollo.MutationFunction<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>;

/**
 * __useRequestPasswordResetMutation__
 *
 * To run a mutation, you first call `useRequestPasswordResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestPasswordResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestPasswordResetMutation, { data, loading, error }] = useRequestPasswordResetMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRequestPasswordResetMutation(baseOptions?: Apollo.MutationHookOptions<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>) {
        return Apollo.useMutation<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>(RequestPasswordResetDocument, baseOptions);
      }
export type RequestPasswordResetMutationHookResult = ReturnType<typeof useRequestPasswordResetMutation>;
export type RequestPasswordResetMutationResult = Apollo.MutationResult<RequestPasswordResetMutation>;
export type RequestPasswordResetMutationOptions = Apollo.BaseMutationOptions<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($input: PasswordResetInput!) {
  resetPassword(input: $input) {
    ...UsualUserResponse
  }
}
    ${UsualUserResponseFragmentDoc}`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SendFeedbackDocument = gql`
    mutation sendFeedback($input: FeedbackInput!) {
  feedback(input: $input) {
    success
    errors {
      argument
      message
    }
  }
}
    `;
export type SendFeedbackMutationFn = Apollo.MutationFunction<SendFeedbackMutation, SendFeedbackMutationVariables>;

/**
 * __useSendFeedbackMutation__
 *
 * To run a mutation, you first call `useSendFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFeedbackMutation, { data, loading, error }] = useSendFeedbackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<SendFeedbackMutation, SendFeedbackMutationVariables>) {
        return Apollo.useMutation<SendFeedbackMutation, SendFeedbackMutationVariables>(SendFeedbackDocument, baseOptions);
      }
export type SendFeedbackMutationHookResult = ReturnType<typeof useSendFeedbackMutation>;
export type SendFeedbackMutationResult = Apollo.MutationResult<SendFeedbackMutation>;
export type SendFeedbackMutationOptions = Apollo.BaseMutationOptions<SendFeedbackMutation, SendFeedbackMutationVariables>;
export const SetFeedOptionsDocument = gql`
    mutation setFeedOptions($id: Float!, $opts: UserFeedOptionsInput!) {
  setFeedOptions(id: $id, opts: $opts) {
    userFeed {
      ...UserFeedFields
    }
    errors {
      message
    }
  }
}
    ${UserFeedFieldsFragmentDoc}`;
export type SetFeedOptionsMutationFn = Apollo.MutationFunction<SetFeedOptionsMutation, SetFeedOptionsMutationVariables>;

/**
 * __useSetFeedOptionsMutation__
 *
 * To run a mutation, you first call `useSetFeedOptionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetFeedOptionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setFeedOptionsMutation, { data, loading, error }] = useSetFeedOptionsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      opts: // value for 'opts'
 *   },
 * });
 */
export function useSetFeedOptionsMutation(baseOptions?: Apollo.MutationHookOptions<SetFeedOptionsMutation, SetFeedOptionsMutationVariables>) {
        return Apollo.useMutation<SetFeedOptionsMutation, SetFeedOptionsMutationVariables>(SetFeedOptionsDocument, baseOptions);
      }
export type SetFeedOptionsMutationHookResult = ReturnType<typeof useSetFeedOptionsMutation>;
export type SetFeedOptionsMutationResult = Apollo.MutationResult<SetFeedOptionsMutation>;
export type SetFeedOptionsMutationOptions = Apollo.BaseMutationOptions<SetFeedOptionsMutation, SetFeedOptionsMutationVariables>;
export const SetLastViewedItemDateDocument = gql`
    mutation setLastViewedItemDate($itemId: Float!, $userFeedId: Float!) {
  setLastViewedItemDate(itemId: $itemId, userFeedId: $userFeedId) {
    id
    lastViewedItemDate
    newItemsCount
  }
}
    `;
export type SetLastViewedItemDateMutationFn = Apollo.MutationFunction<SetLastViewedItemDateMutation, SetLastViewedItemDateMutationVariables>;

/**
 * __useSetLastViewedItemDateMutation__
 *
 * To run a mutation, you first call `useSetLastViewedItemDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetLastViewedItemDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setLastViewedItemDateMutation, { data, loading, error }] = useSetLastViewedItemDateMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      userFeedId: // value for 'userFeedId'
 *   },
 * });
 */
export function useSetLastViewedItemDateMutation(baseOptions?: Apollo.MutationHookOptions<SetLastViewedItemDateMutation, SetLastViewedItemDateMutationVariables>) {
        return Apollo.useMutation<SetLastViewedItemDateMutation, SetLastViewedItemDateMutationVariables>(SetLastViewedItemDateDocument, baseOptions);
      }
export type SetLastViewedItemDateMutationHookResult = ReturnType<typeof useSetLastViewedItemDateMutation>;
export type SetLastViewedItemDateMutationResult = Apollo.MutationResult<SetLastViewedItemDateMutation>;
export type SetLastViewedItemDateMutationOptions = Apollo.BaseMutationOptions<SetLastViewedItemDateMutation, SetLastViewedItemDateMutationVariables>;
export const SetOptionsDocument = gql`
    mutation setOptions($opts: OptionsInput!) {
  setOptions(opts: $opts) {
    options {
      ...OptionsFields
    }
    errors {
      message
      argument
    }
  }
}
    ${OptionsFieldsFragmentDoc}`;
export type SetOptionsMutationFn = Apollo.MutationFunction<SetOptionsMutation, SetOptionsMutationVariables>;

/**
 * __useSetOptionsMutation__
 *
 * To run a mutation, you first call `useSetOptionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetOptionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setOptionsMutation, { data, loading, error }] = useSetOptionsMutation({
 *   variables: {
 *      opts: // value for 'opts'
 *   },
 * });
 */
export function useSetOptionsMutation(baseOptions?: Apollo.MutationHookOptions<SetOptionsMutation, SetOptionsMutationVariables>) {
        return Apollo.useMutation<SetOptionsMutation, SetOptionsMutationVariables>(SetOptionsDocument, baseOptions);
      }
export type SetOptionsMutationHookResult = ReturnType<typeof useSetOptionsMutation>;
export type SetOptionsMutationResult = Apollo.MutationResult<SetOptionsMutation>;
export type SetOptionsMutationOptions = Apollo.BaseMutationOptions<SetOptionsMutation, SetOptionsMutationVariables>;
export const UnsubscribeByTokenDocument = gql`
    mutation unsubscribeByToken($id: String!, $token: String!) {
  unsubscribeByToken(id: $id, token: $token)
}
    `;
export type UnsubscribeByTokenMutationFn = Apollo.MutationFunction<UnsubscribeByTokenMutation, UnsubscribeByTokenMutationVariables>;

/**
 * __useUnsubscribeByTokenMutation__
 *
 * To run a mutation, you first call `useUnsubscribeByTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsubscribeByTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsubscribeByTokenMutation, { data, loading, error }] = useUnsubscribeByTokenMutation({
 *   variables: {
 *      id: // value for 'id'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useUnsubscribeByTokenMutation(baseOptions?: Apollo.MutationHookOptions<UnsubscribeByTokenMutation, UnsubscribeByTokenMutationVariables>) {
        return Apollo.useMutation<UnsubscribeByTokenMutation, UnsubscribeByTokenMutationVariables>(UnsubscribeByTokenDocument, baseOptions);
      }
export type UnsubscribeByTokenMutationHookResult = ReturnType<typeof useUnsubscribeByTokenMutation>;
export type UnsubscribeByTokenMutationResult = Apollo.MutationResult<UnsubscribeByTokenMutation>;
export type UnsubscribeByTokenMutationOptions = Apollo.BaseMutationOptions<UnsubscribeByTokenMutation, UnsubscribeByTokenMutationVariables>;
export const UpdateUserInfoDocument = gql`
    mutation updateUserInfo($userInfo: UserInfoInput!) {
  updateUserInfo(userInfo: $userInfo) {
    timeZone
    locale
  }
}
    `;
export type UpdateUserInfoMutationFn = Apollo.MutationFunction<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;

/**
 * __useUpdateUserInfoMutation__
 *
 * To run a mutation, you first call `useUpdateUserInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserInfoMutation, { data, loading, error }] = useUpdateUserInfoMutation({
 *   variables: {
 *      userInfo: // value for 'userInfo'
 *   },
 * });
 */
export function useUpdateUserInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>) {
        return Apollo.useMutation<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>(UpdateUserInfoDocument, baseOptions);
      }
export type UpdateUserInfoMutationHookResult = ReturnType<typeof useUpdateUserInfoMutation>;
export type UpdateUserInfoMutationResult = Apollo.MutationResult<UpdateUserInfoMutation>;
export type UpdateUserInfoMutationOptions = Apollo.BaseMutationOptions<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;
export const VerifyEmailDocument = gql`
    mutation verifyEmail($userId: String!, $token: String!) {
  verifyEmail(userId: $userId, token: $token) {
    ...UsualUserResponse
  }
}
    ${UsualUserResponseFragmentDoc}`;
export type VerifyEmailMutationFn = Apollo.MutationFunction<VerifyEmailMutation, VerifyEmailMutationVariables>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailMutation, VerifyEmailMutationVariables>) {
        return Apollo.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, baseOptions);
      }
export type VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailMutation>;
export type VerifyEmailMutationResult = Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const GetFeedInfoByTokenDocument = gql`
    query getFeedInfoByToken($id: String!, $token: String!) {
  getFeedInfoByToken(id: $id, token: $token) {
    feed {
      title
      url
    }
  }
}
    `;

/**
 * __useGetFeedInfoByTokenQuery__
 *
 * To run a query within a React component, call `useGetFeedInfoByTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeedInfoByTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeedInfoByTokenQuery({
 *   variables: {
 *      id: // value for 'id'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGetFeedInfoByTokenQuery(baseOptions: Apollo.QueryHookOptions<GetFeedInfoByTokenQuery, GetFeedInfoByTokenQueryVariables>) {
        return Apollo.useQuery<GetFeedInfoByTokenQuery, GetFeedInfoByTokenQueryVariables>(GetFeedInfoByTokenDocument, baseOptions);
      }
export function useGetFeedInfoByTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFeedInfoByTokenQuery, GetFeedInfoByTokenQueryVariables>) {
          return Apollo.useLazyQuery<GetFeedInfoByTokenQuery, GetFeedInfoByTokenQueryVariables>(GetFeedInfoByTokenDocument, baseOptions);
        }
export type GetFeedInfoByTokenQueryHookResult = ReturnType<typeof useGetFeedInfoByTokenQuery>;
export type GetFeedInfoByTokenLazyQueryHookResult = ReturnType<typeof useGetFeedInfoByTokenLazyQuery>;
export type GetFeedInfoByTokenQueryResult = Apollo.QueryResult<GetFeedInfoByTokenQuery, GetFeedInfoByTokenQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyFeedItemsDocument = gql`
    query myFeedItems($skip: Float, $take: Float, $feedId: Float!, $filter: String) {
  myFeedItems(skip: $skip, take: $take, feedId: $feedId, filter: $filter) {
    items {
      ...ItemFields
    }
    hasMore
  }
}
    ${ItemFieldsFragmentDoc}`;

/**
 * __useMyFeedItemsQuery__
 *
 * To run a query within a React component, call `useMyFeedItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyFeedItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyFeedItemsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      feedId: // value for 'feedId'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useMyFeedItemsQuery(baseOptions: Apollo.QueryHookOptions<MyFeedItemsQuery, MyFeedItemsQueryVariables>) {
        return Apollo.useQuery<MyFeedItemsQuery, MyFeedItemsQueryVariables>(MyFeedItemsDocument, baseOptions);
      }
export function useMyFeedItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyFeedItemsQuery, MyFeedItemsQueryVariables>) {
          return Apollo.useLazyQuery<MyFeedItemsQuery, MyFeedItemsQueryVariables>(MyFeedItemsDocument, baseOptions);
        }
export type MyFeedItemsQueryHookResult = ReturnType<typeof useMyFeedItemsQuery>;
export type MyFeedItemsLazyQueryHookResult = ReturnType<typeof useMyFeedItemsLazyQuery>;
export type MyFeedItemsQueryResult = Apollo.QueryResult<MyFeedItemsQuery, MyFeedItemsQueryVariables>;
export const MyFeedsDocument = gql`
    query myFeeds {
  myFeeds {
    ...UserFeedFields
    feed {
      ...FeedFields
    }
  }
}
    ${UserFeedFieldsFragmentDoc}
${FeedFieldsFragmentDoc}`;

/**
 * __useMyFeedsQuery__
 *
 * To run a query within a React component, call `useMyFeedsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyFeedsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyFeedsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyFeedsQuery(baseOptions?: Apollo.QueryHookOptions<MyFeedsQuery, MyFeedsQueryVariables>) {
        return Apollo.useQuery<MyFeedsQuery, MyFeedsQueryVariables>(MyFeedsDocument, baseOptions);
      }
export function useMyFeedsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyFeedsQuery, MyFeedsQueryVariables>) {
          return Apollo.useLazyQuery<MyFeedsQuery, MyFeedsQueryVariables>(MyFeedsDocument, baseOptions);
        }
export type MyFeedsQueryHookResult = ReturnType<typeof useMyFeedsQuery>;
export type MyFeedsLazyQueryHookResult = ReturnType<typeof useMyFeedsLazyQuery>;
export type MyFeedsQueryResult = Apollo.QueryResult<MyFeedsQuery, MyFeedsQueryVariables>;
export const MyOptionsDocument = gql`
    query myOptions {
  myOptions {
    ...OptionsFields
  }
}
    ${OptionsFieldsFragmentDoc}`;

/**
 * __useMyOptionsQuery__
 *
 * To run a query within a React component, call `useMyOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyOptionsQuery(baseOptions?: Apollo.QueryHookOptions<MyOptionsQuery, MyOptionsQueryVariables>) {
        return Apollo.useQuery<MyOptionsQuery, MyOptionsQueryVariables>(MyOptionsDocument, baseOptions);
      }
export function useMyOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyOptionsQuery, MyOptionsQueryVariables>) {
          return Apollo.useLazyQuery<MyOptionsQuery, MyOptionsQueryVariables>(MyOptionsDocument, baseOptions);
        }
export type MyOptionsQueryHookResult = ReturnType<typeof useMyOptionsQuery>;
export type MyOptionsLazyQueryHookResult = ReturnType<typeof useMyOptionsLazyQuery>;
export type MyOptionsQueryResult = Apollo.QueryResult<MyOptionsQuery, MyOptionsQueryVariables>;