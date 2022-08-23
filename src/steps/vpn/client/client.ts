import AlibabaClient from '@alicloud/pop-core';
import { IntegrationLogger } from '@jupiterone/integration-sdk-core';

import { ResourceIteratee } from '../../../client/client';
import { IntegrationConfig } from '../../../config';
import { DescribeVpnGatewaysResponse } from './types/response';
import { VPNGateway } from '../types';
import { RegionalServiceClient } from '../../../client/regionalClient';
import { DescribeVpnGatewaysParameters, VPNRequest } from './types/request';
import { ECS_REGIONS } from '../../../regions';
import { PAGE_SIZE } from '../../../client/constants';

export class VPNClient extends RegionalServiceClient {
  private client: AlibabaClient;

  constructor(config: IntegrationConfig, logger: IntegrationLogger) {
    super({ logger });

    this.client = new AlibabaClient({
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      endpoint: 'https://vpc.aliyuncs.com',
      apiVersion: '2016-04-28',
    });

    // VPN does not have an endpoint for returning all regions that support ECS.
    // Instead, its describeRegions endpoint returns a list of every region.
    this.getRegions = (): Promise<string[]> => Promise.resolve(ECS_REGIONS);
  }

  public async iterateVPNGateways(
    iteratee: ResourceIteratee<VPNGateway>,
  ): Promise<void> {
    return this.forEachRegion(async (region: string) => {
      let pageNumber = 1;
      let totalCount = 0;

      do {
        const parameters: DescribeVpnGatewaysParameters = {
          RegionId: region,
          PageSize: PAGE_SIZE,
          PageNumber: pageNumber,
        };

        const req: VPNRequest = {
          client: this.client,
          action: 'DescribeVpnGateways',
          parameters,
        };

        const response = await this.request<DescribeVpnGatewaysResponse>(req);
        const vpnGateways = response.VpnGateways.VpnGateway;
        for (const vpnGateway of vpnGateways) {
          await iteratee(vpnGateway);
        }
        pageNumber++;
        totalCount = response.TotalCount;
      } while (pageNumber * PAGE_SIZE < totalCount);
    });
  }
}

export function createVPNClient(
  config: IntegrationConfig,
  logger: IntegrationLogger,
): VPNClient {
  return new VPNClient(config, logger);
}
