import { Request } from '../../../../client/types/request';

export interface ECSRequest extends Request<ECSParameters> {
  action: ECSAction;
}

export type ECSAction = 'DescribeInstances';
export type ECSParameters = DescribeInstancesParameters;

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
