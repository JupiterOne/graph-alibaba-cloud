import { ecsSteps } from './ecs/index';
import { vpnSteps } from './vpn';
import { vpcSteps } from './vpc';

const integrationSteps = [...ecsSteps, ...vpnSteps, ...vpcSteps];

export { integrationSteps };
