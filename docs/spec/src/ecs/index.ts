import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const ecsSpec: StepSpec<IntegrationConfig>[] = [
  {
    id: 'fetch-ecs-instances',
    name: 'Fetch ECS Instances',
    entities: [
      {
        resourceName: 'ECS Instance',
        _type: 'alibaba_cloud_ecs_instance',
        _class: ['Host'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
];
