/**
 * 全局操作定义。
 */
export const ActionLogActions = {
  AddLog: 'AddLog',
};

export const AppActions = {
  InitApp: 'InitApp',
  CheckNewVersion: 'CheckNewVersion',
};

export const AnnouncementActions = {
  GetAnnouncementList: 'GetAnnouncementList',
};

export const ArticlesActions = {
  GetArticles: 'GetArticles',
};

export const AudioPlayerActions = {
  AddToPlayAudio: 'AddToPlayAudio',
  PlayAudio: 'PlayAudio',
};

export const DictActions = {
  GetDictItemList: 'GetDictItemList',
};

export const FollowerActions = {
  GetFollowerList: 'GetFollowerList',
  SyncFollowers: 'SyncFollowers'
};

export const FollowerTagActions = {
  GetFollowerTagList: 'GetFollowerTagList',
  CreateTag: 'CreateTag',
};

export const MessageActions = {
  SendMessage: 'SendMessage'
};

export const ShareActions = {
  GetAppDonwloadUrl: 'GetAppDonwloadUrl'
};

export const TemplateActions = {
  GetTemplateList: 'GetTemplateList',
  SendMessage: 'SendMessage',
};

export const UserActions = {
  SignIn: 'SignIn',
  SignUp: 'SignUp',
  SignOut: 'SignOut',
  RememberMe: 'RememberMe',
  GetRememberMe: 'GetRememberMe',
  
  GetUserInfo: 'GetUserInfo',
  UpdateProfile: 'UpdateProfile',

  PreAuth: 'PreAuth',
  BindAuth: 'BindAuth',
};

export const WebSocketActions = {
  ConnectToServer: 'ConnectToServer',
  DisconnectFromServer: 'DisconnectFromServer',
  HandleMessage: 'HandleMessage',
};

export const WxAppActions = {
  GetWxAppList: 'GetWxAppList',
};