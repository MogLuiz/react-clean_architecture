export interface ISaveAccessToken {
  save: (accessToken: string) => Promise<void>;
}
