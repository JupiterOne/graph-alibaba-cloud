import { LoadBalancer } from '../../types';
import {
  AlibabaResponse,
  PaginatedResponse,
} from '../../../../client/types/response';

export interface ListLoadBalancersResponse extends PaginatedResponse {
  LoadBalancers: LoadBalancer[];
}

export interface DescribeALBRegionsResponse extends AlibabaResponse {
  Regions: {
    RegionId: string;
    RegionEndpoint: string;
    LocalName: string;
  }[];
}
