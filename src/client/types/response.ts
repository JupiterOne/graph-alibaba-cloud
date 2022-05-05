export interface PaginatedResponse extends AlibabaResponse {
  PageNumber: number;
  PageSize: number;
  TotalCount: number;
  NextToken: string;
}

export interface AlibabaResponse {
  RequestId: string;
}
