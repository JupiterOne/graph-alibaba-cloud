import { albSteps } from './alb/index';
import { ecsSteps } from './ecs/index';
import { vpnSteps } from './vpn';
import { vpcSteps } from './vpc';
import { autoScalingSteps } from './auto-scaling';
import { ramSteps } from './ram/index';

const integrationSteps = [
  ...ecsSteps,
  ...albSteps,
  ...ramSteps,
  ...vpnSteps,
  ...vpcSteps,
  ...autoScalingSteps,
];

export { integrationSteps };
