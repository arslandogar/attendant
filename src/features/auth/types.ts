export type UserResponse = {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
};

export type UserProfileResponse = {
  name: string;
  createTime: string;
  updateTime: string;
  fields: UserProfile;
};

export type UserProfile = {
  department: string;
  first_name: string;
  last_name: string;
  position: string;
  role: 'admin' | 'user';
};

export type JWTPayload = {
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  user_id: string;
  email: string;
  sign_in_provider: string;
  verified: boolean;
};
