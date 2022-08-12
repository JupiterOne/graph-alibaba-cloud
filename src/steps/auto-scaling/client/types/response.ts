import { ScalingGroup } from '../../types';
import { PaginatedResponse } from '../../../../client/types/response';

export interface DescribeScalingGroupsResponse extends PaginatedResponse {
  ScalingGroups: {
    ScalingGroup: ScalingGroup[];
  };
}
