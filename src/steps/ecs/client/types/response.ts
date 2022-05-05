import { Instance } from '../../types';
import { PaginatedResponse } from '../../../../client/types/response';

export interface DescribeInstancesResponse extends PaginatedResponse {
  Instances: {
    Instance: Instance[];
  };
}
