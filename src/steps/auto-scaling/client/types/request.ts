import { Request } from '../../../../client/types/request';

export interface ScalingGroupsRequest extends Request<ScalingGroupParameters> {
  action: ScalingGroupsAction;
}

export type ScalingGroupsAction = 'DescribeScalingGroups';
export type ScalingGroupParameters = DescribeScalingGroupsParameters;

export interface DescribeScalingGroupsParameters {
  RegionId: string;
  ScalingGroupName?: string;
  'ScalingGroupName.1'?: string;
  'ScalingGroupName.2'?: string;
  'ScalingGroupName.3'?: string;
  'ScalingGroupName.4'?: string;
  'ScalingGroupName.5'?: string;
  'ScalingGroupName.6'?: string;
  'ScalingGroupName.7'?: string;
  'ScalingGroupName.8'?: string;
  'ScalingGroupName.9'?: string;
  'ScalingGroupName.10'?: string;
  'ScalingGroupName.11'?: string;
  'ScalingGroupName.12'?: string;
  'ScalingGroupName.13'?: string;
  'ScalingGroupName.14'?: string;
  'ScalingGroupName.15'?: string;
  'ScalingGroupName.16'?: string;
  'ScalingGroupName.17'?: string;
  'ScalingGroupName.18'?: string;
  'ScalingGroupName.19'?: string;
  'ScalingGroupName.20'?: string;
  GroupType?: string;
  PageNumber?: number;
  PageSize?: number;
}
