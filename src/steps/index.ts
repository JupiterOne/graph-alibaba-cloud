import { albSteps } from './alb/index';
import { ecsSteps } from './ecs/index';
import { vpcSteps } from './vpc';
import { autoScalingSteps } from './auto-scaling';
import { ramSteps } from './ram/index';

const integrationSteps = [
  ...ecsSteps,
  ...albSteps,
  ...ramSteps,
  ...vpcSteps,
  ...autoScalingSteps,
];

export { integrationSteps };
