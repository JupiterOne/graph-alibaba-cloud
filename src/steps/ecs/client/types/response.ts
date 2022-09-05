import { Instance } from '../../types';
import {
  AlibabaResponse,
  PaginatedResponse,
} from '../../../../client/types/response';

export interface DescribeInstancesResponse extends PaginatedResponse {
  Instances: {
    Instance: Instance[];
  };
}

export interface DescribeECSRegionsResponse extends AlibabaResponse {
  Regions: {
    Region: {
      RegionId: string;
      RegionEndpoint: string;
      LocalName: string;
    }[];
  };
}
