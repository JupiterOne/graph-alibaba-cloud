import { Request } from '../../../../client/types/request';

export interface VPNRequest extends Request<VPNParameters> {
  action: VPNAction;
}

export type VPNAction = 'DescribeVpnGateways';
export type VPNParameters = DescribeVpnGatewaysParameters;

export interface DescribeVpnGatewaysParameters {
  RegionId: string;
  VpcId?: string;
  VpnGatewayId?: string;
  Status?: string;
  BusinessStatus?: string;
  PageNumber?: number;
  PageSize?: number;
}
