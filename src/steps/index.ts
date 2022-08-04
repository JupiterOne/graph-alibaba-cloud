import { albSteps } from './alb/index';
import { ecsSteps } from './ecs/index';
import { vpcSteps } from './vpc';
import { autoScalingSteps } from './auto-scaling';
import { ramSteps } from './ram/index';
import { ossSteps } from './oss';

const integrationSteps = [
  ...ecsSteps,
  ...albSteps,
  ...ramSteps,
  ...vpcSteps,
  ...autoScalingSteps,
  ...ossSteps,
];

export { integrationSteps };
