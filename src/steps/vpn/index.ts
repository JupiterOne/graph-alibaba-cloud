import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { createVPNClient } from './client/client';
import { IntegrationConfig } from '../../config';
import { VPNEntities, VPNSteps } from './constants';
import { createVPNGatewayEntity } from './converter';

export async function fetchVPNGateways({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>): Promise<void> {
  const client = createVPNClient(instance.config, logger);

  await client.iterateVPNGateways(async (vpnGateway) => {
    await jobState.addEntity(createVPNGatewayEntity(vpnGateway));
  });
}

export const vpnSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: VPNSteps.FETCH_VPN_GATEWAYS.id,
    name: VPNSteps.FETCH_VPN_GATEWAYS.name,
    entities: [VPNEntities.VPN_GATEWAY],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchVPNGateways,
  },
];
