export interface ListFilter {
  offices: string[],
  rooms?: string[],
  includeAdmin?: boolean,
  includeArchived?: boolean,
}

export interface StudentFilter {
  offices: string[],
  rooms: string[],
  includeArchived: boolean
}
