import AlibabaClient from '@alicloud/pop-core';
import { IntegrationLogger } from '@jupiterone/integration-sdk-core';

import { ServiceClient } from './client';

const DEFAULT_TIMEOUT = 20000;

export type RegionalResourceIteratee<T> = (each: {
  resource: T;
  region: string;
}) => Promise<void> | void;

interface RegionalServiceClientOptions {
  logger: IntegrationLogger;
  accessKeyId: string;
  accessKeySecret: string;
  apiVersion: string;
  timeout?: number;
}

export interface RegionList {
  regionId: string;
  regionEndpoint: string;
}

export abstract class RegionalServiceClient extends ServiceClient {
  private regions: string[];
  private regionalClients: AlibabaClient[];
  private clientConfig;
  private timeout: number | undefined;

  constructor(options: RegionalServiceClientOptions) {
    super(options);

    const { logger, timeout, ...config } = options;

    this.clientConfig = config;
    this.timeout = timeout;
    this.regions = [];
    this.regionalClients = [];
  }

  protected abstract getRegions(): Promise<RegionList[]>;

  private async getRegionalClients() {
    const regionList = await this.getRegions();

    this.regionalClients = regionList.map(
      (r) =>
        new AlibabaClient({
          ...this.clientConfig,
          endpoint: `https://${r.regionEndpoint}`,
          opts: {
            timeout: this.timeout || DEFAULT_TIMEOUT,
          },
        }),
    );
    this.regions = regionList.map((r) => r.regionId);
  }

  protected async forEachRegion(
    cb: (client: AlibabaClient, region: string) => Promise<void>,
  ) {
    await this.getRegionalClients();

    const cbRoutines = this.regionalClients.map((client, i) =>
      cb(client, this.regions[i]),
    );
    const results = await Promise.allSettled(cbRoutines);

    const errors = results.filter((res) => res.status === 'rejected');
    const failingRegions = errors.map((_, i) => this.regions[i]);

    if (errors.length > 0) {
      this.logger.warn(`Service has ${errors.length} failing region(s)`);
      this.logger.warn(
        `Failing regional requests: ${failingRegions.join(',')}`,
      );
    }
  }
}
