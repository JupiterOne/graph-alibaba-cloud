import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const vpnSpec: StepSpec<IntegrationConfig>[] = [
  {
    id: 'fetch-vpn-gateways',
    name: 'Fetch VPN Gateways',
    entities: [
      {
        resourceName: 'VPN Gateway',
        _type: 'alibaba_cloud_vpn_gateway',
        _class: ['Gateway'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
];
