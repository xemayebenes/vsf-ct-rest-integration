/* eslint-disable line-comment-position */
export interface CredentialsConfig {
  clientId: string;
  clientSecret: string;
}

export interface AuthConfig {
  host: string;
  projectKey: string;
  credentials: CredentialsConfig;
  scopes: string[];
  fetch: any; // TODO
}

export interface MDWConfig {
  host: string;
  fetch: any; // TODO
}

export interface CommerceToolsConfig {
  auth: AuthConfig;
  middleware: MDWConfig;
}

export interface RestConfig {
  commercetools: CommerceToolsConfig;
  concurrency: number;
}
