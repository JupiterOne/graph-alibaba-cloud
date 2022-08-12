import { ecsSteps } from './ecs/index';
import { vpnSteps } from './vpn';
import { vpcSteps } from './vpc';
import { autoScalingSteps } from './auto-scaling';

const integrationSteps = [
  ...ecsSteps,
  ...vpnSteps,
  ...vpcSteps,
  ...autoScalingSteps,
];

export { integrationSteps };
