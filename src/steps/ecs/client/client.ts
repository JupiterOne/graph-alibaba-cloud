import AlibabaClient from '@alicloud/pop-core';
import { ResourceIteratee } from '../../../client/client';
import { IntegrationConfig } from '../../../config';
import {
  DescribeECSRegionsResponse,
  DescribeInstancesResponse,
} from './types/response';
import { Instance } from '../types';
import {
  RegionalServiceClient,
  RegionList,
} from '../../../client/regionalClient';
import { DescribeInstancesParameters, ECSRequest } from './types/request';
import { IntegrationLogger } from '@jupiterone/integration-sdk-core';
import {
  ECS_API_VERSION,
  ECS_DEFAULT_ENDPOINT,
  ECS_PAGE_SIZE,
  ECS_REQ_TIMEOUT,
} from '../constants';

export class ECSClient extends RegionalServiceClient {
  private rootClient: AlibabaClient;

  constructor(config: IntegrationConfig, logger: IntegrationLogger) {
    super({
      logger,
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      apiVersion: ECS_API_VERSION,
      timeout: ECS_REQ_TIMEOUT,
    });

    this.rootClient = new AlibabaClient({
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      endpoint: ECS_DEFAULT_ENDPOINT,
      apiVersion: ECS_API_VERSION,
      opts: {
        timeout: ECS_REQ_TIMEOUT,
      },
    });
  }

  protected override async getRegions(): Promise<RegionList[]> {
    const {
      Regions: { Region: regionList },
    } = await this.request<DescribeECSRegionsResponse>({
      client: this.rootClient,
      action: 'DescribeRegions',
      parameters: {},
    });

    return regionList.map((r) => ({
      regionId: r.RegionId,
      regionEndpoint: r.RegionEndpoint,
    }));
  }

  public async iterateInstances(
    iteratee: ResourceIteratee<Instance>,
  ): Promise<void> {
    return this.forEachRegion(async (client: AlibabaClient, region: string) => {
      return this.forEachPage(async (nextToken?: string) => {
        const parameters: DescribeInstancesParameters = {
          RegionId: region,
          PageSize: ECS_PAGE_SIZE,
          NextToken: nextToken,
        };

        const req: ECSRequest = {
          client,
          action: 'DescribeInstances',
          parameters,
        };

        const response = await this.request<DescribeInstancesResponse>(req);
        const instances = response.Instances.Instance;
        for (const instance of instances) {
          await iteratee(instance);
        }

        return response.NextToken;
      });
    });
  }
}

export function createECSClient(
  config: IntegrationConfig,
  logger: IntegrationLogger,
): ECSClient {
  return new ECSClient(config, logger);
}
