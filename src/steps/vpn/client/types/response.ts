import { VPNGateway } from '../../types';
import { PaginatedResponse } from '../../../../client/types/response';

export interface DescribeVpnGatewaysResponse extends PaginatedResponse {
  VpnGateways: {
    VpnGateway: VPNGateway[];
  };
}
