import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const vpcSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * Action: DescribeVpcs
     * PATTERN: Fetch Entities
     */
    id: 'fetch-vpcs',
    name: 'Fetch VPCs',
    entities: [
      {
        resourceName: 'VPC',
        _type: 'alibaba_cloud_vpc',
        _class: ['Network'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
];
