import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { createVPCClient } from './client/client';
import { IntegrationConfig } from '../../config';
import { VPCEntities, VPCSteps } from './constants';
import { createVPCEntity } from './converter';

export async function fetchVPCs({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>): Promise<void> {
  const client = createVPCClient(instance.config, logger);

  await client.iterateVPCs(async (vpc) => {
    await jobState.addEntity(createVPCEntity(vpc));
  });
}

export const vpcSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: VPCSteps.FETCH_VPCs.id,
    name: VPCSteps.FETCH_VPCs.name,
    entities: [VPCEntities.VPC],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchVPCs,
  },
];
