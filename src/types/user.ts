export enum UserHeightUnit {
  CM = 'cm',
  IN = 'in',
}

export enum UserWeightUnit {
  KG = 'kg',
  LB = 'lb',
}

export enum UserGender {
  Male = 'male',
  Female = 'female'
}

export enum IdentityType {
  Email = 'email',
  Phone = 'phone',
}
export interface CloakClient {
  clientId: number;
  clientName: string;
  clientLogo: string;
  clientLocation: string;
  clientCode: string;
  clientSlug?: string;
  themeColor?: string;
}

export interface CloakUser {
  userId: number;
  clientId: number;
  identityType: IdentityType;
  email?: string;
  phone?: string;
  firstName: string;
  lastName: string;
  nickName: string;
  gender?: UserGender;
  birthYear: string;
  height: number;
  weight: number;
  preferHeightUnit: UserHeightUnit;
  preferWeightUnit: UserWeightUnit;
  avatar: string;
  fitActivity: string;
  gymFrequency: string;
  maxHr: number;
  restingHr: number;
  deviceId?: any;
  locationId?: number;
  ownPod?: { name: string } | string;
}

export interface CloakTarget {
  weight?: number
  weightUnit?: "kg" | "lb"
  weightProgress?: number
  bodyFat?: number

  systolicPressure?: number
  diastolicPressure?: number

  steps?: number
}

export interface LoginParams {
  identifier: string;
  identityType: IdentityType;
  password: string;
  clientId: number;
}

export interface AuthResponse {
  token: string;
  userId: number;
  isVerified: boolean;
  dt?: string;
  dashboard?: string;
}

export interface AuthCredential extends AuthResponse {
  identifier: string;
  offlineToken: string;
}

export enum VerificationFrom {
  Register = 'register',
  Login = 'login',
}

export interface VerificationParams extends AuthCredential {
  identityType: IdentityType;
  from: VerificationFrom;
}

export interface VerificationStatusResponse {
  isVerified: boolean;
  dt: string;
  dashboard: string;
}

export enum VerificationMethod {
  Register = 'register',
  RetrievePassword = 'retrieve-password'
}

export interface ConfirmationCodeParams {
  identifier: string;
  identityType: IdentityType;
  method: VerificationMethod;
  clientId: number;
  countryCode?: string;
  confirmationCode?: string;
}

export interface ResetPasswordParams {
  identifier: string;
  identityType: IdentityType;
  newPassword: string;
  clientId: number;
  confirmationCode: string;
}

export interface PostData {
  [x: string]: any;
  data: Data[];
}

export interface Data {
  adminId:   number;
  // detail:   Detail[];
  appversion:    number;
  avatar: string;
  email:  string;
  isVerified:     boolean;
  nickName: string;
  settings: string;
  token: string;
}
