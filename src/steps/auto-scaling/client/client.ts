import AlibabaClient from '@alicloud/pop-core';
import { IntegrationLogger } from '@jupiterone/integration-sdk-core';

import { ResourceIteratee } from '../../../client/client';
import { IntegrationConfig } from '../../../config';
import { DescribeScalingGroupsResponse } from './types/response';
import { RegionalServiceClient } from '../../../client/regionalClient';
import {
  DescribeScalingGroupsParameters,
  ScalingGroupsRequest,
} from './types/request';
import { PAGE_SIZE } from '../../../client/constants';
import { ScalingGroup } from '../types';
import { REQ_TIMEOUT } from '../constants';

interface DescribeRegionsResponse {
  RequestI?: string;
  Regions: {
    Region: {
      VpcUnavailable: boolean;
      ClassicUnavailable: boolean;
      RegionId: string;
      RegionEndpoint: string;
      LocalName: string;
    }[];
  };
}

interface RegionEndpoints {
  [key: string]: string[];
}

export class AutoScalingClient extends RegionalServiceClient {
  private client: AlibabaClient;
  private config: IntegrationConfig;

  private getRegionEndpoints = async (): Promise<RegionEndpoints> => {
    const req = {
      client: this.client,
      action: 'DescribeRegions',
      parameters: {},
      options: {
        timeout: REQ_TIMEOUT,
      },
    };

    const res: DescribeRegionsResponse = await this.request(req);

    return res.Regions.Region.reduce((regionEndpoints, region) => {
      return {
        ...regionEndpoints,
        [region.RegionEndpoint]: [
          ...(regionEndpoints[region.RegionEndpoint]
            ? regionEndpoints[region.RegionEndpoint]
            : []),
          region.RegionId,
        ],
      };
    }, {} as RegionEndpoints);
  };

  constructor(config: IntegrationConfig, logger: IntegrationLogger) {
    super({ logger });

    this.config = config;
    this.client = new AlibabaClient({
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      endpoint: 'https://ess.aliyuncs.com',
      apiVersion: '2014-08-28',
    });
  }

  public async iterateScalingGroups(
    iteratee: ResourceIteratee<ScalingGroup>,
  ): Promise<void> {
    const regionEndpoints = await this.getRegionEndpoints();

    for (const regionEndpoint of Object.keys(regionEndpoints)) {
      const client = new AlibabaClient({
        accessKeyId: this.config.accessKeyId,
        accessKeySecret: this.config.accessKeySecret,
        endpoint: `https://${regionEndpoint}`,
        apiVersion: '2014-08-28',
      });

      let pageNumber = 1;
      let totalCount = 1;

      for await (const region of regionEndpoints[regionEndpoint]) {
        do {
          const parameters: DescribeScalingGroupsParameters = {
            RegionId: region,
            PageSize: PAGE_SIZE,
            PageNumber: pageNumber,
          };

          const req: ScalingGroupsRequest = {
            client,
            action: 'DescribeScalingGroups',
            parameters,
            options: {
              timeout: REQ_TIMEOUT,
            },
          };

          const response = await this.request<DescribeScalingGroupsResponse>(
            req,
          );
          const scalingGroups = response.ScalingGroups.ScalingGroup;
          for (const scalingGroup of scalingGroups) {
            await iteratee(scalingGroup);
          }

          pageNumber++;
          totalCount = response.TotalCount;
        } while (pageNumber * PAGE_SIZE < totalCount);
      }
    }
  }
}

export function createScalingGroupClient(
  config: IntegrationConfig,
  logger: IntegrationLogger,
): AutoScalingClient {
  return new AutoScalingClient(config, logger);
}
