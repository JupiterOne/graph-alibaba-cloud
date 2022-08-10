import AlibabaClient from '@alicloud/pop-core';
import { IntegrationLogger } from '@jupiterone/integration-sdk-core';

import { ResourceIteratee } from '../../../client/client';
import { IntegrationConfig } from '../../../config';
import {
  DescribeVpcsResponse,
  DescribeVpcAttributeResponse,
} from './types/response';
import { VPC, VPCAttribute } from '../types';
import { RegionalServiceClient } from '../../../client/regionalClient';
import {
  DescribeVPCsRequest,
  DescribeVPCAttributeRequest,
  VPCParameters,
  VPCAttributeParameters,
} from './types/request';
import { ECS_REGIONS } from '../../../regions';
import { PAGE_SIZE } from '../../../client/constants';

export class VPCClient extends RegionalServiceClient {
  private client: AlibabaClient;

  constructor(config: IntegrationConfig, logger: IntegrationLogger) {
    super({ logger });

    this.client = new AlibabaClient({
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      endpoint: 'https://vpc.aliyuncs.com',
      apiVersion: '2016-04-28',
    });

    // ECS does not have an endpoint for returning all regions that support ECS.
    // Instead, its describeRegions endpoint returns a list of every region.
    this.getRegions = (): Promise<string[]> => Promise.resolve(ECS_REGIONS);
  }

  public async iterateVPCs(
    iteratee: ResourceIteratee<VPC & VPCAttribute>,
  ): Promise<void> {
    return this.forEachRegion(async (region: string) => {
      let curPage = 1;
      let numVpcs = 0;

      let vpcParameters: VPCParameters;
      let vpcAttributeParameters: VPCAttributeParameters;
      let vpcReq: DescribeVPCsRequest;
      let vpcAttributeReq: DescribeVPCAttributeRequest;

      do {
        vpcParameters = {
          RegionId: region,
          PageSize: PAGE_SIZE,
          PageNumber: curPage,
        };

        vpcReq = {
          client: this.client,
          action: 'DescribeVpcs',
          parameters: vpcParameters,
        };

        const {
          Vpcs: { Vpc },
        } = await this.request<DescribeVpcsResponse>(vpcReq);

        for (const vpc of Vpc) {
          vpcAttributeParameters = {
            VpcId: vpc.VpcId,
            RegionId: region,
          };

          vpcAttributeReq = {
            client: this.client,
            action: 'DescribeVpcAttribute',
            parameters: vpcAttributeParameters,
          };

          const response = await this.request<DescribeVpcAttributeResponse>(
            vpcAttributeReq,
          );
          const { RequestId, ...vpcAttributeResponse } = response;

          await iteratee({ ...vpc, ...(vpcAttributeResponse as VPCAttribute) });
        }

        numVpcs = Vpc.length;
        curPage += 1;
      } while (numVpcs >= PAGE_SIZE);
    });
  }
}

export function createVPCClient(
  config: IntegrationConfig,
  logger: IntegrationLogger,
): VPCClient {
  return new VPCClient(config, logger);
}
