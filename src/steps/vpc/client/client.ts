import AlibabaClient from '@alicloud/pop-core';
import { IntegrationLogger } from '@jupiterone/integration-sdk-core';

import { ResourceIteratee } from '../../../client/client';
import { IntegrationConfig } from '../../../config';
import {
  DescribeVPCsResponse,
  DescribeVPCAttributeResponse,
  DescribeNATGatewaysResponse,
  DescribeVPNGatewaysResponse,
  DescribeVPCRegionsResponse,
} from './types/response';
import { NATGateway, VPC, VPCAttribute, VPNGateway } from '../types';
import {
  RegionalServiceClient,
  RegionList,
} from '../../../client/regionalClient';
import {
  DescribeNATGatewaysRequest,
  DescribeVPCAttributeRequest,
  DescribeVPCsRequest,
  DescribeVpnGatewaysParameters,
  DescribeVPNGatewaysRequest,
  NATGatewayParameters,
  VPCAttributeParameters,
  VPCParameters,
} from './types/request';
import {
  VPC_API_VERSION,
  VPC_DEFAULT_ENDPOINT,
  VPC_PAGE_SIZE,
  VPC_REQ_TIMEOUT,
} from '../constants';

export class VPCClient extends RegionalServiceClient {
  private rootClient: AlibabaClient;

  constructor(config: IntegrationConfig, logger: IntegrationLogger) {
    super({
      logger,
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      apiVersion: VPC_API_VERSION,
      timeout: VPC_REQ_TIMEOUT,
    });

    this.rootClient = new AlibabaClient({
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      endpoint: VPC_DEFAULT_ENDPOINT,
      apiVersion: VPC_API_VERSION,
      opts: {
        timeout: VPC_REQ_TIMEOUT,
      },
    });
  }

  protected override async getRegions(): Promise<RegionList[]> {
    const {
      Regions: { Region: regionList },
    } = await this.request<DescribeVPCRegionsResponse>({
      client: this.rootClient,
      action: 'DescribeRegions',
      parameters: {},
    });

    return regionList.map((r) => ({
      regionId: r.RegionId,
      regionEndpoint: r.RegionEndpoint,
    }));
  }

  public async iterateVPCs(
    iteratee: ResourceIteratee<VPC & VPCAttribute>,
  ): Promise<void> {
    return this.forEachRegion(async (client: AlibabaClient, region: string) => {
      let pageNumber = 0;
      let totalVpcs = 0;

      do {
        pageNumber++;

        const vpcParameters: VPCParameters = {
          RegionId: region,
          PageSize: VPC_PAGE_SIZE,
          PageNumber: pageNumber,
        };

        const vpcReq: DescribeVPCsRequest = {
          client,
          action: 'DescribeVpcs',
          parameters: vpcParameters,
        };

        const {
          Vpcs: { Vpc },
          TotalCount,
        } = await this.request<DescribeVPCsResponse>(vpcReq);

        for (const vpc of Vpc) {
          const vpcAttributeParameters: VPCAttributeParameters = {
            VpcId: vpc.VpcId,
            RegionId: region,
          };

          const vpcAttributeReq: DescribeVPCAttributeRequest = {
            client,
            action: 'DescribeVpcAttribute',
            parameters: vpcAttributeParameters,
          };

          const response = await this.request<DescribeVPCAttributeResponse>(
            vpcAttributeReq,
          );
          const { RequestId, ...vpcAttributeResponse } = response;

          await iteratee({ ...vpc, ...(vpcAttributeResponse as VPCAttribute) });
        }

        totalVpcs = TotalCount;
      } while (pageNumber * VPC_PAGE_SIZE < totalVpcs);
    });
  }

  public async iterateNATGateways(
    iteratee: ResourceIteratee<NATGateway>,
  ): Promise<void> {
    return this.forEachRegion(async (client: AlibabaClient, region: string) => {
      let pageNumber = 0;
      let totalNgws = 0;

      do {
        pageNumber++;

        const parameters: NATGatewayParameters = {
          RegionId: region,
          PageSize: VPC_PAGE_SIZE,
          PageNumber: pageNumber,
        };

        const req: DescribeNATGatewaysRequest = {
          client,
          action: 'DescribeNatGateways',
          parameters,
        };

        const {
          NatGateways: { NatGateway },
          TotalCount,
        } = await this.request<DescribeNATGatewaysResponse>(req);

        for (const ngw of NatGateway) {
          await iteratee(ngw);
        }

        totalNgws = TotalCount;
      } while (pageNumber * VPC_PAGE_SIZE < totalNgws);
    });
  }

  public async iterateVPNGateways(
    iteratee: ResourceIteratee<VPNGateway>,
  ): Promise<void> {
    return this.forEachRegion(async (client: AlibabaClient, region: string) => {
      let pageNumber = 0;
      let totalVgws = 0;

      do {
        pageNumber++;

        const parameters: DescribeVpnGatewaysParameters = {
          RegionId: region,
          PageSize: VPC_PAGE_SIZE,
          PageNumber: pageNumber,
        };

        const req: DescribeVPNGatewaysRequest = {
          client,
          action: 'DescribeVpnGateways',
          parameters,
        };

        const {
          VpnGateways: { VpnGateway },
          TotalCount,
        } = await this.request<DescribeVPNGatewaysResponse>(req);
        for (const vgw of VpnGateway) {
          await iteratee(vgw);
        }

        totalVgws = TotalCount;
      } while (pageNumber * VPC_PAGE_SIZE < totalVgws);
    });
  }
}

export function createVPCClient(
  config: IntegrationConfig,
  logger: IntegrationLogger,
): VPCClient {
  return new VPCClient(config, logger);
}
