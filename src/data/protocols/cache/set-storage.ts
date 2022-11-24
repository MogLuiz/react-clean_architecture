export interface ISetStorage {
  set: (key: string, value: any) => Promise<void>;
}
