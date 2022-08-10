import { VPC, VPCAttribute } from '../../types';
import {
  AlibabaResponse,
  PaginatedResponseWithoutToken,
} from '../../../../client/types/response';

export interface DescribeVpcsResponse extends PaginatedResponseWithoutToken {
  Vpcs: {
    Vpc: VPC[];
  };
}

export type DescribeVpcAttributeResponse = AlibabaResponse & VPCAttribute;
