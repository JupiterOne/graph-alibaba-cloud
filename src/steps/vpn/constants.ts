import { StepEntityMetadata } from '@jupiterone/integration-sdk-core';

export const VPNSteps = {
  FETCH_VPN_GATEWAYS: {
    id: 'fetch-vpn-gateways',
    name: 'Fetch VPN Gateways',
  },
};

export const VPNEntities: Record<'VPN_GATEWAY', StepEntityMetadata> = {
  VPN_GATEWAY: {
    resourceName: 'VPN Gateway',
    _type: 'alibaba_cloud_vpn_gateway',
    _class: ['Gateway'],
  },
};
