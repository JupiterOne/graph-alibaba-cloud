export type ECSActions = 'DescribeInstances';

export interface DescribeInstancesParameters {
  RegionId: string;
  PageNumber?: number;
  PageSize?: number;
  MaxResults?: number;
  NextToken?: string;
  SecurityGroupId?: string;
  InstanceNetworkType?: string;
  ZoneId?: string;
  VSwitchId?: string;
  VpcId?: string;
  InstanceName?: string;
  ImageId?: string;
  Status?: string;
}
