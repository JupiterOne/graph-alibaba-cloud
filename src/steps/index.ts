import { ecsSteps } from './ecs/index';
import { vpnSteps } from './vpn';

const integrationSteps = [...ecsSteps, ...vpnSteps];

export { integrationSteps };
