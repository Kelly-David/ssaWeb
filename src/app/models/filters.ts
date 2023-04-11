export interface UserFilter {
  offices: string[],
  includeAdmin: boolean,
  includeArchived: boolean,
}

export interface StudentFilter {
  offices: string[],
  rooms: string[],
  includeArchived: boolean
}
