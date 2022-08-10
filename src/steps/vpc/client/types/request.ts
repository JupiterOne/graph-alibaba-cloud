import { Request } from '../../../../client/types/request';

export interface DescribeVPCsRequest extends Request<VPCParameters> {
  action: VPCAction;
}

export interface DescribeVPCAttributeRequest
  extends Request<VPCAttributeParameters> {
  action: VPCAttributeAction;
}

export type VPCAction = 'DescribeVpcs';
export type VPCAttributeAction = 'DescribeVpcAttribute';

export type VPCParameters = DescribeVpcsParameters;
export type VPCAttributeParameters = DescribeVpcAttributeParameters;

export interface DescribeVpcsParameters {
  VpcId?: string;
  RegionId: string;
  VpcName?: string;
  IsDefault?: boolean;
  DryRun?: boolean;
  ResourceGroupId?: string;
  VpcOwnerId?: number;
  DhcpOptionsSetId?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface DescribeVpcAttributeParameters {
  VpcId: string;
  RegionId: string;
  DryRun?: boolean;
  IsDefault?: boolean;
}
