import AlibabaClient from '@alicloud/pop-core';
import { ResourceIteratee } from '../../../client/client';
import { IntegrationConfig } from '../../../config';
import { DescribeInstancesResponse } from './types/response';
import { Instance } from '../types';
import { RegionalServiceClient } from '../../../client/regionalClient';
import { DescribeInstancesParameters, ECSRequest } from './types/request';
import { ECS_REGIONS } from '../../../regions';
import { IntegrationLogger } from '@jupiterone/integration-sdk-core';
import { PAGE_SIZE } from '../../../client/constants';

export class ECSClient extends RegionalServiceClient {
  private client: AlibabaClient;

  constructor(config: IntegrationConfig, logger: IntegrationLogger) {
    super({ logger });

    this.client = new AlibabaClient({
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      endpoint: 'https://ecs.aliyuncs.com',
      apiVersion: '2014-05-26',
    });

    // ECS does not have an endpoint for returning all regions that support ECS.
    // Instead, its describeRegions endpoint returns a list of every region.
    this.getRegions = (): Promise<string[]> => Promise.resolve(ECS_REGIONS);
  }

  public async iterateInstances(
    iteratee: ResourceIteratee<Instance>,
  ): Promise<void> {
    return this.forEachRegion(async (region: string) => {
      return this.forEachPage(async (nextToken?: string) => {
        const parameters: DescribeInstancesParameters = {
          RegionId: region,
          PageSize: PAGE_SIZE,
          NextToken: nextToken,
        };

        const req: ECSRequest = {
          client: this.client,
          action: 'DescribeInstances',
          parameters,
        };

        const response = await this.request<DescribeInstancesResponse>(req);
        const instances = response.Instances.Instance;
        for (const instance of instances) {
          await iteratee(instance);
        }

        return response;
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
