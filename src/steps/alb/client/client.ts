import AlibabaClient from '@alicloud/pop-core';
import { ResourceIteratee } from '../../../client/client';
import { IntegrationConfig } from '../../../config';
import {
  DescribeALBRegionsResponse,
  ListLoadBalancersResponse,
} from './types/response';
import { LoadBalancer } from '../types';
import {
  RegionalServiceClient,
  RegionList,
} from '../../../client/regionalClient';
import {
  ListLoadBalancersParameters as ListLoadBalancersParameters,
  ALBRequest,
} from './types/request';
import { IntegrationLogger } from '@jupiterone/integration-sdk-core';
import {
  ALB_API_VERSION,
  ALB_DEFAULT_ENDPOINT,
  ALB_PAGE_SIZE,
  ALB_REQ_TIMEOUT,
} from '../constants';

export class ALBClient extends RegionalServiceClient {
  private rootClient: AlibabaClient;

  constructor(readonly config: IntegrationConfig, logger: IntegrationLogger) {
    super({
      logger,
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      apiVersion: ALB_API_VERSION,
      timeout: ALB_REQ_TIMEOUT,
    });

    this.rootClient = new AlibabaClient({
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      endpoint: ALB_DEFAULT_ENDPOINT,
      apiVersion: ALB_API_VERSION,
      opts: {
        timeout: ALB_REQ_TIMEOUT,
      },
    });
  }

  protected override async getRegions(): Promise<RegionList[]> {
    const { Regions: regionList } =
      await this.request<DescribeALBRegionsResponse>({
        client: this.rootClient,
        action: 'DescribeRegions',
        parameters: {},
      });

    return regionList.map((r) => ({
      regionId: r.RegionId,
      regionEndpoint: r.RegionEndpoint,
    }));
  }

  public async iterateLoadBalancers(
    iteratee: ResourceIteratee<LoadBalancer>,
  ): Promise<void> {
    return this.forEachRegion(async (client: AlibabaClient) => {
      return this.forEachPage(async (nextToken?: string) => {
        const parameters: ListLoadBalancersParameters = {
          Action: 'ListLoadBalancers',
          MaxResults: ALB_PAGE_SIZE,
          ...(nextToken && { NextToken: nextToken }),
        };

        const req: ALBRequest = {
          client,
          action: 'ListLoadBalancers',
          parameters,
          options: {
            method: 'POST',
            formatParams: false,
          },
        };

        const response = await this.request<ListLoadBalancersResponse>(req);
        const loadBalancers = response.LoadBalancers;
        for (const loadBalancer of loadBalancers) {
          await iteratee(loadBalancer);
        }

        return response.NextToken;
      });
    });
  }
}

export function createALBClient(
  config: IntegrationConfig,
  logger: IntegrationLogger,
): ALBClient {
  return new ALBClient(config, logger);
}
