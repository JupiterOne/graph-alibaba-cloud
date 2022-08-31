import AlibabaClient from '@alicloud/pop-core';
import { IntegrationLogger } from '@jupiterone/integration-sdk-core';

import { ResourceIteratee } from '../../../client/client';
import { IntegrationConfig } from '../../../config';
import {
  DescribeESSRegionsResponse,
  DescribeScalingGroupsResponse,
} from './types/response';
import {
  RegionalServiceClient,
  RegionList,
} from '../../../client/regionalClient';
import {
  DescribeScalingGroupsParameters,
  ScalingGroupsRequest,
} from './types/request';
import { ScalingGroup } from '../types';
import {
  ESS_API_VERSION,
  ESS_DEFAULT_ENDPOINT,
  ESS_PAGE_SIZE,
  ESS_REQ_TIMEOUT,
} from '../constants';

export class AutoScalingClient extends RegionalServiceClient {
  private rootClient: AlibabaClient;

  constructor(config: IntegrationConfig, logger: IntegrationLogger) {
    super({
      logger,
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      apiVersion: ESS_API_VERSION,
      timeout: ESS_REQ_TIMEOUT,
    });

    this.rootClient = new AlibabaClient({
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      endpoint: ESS_DEFAULT_ENDPOINT,
      apiVersion: ESS_API_VERSION,
      opts: {
        timeout: ESS_REQ_TIMEOUT,
      },
    });
  }

  protected override async getRegions(): Promise<RegionList[]> {
    const {
      Regions: { Region: regionList },
    } = await this.request<DescribeESSRegionsResponse>({
      client: this.rootClient,
      action: 'DescribeRegions',
      parameters: {},
    });

    return regionList.map((r) => ({
      regionId: r.RegionId,
      regionEndpoint: r.RegionEndpoint,
    }));
  }

  public async iterateScalingGroups(
    iteratee: ResourceIteratee<ScalingGroup>,
  ): Promise<void> {
    return this.forEachRegion(async (client: AlibabaClient, region: string) => {
      let pageNumber = 0;
      let totalCount = 0;

      do {
        pageNumber++;

        const parameters: DescribeScalingGroupsParameters = {
          RegionId: region,
          PageSize: ESS_PAGE_SIZE,
          PageNumber: pageNumber,
        };

        const req: ScalingGroupsRequest = {
          client,
          action: 'DescribeScalingGroups',
          parameters,
        };

        const response = await this.request<DescribeScalingGroupsResponse>(req);
        const scalingGroups = response.ScalingGroups.ScalingGroup;
        for (const scalingGroup of scalingGroups) {
          await iteratee(scalingGroup);
        }

        totalCount = response.TotalCount;
      } while (pageNumber * ESS_PAGE_SIZE < totalCount);
    });
  }
}

export function createScalingGroupClient(
  config: IntegrationConfig,
  logger: IntegrationLogger,
): AutoScalingClient {
  return new AutoScalingClient(config, logger);
}
