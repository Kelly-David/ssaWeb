export enum PageType {
  User = 'user',
  Room = 'room',
}

export interface ListItem {
  Id: string;
  DisplayName: string;
  Object: any;
}
