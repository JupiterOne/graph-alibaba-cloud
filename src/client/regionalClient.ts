import { IntegrationLogger } from '@jupiterone/integration-sdk-core';
import { ServiceClient } from './client';

export type RegionalResourceIteratee<T> = (each: {
  resource: T;
  region: string;
}) => Promise<void> | void;

export abstract class RegionalServiceClient extends ServiceClient {
  protected getRegions: () => Promise<string[]>;

  constructor(options: { logger: IntegrationLogger }) {
    super(options);
  }

  protected async forEachRegion(cb: (region: string) => Promise<void>) {
    const regions = await this.getRegions();
    const errors: any[] = [];
    for (const region of regions) {
      try {
        await cb(region);
      } catch (err) {
        err.region = region;
        errors.push(err);
      }
    }

    if (errors.length > 0) {
      const err = errors[0];
      err.additionalErrors = errors.slice(1);
      err.additionalErrorsLength = errors.length;
      throw err;
    }
  }
}
