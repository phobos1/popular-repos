export interface License {
  name: string;
  key: string;
}

export interface LicensesResponse {
  licenses: License[];
}
