import { Instance } from '../../types';
import { PaginatedResponse } from '../../../../client/types/response';

export interface DescribeInstancesResponse extends PaginatedResponse {
  Instances: {
    Instance: Instance[];
  };
  PageNumber: number;
  PageSize: number;
  TotalCount: number;
  RequestId: string;
  NextToken: string;
}
