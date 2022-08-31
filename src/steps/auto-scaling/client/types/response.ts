import { ScalingGroup } from '../../types';
import {
  AlibabaResponse,
  PaginatedResponse,
} from '../../../../client/types/response';

export interface DescribeScalingGroupsResponse extends PaginatedResponse {
  ScalingGroups: {
    ScalingGroup: ScalingGroup[];
  };
}

export interface DescribeESSRegionsResponse extends AlibabaResponse {
  Regions: {
    Region: {
      VpcUnavailable: boolean;
      ClassicUnavailable: boolean;
      RegionId: string;
      RegionEndpoint: string;
      LocalName: string;
    }[];
  };
}
