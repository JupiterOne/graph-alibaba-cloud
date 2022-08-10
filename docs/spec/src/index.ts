import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { ecsSpec } from './ecs';
import { vpnSpec } from './vpn';
import { vpcSpec } from './vpc';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [...ecsSpec, ...vpnSpec, ...vpcSpec],
};
