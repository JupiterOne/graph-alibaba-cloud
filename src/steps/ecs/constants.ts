import { StepEntityMetadata } from '@jupiterone/integration-sdk-core';

export const ECSSteps = {
  FETCH_ECS_INSTANCES: {
    id: 'fetch-ecs-instances',
    name: 'Fetch ECS instances',
  },
};

export const ECSEntities: Record<'ECS_INSTANCE', StepEntityMetadata> = {
  ECS_INSTANCE: {
    resourceName: 'ECS Instance',
    _type: 'alibaba_cloud_ecs_instance',
    _class: ['Host'],
    schema: {
      additionalProperties: true,
      properties: {
        instanceName: { type: 'string' },
        instanceId: { type: 'string' },
        instanceType: { type: 'string' },
        region: { type: 'string' },
      },
      required: ['instanceName', 'instanceId', 'instanceType', 'region'],
    },
  },
};
