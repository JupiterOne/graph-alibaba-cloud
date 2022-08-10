import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { albSpec } from './alb';
import { ecsSpec } from './ecs';
import { vpnSpec } from './vpn';
import { vpcSpec } from './vpc';
import { autoScalingSpec } from './auto-scaling';
import { ramSpec } from './ram';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [
    ...ecsSpec,
    ...albSpec,
    ...ramSpec,
    ...vpnSpec,
    ...vpcSpec,
    ...autoScalingSpec,
  ],
};
